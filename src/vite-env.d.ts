/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_AUTH_TOKEN_TTL_MINUTES?: string;
  readonly VITE_AUTH_ALLOW_TEST_TOKENS?: string;
  readonly VITE_LC_APP_ID?: string;
  readonly VITE_LC_APP_KEY?: string;
  readonly VITE_LC_SERVER_URL?: string;
  readonly VITE_LC_CLOUD_FUNCTIONS_ENABLED?: string;
  readonly VITE_LC_USER_INFO_CLASS?: string;
  readonly VITE_LC_FEEDBACK_CLASS?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
