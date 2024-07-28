/* eslint-disable no-console */

import { register } from 'register-service-worker'

// 只在生产环境且不是Electron应用时注册Service Worker
if (process.env.NODE_ENV === 'production' && !process.env.IS_ELECTRON) {
  register(`/service-worker.js`, {
    // Service Worker已经准备就绪
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    // Service Worker注册成功
    registered() {
      console.log('Service worker has been registered.')
    },
    // 内容已被缓存以供离线使用
    cached() {
      console.log('Content has been cached for offline use.')
    },
    // 发现新内容可用
    updatefound() {
      console.log('New content is downloading.')
    },
    // 新内容已经可用，需要刷新页面
    updated() {
      console.log('New content is available; please refresh.')
    },
    // 应用处于离线模式
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    // 注册过程中发生错误
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
