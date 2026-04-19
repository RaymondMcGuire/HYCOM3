import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Section3351 from '@/views/section3/3.3/3.3.5/3.3.5.1/index.vue'
import Section3352 from '@/views/section3/3.3/3.3.5/3.3.5.2/index.vue'
import Section3353 from '@/views/section3/3.3/3.3.5/3.3.5.3/index.vue'
import Section3354 from '@/views/section3/3.3/3.3.5/3.3.5.4/index.vue'

const commonThreeFieldParams = [
  { hi: 10.054, bi: 8, vi: 28.72 },
  { hi: 6.515, bi: 10, vi: 35.4566 },
  { hi: 7, bi: 10, vi: 33 },
  { hi: 7.92, bi: 10, vi: 29.1667 }
]

const commonTwoFieldParams = [
  { hi: 10.054, vi: 28.72 },
  { hi: 6.515, vi: 35.4566 },
  { hi: 7, vi: 33 },
  { hi: 7.92, vi: 29.1667 }
]

describe('section3/3.3.5 aeration method migrations', () => {
  it('keeps 3.3.5.1 output stable', async () => {
    const wrapper = shallowMount(Section3351)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, { '\\delta': 0.02 })
    vm.dynamicItems = commonThreeFieldParams

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result.sections).toHaveLength(4)
    expect(vm.definition.formatResult(result)).toBe('第1断面:公式不合适;第2断面:公式不合适;第3断面:公式不合适;第4断面:公式不合适;')
  })

  it('keeps 3.3.5.2 output stable', async () => {
    const wrapper = shallowMount(Section3352)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, { K: 0.005 })
    vm.dynamicItems = commonThreeFieldParams

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result.sections[1]).toEqual(expect.objectContaining({
      index: 2,
      value: '7.99218'
    }))
    expect(vm.definition.formatResult(result)).toBe('第1断面:公式不合适;第2断面:掺气水深=7.99218;第3断面:掺气水深=8.33347;第4断面:公式不合适;')
  })

  it('keeps 3.3.5.3 output stable', async () => {
    const wrapper = shallowMount(Section3353)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, { '\\zeta': 1.3 })
    vm.dynamicItems = commonTwoFieldParams

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result.sections[0]).toEqual(expect.objectContaining({
      index: 1,
      value: '13.80776'
    }))
    expect(vm.definition.formatResult(result)).toBe('第1断面:掺气水深=13.80776;第2断面:掺气水深=9.51800;第3断面:掺气水深=10.00300;第4断面:掺气水深=10.92300;')
  })

  it('keeps 3.3.5.4 output stable', async () => {
    const wrapper = shallowMount(Section3354)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, { n_z: 0.014 })
    vm.dynamicItems = commonThreeFieldParams

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result.sections[0]).toEqual(expect.objectContaining({
      index: 1,
      value: '10.58946'
    }))
    expect(vm.definition.formatResult(result)).toBe('第1断面:掺气水深=10.58946;第2断面:公式不合适;第3断面:公式不合适;第4断面:掺气水深=8.65013;')
  })
})
