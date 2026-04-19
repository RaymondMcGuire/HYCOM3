<template>
  <div class="hycom-form">
    <panel-shell :title="effectiveTitle">
      <el-form
        ref="form"
        :model="form"
        class="hycom-form__content"
        label-width="120px"
      >
        <slot name="equ_explain_anchor" />

        <param-explain :formulas="effectiveFormulas" />

        <slot name="table_fir_anchor" />

        <el-divider content-position="left">
          输入参数
        </el-divider>

        <slot name="params_input_region" />

        <app-grid
          class="params-input"
          gap="20px"
          min-column="300px"
        >
          <div
            v-for="field in renderedFields"
            :key="field.key"
            class="param-item"
          >
            <div class="param-label">
              <math-jax :latex="fieldLabel(field)" />
            </div>
            <div class="param-input">
              <el-form-item>
                <div class="param-control-host">
                  <el-select
                    v-if="field.type === 'select' && usesOptionGroups(field.key)"
                    v-model="effectiveData[field.key]"
                    class="param-control"
                    :disabled="field.readonly"
                  >
                    <el-option-group
                      v-for="group in table221Options"
                      :key="group.label"
                      :label="group.label"
                    >
                      <el-option
                        v-for="gitem in group.options"
                        :key="gitem.value"
                        :label="gitem.label"
                        :value="gitem.value"
                      />
                    </el-option-group>
                  </el-select>
                  <el-select
                    v-else-if="field.type === 'select'"
                    v-model="effectiveData[field.key]"
                    class="param-control"
                    :disabled="field.readonly"
                  >
                    <el-option
                      v-for="option in getFieldOptions(field)"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                  <el-input-number
                    v-else-if="field.type === 'number'"
                    v-model="effectiveData[field.key]"
                    class="param-control"
                    :disabled="field.readonly"
                  />
                  <el-switch
                    v-else-if="field.type === 'boolean'"
                    v-model="effectiveData[field.key]"
                    :disabled="field.readonly"
                  />
                  <el-input
                    v-else-if="field.type === 'textarea'"
                    v-model="effectiveData[field.key]"
                    class="param-control"
                    :disabled="field.readonly"
                    :placeholder="field.placeholder"
                    type="textarea"
                  />
                  <el-input
                    v-else
                    v-model="effectiveData[field.key]"
                    class="param-control"
                    :disabled="field.readonly"
                    :placeholder="field.placeholder"
                  />
                </div>
              </el-form-item>
            </div>
          </div>
        </app-grid>

        <slot name="table_sec_anchor" />

        <app-grid
          class="form-actions"
          columns="repeat(auto-fit, minmax(180px, 1fr))"
          gap="10px"
        >
          <el-button
            class="action-button"
            type="primary"
            @click="onCalculate"
          >
            计算
          </el-button>
          <el-button
            class="action-button"
            type="info"
            @click="onDemo"
          >
            算例
          </el-button>
          <el-button
            class="action-button"
            type="warning"
            @click="onReset"
          >
            清空
          </el-button>
        </app-grid>

        <slot />

        <el-divider content-position="left">
          计算结果
        </el-divider>

        <result-panel
          v-if="effectiveResultSchema && lastOutput !== null"
          :schema="effectiveResultSchema"
          :output="lastOutput"
        />

        <el-form-item>
          <el-input
            v-model="form.result"
            readonly
            type="textarea"
            :rows="3"
          />
        </el-form-item>

        <el-divider content-position="left">
          算例
        </el-divider>

        <p>{{ effectiveDemoContent }}</p>
        <strong>{{ effectiveDemoResult }}</strong>
      </el-form>
    </panel-shell>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ParamExplain from './components/ParamExplain.vue'
import ResultPanel from './components/ResultPanel.vue'
import { syyType, shapeType, tfyType, jkdkbyType } from '@/hycom_lib/common'
import { MathJax } from '@/plugins/mathjax'
import { applyDemoCase, applyDerivedFieldRules, CalculationDefinition, FieldSchema, ResultSchema, resetCalculationState } from '@/shared/calculations'
import AppGrid from '@/shared/components/layout/AppGrid.vue'
import PanelShell from '@/shared/components/layout/PanelShell.vue'

