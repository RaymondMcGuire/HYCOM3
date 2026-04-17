import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section6Routes: RouteConfig[] = [
  {
    path: '/section6',
    component: Layout,
    redirect: '/dashboard',
    name: '渠道水力学计算',
    meta: { title: '渠道水力学计算', icon: 'nested' },
    children: [
      {
        path: '6.1',
        component: () => import(/* webpackChunkName: "6.1" */ '@/views/section6/6.1/index.vue'),
        name: '渠道均匀流水力计算',
        meta: { title: '渠道均匀流水力计算' }
      },
      {
        path: '6.2',
        component: () => import(/* webpackChunkName: "6.2" */ '@/views/section6/6.2/index.vue'),
        name: '渠道非均匀流水面线计算',
        meta: { title: '渠道非均匀流水面线计算' }
      }
    ]
  }
]
