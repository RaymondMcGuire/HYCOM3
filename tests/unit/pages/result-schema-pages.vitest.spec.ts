import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Section162 from '@/views/section1/1.6/1.6.2/index.vue'
import Section34 from '@/views/section3/3.4/index.vue'

describe('result schema migrations', () => {
  it('keeps section1/1.6.2 chart calculator output stable while exposing summary fields', async () => {
    const wrapper = shallowMount(Section162)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, {
      Q: 25.12,
      h: 0.9,
      H_堰: 50,
      H: 1.7,
      b: 8,
      '\\frac{L1}{h}': 12.5
    })

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toEqual(expect.objectContaining({
      L1: '11.2500',
      L2: '14.4677',
      d0: '0.5994',
      v0: '41.9091',
      eta: '0.9470'
    }))
    expect(vm.definition.formatResult(result)).toBe('L1=11.2500; L2=14.4677; d0=0.5994; v0=41.9091; eta=0.9470')
  })

  it('keeps section3/3.4 table calculator output stable while exposing section results', async () => {
    const wrapper = shallowMount(Section34)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, {
      '\\nabla': 1862,
      C: 15
    })
    vm.getDynamicRefs = () => ({
      slkhs: {
        params: [
          { hi: 13.80776, vi: 20.912 },
          { hi: 9.518, vi: 24.27 },
          { hi: 10.003, vi: 23.093 },
          { hi: 10.923, vi: 21.148 }
        ]
      }
    })

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result.sections).toHaveLength(4)
    expect(result.sections[0]).toEqual(expect.objectContaining({
      index: 1,
      sigma: '0.57812',
      conclusion: '不需要设掺气坎'
    }))
    expect(vm.definition.formatResult(result)).toBe('第1断面:水流空化数=0.57812,不需要设掺气坎;第2断面:水流空化数=0.28647,需要设掺气坎;第3断面:水流空化数=0.33424,不需要设掺气坎;第4断面:水流空化数=0.43886,不需要设掺气坎;')
  })
})
