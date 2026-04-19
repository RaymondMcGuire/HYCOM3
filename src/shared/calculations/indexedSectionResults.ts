import { ResultSchema } from '@/shared/calculations/types'

export interface IndexedSectionResultItem {
  index: number;
  text: string;
  value?: string;
  status?: string;
}

export interface IndexedSectionResult {
  raw: string;
  sections: IndexedSectionResultItem[];
}

export function createIndexedSectionResultSchema(
  label = '断面结果'
): ResultSchema<IndexedSectionResult> {
  return {
    lists: [
      {
        key: 'sections',
        label,
        itemLabel: (item) => `第${(item as IndexedSectionResultItem).index}断面`,
        itemValue: (item) => (item as IndexedSectionResultItem).text
      }
    ]
  }
}

export function buildIndexedSectionResult(items: string[]): IndexedSectionResult {
  const sections = items.map((item, index) => {
    const trimmed = item.trim()
    const firstEquals = trimmed.indexOf('=')
    const firstComma = trimmed.indexOf(',')

    let value: string | undefined
    if (firstEquals >= 0) {
      const valueEnd = firstComma >= 0 ? firstComma : trimmed.length
      value = trimmed.slice(firstEquals + 1, valueEnd).trim()
    }

    return {
      index: index + 1,
      text: trimmed,
      value,
      status: firstComma >= 0 ? trimmed.slice(firstComma + 1).trim() : firstEquals === -1 ? trimmed : undefined
    }
  })

  return {
    raw: sections.map((section) => `第${section.index}断面:${section.text}`).join(';') + (sections.length > 0 ? ';' : ''),
    sections
  }
}
