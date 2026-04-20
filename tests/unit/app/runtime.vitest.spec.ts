import { describe, expect, it } from 'vitest'
import {
  createRuntimeConfig,
  getEnabledEmailConfig,
  getLeanCloudRuntimeConfig
} from '@/app/config/runtime'

function createEnv(overrides: Partial<ImportMetaEnv> = {}): ImportMetaEnv {
  return {
    VITE_APP_NAME: 'HYCOM3',
    VITE_AUTH_TOKEN_TTL_MINUTES: '60',
    VITE_AUTH_ALLOW_TEST_TOKENS: 'false',
    VITE_LC_APP_ID: undefined,
    VITE_LC_APP_KEY: undefined,
    VITE_LC_SERVER_URL: undefined,
    VITE_LC_CLOUD_FUNCTIONS_ENABLED: 'false',
    VITE_LC_USER_INFO_CLASS: 'UsrInfo',
    VITE_LC_FEEDBACK_CLASS: 'MailForms',
    VITE_EMAILJS_SERVICE_ID: undefined,
    VITE_EMAILJS_TEMPLATE_ID: undefined,
    VITE_EMAILJS_PUBLIC_KEY: undefined,
    VITE_EMAILJS_ENABLED: 'false',
    ...overrides
  }
}

describe('app/config/runtime', () => {
  it('requires LeanCloud credentials outside of test mode', () => {
    expect(() => getLeanCloudRuntimeConfig(createEnv())).toThrow(
      /VITE_LC_APP_ID, VITE_LC_APP_KEY/
    )
  })

  it('reports the exact missing LeanCloud field names', () => {
    expect(() => getLeanCloudRuntimeConfig(createEnv({
      VITE_LC_APP_KEY: 'app-key'
    }))).toThrow(/VITE_LC_APP_ID/)
  })

  it('permits test-mode startup without LeanCloud credentials', () => {
    expect(getLeanCloudRuntimeConfig(createEnv({
      VITE_AUTH_ALLOW_TEST_TOKENS: 'true'
    }))).toMatchObject({
      appId: 'test-app-id',
      appKey: 'test-app-key'
    })
  })

  it('requires EmailJS credentials only when enabled', () => {
    expect(getEnabledEmailConfig(createEnv())).toBeNull()
    expect(() => getEnabledEmailConfig(createEnv({
      VITE_EMAILJS_ENABLED: 'true'
    }))).toThrow(/EmailJS is enabled/)
  })

  it('parses deployment flags from env values', () => {
    const config = createRuntimeConfig(createEnv({
      VITE_APP_NAME: 'HYCOM 3',
      VITE_AUTH_TOKEN_TTL_MINUTES: '90',
      VITE_AUTH_ALLOW_TEST_TOKENS: 'true',
      VITE_LC_APP_ID: 'app-id',
      VITE_LC_APP_KEY: 'app-key',
      VITE_LC_SERVER_URL: 'https://console.example.com',
      VITE_LC_CLOUD_FUNCTIONS_ENABLED: 'true',
      VITE_EMAILJS_ENABLED: 'true',
      VITE_EMAILJS_SERVICE_ID: 'service',
      VITE_EMAILJS_TEMPLATE_ID: 'template',
      VITE_EMAILJS_PUBLIC_KEY: 'public'
    }))

    expect(config.app.name).toBe('HYCOM 3')
    expect(config.auth.tokenTtlMinutes).toBe(90)
    expect(config.auth.allowTestTokens).toBe(true)
    expect(config.leancloud.cloudFunctionsEnabled).toBe(true)
    expect(config.emailjs.enabled).toBe(true)
  })
})
