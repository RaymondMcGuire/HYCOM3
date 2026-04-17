/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-19 17:52:23
 * @FilePath: \hycom3.0\src\main.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'
import '@/icons/components'
import '@/permission'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import MathJax, { initMathJax, renderByMathjax } from '@/plugins/mathjax'
import AV from 'leancloud-storage'
AV.init({
  // serverURLs:'https://avoscloud.com',
  // appId: 'vXHukUzIVdJ2vokL1Vm8cqv2-MdYXbMMI',
  // appKey: 'SbIy6cVycia7S8iOt8AY70i0'
  appId: 'MCpP0K0Apfobt7aP07WmqjLR-gzGzoHsz',
  appKey: '1fdT0oaT8EPwwhxp71ggRS19'
})

function onMathJaxReady() {
  const el = document.getElementById('app')
  renderByMathjax(el)
}

const options = {
  enableMenu: false
}

initMathJax({ options }, onMathJaxReady)

Vue.use(MathJax)
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
