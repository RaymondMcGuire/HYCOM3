import store from '@/store'
import { useUserStore } from '@/store/modules/user'
import { getToken } from '@/utils/auth'

function getUserStore() {
  return useUserStore(store)
}

const sessionState = {
  get token(): string {
    return getUserStore().token || getToken() || ''
  },
  get name(): string {
    return getUserStore().name
  },
  get avatar(): string {
    return getUserStore().avatar
  },
  get roles(): string[] {
    return getUserStore().roles
  },
  get intro(): string {
    return getUserStore().intro
  },
  setToken(token: string): Promise<void> {
    getUserStore().setToken(token)
    return Promise.resolve()
  },
  fetchProfile(): Promise<unknown> {
    return getUserStore().getUserInfo()
  },
  logout(): Promise<void> {
    return getUserStore().logOut()
  },
  clearLocalSession(): Promise<void> {
    getUserStore().fedLogOut()
    return Promise.resolve()
  }
}

export function useSessionState() {
  return sessionState
}
