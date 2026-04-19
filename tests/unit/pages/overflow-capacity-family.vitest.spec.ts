import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, CalculationDefinition } from '@/shared/calculations'
import Section1121 from '@/views/section1/1.1/1.1.2/1.1.2.1/index.vue'
import Section1122 from '@/views/section1/1.1/1.1.2/1.1.2.2/index.vue'
import Section113 from '@/views/section1/1.1/1.1.3/index.vue'
import Section114 from '@/views/section1/1.1/1.1.4/index.vue'
import Section115 from '@/views/section1/1.1/1.1.5/index.vue'

const cases = [
  {
    label: 'section1/1.1/1.1.2/1.1.2.1',
    component: Section1121,
    expectedResult: '侧收缩系数 ε :0.98447'
  },
  {
    label: 'section1/1.1/1.1.2/1.1.2.2',
    component: Section1122,
    expectedResult: '流量系数m:0.37356|泄流能力Q:432.01019|侧收缩系数ε:0.98447'
  },
  {
    label: 'section1/1.1/1.1.3',
    component: Section113,
    expectedResult: '流量系数m:0.43|流量Q:458.63'
  },
  {
    label: 'section1/1.1/1.1.4',
    component: Section114,
    expectedResult: '泄流量Q=4213.54; 孔口自由出流流量系数μ=0.771'
  },
  {
    label: 'section1/1.1/1.1.5',
    component: Section115,
    expectedResult: '泄流量Q=1308.25'
  }
]

describe('chapter1 overflow-capacity family migrations', () => {
  for (const testCase of cases) {
    it(`keeps ${testCase.label} demo execution stable`, async () => {
      const wrapper = shallowMount(testCase.component)
      const vm = wrapper.vm as {
        definition: CalculationDefinition<Record<string, any>, any>;
        formState: Record<string, any>;
      }

      applyDemoCase(vm.formState, vm.definition.demoCase)
      const result = await vm.definition.execute({
        input: vm.formState,
        setResult: () => {}
      })

      expect(vm.definition.formatResult?.(result)).toBe(testCase.expectedResult)
    })
  }
})
