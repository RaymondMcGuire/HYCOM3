import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition } from '@/shared/calculations'
import Section131 from '@/views/section1/1.3/1.3.1/index.vue'
import Section132 from '@/views/section1/1.3/1.3.2/index.vue'
import Section141 from '@/views/section1/1.4/1.4.1/index.vue'
import Section142 from '@/views/section1/1.4/1.4.2/index.vue'

const cases = [
  {
    label: 'section1/1.3/1.3.1',
    component: Section131,
    expectedResult: 'PMF洪水下挑距=333.65'
  },
  {
    label: 'section1/1.3/1.3.2',
    component: Section132,
    expectedResult: '冲坑深度=53.61'
  },
  {
    label: 'section1/1.4/1.4.1',
    component: Section141,
    expectedResult: '水跃长度=172.46'
  },
  {
    label: 'section1/1.4/1.4.2',
    component: Section142,
    expectedResult: '池深:8.90|池长:137.97'
  }
]

describe('chapter1 energy dissipation family migrations', () => {
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
