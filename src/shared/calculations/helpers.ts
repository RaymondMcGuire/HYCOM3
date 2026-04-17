import { CalculationDefinition, DemoCase, FieldSchema } from '@/shared/calculations/types';

export function createCalculationState(fields: FieldSchema[]): Record<string, any> {
  return fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.key] = field.defaultValue !== undefined
      ? field.defaultValue
      : field.type === 'number'
        ? undefined
        : '';
    return acc;
  }, {});
}

export function applyDemoCase<TInput extends Record<string, any>>(
  state: Record<string, any>,
  demoCase?: DemoCase<TInput>
): void {
  if (!demoCase) {
    return;
  }

  Object.keys(state).forEach((key) => {
    state[key] = '';
  });

  Object.entries(demoCase.values).forEach(([key, value]) => {
    state[key] = value as any;
  });
}

export function resetCalculationState(
  state: Record<string, any>,
  fields: FieldSchema[],
  fallback: Record<string, any> = {}
): void {
  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(fallback, field.key)) {
      state[field.key] = fallback[field.key];
      return;
    }

    state[field.key] = field.defaultValue !== undefined
      ? field.defaultValue
      : field.type === 'number'
        ? undefined
        : '';
  });
}

export function buildLegacyInitData(definition: CalculationDefinition): Record<string, any> {
  const data = createCalculationState(definition.fields);
  applyDemoCase(data, definition.demoCase);
  return data;
}
