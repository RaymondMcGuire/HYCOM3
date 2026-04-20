import defaultAvatar from '@/assets/images/icon/wx_icon.png';
import { getRuntimeConfig } from '@/app/config/runtime';
import { Identicon } from '@/identicon_lib/identicon';
import {
  AV,
  getCurrentLeanCloudUser,
  getLeanCloud,
  runLeanCloudFunction
} from '@/integrations/leancloud/client';
import { normalizeServiceError, ServiceError } from '@/services/errors';
import { getToken, removeToken, setToken } from '@/utils/auth';

export type AuthRole = 'admin' | 'developer';

export interface AuthProfile {
  token: string;
  role: AuthRole;
  name: string;
  avatar: string;
  intro: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  work: string;
  level: string;
}

export interface CurrentUserSummary {
  username: string;
  role: AuthRole;
}

type CurrentProfileResponse = {
  username: string;
  role: string;
  avatar?: string;
  intro?: string;
}

const ACTIVE_SESSION_TOKEN = 'lc-user-session';

type CloudQueryResult = {
  results?: Array<{
    attributes?: Record<string, unknown>;
  }>;
}

const TEST_SESSION_PROFILES: Record<string, AuthProfile> = {
  'lc-test-session:admin': {
    token: 'lc-test-session:admin',
    role: 'admin',
    name: 'test-admin',
    avatar: defaultAvatar,
    intro: '测试管理员'
  },
  'lc-test-session:developer': {
    token: 'lc-test-session:developer',
    role: 'developer',
    name: 'test-developer',
    avatar: defaultAvatar,
    intro: '测试开发者'
  }
};

function shouldUseCloudFunctions(): boolean {
  return getRuntimeConfig().leancloud.cloudFunctionsEnabled;
}

function normalizeRole(role: unknown): AuthRole {
  if (role === 'admin' || role === 'developer') {
    return role;
  }

  throw new ServiceError('用户角色无效', 'AUTH_ROLE_INVALID');
}

function getRoleFromAuthValue(authValue: unknown): AuthRole {
  return authValue === getRuntimeConfig().auth.adminAuthValue ? 'admin' : 'developer';
}

function buildSessionToken(user: InstanceType<typeof AV.User>): string {
  return user.id ? `${ACTIVE_SESSION_TOKEN}:${user.id}` : ACTIVE_SESSION_TOKEN;
}

function normalizeProfileResponse(response: CurrentProfileResponse, token: string): AuthProfile {
  const role = normalizeRole(response.role);

  return {
    token,
    role,
    name: response.username,
    avatar: response.avatar || defaultAvatar,
    intro: response.intro || (role === 'admin' ? '超级用户' : '开发者')
  };
}

function createUserIconDataUrl(userId: string): string {
  const size = 420;
  const pixel = 70;
  const frame = 35;
  const patternSize = 5;
  const bgColor = 240;

  const canvas = document.createElement('canvas');
  canvas.height = size;
  canvas.width = size;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new ServiceError('无法创建用户头像画布', 'ICON_CONTEXT_ERROR');
  }

  const imageBuf = Identicon.Generate(
    userId,
    patternSize,
    size,
    pixel,
    frame,
    bgColor
  );

  Identicon.Write2Canvas(context, imageBuf, size);
  return canvas.toDataURL('image/png');
}

async function queryUserInfoByUsername(username: string): Promise<Record<string, unknown> | null> {
  const runtimeConfig = getRuntimeConfig();
  const leanCloud = getLeanCloud();
  const cql = `select * from ${runtimeConfig.leancloud.userInfoClass} where username = ?`;
  const result = await leanCloud.Query.doCloudQuery(cql, [username]) as CloudQueryResult;
  return result.results?.[0]?.attributes || null;
}

async function buildDirectProfile(
  currentUser: InstanceType<typeof AV.User>,
  token: string
): Promise<AuthProfile> {
  const username = String(currentUser.get('username') || '');
  const role = getRoleFromAuthValue(currentUser.get('auth'));
  const userInfo = username ? await queryUserInfoByUsername(username).catch(() => null) : null;
  const avatar = userInfo?.usericon ? String(userInfo.usericon) : defaultAvatar;
  const intro =
    userInfo?.intro && String(userInfo.intro).trim() !== ''
      ? String(userInfo.intro)
      : role === 'admin' ? '超级用户' : '开发者';

  return {
    token,
    role,
    name: username,
    avatar,
    intro
  };
}

