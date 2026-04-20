import { beforeEach, describe, expect, it, vi } from 'vitest'
import { removeToken, setToken } from '@/utils/auth'
import { ServiceError } from '@/services/errors'

const logIn = vi.fn()
const logOut = vi.fn()
const signUp = vi.fn()
const runLeanCloudFunction = vi.fn()
const getCurrentLeanCloudUser = vi.fn()
const doCloudQuery = vi.fn()

vi.mock('@/integrations/leancloud/client', () => ({
  AV: {
    User: class MockUser {}
  },
  getLeanCloud: () => ({
    User: {
      logIn,
      logOut,
      signUp
    },
    Query: {
      doCloudQuery
    },
    Object: {
      extend: vi.fn(() => class MockObject {
        save = vi.fn().mockResolvedValue(undefined)
      })
    }
  }),
  runLeanCloudFunction,
  getCurrentLeanCloudUser
}))

describe('services/authService', () => {
  beforeEach(() => {
    removeToken()
    logIn.mockReset()
    logOut.mockReset()
    signUp.mockReset()
    runLeanCloudFunction.mockReset()
    getCurrentLeanCloudUser.mockReset()
    doCloudQuery.mockReset()
    vi.stubEnv('VITE_AUTH_ALLOW_TEST_TOKENS', 'false')
    vi.stubEnv('VITE_AUTH_ADMIN_VALUE', 'S')
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'false')
  })

  it('hydrates the current profile through the cloud function', async () => {
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'true')
    getCurrentLeanCloudUser.mockResolvedValue({
      isAuthenticated: vi.fn().mockResolvedValue(true)
    })
    runLeanCloudFunction.mockResolvedValue({
      username: 'cloud-user',
      role: 'developer',
      avatar: 'avatar.png',
      intro: '来自云函数'
    })

    const { authService } = await import('@/services/authService')
    setToken('lc-user-session', 60)

    await expect(authService.fetchCurrentProfile()).resolves.toEqual({
      token: 'lc-user-session',
      role: 'developer',
      name: 'cloud-user',
      avatar: 'avatar.png',
      intro: '来自云函数'
    })
    expect(runLeanCloudFunction).toHaveBeenCalledWith('auth:getCurrentProfile')
  })

  it('registers users without persisting plaintext passwords in profile sync', async () => {
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'true')
    signUp.mockResolvedValue(undefined)
    runLeanCloudFunction.mockResolvedValue({ ok: true })

    const { authService } = await import('@/services/authService')
    await authService.register({
      username: 'new-user',
      password: 'secret-123',
      work: 'Engineer',
      level: 'Senior'
    })

    expect(signUp).toHaveBeenCalledWith('new-user', 'secret-123', {
      job: 'Engineer',
      title: 'Senior',
      auth: 'D'
    })
    expect(runLeanCloudFunction).toHaveBeenCalledWith('profile:upsertCurrentUser', {
      work: 'Engineer',
      level: 'Senior'
    })
  })

  it('falls back to direct LeanCloud profile lookup when the cloud profile function is unavailable', async () => {
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'true')
    getCurrentLeanCloudUser.mockResolvedValue({
      get: vi.fn((field: string) => {
        if (field === 'username') {
          return 'legacy-user'
        }

        if (field === 'auth') {
          return 'S'
        }

        return undefined
      }),
      isAuthenticated: vi.fn().mockResolvedValue(true)
    })
    runLeanCloudFunction.mockRejectedValue(new Error('Network request failed'))
    doCloudQuery.mockResolvedValue({
      results: [
        {
          attributes: {
            usericon: 'legacy-avatar.png'
          }
        }
      ]
    })

    const { authService } = await import('@/services/authService')
    setToken('lc-user-session', 60)

    await expect(authService.fetchCurrentProfile()).resolves.toEqual({
      token: 'lc-user-session',
      role: 'admin',
      name: 'legacy-user',
      avatar: 'legacy-avatar.png',
      intro: '超级用户'
    })
  })

  it('skips cloud profile lookup when cloud functions are disabled', async () => {
    getCurrentLeanCloudUser.mockResolvedValue({
      get: vi.fn((field: string) => {
        if (field === 'username') {
          return 'direct-user'
        }

        if (field === 'auth') {
          return 'D'
        }

        return undefined
      }),
      isAuthenticated: vi.fn().mockResolvedValue(true)
    })
    doCloudQuery.mockResolvedValue({
      results: []
    })

    const { authService } = await import('@/services/authService')
    setToken('lc-user-session', 60)

    await expect(authService.fetchCurrentProfile()).resolves.toEqual({
      token: 'lc-user-session',
      role: 'developer',
      name: 'direct-user',
      avatar: expect.any(String),
      intro: '开发者'
    })
    expect(runLeanCloudFunction).not.toHaveBeenCalled()
  })
})
