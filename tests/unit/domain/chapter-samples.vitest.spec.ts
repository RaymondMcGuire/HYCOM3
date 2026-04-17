import { describe, expect, it } from 'vitest'
import { Chapter2 } from '@/hycom_lib/chapter2'
import { Chapter4 } from '@/hycom_lib/chapter4'
import { Chapter7 } from '@/hycom_lib/chapter7'

describe('domain sample regressions', () => {
  it('keeps the chapter 7 local head loss sample stable', () => {
    const [loss] = Chapter7.gdjbss(
      1,
      [1, 1, 800, 270, 800, 270, 1],
      [0.5, 8, 0.022, 0.99, 0.183, 0.07, 1],
      365.8
    )

    expect(loss).toBeCloseTo(23.45, 2)
  })

  it('keeps the chapter 7 total head loss sample stable', () => {
    const result = Chapter7.gdzstss(365.8, 36.58)

    expect(result).toBeCloseTo(402.38, 2)
  })

  it('keeps the chapter 7 plastic pipe sample stable', () => {
    const result = Chapter7.slgdyctss(1, 0.3, 1.31e-6, 135000)

    expect(result).toBeCloseTo(352.83, 2)
  })

  it('keeps the chapter 7 concrete-lined pipe sample stable', () => {
    const [result] = Chapter7.hntgjsgd(0.3, 0.009, 1, 135000)

    expect(result).toBeCloseTo(345.73, 2)
  })

  it('keeps the chapter 7 network balancing sample stable', () => {
    const [result] = Chapter7.spsgd(0.07, 0.3, 145, 135000)

    expect(result).toBeCloseTo(365.75, 2)
  })

  it('keeps the chapter 2 stepped spillway sample stable', () => {
    const result = Chapter2.njslkxy263(25.12, 8, 0.9, 50, 1.7, 12.5)

    expect(result).toContain('L1=11.2500')
    expect(result).toContain('d0=0.5994')
    expect(result).toContain('v0=41.9091')
    expect(result).toContain('eta=0.9470')
  })

  it('keeps the chapter 4 aeration depth sample stable', () => {
    const result = Chapter4.yhdgf_sdsqss(1.3, [10.054, 6.515, 7, 7.92], [28.72, 35.4566, 33, 29.1667])

    expect(result[0]).toContain('13.80776')
    expect(result[1]).toContain('9.51800')
    expect(result[3]).toContain('10.92300')
  })
})
