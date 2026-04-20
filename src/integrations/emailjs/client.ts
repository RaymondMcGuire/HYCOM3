import emailjs from 'emailjs-com';
import { getEnabledEmailConfig } from '@/app/config/runtime';

export interface EmailFeedbackPayload {
  title: string;
  to_name: string;
  email_address: string;
  message: string;
}

export async function sendFeedbackEmail(payload: EmailFeedbackPayload): Promise<void> {
  const config = getEnabledEmailConfig();
  if (!config) {
    return;
  }

  await emailjs.send(
    config.serviceId,
    config.templateId,
    payload,
    config.publicKey
  );
}
