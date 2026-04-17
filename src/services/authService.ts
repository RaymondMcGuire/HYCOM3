import defaultAvatar from '@/assets/images/icon/wx_icon.png';
import { runtimeConfig } from '@/app/config/runtime';
import { getLeanCloud } from '@/integrations/leancloud/client';
import { normalizeServiceError, ServiceError } from '@/services/errors';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { Identicon } from '@/identicon_lib/identicon';

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

const TOKEN_PROFILES: Record<string, AuthProfile> = {
  'admin-token': {
    token: 'admin-token',
    role: 'admin',
    name: '超级用户',
    avatar: defaultAvatar,
    intro: '超级用户'
  },
  'developer-token': {
    token: 'developer-token',
    role: 'developer',
    name: '开发者',
    avatar: defaultAvatar,
    intro: '开发者'
  }
};

function getRoleFromAuthValue(authValue: unknown): AuthRole {
  return authValue === runtimeConfig.auth.adminAuthValue ? 'admin' : 'developer';
}

function getTokenFromRole(role: AuthRole): string {
  return role === 'admin' ? 'admin-token' : 'developer-token';
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

async function saveUserInfoRecord(payload: RegisterPayload): Promise<void> {
  const AV = getLeanCloud();
  const UserInfo = AV.Object.extend(runtimeConfig.leancloud.userInfoClass);
  const record = new UserInfo();

  await record.save({
    username: payload.username,
    password: payload.password,
    job: payload.work,
    title: payload.level,
    usericon: createUserIconDataUrl(payload.username)
  });
}

export const authService = {
  async login(payload: LoginPayload): Promise<CurrentUserSummary> {
    try {
      const AV = getLeanCloud();
      const user = await AV.User.logIn(payload.username.trim(), payload.password);
      const userJson = user.toJSON();
      const role = getRoleFromAuthValue(userJson.auth);
      const token = getTokenFromRole(role);

      setToken(token, runtimeConfig.auth.tokenTtlMinutes);

      return {
        username: userJson.username,
        role
      };
    } catch (error) {
      throw normalizeServiceError(error, '账号不匹配', 'AUTH_LOGIN_FAILED');
    }
  },

  async register(payload: RegisterPayload): Promise<void> {
    try {
      const AV = getLeanCloud();
      await AV.User.signUp(payload.username, payload.password, {
        job: payload.work,
        title: payload.level,
        auth: 'D'
      });

      await saveUserInfoRecord(payload);
    } catch (error) {
      throw normalizeServiceError(error, '创建用户失败', 'AUTH_REGISTER_FAILED');
    }
  },

  async logout(): Promise<void> {
    const AV = getLeanCloud();
    removeToken();
    await AV.User.logOut();
  },

  async fetchCurrentUserAvatar(): Promise<string | undefined> {
    try {
      const AV = getLeanCloud();
      const currentUser = AV.User.current();
      if (!currentUser) {
        return undefined;
      }

      const username = currentUser.get('username');
      const cql = `select * from ${runtimeConfig.leancloud.userInfoClass} where username = ?`;
      const result = await AV.Query.doCloudQuery(cql, [username]) as any;
      const firstRecord = result.results[0];

      return firstRecord?.attributes?.usericon;
    } catch (error) {
      throw normalizeServiceError(error, '获取用户头像失败', 'AUTH_AVATAR_FAILED', true);
    }
  },

  getProfileByToken(token: string | null): AuthProfile {
    if (!token) {
      throw new ServiceError('GetUserInfo: token is undefined!', 'AUTH_TOKEN_MISSING');
    }

    const profile = TOKEN_PROFILES[token];
    if (!profile) {
      throw new ServiceError('GetUserInfo: token is invalid!', 'AUTH_TOKEN_INVALID');
    }

    return profile;
  },

  getCurrentProfile(): AuthProfile | null {
    const token = getToken();
    if (!token) {
      return null;
    }

    return TOKEN_PROFILES[token] || null;
  }
};
