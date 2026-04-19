import { describe, expect, it } from 'vitest'
import { buildIndexedSectionResult } from '@/shared/calculations'

describe('shared/indexedSectionResults', () => {
  it('builds indexed section output from plain section strings', () => {
    const result = buildIndexedSectionResult([
      '掺气水深=7.99218',
      '公式不合适',
      '水流空化数=0.28647,需要设掺气坎'
    ])

    expect(result.raw).toBe('第1断面:掺气水深=7.99218;第2断面:公式不合适;第3断面:水流空化数=0.28647,需要设掺气坎;')
    expect(result.sections).toEqual([
      { index: 1, text: '掺气水深=7.99218', value: '7.99218', status: undefined },
      { index: 2, text: '公式不合适', value: undefined, status: '公式不合适' },
      { index: 3, text: '水流空化数=0.28647,需要设掺气坎', value: '0.28647', status: '需要设掺气坎' }
    ])
  })
})
