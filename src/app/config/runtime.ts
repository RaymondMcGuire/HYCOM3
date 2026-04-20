export interface RuntimeConfig {
  app: {
    name: string;
  };
  auth: {
    tokenTtlMinutes: number;
    allowTestTokens: boolean;
    adminAuthValue: string;
  };
  leancloud: {
    appId?: string;
    appKey?: string;
    serverURL?: string;
    cloudFunctionsEnabled: boolean;
    userInfoClass: string;
    feedbackClass: string;
  };
  emailjs: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
    enabled: boolean;
  };
}

export interface LeanCloudRuntimeConfig {
  appId: string;
  appKey: string;
  serverURL?: string;
  userInfoClass: string;
  feedbackClass: string;
}

export interface EmailJsRuntimeConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

function readString(value: string | undefined, fallback: string): string {
  return value && value.trim() !== '' ? value.trim() : fallback;
}

function readOptionalString(value: string | undefined): string | undefined {
  return value && value.trim() !== '' ? value.trim() : undefined;
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

export function createRuntimeConfig(env: ImportMetaEnv = import.meta.env): RuntimeConfig {
  return {
    app: {
      name: readString(env.VITE_APP_NAME, 'HYCOM3')
    },
    auth: {
      tokenTtlMinutes: readNumber(env.VITE_AUTH_TOKEN_TTL_MINUTES, 60),
      allowTestTokens: readBoolean(env.VITE_AUTH_ALLOW_TEST_TOKENS, false),
      adminAuthValue: readString(env.VITE_AUTH_ADMIN_VALUE, 'S')
    },
    leancloud: {
      appId: readOptionalString(env.VITE_LC_APP_ID),
      appKey: readOptionalString(env.VITE_LC_APP_KEY),
      serverURL: readOptionalString(env.VITE_LC_SERVER_URL),
      cloudFunctionsEnabled: readBoolean(env.VITE_LC_CLOUD_FUNCTIONS_ENABLED, false),
      userInfoClass: readString(env.VITE_LC_USER_INFO_CLASS, 'UsrInfo'),
      feedbackClass: readString(env.VITE_LC_FEEDBACK_CLASS, 'MailForms')
    },
    emailjs: {
      serviceId: readOptionalString(env.VITE_EMAILJS_SERVICE_ID),
      templateId: readOptionalString(env.VITE_EMAILJS_TEMPLATE_ID),
      publicKey: readOptionalString(env.VITE_EMAILJS_PUBLIC_KEY),
      enabled: readBoolean(env.VITE_EMAILJS_ENABLED, false)
    }
  };
}

export function getRuntimeConfig(env: ImportMetaEnv = import.meta.env): Readonly<RuntimeConfig> {
  return Object.freeze(createRuntimeConfig(env));
}

export function getLeanCloudRuntimeConfig(env: ImportMetaEnv = import.meta.env): LeanCloudRuntimeConfig {
  const config = createRuntimeConfig(env);
  const appId = config.leancloud.appId;
  const appKey = config.leancloud.appKey;
  const serverURL = config.leancloud.serverURL;

  const missingFields = [
    !appId ? 'VITE_LC_APP_ID' : null,
    !appKey ? 'VITE_LC_APP_KEY' : null
  ].filter((field): field is string => Boolean(field));

  if (missingFields.length === 0) {
    return {
      appId: appId as string,
      appKey: appKey as string,
      serverURL,
      userInfoClass: config.leancloud.userInfoClass,
      feedbackClass: config.leancloud.feedbackClass
    };
  }

  if (config.auth.allowTestTokens) {
    return {
      appId: 'test-app-id',
      appKey: 'test-app-key',
      serverURL,
      userInfoClass: config.leancloud.userInfoClass,
      feedbackClass: config.leancloud.feedbackClass
    };
  }

  throw new Error(`Missing required LeanCloud runtime config: ${missingFields.join(', ')}`);
}

export function getEnabledEmailConfig(env: ImportMetaEnv = import.meta.env): EmailJsRuntimeConfig | null {
  const config = createRuntimeConfig(env);

  if (!config.emailjs.enabled) {
    return null;
  }

  if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
    return {
      serviceId: config.emailjs.serviceId,
      templateId: config.emailjs.templateId,
      publicKey: config.emailjs.publicKey
    };
  }

  throw new Error(
    'EmailJS is enabled but missing required runtime config: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY'
  );
}

export const runtimeConfig = getRuntimeConfig();
