/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-19 17:52:23
 * @FilePath: \hycom3.0\src\main.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
import 'normalize.css'
import '@/styles/index.scss'

import App from '@/App.vue'
import { createRootApp } from '@/app/bootstrap/app'
import { registerAppGuards } from '@/app/bootstrap/guards'
import { initializeAppIntegrations } from '@/app/bootstrap/integrations'
import { initializeAppMathJax } from '@/app/bootstrap/mathjax'
import { configureVueApp, registerAppPlugins } from '@/app/bootstrap/plugins'
import store from '@/store'
import { createAppRouter } from '@/router'

initializeAppIntegrations()

const router = createAppRouter()

registerAppGuards(router)
initializeAppMathJax()

const app = createRootApp({
  router,
  store,
  App
})

registerAppPlugins(app)
configureVueApp(app)

app.mount('#app')
