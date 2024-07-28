/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-07 02:20:24
 * @FilePath: \hycom3.0\src\router.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
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
      children: [{
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
      },
      {
        path: 'contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/contact/index.vue')
      },
      {
        path: 'guide',
        beforeEnter() { location.href = 'https://raymondmcguire.gitee.io/hycom/guide/' }
      },
      {
        path: 'admin_panel',
        component: () => import(/* webpackChunkName: "admin_panel" */ '@/views/admin_panel/index.vue')
      }]
    },
    {
      path: '/section1',
      component: Layout,
      redirect: '/section1/1.1',
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
            // {
            //   path: '1.1.2.x',
            //   component: () => import(/* webpackChunkName: "1.1.2.x" */ '@/views/section1/1.1/1.1.2.x/index.vue'),
            //   name: '单孔和多孔侧收缩系数计算',
            //   meta: { title: '单孔和多孔侧收缩系数计算' },
            //   children: [
            //     {
            //       path: '1.1.2.1',
            //       component: () => import(/* webpackChunkName: "1.1.1.1" */ '@/views/section1/1.1/1.1.2.x/1.1.2.1/index.vue'),
            //       name: '单孔侧收缩系数',
            //       meta: { title: '单孔侧收缩系数' }
            //     },
            //     {
            //       path: '1.1.2.2',
            //       component: () => import(/* webpackChunkName: "1.1.2.2" */ '@/views/section1/1.1/1.1.2.x/1.1.2.2/index.vue'),
            //       name: '多孔侧收缩系数',
            //       meta: { title: '多孔侧收缩系数' }
            //     }
            //   ]
            // },
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
    },
    {
      path: '/section2/2.2',
      component: Layout,
      redirect: '/section2',
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
    },
    {
      path: '/section3',
      component: Layout,
      redirect: '/section3',
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
                }]
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
    },
    {
      path: '/section4',
      component: Layout,
      redirect: '/section4',
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
    },
    {
      path: '/section5',
      component: Layout,
      redirect: '/section5',
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
    },
    {
      path: '/section6',
      component: Layout,
      redirect: '/section6',
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
    },
    {
      path: '/section7',
      component: Layout,
      redirect: '/section7',
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
            }, {
              path: '7.3.2',
              component: () => import(/* webpackChunkName: "7.3.2" */ '@/views/section7/7.3/7.3.2/index.vue'),
              name: '管道的特征系数计算',
              meta: { title: '管道的特征系数计算' }
            }, {
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
            }, {
              path: '7.3.5',
              component: () => import(/* webpackChunkName: "7.3.5" */ '@/views/section7/7.3/7.3.5/index.vue'),
              name: '直接水锤计算',
              meta: { title: '直接水锤计算' }
            }, {
              path: '7.3.6',
              component: () => import(/* webpackChunkName: "7.3.6" */ '@/views/section7/7.3/7.3.6/index.vue'),
              name: '间接水锤计算',
              meta: { title: '间接水锤计算' }
            }
          ]
        }
      ]
    },
    {
      path: '/section8',
      component: Layout,
      redirect: '/section8',
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
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
