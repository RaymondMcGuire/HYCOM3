import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section5Routes: RouteRecordRaw[] = [
  {
    path: '/section5',
    component: Layout,
    redirect: '/dashboard',
    name: '混凝土重力（拱）坝水力学计算',
    meta: { title: '混凝土重力（拱）坝水力学计算', icon: 'nested' },
    children: [
      {
        path: '5.1',
        component: () => import(/* webpackChunkName: "5.1" */ '@/views/section5/5.1/index.vue'),
        name: '泄流能力计算公式',
        meta: { title: '泄流能力计算公式' },
        children: [
          {
            path: '5.1.1',
            component: () => import(/* webpackChunkName: "5.1.1" */ '@/views/section5/5.1/5.1.1/index.vue'),
            name: '开敞式溢流堰的泄量计算',
            meta: { title: '开敞式溢流堰的泄量计算' }
          },
          {
            path: '5.1.2',
            component: () => import(/* webpackChunkName: "5.1.2" */ '@/views/section5/5.1/5.1.2/index.vue'),
            name: '孔口泄流能力',
            meta: { title: '孔口泄流能力' }
          }
        ]
      },
      {
        path: '5.2',
        component: () => import(/* webpackChunkName: "5.2" */ '@/views/section5/5.2/index.vue'),
        name: '溢流坝面或泄槽水面波动及掺气水深',
        meta: { title: '溢流坝面或泄槽水面波动及掺气水深' }
      },
      {
        path: '5.3',
        component: () => import(/* webpackChunkName: "5.3" */ '@/views/section5/5.3/index.vue'),
        name: '溢流坝挑流消能',
        meta: { title: '溢流坝挑流消能' },
        children: [
          {
            path: '5.3.1',
            component: () => import(/* webpackChunkName: "5.3.1" */ '@/views/section5/5.3/5.3.1/index.vue'),
            name: '挑流水舌外缘挑距及冲坑深度',
            meta: { title: '挑流水舌外缘挑距及冲坑深度' }
          },
          {
            path: '5.3.2',
            component: () => import(/* webpackChunkName: "5.3.2" */ '@/views/section5/5.3/5.3.2/index.vue'),
            name: '拱坝水流向心集中影响挑流冲刷坑深度',
            meta: { title: '拱坝水流向心集中影响挑流冲刷坑深度' }
          }
        ]
      },
      {
        path: '5.4',
        component: () => import(/* webpackChunkName: "5.4" */ '@/views/section5/5.4/index.vue'),
        name: '拱坝跌流消能',
        meta: { title: '拱坝跌流消能' },
        children: [
          {
            path: '5.4.1',
            component: () => import(/* webpackChunkName: "5.4.1" */ '@/views/section5/5.4/5.4.1/index.vue'),
            name: '跌流射距估算',
            meta: { title: '跌流射距估算' }
          },
          {
            path: '5.4.2',
            component: () => import(/* webpackChunkName: "5.4.2" */ '@/views/section5/5.4/5.4.2/index.vue'),
            name: '水舌落水点上游水垫深度估算',
            meta: { title: '水舌落水点上游水垫深度估算' }
          },
          {
            path: '5.4.3',
            component: () => import(/* webpackChunkName: "5.4.3" */ '@/views/section5/5.4/5.4.3/index.vue'),
            name: '护坦的冲击流速',
            meta: { title: '护坦的冲击流速' }
          },
          {
            path: '5.4.4',
            component: () => import(/* webpackChunkName: "5.4.4" */ '@/views/section5/5.4/5.4.4/index.vue'),
            name: '护坦上的动水压力',
            meta: { title: '护坦上的动水压力' }
          },
          {
            path: '5.4.5',
            component: () => import(/* webpackChunkName: "5.4.5" */ '@/views/section5/5.4/5.4.5/index.vue'),
            name: '下游无护坦的最大冲坑水垫深度',
            meta: { title: '下游无护坦的最大冲坑水垫深度' }
          }
        ]
      },
      {
        path: '5.5',
        component: () => import(/* webpackChunkName: "5.5" */ '@/views/section5/5.5/index.vue'),
        name: '溢流坝消力池护坦长度计算',
        meta: { title: '溢流坝消力池护坦长度计算' }
      },
      {
        path: '5.6',
        component: () => import(/* webpackChunkName: "5.6" */ '@/views/section5/5.6/index.vue'),
        name: '溢流坝水流空化数计算',
        meta: { title: '溢流坝水流空化数计算' }
      }
    ]
  }
]
