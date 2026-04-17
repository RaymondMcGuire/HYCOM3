import { describe, expect, it } from 'vitest'
import { Table2DLerp, TABLE416_DATA, TABLE416_HORIZON, TABLE416_VERTICAL } from '@/hycom_lib/common'

describe('common/Table2DLerp', () => {
  it('interpolates values from the built-in lookup tables', () => {
    const tableLerp = new Table2DLerp()
    const result = tableLerp.arr(
      TABLE416_VERTICAL,
      TABLE416_HORIZON,
      TABLE416_DATA,
      0,
      45
    )

    expect(result).toBeCloseTo(0.183, 3)
  })
})
