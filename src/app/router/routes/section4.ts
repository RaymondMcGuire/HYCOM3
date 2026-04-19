import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section4Routes: RouteRecordRaw[] = [
  {
    path: '/section4',
    component: Layout,
    redirect: '/dashboard',
    name: '竖井式泄洪洞水力学计算',
    meta: { title: '竖井式泄洪洞水力学计算', icon: 'nested' },
    children: [
      {
        path: '4.1',
        component: () => import(/* webpackChunkName: "4.1" */ '@/views/section4/4.1/index.vue'),
        name: '环形堰竖井泄洪洞泄流能力计算',
        meta: { title: '环形堰竖井泄洪洞泄流能力计算' }
      },
      {
        path: '4.2',
        component: () => import(/* webpackChunkName: "4.2" */ '@/views/section4/4.2/index.vue'),
        name: '涡流竖井泄洪洞',
        meta: { title: '涡流竖井泄洪洞' }
      }
    ]
  }
]
