/*
 * @Author: Xu.WANG
 * @Date: 2020-08-26 19:35:46
 * @LastEditTime: 2022-06-11 22:25:19
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @Description:
 * @FilePath: \hycom_app\src\store\modules\user.ts
 */
import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators'
import { authService } from '@/services/authService'
import { getToken, removeToken } from '@/utils/auth'
import store from '@/store'

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';
  public name = '';
  public avatar = '';
  public roles = [];
  public intro = '';

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken()
    return ''
  }

  @MutationAction({ mutate: ['roles', 'name', 'avatar', 'intro'] })
  public async GetUserInfo() {
    const token = getToken()
    if (token === null) {
      throw Error('GetUserInfo: token is undefined!')
    }

    const data = authService.getProfileByToken(token)
    const roles = [data.role]
    if (roles.length > 0) {
      return {
        roles,
        name: data.name,
        avatar: data.avatar,
        intro: data.intro
      }
    } else {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  public async LogOut() {
    if (getToken() === null) {
      throw Error('LogOut: token is undefined!')
    }
    await authService.logout()
    removeToken()
    return {
      token: '',
      roles: []
    }
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }
}

export const UserModule = getModule(User)
