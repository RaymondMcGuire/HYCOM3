<template>
  <div
    v-if="hasContent"
    class="result-panel"
  >
    <div
      v-if="summaryEntries.length > 0"
      class="result-summary"
    >
      <div
        v-for="item in summaryEntries"
        :key="item.key"
        class="result-summary-item"
      >
        <div class="result-summary-label">
          <math-jax
            v-if="item.latex"
            :latex="item.latex"
          />
          <span v-else>{{ item.label }}</span>
        </div>
        <div class="result-summary-value">
          {{ item.value }}
        </div>
      </div>
    </div>

    <div
      v-for="list in listEntries"
      :key="list.key"
      class="result-list"
    >
      <h3 class="result-list-title">
        {{ list.label }}
      </h3>
      <ul class="result-list-items">
        <li
          v-for="item in list.items"
          :key="item.key"
          class="result-list-item"
        >
          <strong v-if="item.label">{{ item.label }}：</strong>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MathJax } from '@/plugins/mathjax'
import { ResultListSchema, ResultSchema, ResultSummaryItem } from '@/shared/calculations'

type RenderedSummaryEntry = {
  key: string;
  label: string;
  latex?: string;
  value: string;
}

type RenderedListEntry = {
  key: string;
  label: string;
  items: Array<{
    key: string;
    label: string;
    value: string;
  }>;
}

function readNestedValue(target: any, path?: string): unknown {
  if (!path) {
    return undefined
  }

  return path.split('.').reduce<unknown>((accumulator, segment) => {
    if (accumulator === undefined || accumulator === null) {
      return undefined
    }

    return (accumulator as Record<string, unknown>)[segment]
  }, target)
}

function formatValue(value: unknown): string {
  if (value === undefined || value === null || value === '') {
    return '-'
  }

  return String(value)
}

function buildSummaryEntries(output: unknown, schema?: ResultSchema<any>): RenderedSummaryEntry[] {
  return (schema?.summary || []).map((item: ResultSummaryItem<any>, index: number) => {
    const value = item.getValue ? item.getValue(output) : readNestedValue(output, item.key)
    return {
      key: item.key || `summary-${index}`,
      label: item.label,
      latex: item.latex,
      value: item.format ? item.format(value, output) : formatValue(value)
    }
  })
}

function buildListEntries(output: unknown, schema?: ResultSchema<any>): RenderedListEntry[] {
  return (schema?.lists || []).map((list: ResultListSchema<any>, listIndex: number) => {
    const items = (list.getItems ? list.getItems(output) : readNestedValue(output, list.key)) || []
    const normalizedItems = Array.isArray(items) ? items : []

    return {
      key: list.key || `list-${listIndex}`,
      label: list.label,
      items: normalizedItems.map((item: unknown, itemIndex: number) => ({
        key: `${list.key || `list-${listIndex}`}-${itemIndex}`,
        label: list.itemLabel ? list.itemLabel(item, itemIndex, output) : `${itemIndex + 1}`,
        value: list.itemValue ? list.itemValue(item, itemIndex, output) : formatValue(item)
      }))
    }
  }).filter((list) => list.items.length > 0)
}

export default defineComponent({
  name: 'CalculationResultPanel',
  components: {
    MathJax
  },
  props: {
    schema: {
      type: Object as PropType<ResultSchema<any> | null>,
      default: null
    },
    output: {
      type: null as unknown as PropType<unknown>,
      default: null
    }
  },
  computed: {
    summaryEntries(): RenderedSummaryEntry[] {
      return buildSummaryEntries(this.output, this.schema as ResultSchema<any> | undefined)
    },
    listEntries(): RenderedListEntry[] {
      return buildListEntries(this.output, this.schema as ResultSchema<any> | undefined)
    },
    hasContent(): boolean {
      return this.summaryEntries.length > 0 || this.listEntries.length > 0
    }
  }
})
</script>

<style lang="scss" scoped>
.result-panel {
  margin-bottom: 20px;
}

.result-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.result-summary-item {
  border: 1px solid #dbeaf7;
  border-radius: 6px;
  padding: 12px;
  background: #f8fcff;
}

.result-summary-label {
  margin-bottom: 6px;
  color: #4a5a6a;
  font-size: 14px;
}

.result-summary-value {
  color: #1f2d3d;
  font-size: 16px;
  font-weight: 600;
  word-break: break-word;
}

.result-list {
  margin-bottom: 16px;
}

.result-list-title {
  margin: 0 0 8px;
  color: #1f2d3d;
  font-size: 16px;
}

.result-list-items {
  margin: 0;
  padding-left: 18px;
}

.result-list-item {
  margin-bottom: 6px;
  line-height: 1.6;
  color: #1f2d3d;
}
</style>
