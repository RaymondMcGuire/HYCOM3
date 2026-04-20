import { beforeEach, describe, expect, it, vi } from 'vitest'

const runLeanCloudFunction = vi.fn()
const getTestAuthProfile = vi.fn()
const getToken = vi.fn()
const doCloudQuery = vi.fn()

vi.mock('@/integrations/leancloud/client', () => ({
  runLeanCloudFunction,
  getLeanCloud: () => ({
    Query: {
      doCloudQuery
    }
  })
}))

vi.mock('@/services/authService', () => ({
  getTestAuthProfile
}))

vi.mock('@/utils/auth', () => ({
  getToken
}))

describe('services/adminService', () => {
  beforeEach(() => {
    runLeanCloudFunction.mockReset()
    getTestAuthProfile.mockReset()
    getToken.mockReset()
    doCloudQuery.mockReset()
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'false')
  })

  it('maps feedback fields from cloud-function payloads', async () => {
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'true')
    getToken.mockReturnValue('lc-user-session')
    getTestAuthProfile.mockReturnValue(null)
    runLeanCloudFunction.mockResolvedValue({
      items: [
        {
          title: 'Feedback',
          to_name: 'Alice',
          email_address: 'alice@example.com',
          message: 'Hello'
        }
      ]
    })

    const { adminService } = await import('@/services/adminService')
    await expect(adminService.fetchFeedbackForms()).resolves.toEqual([
      {
        title: 'Feedback',
        to_name: 'Alice',
        email_address: 'alice@example.com',
        message: 'Hello'
      }
    ])
    expect(runLeanCloudFunction).toHaveBeenCalledWith('admin:listFeedback')
  })

  it('returns canned admin data in test mode', async () => {
    getToken.mockReturnValue('lc-test-session:admin')
    getTestAuthProfile.mockReturnValue({
      token: 'lc-test-session:admin',
      role: 'admin',
      name: 'test-admin',
      avatar: 'avatar.png',
      intro: '测试管理员'
    })

    const { adminService } = await import('@/services/adminService')
    await expect(adminService.fetchUsers()).resolves.toEqual(
      expect.arrayContaining([
      expect.objectContaining({ username: 'test-admin', role: 'admin' })
      ])
    )
  })

  it('falls back to direct LeanCloud queries when admin cloud functions are unavailable', async () => {
    vi.stubEnv('VITE_LC_CLOUD_FUNCTIONS_ENABLED', 'true')
    getToken.mockReturnValue('lc-user-session')
    getTestAuthProfile.mockReturnValue(null)
    runLeanCloudFunction.mockRejectedValue(new Error('Cloud function unavailable'))
    doCloudQuery.mockResolvedValue({
      results: [
        {
          attributes: {
            title: 'Legacy Feedback',
            to_name: 'Bob',
            email_address: 'bob@example.com',
            message: 'From legacy query'
          }
        }
      ]
    })

    const { adminService } = await import('@/services/adminService')
    await expect(adminService.fetchFeedbackForms()).resolves.toEqual([
      {
        title: 'Legacy Feedback',
        to_name: 'Bob',
        email_address: 'bob@example.com',
        message: 'From legacy query'
      }
    ])
  })

  it('uses direct LeanCloud queries without touching cloud functions when disabled', async () => {
    getToken.mockReturnValue('lc-user-session')
    getTestAuthProfile.mockReturnValue(null)
    doCloudQuery.mockResolvedValue({
      results: [
        {
          attributes: {
            title: 'Direct Feedback',
            to_name: 'Carol',
            email_address: 'carol@example.com',
            message: 'Direct query'
          }
        }
      ]
    })

    const { adminService } = await import('@/services/adminService')
    await expect(adminService.fetchFeedbackForms()).resolves.toEqual([
      {
        title: 'Direct Feedback',
        to_name: 'Carol',
        email_address: 'carol@example.com',
        message: 'Direct query'
      }
    ])
    expect(runLeanCloudFunction).not.toHaveBeenCalled()
  })
})
