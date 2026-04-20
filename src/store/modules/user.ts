import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import { getToken, removeToken } from '@/utils/auth'

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
  intro: string;
}

export const createUserState = (): IUserState => ({
  token: getToken() || '',
  name: '',
  avatar: '',
  roles: [],
  intro: ''
})

type UserProfile = {
  roles: string[];
  name: string;
  avatar: string;
  intro: string;
}

export const useUserStore = defineStore('user', {
  state: createUserState,
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setProfile(profile: UserProfile) {
      this.roles = profile.roles
      this.name = profile.name
      this.avatar = profile.avatar
      this.intro = profile.intro
    },
    clearSession() {
      this.token = ''
      this.roles = []
      this.name = ''
      this.avatar = ''
      this.intro = ''
    },
    fedLogOut() {
      removeToken()
      this.clearSession()
    },
    async getUserInfo() {
      if (!getToken() && !this.token) {
        throw Error('GetUserInfo: token is undefined!')
      }

      const data = await authService.fetchCurrentProfile()
      const roles = [data.role]
      if (roles.length === 0) {
        throw Error('GetUserInfo: roles must be a non-null array!')
      }

      this.setToken(data.token)
      this.setProfile({
        roles,
        name: data.name,
        avatar: data.avatar,
        intro: data.intro
      })

      return {
        roles,
        name: data.name,
        avatar: data.avatar,
        intro: data.intro
      }
    },
    async logOut() {
      try {
        await authService.logout()
      } finally {
        removeToken()
        this.clearSession()
      }
    }
  }
})

export default useUserStore
