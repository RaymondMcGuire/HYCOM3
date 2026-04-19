import type { Router } from 'vue-router'

import { registerPermissionGuards } from '@/permission'

export function registerAppGuards(router: Router) {
  registerPermissionGuards(router)
}
