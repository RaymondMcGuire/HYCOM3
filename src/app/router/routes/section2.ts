import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section2Routes: RouteConfig[] = [
  {
    path: '/section2/2.2',
    component: Layout,
    redirect: '/dashboard',
    name: '侧槽溢洪道水力学计算',
    meta: { title: '侧槽溢洪道水力学计算', icon: 'nested' },
    children: [
      {
        path: '2.1',
        component: () => import(/* webpackChunkName: "2.1" */ '@/views/section2/2.1/index.vue'),
        name: '侧槽断溢流前缘的总长度计算',
        meta: { title: '侧槽断溢流前缘的总长度计算' }
      },
      {
        path: '2.2',
        component: () => import(/* webpackChunkName: "2.2" */ '@/views/section2/2.2/index.vue'),
        name: '侧槽断水面线的计算',
        meta: { title: '侧槽断水面线的计算' }
      }
    ]
  }
]
