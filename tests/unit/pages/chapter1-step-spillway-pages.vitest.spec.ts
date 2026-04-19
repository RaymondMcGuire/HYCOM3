import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition } from '@/shared/calculations'
import Section161 from '@/views/section1/1.6/1.6.1/index.vue'
import Section162 from '@/views/section1/1.6/1.6.2/index.vue'

describe('chapter1 step spillway migrations', () => {
  it('keeps 1.6.1 demo execution stable', async () => {
    const wrapper = shallowMount(Section161)
    const vm = wrapper.vm as {
      definition: CalculationDefinition<Record<string, any>, any>;
      formState: Record<string, any>;
    }

    applyDemoCase(vm.formState, vm.definition.demoCase)
    applyDerivedFieldRules(vm.formState, vm.definition.derivedFields)
    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(vm.definition.formatResult?.(result)).toBe(
      'L1=34.5300; d1=1.1618; v=6.5416; L2=68.9496; d0=1.2269; v0=6.1945'
    )
  })

  it('keeps 1.6.2 demo execution stable', async () => {
    const wrapper = shallowMount(Section162)
    const vm = wrapper.vm as {
      definition: CalculationDefinition<Record<string, any>, any>;
      formState: Record<string, any>;
    }

    applyDemoCase(vm.formState, vm.definition.demoCase)
    applyDerivedFieldRules(vm.formState, vm.definition.derivedFields)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(vm.definition.formatResult?.(result)).toBe(
      'L1=9.8095; L2=14.4677; d0=0.5994; v0=41.9091; eta=0.9470'
    )
  })
})
