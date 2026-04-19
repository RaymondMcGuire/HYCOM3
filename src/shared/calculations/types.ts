export type PrimitiveFieldType = 'number' | 'text' | 'boolean' | 'select' | 'textarea';

export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

export interface FieldSchema {
  key: string;
  label?: string;
  latex?: string;
  type: PrimitiveFieldType;
  defaultValue?: string | number | boolean;
  readonly?: boolean;
  placeholder?: string;
  options?: SelectOption[];
}

export interface DerivedFieldRule<TState = Record<string, any>> {
  deps: string[];
  targets: string[];
  apply: (state: TState) => Partial<TState>;
}

export interface ResultSummaryItem<TOutput = any> {
  key?: string;
  label: string;
  latex?: string;
  getValue?: (output: TOutput) => unknown;
  format?: (value: unknown, output: TOutput) => string;
}

export interface ResultListSchema<TOutput = any> {
  key?: string;
  label: string;
  getItems?: (output: TOutput) => unknown[];
  itemLabel?: (item: unknown, index: number, output: TOutput) => string;
  itemValue?: (item: unknown, index: number, output: TOutput) => string;
}

export interface ResultSchema<TOutput = any> {
  summary?: ResultSummaryItem<TOutput>[];
  lists?: ResultListSchema<TOutput>[];
}

export interface DemoCase<TInput = Record<string, any>> {
  values: Partial<TInput>;
  description: string;
  expectedResult: string;
}

export interface CalculationExecutionContext<TInput = Record<string, any>> {
  input: TInput;
  setResult: (value: string) => void;
}

export interface CalculationDefinition<TInput = Record<string, any>, TOutput = string> {
  title: string;
  fields: FieldSchema[];
  formulas: Record<string, any>;
  result?: ResultSchema<TOutput>;
  demoCase?: DemoCase<TInput>;
  derivedFields?: Array<DerivedFieldRule<TInput>>;
  execute: (context: CalculationExecutionContext<TInput>) => TOutput | Promise<TOutput>;
  formatResult?: (result: TOutput) => string;
}
