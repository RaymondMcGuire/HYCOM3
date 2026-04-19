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
      const token = getToken() || this.token
      if (!token) {
        throw Error('GetUserInfo: token is undefined!')
      }

      const data = authService.getProfileByToken(token)
      const roles = [data.role]
      if (roles.length === 0) {
        throw Error('GetUserInfo: roles must be a non-null array!')
      }

      this.setToken(token)
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
      if (getToken() === null) {
        throw Error('LogOut: token is undefined!')
      }

      await authService.logout()
      this.clearSession()
    }
  }
})

export default useUserStore
