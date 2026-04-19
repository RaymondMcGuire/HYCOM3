import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section3Routes: RouteRecordRaw[] = [
  {
    path: '/section3',
    component: Layout,
    redirect: '/dashboard',
    name: '水工隧洞水力学计算',
    meta: { title: '水工隧洞水力学计算', icon: 'nested' },
    children: [
      {
        path: '3.1',
        component: () => import(/* webpackChunkName: "3.1" */ '@/views/section3/3.1/index.vue'),
        name: '有压隧洞泄流能力计算',
        meta: { title: '有压隧洞泄流能力计算' },
        children: [
          {
            path: '3.1.1',
            component: () => import(/* webpackChunkName: "3.1.1" */ '@/views/section3/3.1/3.1.1/index.vue'),
            name: '有压管道流量系数计算',
            meta: { title: '有压管道流量系数计算' }
          },
          {
            path: '3.1.2',
            component: () => import(/* webpackChunkName: "3.1.2" */ '@/views/section3/3.1/3.1.2/index.vue'),
            name: '泄流流量计算',
            meta: { title: '泄流流量计算' }
          }
        ]
      },
      {
        path: '3.2',
        component: () => import(/* webpackChunkName: "3.2" */ '@/views/section3/3.2/index.vue'),
        name: '压坡线计算',
        meta: { title: '压坡线计算' }
      },
      {
        path: '3.3',
        component: () => import(/* webpackChunkName: "3.3" */ '@/views/section3/3.3/index.vue'),
        name: '有压短管后接无压隧洞水力学计算',
        meta: { title: '有压短管后接无压隧洞水力学计算' },
        children: [
          {
            path: '3.3.1',
            component: () => import(/* webpackChunkName: "3.3.1" */ '@/views/section3/3.3/3.3.1/index.vue'),
            name: '有压短管流量系数计算',
            meta: { title: '有压短管流量系数计算' }
          },
          {
            path: '3.3.2',
            component: () => import(/* webpackChunkName: "3.3.2" */ '@/views/section3/3.3/3.3.2/index.vue'),
            name: '有压短管流量计算',
            meta: { title: '有压短管流量计算' }
          },
          {
            path: '3.3.3',
            component: () => import(/* webpackChunkName: "3.3.3" */ '@/views/section3/3.3/3.3.3/index.vue'),
            name: '典型有压短管泄流能力计算',
            meta: { title: '典型有压短管泄流能力计算' }
          },
          {
            path: '3.3.4',
            component: () => import(/* webpackChunkName: "3.3.4" */ '@/views/section3/3.3/3.3.4/index.vue'),
            name: '明流洞内水面线计算',
            meta: { title: '明流洞内水面线计算' }
          },
          {
            path: '3.3.5',
            component: () => import(/* webpackChunkName: "3.3.5" */ '@/views/section3/3.3/3.3.5/index.vue'),
            name: '掺气水深计算',
            meta: { title: '掺气水深计算' },
            children: [
              {
                path: '3.3.5.1',
                component: () => import(/* webpackChunkName: "3.3.5.1" */ '@/views/section3/3.3/3.3.5/3.3.5.1/index.vue'),
                name: '柴恭纯方法计算隧洞掺气水深',
                meta: { title: '柴恭纯方法计算隧洞掺气水深' }
              },
              {
                path: '3.3.5.2',
                component: () => import(/* webpackChunkName: "3.3.5.2" */ '@/views/section3/3.3/3.3.5/3.3.5.2/index.vue'),
                name: '霍尔(L.S.Hall)方法计算隧洞掺气水深',
                meta: { title: '霍尔(L.S.Hall)方法计算隧洞掺气水深' }
              },
              {
                path: '3.3.5.3',
                component: () => import(/* webpackChunkName: "3.3.5.3" */ '@/views/section3/3.3/3.3.5/3.3.5.3/index.vue'),
                name: '溢洪道规范方法计算隧洞掺气水深',
                meta: { title: '溢洪道规范方法计算隧洞掺气水深' }
              },
              {
                path: '3.3.5.4',
                component: () => import(/* webpackChunkName: "3.3.5.4" */ '@/views/section3/3.3/3.3.5/3.3.5.4/index.vue'),
                name: '王俊勇方法计算隧洞掺气水深',
                meta: { title: '王俊勇方法计算隧洞掺气水深' }
              }
            ]
          }
        ]
      },
      {
        path: '3.4',
        component: () => import(/* webpackChunkName: "3.4" */ '@/views/section3/3.4/index.vue'),
        name: '高流速水工隧洞沿程水流空化数计算',
        meta: { title: '高流速水工隧洞沿程水流空化数计算' }
      }
    ]
  }
]
