import { initializeLeanCloud } from '@/integrations/leancloud/client'

let integrationsInitialized = false

export function initializeAppIntegrations() {
  if (integrationsInitialized) {
    return
  }

  initializeLeanCloud()
  integrationsInitialized = true
}
