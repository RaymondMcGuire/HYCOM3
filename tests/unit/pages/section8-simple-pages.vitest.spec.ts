import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, CalculationDefinition } from '@/shared/calculations'
import Section81 from '@/views/section8/8.1/index.vue'
import Section82 from '@/views/section8/8.2/index.vue'
import Section83 from '@/views/section8/8.3/index.vue'
import Section84 from '@/views/section8/8.4/index.vue'

const cases = [
  {
    label: 'section8/8.1',
    component: Section81,
    expectedResult: '管道沿程水头损失=402.38'
  },
  {
    label: 'section8/8.2',
    component: Section82,
    expectedResult: '管道沿程水头损失=352.83'
  },
  {
    label: 'section8/8.3',
    component: Section83,
    expectedResult: '管道沿程水头损失=345.73'
  },
  {
    label: 'section8/8.4',
    component: Section84,
    expectedResult: '管道沿程水头损失=365.75'
  }
]

describe('section8 schema pages', () => {
  for (const testCase of cases) {
    it(`keeps ${testCase.label} demo execution stable`, async () => {
      const wrapper = shallowMount(testCase.component)
      const vm = wrapper.vm as {
        definition: CalculationDefinition;
        formState: Record<string, any>;
      }

      applyDemoCase(vm.formState, vm.definition.demoCase)
      const result = await vm.definition.execute({
        input: vm.formState,
        setResult: () => {}
      })

      expect(result).toBe(testCase.expectedResult)
    })
  }
})
