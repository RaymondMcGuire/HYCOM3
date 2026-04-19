import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition } from '@/shared/calculations'
import Section511 from '@/views/section5/5.1/5.1.1/index.vue'
import Section512 from '@/views/section5/5.1/5.1.2/index.vue'
import Section52 from '@/views/section5/5.2/index.vue'
import Section531 from '@/views/section5/5.3/5.3.1/index.vue'
import Section532 from '@/views/section5/5.3/5.3.2/index.vue'
import Section541 from '@/views/section5/5.4/5.4.1/index.vue'
import Section542 from '@/views/section5/5.4/5.4.2/index.vue'
import Section543 from '@/views/section5/5.4/5.4.3/index.vue'
import Section544 from '@/views/section5/5.4/5.4.4/index.vue'
import Section545 from '@/views/section5/5.4/5.4.5/index.vue'
import Section55 from '@/views/section5/5.5/index.vue'
import Section56 from '@/views/section5/5.6/index.vue'

const cases = [
  {
    label: 'section5/5.1.1',
    component: Section511,
    expectedResult: '泄量=3978.22'
  },
  {
    label: 'section5/5.1.2',
    component: Section512,
    expectedResult: '流量: 2448.33| 出口流速: 37.10| 流量系数: 0.87'
  },
  {
    label: 'section5/5.2',
    component: Section52,
    expectedResult: '掺气水深=17.3688'
  },
  {
    label: 'section5/5.3.1',
    component: Section531,
    expectedResult: '挑距:333.65|冲坑深度:68.26'
  },
  {
    label: 'section5/5.3.2',
    component: Section532,
    expectedResult: '冲坑深度:25.57'
  },
  {
    label: 'section5/5.4.1',
    component: Section541,
    expectedResult: '左表孔挑射距=77.80'
  },
  {
    label: 'section5/5.4.2',
    component: Section542,
    expectedResult: '水垫深度=28.75'
  },
  {
    label: 'section5/5.4.3',
    component: Section543,
    expectedResult: '冲击流速=17.4870, 水舌入射角=113.2671'
  },
  {
    label: 'section5/5.4.4',
    component: Section544,
    expectedResult: '左表孔射流跌落冲击底板动水压力=128.83'
  },
  {
    label: 'section5/5.4.5',
    component: Section545,
    expectedResult: '自下游水面至坑底最大水垫深度=42.77'
  },
  {
    label: 'section5/5.5',
    component: Section55,
    expectedResult: '不设辅助消能工:L=165.00, Fr=4.58, h1=4.79, h2=28.70; 不设消力墩,设梳流坎和尾坎:L=107.63, Fr=4.58, h1=4.79, h2=28.70; '
  }
]

describe('section5 simple schema pages', () => {
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

  it('keeps section5/5.6 demo execution stable', async () => {
    const wrapper = shallowMount(Section56)
    const vm = wrapper.vm as {
      definition: CalculationDefinition<Record<string, any>, any>;
      formState: Record<string, any>;
      beforeOnDemo: () => void;
      getDynamicRefs: () => Record<string, any>;
    }

    const slkhsRef = {
      params: [] as Array<{ hi: number; vi: number }>,
      removeAllField() {
        this.params = []
      },
      addFieldWithData(hi: number, vi: number) {
        this.params.push({ hi, vi })
      }
    }

    vm.getDynamicRefs = () => ({ slkhs: slkhsRef })

    applyDemoCase(vm.formState, vm.definition.demoCase)
    applyDerivedFieldRules(vm.formState, vm.definition.derivedFields)
    vm.beforeOnDemo()

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(vm.definition.formatResult?.(result)).toBe(
      '第1断面:水流空化数=0.86417;第2断面:水流空化数=0.71879;'
    )
  })
})
