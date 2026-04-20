import { initializeLeanCloud } from '@/integrations/leancloud/client'

let integrationsInitialized = false

export function initializeAppIntegrations() {
  if (integrationsInitialized) {
    return
  }

  try {
    initializeLeanCloud()
  } catch (error) {
    console.warn('LeanCloud bootstrap skipped:', error)
  }

  integrationsInitialized = true
}
