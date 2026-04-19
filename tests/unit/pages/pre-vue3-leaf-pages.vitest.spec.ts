import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition } from '@/shared/calculations'
import Section21 from '@/views/section2/2.1/index.vue'
import Section22 from '@/views/section2/2.2/index.vue'
import Section312 from '@/views/section3/3.1/3.1.2/index.vue'
import Section332 from '@/views/section3/3.3/3.3.2/index.vue'
import Section333 from '@/views/section3/3.3/3.3.3/index.vue'
import Section334 from '@/views/section3/3.3/3.3.4/index.vue'
import Section41 from '@/views/section4/4.1/index.vue'
import Section42 from '@/views/section4/4.2/index.vue'
import Section61 from '@/views/section6/6.1/index.vue'
import Section62 from '@/views/section6/6.2/index.vue'
import Section71 from '@/views/section7/7.1/index.vue'
import Section731 from '@/views/section7/7.3/7.3.1/index.vue'
import Section732 from '@/views/section7/7.3/7.3.2/index.vue'
import Section733 from '@/views/section7/7.3/7.3.3/index.vue'
import Section734 from '@/views/section7/7.3/7.3.4/index.vue'
import Section735 from '@/views/section7/7.3/7.3.5/index.vue'
import Section736 from '@/views/section7/7.3/7.3.6/index.vue'

const cases = [
  { label: 'section2/2.1', component: Section21, expectedResult: '侧槽溢洪道前沿长=64.36' },
  { label: 'section2/2.2', component: Section22, expectedResult: 'h1=5.4875|h2=6.0868|h3=6.5021|h4=6.7833|h5=6.7759|' },
  { label: 'section3/3.1.2', component: Section312, expectedResult: '泄流量=1445.12' },
  { label: 'section3/3.3.2', component: Section332, expectedResult: '泄量=2227.90|出口断面流速=27.70' },
  { label: 'section3/3.3.3', component: Section333, expectedResult: '流量:2304.20|出口断面流速:29.07' },
  { label: 'section3/3.3.4', component: Section334, expectedResult: 'h1:6.51|h2:7.92' },
  { label: 'section4/4.1', component: Section41, expectedResult: '泄量=1064.514' },
  { label: 'section4/4.2', component: Section42, expectedResult: '泄量=1055.800' },
  { label: 'section6/6.1', component: Section61, expectedResult: '水深:2.16|流速:2.31' },
  { label: 'section6/6.2', component: Section62, expectedResult: '缓流a1型壅水曲线|h1=8.950|h2=8.781|h3=8.615|h4=8.451|h5=8.287|h6=8.127|h7=7.968|' },
  { label: 'section7/7.1', component: Section71, expectedResult: '管道直径=11.59' },
  { label: 'section7/7.3.1', component: Section731, expectedResult: '水锤波速=649.18' },
  { label: 'section7/7.3.2', component: Section732, expectedResult: '管道特征系数=2.4028' },
  { label: 'section7/7.3.3', component: Section733, expectedResult: '水锤特征系数=0.2187' },
  { label: 'section7/7.3.4', component: Section734, expectedResult: '间接水锤; tr=1.001211533801793' },
  { label: 'section7/7.3.5', component: Section735, expectedResult: '水锤压力=352.73' },
  { label: 'section7/7.3.6', component: Section736, expectedResult: '正水锤:41.09|负水锤:26.34' }
]

describe('pre-vue3 migrated leaf pages', () => {
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
