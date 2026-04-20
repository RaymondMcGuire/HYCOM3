import { h } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const ExternalRedirect = {
  name: 'ExternalRedirect',
  render() {
    return h('div')
  }
}

export const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'hycom3.0',
    meta: { hidden: true },
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
      },
      {
        path: 'contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/contact/index.vue')
      },
      {
        path: 'guide',
        component: ExternalRedirect,
        beforeEnter() {
          location.href = 'https://raymondmcguire.gitee.io/hycom/guide/'
          return false
        }
      },
      {
        path: 'admin_panel',
        component: () => import(/* webpackChunkName: "admin_panel" */ '@/views/admin_panel/index.vue'),
        meta: {
          roles: ['admin']
        }
      }
    ]
  }
]

export const fallbackRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  meta: { hidden: true }
}
