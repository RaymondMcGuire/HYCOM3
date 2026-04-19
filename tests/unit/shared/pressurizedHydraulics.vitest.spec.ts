import { describe, expect, it } from 'vitest'
import { pressurizedHydraulicParamComponents } from '@/shared/components/pressurizedHydraulics'

describe('shared/components/pressurizedHydraulics', () => {
  it('exposes the dynamic hydraulic parameter component registry', () => {
    expect(Object.keys(pressurizedHydraulicParamComponents)).toHaveLength(22)
    expect(pressurizedHydraulicParamComponents).toHaveProperty('DynamicJskSelectParams')
    expect(pressurizedHydraulicParamComponents).toHaveProperty('DynamicJkjbdParams')
    expect(pressurizedHydraulicParamComponents).toHaveProperty('DynamicCkjbdParams')
    expect(pressurizedHydraulicParamComponents).toHaveProperty('DynamicDsdParams')
  })
})
