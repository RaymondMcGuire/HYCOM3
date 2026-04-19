import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition } from '@/shared/calculations'
import Section12 from '@/views/section1/1.2/index.vue'
import Section15 from '@/views/section1/1.5/index.vue'

const cases = [
  {
    label: 'section1/1.2',
    component: Section12,
    expectedResult: 'h1=16.153|h2=11.167|h3=9.438|h4=8.443|h5=7.782|'
  },
  {
    label: 'section1/1.5',
    component: Section15,
    expectedResult: '断面1:水流空化数=1.02;不需要设掺气坎|断面2:水流空化数=0.35;不需要设掺气坎|断面3:水流空化数=0.21;需要设掺气坎|'
  }
]

describe('chapter1 surface line family migrations', () => {
  for (const testCase of cases) {
    it(`keeps ${testCase.label} demo execution stable`, async () => {
      const wrapper = shallowMount(testCase.component)
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

      expect(vm.definition.formatResult?.(result)).toBe(testCase.expectedResult)
    })
  }
})
