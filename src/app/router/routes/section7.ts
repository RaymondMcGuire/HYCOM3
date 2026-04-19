import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section7Routes: RouteRecordRaw[] = [
  {
    path: '/section7',
    component: Layout,
    redirect: '/dashboard',
    name: '水电站（含抽蓄）压力管道水力学计算',
    meta: { title: '水电站（含抽蓄）压力管道水力学计算', icon: 'nested' },
    children: [
      {
        path: '7.1',
        component: () => import(/* webpackChunkName: "7.1" */ '@/views/section7/7.1/index.vue'),
        name: '经济管径计算',
        meta: { title: '经济管径计算' }
      },
      {
        path: '7.2',
        component: () => import(/* webpackChunkName: "7.2" */ '@/views/section7/7.2/index.vue'),
        name: '水头损失计算',
        meta: { title: '水头损失计算' }
      },
      {
        path: '7.3',
        component: () => import(/* webpackChunkName: "7.3" */ '@/views/section7/7.3/index.vue'),
        name: '水锤计算',
        meta: { title: '水锤计算' },
        children: [
          {
            path: '7.3.1',
            component: () => import(/* webpackChunkName: "7.3.1" */ '@/views/section7/7.3/7.3.1/index.vue'),
            name: '水锤波速计算',
            meta: { title: '水锤波速计算' }
          },
          {
            path: '7.3.2',
            component: () => import(/* webpackChunkName: "7.3.2" */ '@/views/section7/7.3/7.3.2/index.vue'),
            name: '管道的特征系数计算',
            meta: { title: '管道的特征系数计算' }
          },
          {
            path: '7.3.3',
            component: () => import(/* webpackChunkName: "7.3.3" */ '@/views/section7/7.3/7.3.3/index.vue'),
            name: '水锤的特性参数计算',
            meta: { title: '水锤的特性参数计算' }
          },
          {
            path: '7.3.4',
            component: () => import(/* webpackChunkName: "7.3.4" */ '@/views/section7/7.3/7.3.4/index.vue'),
            name: '直接水锤和间接水锤计算',
            meta: { title: '直接水锤和间接水锤计算' }
          },
          {
            path: '7.3.5',
            component: () => import(/* webpackChunkName: "7.3.5" */ '@/views/section7/7.3/7.3.5/index.vue'),
            name: '直接水锤计算',
            meta: { title: '直接水锤计算' }
          },
          {
            path: '7.3.6',
            component: () => import(/* webpackChunkName: "7.3.6" */ '@/views/section7/7.3/7.3.6/index.vue'),
            name: '间接水锤计算',
            meta: { title: '间接水锤计算' }
          }
        ]
      }
    ]
  }
]
