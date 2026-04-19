import { beforeEach, describe, expect, it, vi } from 'vitest'
import Cookies from 'js-cookie'
import { useLayoutState, useSessionState } from '@/app/state'
import store from '@/store'
import { DeviceType, useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { removeToken, setToken } from '@/utils/auth'
import { authService } from '@/services/authService'

describe('app/state facades', () => {
  beforeEach(() => {
    removeToken()
    Cookies.remove('sidebarStatus')
    useAppStore(store).$reset()
    useUserStore(store).$reset()
    vi.restoreAllMocks()
  })

  it('proxies layout state mutations through the facade', async () => {
    const layoutState = useLayoutState()

    expect(layoutState.device).toBe(DeviceType.Desktop)
    expect(layoutState.sidebar.opened).toBe(true)

    await layoutState.toggleSideBar(true)
    expect(layoutState.sidebar.opened).toBe(false)
    expect(layoutState.sidebar.withoutAnimation).toBe(true)

    await layoutState.toggleDevice(DeviceType.Mobile)
    expect(layoutState.device).toBe(DeviceType.Mobile)

    await layoutState.closeSideBar(false)
    expect(layoutState.sidebar.opened).toBe(false)
  })

  it('reads and clears session state through the facade', async () => {
    const sessionState = useSessionState()

    setToken('developer-token', 60)
    await sessionState.fetchProfile()

    expect(sessionState.token).toBe('developer-token')
    expect(sessionState.name).toBe('开发者')
    expect(sessionState.roles).toEqual(['developer'])

    await sessionState.clearLocalSession()
    expect(sessionState.token).toBe('')
    expect(sessionState.roles).toEqual([])
  })

  it('delegates logout to the underlying auth service', async () => {
    const sessionState = useSessionState()
    const logoutSpy = vi.spyOn(authService, 'logout').mockResolvedValue()

    setToken('developer-token', 60)
    await sessionState.fetchProfile()
    await sessionState.logout()

    expect(logoutSpy).toHaveBeenCalledTimes(1)
    expect(sessionState.roles).toEqual([])
  })
})
