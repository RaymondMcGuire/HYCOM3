import { describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

vi.mock('@/components/MavEditor/MavEditor.vue', () => ({
  default: {
    name: 'MavEditor',
    render(h: any) {
      return h('div', { class: 'mav-editor-stub' })
    }
  }
}))

import { CalculationDefinition } from '@/shared/calculations'
import Section111 from '@/views/section1/1.1/1.1.1/index.vue'

describe('report schema migrations', () => {
  it('keeps section1/1.1.1 report calculator output stable while updating the report body', async () => {
    const wrapper = shallowMount(Section111, {
      stubs: {
        'math-jax': true
      }
    })
    const vm = wrapper.vm as {
      definition: CalculationDefinition<Record<string, any>, any>;
      formState: Record<string, any>;
      mavEditorConfig: { value: string };
      lookupValues: { H0: number; m: number; C: number } | null;
    }

    await wrapper.setData({
      formState: {
        n: 4,
        b: 15,
        P_1: 19,
        H_d: 20,
        H: 24,
        v_0: 3,
        '\\varepsilon': 0.88,
        '\\sigma_m': 1.0,
        __slope: '1'
      }
    })

    expect(vm.formState.P_1).toBe(19)
    expect(vm.lookupValues?.H0).toBeCloseTo(24.4591836735, 6)
    expect(vm.lookupValues?.m).toBeCloseTo(0.5055554847, 6)
    expect(vm.lookupValues?.C).toBeCloseTo(0.99975, 6)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toEqual(expect.objectContaining({
      Q: '14291.74',
      H0: '24.459',
      C: '1.000',
      m: '0.506'
    }))
    expect(vm.definition.formatResult?.(result)).toBe('PMF下泄量Q=14291.74')
    expect(vm.mavEditorConfig.value).toContain('PMF工况下泄量 $Q=14291.74 m^3/s$,满足要求')

    vm.mavEditorConfig.value = '<p>手动改过的计算书</p>'

    await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(vm.mavEditorConfig.value).toContain('PMF工况下泄量 $Q=14291.74 m^3/s$,满足要求')
    expect(vm.mavEditorConfig.value).not.toContain('手动改过的计算书')
  })
})
