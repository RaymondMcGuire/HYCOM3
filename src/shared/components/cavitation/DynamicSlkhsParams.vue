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
            <el-form-item>
              <math-jax :latex="'h_'+(index+1)+''" />
            </el-form-item>

            <el-form-item>
              <math-jax :latex="'v_'+(index+1)+''" />
            </el-form-item>
        </div>

        <div class="dynamic-field-grid__inputs">
            <el-form-item>
              <el-input
                v-model="input.hi"
                type="text"
                :placeholder="`${explainText}${index+1}:动水压力水头hi`"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="input.vi"
                type="text"
                :placeholder="`${explainText}${index+1}:平均流速vi`"
              />

              <svg
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
import { defineComponent } from 'vue'

type SlkhsParamItem = {
  hi: string | number;
  vi: string | number;
}

export default defineComponent({
  name: 'DynamicSlkhsParams',
  props: {
    explainText: {
      type: String,
      default: ''
    },
    dynamicBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      params: [] as SlkhsParamItem[]
    }
  },
  methods: {
    addField() {
      this.params.push({ hi: '', vi: '' })
    },
    addFieldWithData(h: number | string, v: number | string) {
      this.params.push({ hi: h, vi: v })
    },
    removeField(index: number) {
      this.params.splice(index, 1)
    },
    removeAllField() {
      this.params.splice(0, this.params.length)
    },
    onParamsDataChange() {
      this.$emit('updateParamsData', this.params)
    }
  }
})
</script>
