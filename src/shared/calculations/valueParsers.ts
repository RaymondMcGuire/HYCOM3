import { ResultSchema } from '@/shared/calculations/types'

export interface AssignmentResultSchemaField {
  key: string;
  label: string;
  latex?: string;
}

export function parseDelimitedNumberList(
  raw: unknown,
  delimiter = ','
): number[] {
  return String(raw ?? '')
    .split(delimiter)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item))
    .filter((item) => !Number.isNaN(item))
}

export function parseAssignmentResult<TOutput extends Record<string, any>>(raw: string): TOutput {
  const parsed = { raw } as unknown as TOutput

  raw
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => {
      const separatorIndex = item.indexOf('=')
      if (separatorIndex < 0) {
        return
      }

      const key = item.slice(0, separatorIndex).trim()
      const value = item.slice(separatorIndex + 1).trim()
      if (!key || value === '') {
        return
      }

      parsed[key as keyof TOutput] = value as TOutput[keyof TOutput]
    })

  return parsed
}

export function createAssignmentResultSchema<TOutput>(
  fields: AssignmentResultSchemaField[]
): ResultSchema<TOutput> {
  return {
    summary: fields.map((field) => ({
      key: field.key,
      label: field.label,
      latex: field.latex
    }))
  }
}
