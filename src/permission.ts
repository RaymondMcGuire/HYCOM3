/*
 * @Author: Xu.WANG
 * @Date: 2020-08-26 19:35:46
 * @LastEditTime: 2021-05-23 00:33:33
 * @LastEditors: Xu.WANG
 * @Description:
 * @FilePath: \hycom_app\src\permission.ts
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { Router } from 'vue-router'

import { useSessionState } from '@/app/state'
import { uiFeedback } from '@/shared/ui/uiFeedback'
import { getToken } from '@/utils/auth'

const sessionState = useSessionState()
const whiteList = ['/login', '/register']

let permissionGuardsRegistered = false

NProgress.configure({ showSpinner: false })

export function hasRequiredRoles(requiredRoles: string[] | undefined, currentRoles: string[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true
  }

  return requiredRoles.some((role) => currentRoles.includes(role))
}

export function registerPermissionGuards(router: Router) {
  if (permissionGuardsRegistered) {
    return
  }

  router.beforeEach(async (to) => {
    NProgress.start()

    if (getToken()) {
      if (to.path === '/login') {
        return { path: '/' }
      }

      if (sessionState.roles.length === 0) {
        try {
          await sessionState.fetchProfile()
        } catch (error) {
          await sessionState.clearLocalSession()
          uiFeedback.error(String(error || 'Verification failed, please login again'))
          return `/login?redirect=${to.path}`
        }
      }

      const requiredRoles = Array.isArray(to.meta.roles) ? to.meta.roles : []
      if (!hasRequiredRoles(requiredRoles, sessionState.roles)) {
        uiFeedback.error('无权限访问该页面')
        return { path: '/' }
      }

      return true
    }

    if (whiteList.indexOf(to.path) !== -1) {
      return true
    }

    return `/login?redirect=${to.path}`
  })

  router.afterEach(() => {
    NProgress.done()
  })

  permissionGuardsRegistered = true
}
