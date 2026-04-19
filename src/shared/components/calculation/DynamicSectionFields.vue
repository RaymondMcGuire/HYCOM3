<template>
  <div>
    <svg
      v-if="dynamicBtn"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="ml-2 cursor-pointer"
      @click="addField()"
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      />
      <path
        fill="green"
        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
    </svg>

    <div>
      <div
        v-for="(input, index) in params"
        :key="`input-${index}`"
        class="dynamic-field-grid"
      >
        <div class="dynamic-field-grid__labels">
            <el-form-item
              v-for="field in fields"
              :key="`${field.key}-label-${index}`"
            >
              <math-jax :latex="`${field.latex}_${index + 1}`" />
            </el-form-item>
        </div>

        <div class="dynamic-field-grid__inputs">
            <el-form-item
              v-for="(field, fieldIndex) in fields"
              :key="`${field.key}-input-${index}`"
            >
              <el-input
                v-model="input[field.key]"
                type="text"
                :placeholder="`${explainText}${index + 1}:${field.placeholder}`"
              />

              <svg
                v-if="fieldIndex === fields.length - 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer"
                @click="removeField(index)"
              >
                <path
                  fill="none"
                  d="M0 0h24v24H0z"
                />
                <path
                  fill="#EC4899"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </el-form-item>
        </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type DynamicSectionField = {
  key: string;
  latex: string;
  placeholder: string;
}

type DynamicSectionItem = Record<string, string | number>;

function createEmptyItem(fields: DynamicSectionField[]): DynamicSectionItem {
  return fields.reduce<DynamicSectionItem>((item, field) => {
    item[field.key] = ''
    return item
  }, {})
}

function cloneItems(items: DynamicSectionItem[]): DynamicSectionItem[] {
  return items.map((item) => ({ ...item }))
}

export default defineComponent({
  name: 'DynamicSectionFields',
  props: {
    explainText: {
      type: String,
      default: ''
    },
    dynamicBtn: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Array as PropType<DynamicSectionField[]>,
      required: true
    }
  },
  data() {
    return {
      params: [] as DynamicSectionItem[]
    }
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.onParamsDataChange()
      }
    }
  },
  methods: {
    addField() {
      this.params.push(createEmptyItem(this.fields))
    },
    addFieldWithData(...values: Array<string | number>) {
      const item = createEmptyItem(this.fields)

      this.fields.forEach((field, index) => {
        item[field.key] = values[index] ?? ''
      })

      this.params.push(item)
    },
    removeField(index: number) {
      this.params.splice(index, 1)
    },
    removeAllField() {
      this.params.splice(0, this.params.length)
    },
    onParamsDataChange() {
      this.$emit('updateParamsData', cloneItems(this.params))
    }
  }
})
</script>
