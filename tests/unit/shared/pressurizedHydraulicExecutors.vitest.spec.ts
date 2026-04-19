import { describe, expect, it } from 'vitest'
import {
  calculatePressureLine,
  calculatePressurizedTunnelLoss,
  calculateShortPipeCoefficient
} from '@/shared/calculations'

const pressurizedTunnelParams = {
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

describe('shared/calculations/pressurizedHydraulicExecutors', () => {
  it('keeps the tunnel loss coefficient stable', () => {
    const result = calculatePressurizedTunnelLoss({
      input: {
        A_k: 54.4,
        n_z: 0.014
      },
      params: pressurizedTunnelParams
    })

    expect(result).toBe('流量系数=0.77')
  })

  it('keeps the pressure line output stable', () => {
    const result = calculatePressureLine({
      input: {
        T_0: 66.9,
        n_z: 0.014,
        Q: 1445
      },
      params: {
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
    })

    expect(result).toBe('断面压坡线P1=55.66:>2m水头; 断面压坡线P2=49.97:>2m水头; 断面压坡线P3=38.47:>2m水头; 断面压坡线P4=32.78:>2m水头; 断面压坡线P5=28.21:>2m水头; 断面压坡线P6=22.82:>2m水头; ')
  })

  it('keeps the short-pipe coefficient stable', () => {
    const result = calculateShortPipeCoefficient({
      input: {
        B: 8,
        a: 11,
        l_a: 20.35,
        '\\phi': 0.97,
        '\\varepsilon': 0.914,
        n_z: 0.014
      },
      params: {
        jsk: [{ value: 0.1, B: 8, H: 17.118, d: 0, n: 1, shape: 0 }],
        jklws: [],
        jkmc: [
          { value: 0.1, B: 8, H: 13.6, d: 0, n: 1, shape: 0 },
          { value: 0.1, B: 8, H: 11, d: 0, n: 1, shape: 0 }
        ],
        ckmc: [],
        jxbyxjsg: [],
        yxbjxjsg: [],
        hxgzm: [],
        yxhwg: [],
        yxjwg: [],
        csklrsk: [],
        csklrmq: [],
        yxjkd: [],
        yxjsd: [],
        dmtk: [],
        dmts: [],
        pbm: []
      }
    })

    expect(result).toBe('流量系数μ=0.8398; 流量系数μ估=0.8866')
  })
})
