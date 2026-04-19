import { describe, expect, it } from 'vitest'
import {
  createAssignmentResultSchema,
  parseAssignmentResult,
  parseDelimitedNumberList
} from '@/shared/calculations'

describe('value parser helpers', () => {
  it('parses delimited number lists with blanks and invalid values filtered out', () => {
    expect(parseDelimitedNumberList('1; 2; ; abc; 3', ';')).toEqual([1, 2, 3])
    expect(parseDelimitedNumberList('1, 4.5, x, 9', ',')).toEqual([1, 4.5, 9])
  })

  it('parses assignment result strings into keyed output', () => {
    const parsed = parseAssignmentResult<{ raw: string; L1?: string; d0?: string }>(
      'L1=34.5300; d0=1.2269'
    )

    expect(parsed).toEqual({
      raw: 'L1=34.5300; d0=1.2269',
      L1: '34.5300',
      d0: '1.2269'
    })
  })

  it('creates summary schema entries for assignment-style outputs', () => {
    const schema = createAssignmentResultSchema([
      { key: 'L1', label: 'L1', latex: 'L_1' },
      { key: 'd0', label: 'd0', latex: 'd_0' }
    ])

    expect(schema.summary).toEqual([
      { key: 'L1', label: 'L1', latex: 'L_1' },
      { key: 'd0', label: 'd0', latex: 'd_0' }
    ])
  })
})
