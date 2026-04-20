import { getLeanCloud, runLeanCloudFunction } from '@/integrations/leancloud/client';
import { getRuntimeConfig } from '@/app/config/runtime';
import { getTestAuthProfile } from '@/services/authService';
import { normalizeServiceError, ServiceError } from '@/services/errors';
import { getToken } from '@/utils/auth';

export interface UserInfoRecord {
  username: string;
  job?: string;
  title?: string;
  usericon?: string;
  role?: string;
}

export interface FeedbackRecord {
  title: string;
  to_name: string;
  email_address: string;
  message: string;
}

type CloudListResponse<T> = {
  items?: T[];
}

type CloudQueryResult = {
  results?: Array<{
    attributes?: Record<string, unknown>;
  }>;
}

const TEST_USERS: UserInfoRecord[] = [
  {
    username: 'test-admin',
    job: 'QA',
    title: '管理员',
    role: 'admin'
  },
  {
    username: 'test-developer',
    job: 'Engineer',
    title: '开发者',
    role: 'developer'
  }
];

const TEST_FEEDBACK: FeedbackRecord[] = [
  {
    title: 'Mock Feedback',
    to_name: 'Test User',
    email_address: 'test@example.com',
    message: 'This entry is returned by test-mode mocks.'
  }
];

function toFeedbackRecord(attributes: Record<string, unknown>): FeedbackRecord {
  return {
    title: String(attributes.title || ''),
    to_name: String(attributes.to_name || attributes.name || ''),
    email_address: String(attributes.email_address || attributes.email || ''),
    message: String(attributes.message || '')
  };
}

function toUserInfoRecord(attributes: Record<string, unknown>): UserInfoRecord {
  return {
    username: String(attributes.username || ''),
    job: attributes.job ? String(attributes.job) : '',
    title: attributes.title ? String(attributes.title) : '',
    usericon: attributes.usericon ? String(attributes.usericon) : undefined,
    role: attributes.role ? String(attributes.role) : undefined
  };
}

function assertTestAdminProfile(): void {
  const profile = getTestAuthProfile(getToken());
  if (!profile) {
    return;
  }

  if (profile.role !== 'admin') {
    throw new ServiceError('无权限查看管理数据', 'ADMIN_FORBIDDEN');
  }
}

async function runLegacyQuery(cql: string): Promise<Record<string, unknown>[]> {
  const leanCloud = getLeanCloud();
  const result = await leanCloud.Query.doCloudQuery(cql) as CloudQueryResult;
  return (result.results || []).map((entry) => entry.attributes || {});
}

function shouldUseCloudFunctions(): boolean {
  return getRuntimeConfig().leancloud.cloudFunctionsEnabled;
}

export const adminService = {
  async fetchFeedbackForms(): Promise<FeedbackRecord[]> {
    const testProfile = getTestAuthProfile(getToken());
    if (testProfile) {
      assertTestAdminProfile();
      return TEST_FEEDBACK;
    }

    if (!shouldUseCloudFunctions()) {
      try {
        const runtimeConfig = getRuntimeConfig();
        const items = await runLegacyQuery(`select * from ${runtimeConfig.leancloud.feedbackClass}`);
        return items.map((entry) => toFeedbackRecord(entry));
      } catch (error) {
        throw normalizeServiceError(error, '获取意见反馈列表失败', 'ADMIN_FETCH_FEEDBACK_FAILED', true);
      }
    }

    try {
      const result = await runLeanCloudFunction<CloudListResponse<Record<string, unknown>>>('admin:listFeedback');
      return (result.items || []).map((entry) => toFeedbackRecord(entry));
    } catch (error) {
      try {
        const runtimeConfig = getRuntimeConfig();
        const items = await runLegacyQuery(`select * from ${runtimeConfig.leancloud.feedbackClass}`);
        return items.map((entry) => toFeedbackRecord(entry));
      } catch {
        throw normalizeServiceError(error, '获取意见反馈列表失败', 'ADMIN_FETCH_FEEDBACK_FAILED', true);
      }
    }
  },

  async fetchUsers(): Promise<UserInfoRecord[]> {
    const testProfile = getTestAuthProfile(getToken());
    if (testProfile) {
      assertTestAdminProfile();
      return TEST_USERS;
    }

    if (!shouldUseCloudFunctions()) {
      try {
        const runtimeConfig = getRuntimeConfig();
        const items = await runLegacyQuery(`select * from ${runtimeConfig.leancloud.userInfoClass}`);
        return items.map((entry) => toUserInfoRecord(entry));
      } catch (error) {
        throw normalizeServiceError(error, '获取用户列表失败', 'ADMIN_FETCH_USERS_FAILED', true);
      }
    }

    try {
      const result = await runLeanCloudFunction<CloudListResponse<Record<string, unknown>>>('admin:listUsers');
      return (result.items || []).map((entry) => toUserInfoRecord(entry));
    } catch (error) {
      try {
        const runtimeConfig = getRuntimeConfig();
        const items = await runLegacyQuery(`select * from ${runtimeConfig.leancloud.userInfoClass}`);
        return items.map((entry) => toUserInfoRecord(entry));
      } catch {
        throw normalizeServiceError(error, '获取用户列表失败', 'ADMIN_FETCH_USERS_FAILED', true);
      }
    }
  }
};
