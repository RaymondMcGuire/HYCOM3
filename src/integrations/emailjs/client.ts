import emailjs from 'emailjs-com';
import { runtimeConfig } from '@/app/config/runtime';

export interface EmailFeedbackPayload {
  title: string;
  to_name: string;
  email_address: string;
  message: string;
}

export async function sendFeedbackEmail(payload: EmailFeedbackPayload): Promise<void> {
  if (!runtimeConfig.emailjs.enabled) {
    return;
  }

  await emailjs.send(
    runtimeConfig.emailjs.serviceId,
    runtimeConfig.emailjs.templateId,
    payload,
    runtimeConfig.emailjs.publicKey
  );
}
