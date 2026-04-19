import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section8Routes: RouteRecordRaw[] = [
  {
    path: '/section8',
    component: Layout,
    redirect: '/dashboard',
    name: '城镇供水长距离输水管（渠）道水力学计算',
    meta: { title: '城镇供水长距离输水管（渠）道水力学计算', icon: 'nested' },
    children: [
      {
        path: '8.1',
        component: () => import(/* webpackChunkName: "8.1" */ '@/views/section8/8.1/index.vue'),
        name: '管（渠）道总水头损失',
        meta: { title: '管（渠）道总水头损失' }
      },
      {
        path: '8.2',
        component: () => import(/* webpackChunkName: "8.2" */ '@/views/section8/8.2/index.vue'),
        name: '塑料管管（渠）道沿程水头损失',
        meta: { title: '塑料管管（渠）道沿程水头损失' }
      },
      {
        path: '8.3',
        component: () => import(/* webpackChunkName: "8.3" */ '@/views/section8/8.3/index.vue'),
        name: '混凝土管（渠）及水泥砂浆内衬的金属管道沿程水头损失',
        meta: { title: '混凝土管（渠）及水泥砂浆内衬的金属管道沿程水头损失' }
      },
      {
        path: '8.4',
        component: () => import(/* webpackChunkName: "8.4" */ '@/views/section8/8.4/index.vue'),
        name: '输配水管道和配水管网水力平差计算',
        meta: { title: '输配水管道和配水管网水力平差计算' }
      },
      {
        path: '8.5',
        component: () => import(/* webpackChunkName: "8.5" */ '@/views/section8/8.5/index.vue'),
        name: '管（渠）道局部水头损失',
        meta: { title: '管（渠）道局部水头损失' }
      }
    ]
  }
]
