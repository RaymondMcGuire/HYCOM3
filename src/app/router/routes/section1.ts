import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

export const section1Routes: RouteConfig[] = [
  {
    path: '/section1',
    component: Layout,
    redirect: '/dashboard',
    name: '溢洪道水力学计算',
    meta: { title: '溢洪道水力学计算', icon: 'nested' },
    children: [
      {
        path: '1.1',
        component: () => import(/* webpackChunkName: "1.1" */ '@/views/section1/1.1/index.vue'),
        name: '泄流能力计算11',
        meta: { title: '泄流能力计算' },
        children: [
          {
            path: '1.1.1',
            component: () => import(/* webpackChunkName: "1.1.1" */ '@/views/section1/1.1/1.1.1/index.vue'),
            name: '开敞式幂曲线实用堰泄流能力',
            meta: { title: '开敞式幂曲线实用堰泄流能力' }
          },
          {
            path: '1.1.2',
            component: () => import(/* webpackChunkName: "1.1.2" */ '@/views/section1/1.1/1.1.2/index.vue'),
            name: '宽顶堰泄流能力',
            meta: { title: '宽顶堰泄流能力' },
            children: [
              {
                path: '1.1.2.1',
                component: () => import(/* webpackChunkName: "1.1.1.1" */ '@/views/section1/1.1/1.1.2/1.1.2.1/index.vue'),
                name: '闸墩侧收缩系数计算',
                meta: { title: '闸墩侧收缩系数计算' }
              },
              {
                path: '1.1.2.2',
                component: () => import(/* webpackChunkName: "1.1.2.2" */ '@/views/section1/1.1/1.1.2/1.1.2.2/index.vue'),
                name: '泄流能力计算1122',
                meta: { title: '泄流能力计算' }
              }
            ]
          },
          {
            path: '1.1.3',
            component: () => import(/* webpackChunkName: "1.1.3" */ '@/views/section1/1.1/1.1.3/index.vue'),
            name: '驼峰堰泄流能力',
            meta: { title: '驼峰堰泄流能力' }
          },
          {
            path: '1.1.4',
            component: () => import(/* webpackChunkName: "1.1.4" */ '@/views/section1/1.1/1.1.4/index.vue'),
            name: '带胸墙孔口泄流能力(非淹没流、闸门全开)',
            meta: { title: '带胸墙孔口泄流能力(非淹没流、闸门全开)' }
          },
          {
            path: '1.1.5',
            component: () => import(/* webpackChunkName: "1.1.5" */ '@/views/section1/1.1/1.1.5/index.vue'),
            name: '平底带胸墙孔口式闸',
            meta: { title: '平底带胸墙孔口式闸' }
          }
        ]
      },
      {
        path: '1.2',
        component: () => import(/* webpackChunkName: "1.2" */ '@/views/section1/1.2/index.vue'),
        name: '泄槽水面线的计算',
        meta: { title: '泄槽水面线的计算' }
      },
      {
        path: '1.3',
        component: () => import(/* webpackChunkName: "1.3" */ '@/views/section1/1.3/index.vue'),
        name: '挑流消能',
        meta: { title: '挑流消能' },
        children: [
          {
            path: '1.3.1',
            component: () => import(/* webpackChunkName: "1.3.1" */ '@/views/section1/1.3/1.3.1/index.vue'),
            name: '挑流消能挑距计算',
            meta: { title: '挑流消能挑距计算' }
          },
          {
            path: '1.3.2',
            component: () => import(/* webpackChunkName: "1.3.2" */ '@/views/section1/1.3/1.3.2/index.vue'),
            name: '冲刷坑最大水垫深度',
            meta: { title: '冲刷坑最大水垫深度' }
          }
        ]
      },
      {
        path: '1.4',
        component: () => import(/* webpackChunkName: "1.4" */ '@/views/section1/1.4/index.vue'),
        name: '底流消能',
        meta: { title: '底流消能(等宽矩形断面)' },
        children: [
          {
            path: '1.4.1',
            component: () => import(/* webpackChunkName: "1.4.1" */ '@/views/section1/1.4/1.4.1/index.vue'),
            name: '水平光面护坦上的水跃计算',
            meta: { title: '水平光面护坦上的水跃计算' }
          },
          {
            path: '1.4.2',
            component: () => import(/* webpackChunkName: "1.4.2" */ '@/views/section1/1.4/1.4.2/index.vue'),
            name: '下挖式消力池的水跃计算',
            meta: { title: '下挖式消力池的水跃计算' }
          }
        ]
      },
      {
        path: '1.5',
        component: () => import(/* webpackChunkName: "1.5" */ '@/views/section1/1.5/index.vue'),
        name: '溢洪道泄流水流空化数',
        meta: { title: '溢洪道泄流水流空化数' }
      },
      {
        path: '1.6',
        component: () => import(/* webpackChunkName: "1.6" */ '@/views/section1/1.6/index.vue'),
        name: '台阶式泄槽溢洪道水力学计算',
        meta: { title: '台阶式泄槽溢洪道水力学计算' },
        children: [
          {
            path: '1.6.1',
            component: () => import(/* webpackChunkName: "1.6.1" */ '@/views/section1/1.6/1.6.1/index.vue'),
            name: '台阶溢洪道水力计算昌桑计算方法',
            meta: { title: '台阶溢洪道水力计算昌桑计算方法' }
          },
          {
            path: '1.6.2',
            component: () => import(/* webpackChunkName: "1.6.2" */ '@/views/section1/1.6/1.6.2/index.vue'),
            name: '南京水利科学研究院方法计算',
            meta: { title: '南京水利科学研究院方法计算' }
          }
        ]
      }
    ]
  }
]