async function fetchCloudProfile(
  currentUser: InstanceType<typeof AV.User>,
  token: string
): Promise<AuthProfile> {
  if (!shouldUseCloudFunctions()) {
    return buildDirectProfile(currentUser, token);
  }

  try {
    const response = await runLeanCloudFunction<CurrentProfileResponse>('auth:getCurrentProfile');
    return normalizeProfileResponse(response, token);
  } catch (error) {
    console.warn('LeanCloud cloud-profile fallback to direct profile:', error);
    return buildDirectProfile(currentUser, token);
  }
}

async function fetchAuthoritativeProfile(
  token: string,
  currentUser?: InstanceType<typeof AV.User> | null
): Promise<AuthProfile> {
  const authenticatedUser = currentUser || await getCurrentLeanCloudUser();
  if (!authenticatedUser) {
    throw new ServiceError('登录状态已失效，请重新登录', 'AUTH_SESSION_EXPIRED');
  }

  return fetchCloudProfile(authenticatedUser, token);
}

async function saveUserInfoRecord(payload: RegisterPayload): Promise<void> {
  const runtimeConfig = getRuntimeConfig();
  const leanCloud = getLeanCloud();
  const UserInfo = leanCloud.Object.extend(runtimeConfig.leancloud.userInfoClass);
  const record = new UserInfo();

  await record.save({
    username: payload.username,
    job: payload.work,
    title: payload.level,
    usericon: createUserIconDataUrl(payload.username)
  });
}

export function getTestAuthProfile(token: string | null): AuthProfile | null {
  const runtimeConfig = getRuntimeConfig();
  if (!runtimeConfig.auth.allowTestTokens || !token) {
    return null;
  }

  return TEST_SESSION_PROFILES[token] || null;
}

export const authService = {
  async login(payload: LoginPayload): Promise<CurrentUserSummary> {
    try {
      const runtimeConfig = getRuntimeConfig();
      const leanCloud = getLeanCloud();
      const user = await leanCloud.User.logIn(payload.username.trim(), payload.password);
      const token = buildSessionToken(user);

      setToken(token, runtimeConfig.auth.tokenTtlMinutes);
      const profile = await fetchAuthoritativeProfile(token, user);

      return {
        username: profile.name,
        role: profile.role
      };
    } catch (error) {
      removeToken();
      await getLeanCloud().User.logOut().catch(() => undefined);
      throw normalizeServiceError(error, '账号不匹配', 'AUTH_LOGIN_FAILED');
    }
  },

  async register(payload: RegisterPayload): Promise<void> {
    try {
      const leanCloud = getLeanCloud();
      await leanCloud.User.signUp(payload.username, payload.password, {
        job: payload.work,
        title: payload.level,
        auth: 'D'
      });

      if (!shouldUseCloudFunctions()) {
        await saveUserInfoRecord(payload);
        return;
      }

      try {
        await runLeanCloudFunction<{ ok: boolean }>('profile:upsertCurrentUser', {
          work: payload.work,
          level: payload.level
        });
      } catch (error) {
        console.warn('LeanCloud profile upsert fallback to direct save:', error);
        await saveUserInfoRecord(payload);
      }
    } catch (error) {
      throw normalizeServiceError(error, '创建用户失败', 'AUTH_REGISTER_FAILED');
    }
  },

  async logout(): Promise<void> {
    const leanCloud = getLeanCloud();
    removeToken();
    await leanCloud.User.logOut().catch(() => undefined);
  },

  async fetchCurrentProfile(): Promise<AuthProfile> {
    const token = getToken();
    const testProfile = getTestAuthProfile(token);
    if (testProfile) {
      return testProfile;
    }

    if (!token) {
      throw new ServiceError('登录状态已失效，请重新登录', 'AUTH_TOKEN_MISSING');
    }

    try {
      return await fetchAuthoritativeProfile(token);
    } catch (error) {
      throw normalizeServiceError(error, '获取当前用户信息失败', 'AUTH_PROFILE_FAILED', true);
    }
  },

  async fetchCurrentUserAvatar(): Promise<string | undefined> {
    try {
      const profile = await this.fetchCurrentProfile();
      return profile.avatar;
    } catch (error) {
      throw normalizeServiceError(error, '获取用户头像失败', 'AUTH_AVATAR_FAILED', true);
    }
  }
};
