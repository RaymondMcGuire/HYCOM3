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
import { routes } from '@/app/router/routes'

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
  routes
})
