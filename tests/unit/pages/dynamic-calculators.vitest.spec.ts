import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { isReactive, reactive } from 'vue'
import Section311 from '@/views/section3/3.1/3.1.1/index.vue'
import Section32 from '@/views/section3/3.2/index.vue'
import Section331 from '@/views/section3/3.3/3.3.1/index.vue'
import Section72 from '@/views/section7/7.2/index.vue'
import {
  pressureLineSections,
  pressurizedTunnelLossSections,
  shortPipeSections
} from '@/shared/components/pressurizedHydraulics/sections'

function buildPressurizedTunnelFixture() {
  return {
    formState: {
      A_k: 54.4,
      n_z: 0.014
    },
    dynamicData: {
      jsk: [{ value: 0.1, B: 4.8, H: 8, d: 0, n: 2, shape: 0 }],
      jklws: [],
      jkmc: [{ value: 0.15, B: 4.8, H: 8, d: 0, n: 2, shape: 0 }],
      ckmc: [],
      jxbyxjsg: [{ value: 0.05, B: 12.4, H: 8, d: 9 }],
      yxbjxjsg: [{ value: 0.1, B: 8, H: 6.8, d: 9 }],
      hxgzm: [],
      yxhwg: [
        { D: 9, R: 50, Theta: 22 },
        { D: 9, R: 50, Theta: 22 }
      ],
      yxjwg: [],
      csklrsk: [],
      csklrmq: [],
      yxjkd: [],
      yxjsd: [],
      dmtk: [],
      dmts: [],
      pbm: [],
      jkd: [{ l: 13.5, B: 12.4, H: 8, d: 0, shape: 0 }],
      jkjbd: [{ l: 20, B: 12.4, H: 8, d: 9 }],
      ckjbd: [{ l: 22, B: 8, H: 6.8, d: 9 }],
      dsd: [{ l: 331.2, B: 0, H: 0, d: 9, shape: 1 }]
    }
  }
}

const pressurizedTunnelParams = buildPressurizedTunnelFixture().dynamicData

const shortPipeDynamicData = {
  jsk: [{ value: 0.1, B: 8, H: 17.118, d: 0, n: 1, shape: 0 }],
  jkmc: [
    { value: 0.1, B: 8, H: 13.6, d: 0, n: 1, shape: 0 },
    { value: 0.1, B: 8, H: 11, d: 0, n: 1, shape: 0 }
  ]
}

const pressureLineDynamicData = {
  jsk: pressurizedTunnelParams.jsk,
  jkmc: pressurizedTunnelParams.jkmc,
  jxbyxjsg: pressurizedTunnelParams.jxbyxjsg,
  yxhwg: pressurizedTunnelParams.yxhwg,
  yxbjxjsg: pressurizedTunnelParams.yxbjxjsg,
  hxgzm: pressurizedTunnelParams.hxgzm,
  jkd: [{ l: 13.5, B: 12.4, H: 8, d: 0, shape: 0 }],
  jkjbd: [{ l: 20, B: 12.4, H: 8, d: 9 }],
  dsd: [
    { l: 34.2, B: 0, H: 0, d: 9, shape: 1 },
    { l: 163.73, B: 0, H: 0, d: 9, shape: 1 },
    { l: 133.27, B: 0, H: 0, d: 9, shape: 1 }
  ],
  ckjbd: [{ l: 22, B: 8, H: 6.8, d: 9 }]
}

describe('dynamic calculator migrations', () => {
  it('keeps dynamic section component config raw inside reactive state', () => {
    const state = reactive({
      tunnel: pressurizedTunnelLossSections,
      line: pressureLineSections,
      short: shortPipeSections
    })

    for (const sections of [state.tunnel, state.line, state.short]) {
      expect(isReactive(sections)).toBe(false)
      expect(isReactive(sections[0].items[0].component)).toBe(false)
    }
  })

  it('keeps section3/3.1.1 tunnel loss result stable', async () => {
    const wrapper = shallowMount(Section311)
    const vm = wrapper.vm as any
    const fixture = buildPressurizedTunnelFixture()

    Object.assign(vm.formState, fixture.formState)
    Object.assign(vm.dynamicParams.data, fixture.dynamicData)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toBe('流量系数=0.77')
  })

  it('keeps section7/7.2 tunnel loss result stable', async () => {
    const wrapper = shallowMount(Section72)
    const vm = wrapper.vm as any
    const fixture = buildPressurizedTunnelFixture()

    Object.assign(vm.formState, fixture.formState)
    Object.assign(vm.dynamicParams.data, fixture.dynamicData)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toBe('流量系数=0.77')
  })

  it('keeps section3/3.2 pressure line result stable', async () => {
    const wrapper = shallowMount(Section32)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, {
      T_0: 66.9,
      n_z: 0.014,
      Q: 1445
    })
    Object.assign(vm.dynamicParams.data, pressureLineDynamicData)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toBe('断面压坡线P1=55.66:>2m水头; 断面压坡线P2=49.97:>2m水头; 断面压坡线P3=38.47:>2m水头; 断面压坡线P4=32.78:>2m水头; 断面压坡线P5=28.21:>2m水头; 断面压坡线P6=22.82:>2m水头; ')
  })

  it('keeps section3/3.3.1 short pipe result stable', async () => {
    const wrapper = shallowMount(Section331)
    const vm = wrapper.vm as any

    Object.assign(vm.formState, {
      B: 8,
      a: 11,
      l_a: 20.35,
      '\\phi': 0.97,
      '\\varepsilon': 0.914,
      n_z: 0.014
    })

    Object.assign(vm.dynamicParams.data, shortPipeDynamicData)

    const result = await vm.definition.execute({
      input: vm.formState,
      setResult: () => {}
    })

    expect(result).toBe('流量系数μ=0.8398; 流量系数μ估=0.8866')
  })
})
