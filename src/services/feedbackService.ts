import { getRuntimeConfig } from '@/app/config/runtime';
import { sendFeedbackEmail } from '@/integrations/emailjs/client';
import { getLeanCloud } from '@/integrations/leancloud/client';
import { normalizeServiceError } from '@/services/errors';

export interface FeedbackSubmission {
  title: string;
  to_name: string;
  email_address: string;
  message: string;
}

export const feedbackService = {
  async submit(payload: FeedbackSubmission): Promise<void> {
    const AV = getLeanCloud();
    const runtimeConfig = getRuntimeConfig();
    const FeedbackForm = AV.Object.extend(runtimeConfig.leancloud.feedbackClass);
    const record = new FeedbackForm();

    try {
      await record.save(payload);
    } catch (error) {
      throw normalizeServiceError(error, '提交意见失败', 'FEEDBACK_SAVE_FAILED', true);
    }

    try {
      await sendFeedbackEmail(payload);
    } catch (error) {
      console.warn(error);
    }
  }
};