export default defineComponent({
  name: 'HycomForm',
  components: {
    AppGrid,
    ParamExplain,
    PanelShell,
    ResultPanel,
    MathJax
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    initData: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    demoContent: {
      type: String,
      default: ''
    },
    demoResult: {
      type: String,
      default: ''
    },
    formulas: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    definition: {
      type: Object as PropType<CalculationDefinition | null>,
      default: null
    },
    state: {
      type: Object as PropType<Record<string, any> | null>,
      default: null
    }
  },
  data() {
    return {
      form: { result: '' },
      lastOutput: null as unknown,
      isApplyingDerivedFields: false,
      syyOptions: [
        { label: '实用堰', value: syyType.syy },
        { label: '宽顶堰', value: syyType.kdy }
      ],
      shapeOptions: [
        { label: '矩形断面', value: shapeType.RECTANGLE },
        { label: '梯形断面', value: shapeType.LADDER }
      ],
      tfyTypeOptions: [
        { label: 'a型', value: tfyType.a },
        { label: 'b型', value: tfyType.b }
      ],
      jkdkbyTypeOptions: [
        { label: '方角', value: jkdkbyType.fj },
        { label: '圆角', value: jkdkbyType.yj }
      ],
      kechongOptions: [
        { label: '难冲', value: 0.8 },
        { label: '可冲', value: 1.1 },
        { label: '较易冲', value: 1.4 },
        { label: '易冲', value: 1.8 }
      ],
      table221Options: [
        {
          label: '混凝土衬砌',
          options: [
            { value: '0.0115', label: '壁面顺直,有抹光的水泥浆面层或经磨光表面光滑者' },
            { value: '0.0125', label: '壁面顺直,采用钢模且拼接良好者' },
            { value: '0.0135', label: '壁面顺直,采用木摸拼接缝间凸凹度在3mm~5mm内者' },
            { value: '0.015', label: '壁面不够顺直,木摸拼接不良,缝间凸凹度在5mm~20mm者' },
            { value: '0.017', label: '粗糙的混凝土' }
          ]
        },
        {
          label: '喷混凝土',
          options: [
            { value: '0.0225', label: '岩石表面平整' },
            { value: '0.030', label: '岩石表面高低不平' }
          ]
        },
        {
          label: '喷浆护面',
          options: [
            { value: '0.0205', label: '喷浆护面' }
          ]
        },
        {
          label: '水泥浆砌块石护面',
          options: [
            { value: '0.0175', label: '渠底、壁面较顺直,砌石面较平整,拼接良好,1m2内不平整度约为30mm~50mm者' },
            { value: '0.025', label: '平整度较差' }
          ]
        },
        {
          label: '干砌块石或乱石护坡',
          options: [
            { value: '0.022', label: '渠底、壁面欠顺直,干砌石拼接一般' },
            { value: '0.029', label: '干砌块石平整度较差或乱石护坡' }
          ]
        },
        {
          label: '岩石',
          options: [
            { value: '0.025', label: '经过良好修整的' },
            { value: '0.0315', label: '经过中等修整的' },
            { value: '0.04', label: '未经修整,凸凹甚大者' }
          ]
        }
      ]
    }
  },
  computed: {
    effectiveData(): Record<string, any> {
      return this.state || this.data || {}
    },
    effectiveTitle(): string {
      return this.definition?.title || this.title
    },
    effectiveFormulas(): Record<string, any> {
      return this.definition?.formulas || this.formulas
    },
    effectiveDemoContent(): string {
      return this.definition?.demoCase?.description || this.demoContent
    },
    effectiveDemoResult(): string {
      return this.definition?.demoCase?.expectedResult || this.demoResult
    },
    effectiveResultSchema(): ResultSchema | null {
      return this.definition?.result || null
    },
    renderedFields(): FieldSchema[] {
      if (this.definition) {
        return this.definition.fields
      }

      return Object.keys(this.effectiveData || {}).map((key) => ({
        key,
        latex: key,
        type: this.inferLegacyFieldType(key)
      }))
    }
  },
  watch: {
    state: {
      deep: true,
      handler() {
        this.applyDefinitionDerivedFields()
      }
    },
    data: {
      deep: true,
      handler() {
        this.applyDefinitionDerivedFields()
      }
    }
  },
  mounted() {
    this.applyDefinitionDerivedFields()
  },
  methods: {
    getSelectOptions(key: string): any[] {
      switch (key) {
        case '实用堰类型': return this.syyOptions
        case '断面形状': return this.shapeOptions
        case '驼峰堰堰型': return this.tfyTypeOptions
        case '进口底坎边缘': return this.jkdkbyTypeOptions
        case '可冲类别': return this.kechongOptions
        default: return []
      }
    },
    fieldLabel(field: FieldSchema): string {
      return field.latex || field.label || field.key
    },
    usesOptionGroups(key: string): boolean {
      return key === '水流边壁类型'
    },
    getFieldOptions(field: FieldSchema): any[] {
      if (field.options && field.options.length > 0) {
        return field.options
      }

      return this.getSelectOptions(field.key)
    },
    inferLegacyFieldType(key: string): FieldSchema['type'] {
      const options = this.getSelectOptions(key)
      if (options.length > 0 || this.usesOptionGroups(key)) {
        return 'select'
      }

      const value = this.effectiveData?.[key]
      if (typeof value === 'number') {
        return 'number'
      }

      if (typeof value === 'boolean') {
        return 'boolean'
      }

      return 'text'
    },
    applyDefinitionDerivedFields() {
      if (!this.definition?.derivedFields || this.isApplyingDerivedFields) {
        return
      }

      this.isApplyingDerivedFields = true
      try {
        applyDerivedFieldRules(
          this.effectiveData,
          this.definition.derivedFields as Array<any>
        )
      } finally {
        this.isApplyingDerivedFields = false
      }
    },
    onDemo(): void {
      if (this.definition) {
        applyDemoCase(this.effectiveData, this.definition.demoCase)
        this.applyDefinitionDerivedFields()
      } else {
        Object.keys(this.initData || {}).forEach((key) => {
          this.effectiveData[key] = this.initData[key]
        })
      }

      this.form.result = ''
      this.lastOutput = null
      this.$emit('beforeOnDemo')
    },
    onReset(): void {
      if (this.definition) {
        resetCalculationState(this.effectiveData, this.definition.fields)
        this.applyDefinitionDerivedFields()
      } else {
        Object.keys(this.effectiveData || {}).forEach((key) => {
          this.effectiveData[key] = ''
        })
      }

      this.form.result = ''
      this.lastOutput = null
      this.$emit('beforeOnReset')
    },
    async onCalculate(): Promise<void> {
      if (!this.definition) {
        return
      }

      try {
        const result = await Promise.resolve(
          this.definition.execute({
            input: this.effectiveData,
            setResult: (value: string) => {
              this.form.result = value
            }
          })
        )

        if (result === undefined || result === null) {
          this.lastOutput = null
          return
        }

        this.lastOutput = result
        this.form.result = this.definition.formatResult
          ? this.definition.formatResult(result)
          : String(result)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.hycom-form {
  max-width: 1200px;
  margin: 0 auto;
}

.hycom-form__content {
  width: 100%;
}

.params-input {
  margin-bottom: 20px;
}

.param-item {
  display: flex;
  flex-direction: column;
}

.param-label {
  margin-bottom: 5px;
}

.param-input {
  width: 100%;
}

.param-control-host {
  display: block;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
}

.param-control {
  width: 100%;
}

.form-actions {
  margin-bottom: 20px;
}

.action-button {
  width: 100%;
  min-height: 40px;
}

:deep(.param-control.el-select) {
  display: block;
  width: 100%;
  max-width: 100%;
}

:deep(.param-control.el-input-number) {
  width: 100%;
}

:deep(.param-control .el-select__wrapper) {
  width: 100%;
  min-height: var(--el-component-size);
}

:deep(.param-control .el-select__selection) {
  width: 100%;
  min-width: 0;
}

:deep(.param-control .el-select__selected-item),
:deep(.param-control .el-select__placeholder) {
  max-width: 100%;
}

:deep(.param-control.el-input-number .el-input__wrapper) {
  width: 100%;
}

:deep(.el-divider__text) {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .action-button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .action-button {
    min-height: 36px;
    font-size: 13px;
  }
}
</style>
