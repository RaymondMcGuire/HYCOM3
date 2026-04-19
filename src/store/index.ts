import { createPinia } from 'pinia'
import type { IAppState } from '@/store/modules/app'
import type { IUserState } from '@/store/modules/user'

export interface IRootState {
  app: IAppState;
  user: IUserState;
}

const store = createPinia()

export default store
