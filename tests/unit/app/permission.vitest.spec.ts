import { describe, expect, it } from 'vitest'
import { hasRequiredRoles } from '@/permission'

describe('permission role checks', () => {
  it('blocks non-admin users from admin-only routes', () => {
    expect(hasRequiredRoles(['admin'], ['developer'])).toBe(false)
  })

  it('allows matching roles and unrestricted routes', () => {
    expect(hasRequiredRoles(['admin'], ['admin'])).toBe(true)
    expect(hasRequiredRoles(undefined, ['developer'])).toBe(true)
  })
})
