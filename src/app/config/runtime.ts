export interface RuntimeConfig {
  app: {
    name: string;
  };
  auth: {
    tokenTtlMinutes: number;
    adminAuthValue: string;
  };
  leancloud: {
    appId: string;
    appKey: string;
    serverURL?: string;
    userInfoClass: string;
    feedbackClass: string;
  };
  emailjs: {
    serviceId: string;
    templateId: string;
    publicKey: string;
    enabled: boolean;
  };
}

function readString(value: string | undefined, fallback: string): string {
  return value && value.trim() !== '' ? value : fallback;
}

function readOptionalString(value: string | undefined): string | undefined {
  return value && value.trim() !== '' ? value : undefined;
}

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1') {
    return true;
  }

  if (normalized === 'false' || normalized === '0') {
    return false;
  }

  return fallback;
}

export const runtimeConfig: RuntimeConfig = Object.freeze({
  app: {
    name: readString(import.meta.env.VITE_APP_NAME, 'HYCOM3')
  },
  auth: {
    tokenTtlMinutes: readNumber(import.meta.env.VITE_AUTH_TOKEN_TTL_MINUTES, 60),
    adminAuthValue: readString(import.meta.env.VITE_AUTH_ADMIN_VALUE, 'S')
  },
  leancloud: {
    appId: readString(import.meta.env.VITE_LC_APP_ID, 'MCpP0K0Apfobt7aP07WmqjLR-gzGzoHsz'),
    appKey: readString(import.meta.env.VITE_LC_APP_KEY, '1fdT0oaT8EPwwhxp71ggRS19'),
    serverURL: readOptionalString(import.meta.env.VITE_LC_SERVER_URL),
    userInfoClass: readString(import.meta.env.VITE_LC_USER_INFO_CLASS, 'UsrInfo'),
    feedbackClass: readString(import.meta.env.VITE_LC_FEEDBACK_CLASS, 'MailForms')
  },
  emailjs: {
    serviceId: readString(import.meta.env.VITE_EMAILJS_SERVICE_ID, 'service_6byd0uo'),
    templateId: readString(import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 'template_pzvw4ie'),
    publicKey: readString(import.meta.env.VITE_EMAILJS_PUBLIC_KEY, 'SsfGAVHMRIhgMrZtq'),
    enabled: readBoolean(import.meta.env.VITE_EMAILJS_ENABLED, true)
  }
});
