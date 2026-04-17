import { runtimeConfig } from '@/app/config/runtime';
import { getLeanCloud } from '@/integrations/leancloud/client';
import { normalizeServiceError } from '@/services/errors';

export interface UserInfoRecord {
  username: string;
  job?: string;
  title?: string;
  usericon?: string;
}

export interface FeedbackRecord {
  title: string;
  to_name: string;
  email_address: string;
  message: string;
}

function toFeedbackRecord(attributes: Record<string, unknown>): FeedbackRecord {
  return {
    title: String(attributes.title || ''),
    to_name: String(attributes.to_name || ''),
    email_address: String(attributes.email_address || ''),
    message: String(attributes.message || '')
  };
}

function toUserInfoRecord(attributes: Record<string, unknown>): UserInfoRecord {
  return {
    username: String(attributes.username || ''),
    job: attributes.job ? String(attributes.job) : '',
    title: attributes.title ? String(attributes.title) : '',
    usericon: attributes.usericon ? String(attributes.usericon) : undefined
  };
}

export const adminService = {
  async fetchFeedbackForms(): Promise<FeedbackRecord[]> {
    try {
      const AV = getLeanCloud();
      const cql = `select * from ${runtimeConfig.leancloud.feedbackClass}`;
      const result = await AV.Query.doCloudQuery(cql) as any;
      return result.results.map((entry: any) => toFeedbackRecord(entry.attributes));
    } catch (error) {
      throw normalizeServiceError(error, '获取意见反馈列表失败', 'ADMIN_FETCH_FEEDBACK_FAILED', true);
    }
  },

  async fetchUsers(): Promise<UserInfoRecord[]> {
    try {
      const AV = getLeanCloud();
      const cql = `select * from ${runtimeConfig.leancloud.userInfoClass}`;
      const result = await AV.Query.doCloudQuery(cql) as any;
      return result.results.map((entry: any) => toUserInfoRecord(entry.attributes));
    } catch (error) {
      throw normalizeServiceError(error, '获取用户列表失败', 'ADMIN_FETCH_USERS_FAILED', true);
    }
  }
};
