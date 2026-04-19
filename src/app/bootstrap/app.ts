import { createApp, type App as VueApp, type Component } from 'vue'
import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'

type RootAppOptions = {
  router: Router;
  store: Pinia;
  App: Component;
}

export function createRootApp(options: RootAppOptions): VueApp {
  const { router, store, App } = options
  const app = createApp(App)

  app.use(store)
  app.use(router)

  return app
}
