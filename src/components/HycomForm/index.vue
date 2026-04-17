<template>
  <div class="hycom-form">
    <el-container>
      <el-header>
        <h2 class="form-title">
          {{ effectiveTitle }}
        </h2>
      </el-header>
      <el-main>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
        >
          <slot name="equ_explain_anchor" />

          <param-explain :formulas="effectiveFormulas" />

          <slot name="table_fir_anchor" />

          <el-divider content-position="left">
            输入参数
          </el-divider>

          <slot name="params_input_region" />

          <div class="params-input">
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
                  <div v-if="field.type === 'select' && usesOptionGroups(field.key)">
                    <el-select
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                      style="width: 100%;"
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
                  </div>
                  <div v-else-if="field.type === 'select'">
                    <el-select
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="option in getFieldOptions(field)"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="field.type === 'number'">
                    <el-input-number
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                      style="width: 100%;"
                    />
                  </div>
                  <div v-else-if="field.type === 'boolean'">
                    <el-switch
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                    />
                  </div>
                  <div v-else-if="field.type === 'textarea'">
                    <el-input
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                      :placeholder="field.placeholder"
                      type="textarea"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="effectiveData[field.key]"
                      :disabled="field.readonly"
                      :placeholder="field.placeholder"
                    />
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>

          <slot name="table_sec_anchor" />

          <div class="form-actions">
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
          </div>

          <slot />

          <el-divider content-position="left">
            计算结果
          </el-divider>

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
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueParamaters from '@/components/VueParamaters/index.vue'
import ParamExplain from './components/ParamExplain.vue'
import { syyType, shapeType, tfyType, jkdkbyType } from '@/hycom_lib/common'
import { MathJax } from '@/plugins/mathjax'
import { applyDemoCase, CalculationDefinition, FieldSchema, resetCalculationState } from '@/shared/calculations'

@Component({
  components: {
    VueParamaters,
    ParamExplain,
    MathJax
  }
})
export default class HycomForm extends Vue {
  @Prop() title!: string;
  @Prop() data!: Record<string, any>;
  @Prop() initData!: Record<string, any>;
  @Prop() demoContent!: string;
  @Prop() demoResult!: string;
  @Prop() formulas!: Record<string, any>;
  @Prop({ default: null }) definition!: CalculationDefinition | null;
  @Prop({ default: null }) state!: Record<string, any> | null;

  form = { result: '' };

  syyOptions = [
    { label: '实用堰', value: syyType.syy },
    { label: '宽顶堰', value: syyType.kdy }
  ];

  shapeOptions = [
    { label: '矩形断面', value: shapeType.RECTANGLE },
    { label: '梯形断面', value: shapeType.LADDER }
  ];

  tfyTypeOptions = [
    { label: 'a型', value: tfyType.a },
    { label: 'b型', value: tfyType.b }
  ];

  jkdkbyTypeOptions = [
    { label: '方角', value: jkdkbyType.fj },
    { label: '圆角', value: jkdkbyType.yj }
  ];

  kechongOptions = [
    { label: '难冲', value: 0.8 },
    { label: '可冲', value: 1.1 },
    { label: '较易冲', value: 1.4 },
    { label: '易冲', value: 1.8 }
  ];

  table221Options = [
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

  get effectiveData(): Record<string, any> {
    return this.state || this.data
  }

  get effectiveTitle(): string {
    return this.definition?.title || this.title
  }

  get effectiveFormulas(): Record<string, any> {
    return this.definition?.formulas || this.formulas
  }

  get effectiveDemoContent(): string {
    return this.definition?.demoCase?.description || this.demoContent
  }

  get effectiveDemoResult(): string {
    return this.definition?.demoCase?.expectedResult || this.demoResult
  }

  get renderedFields(): FieldSchema[] {
    if (this.definition) {
      return this.definition.fields
    }

    return Object.keys(this.effectiveData || {}).map((key) => ({
      key,
      latex: key,
      type: this.inferLegacyFieldType(key)
    }))
  }

  getSelectOptions(key: string): any[] {
    switch (key) {
      case '实用堰类型': return this.syyOptions
      case '断面形状': return this.shapeOptions
      case '驼峰堰堰型': return this.tfyTypeOptions
      case '进口底坎边缘': return this.jkdkbyTypeOptions
      case '可冲类别': return this.kechongOptions
      default: return []
    }
  }

  fieldLabel(field: FieldSchema): string {
    return field.latex || field.label || field.key
  }

  usesOptionGroups(key: string): boolean {
    return key === '水流边壁类型'
  }

  getFieldOptions(field: FieldSchema): any[] {
    if (field.options && field.options.length > 0) {
      return field.options
    }

    return this.getSelectOptions(field.key)
  }

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
  }

  onDemo(): void {
    if (this.definition) {
      applyDemoCase(this.effectiveData, this.definition.demoCase)
    } else {
      for (const key in this.initData) {
        this.effectiveData[key] = this.initData[key]
      }
    }
    this.$emit('beforeOnDemo')
  }

  onReset(): void {
    if (this.definition) {
      resetCalculationState(this.effectiveData, this.definition.fields)
    } else {
      for (const key in this.effectiveData) {
        this.effectiveData[key] = ''
      }
    }
    this.form.result = ''
    this.$emit('beforeOnReset')
  }

  onCalculate(): void {
    if (this.definition) {
      Promise.resolve(
        this.definition.execute({
          input: this.effectiveData,
          setResult: (value: string) => {
            this.form.result = value
          }
        })
      ).then((result) => {
        if (result === undefined || result === null) {
          return
        }

        this.form.result = this.definition?.formatResult
          ? this.definition.formatResult(result)
          : String(result)
      }).catch((error: Error) => {
        console.error(error)
      })
    }
    this.$emit('beforeOnCalculate')
  }
}
</script>

<style lang="scss">
.hycom-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom, #e6f7ff, #ffffff);

  .form-title {
    text-align: center;
    margin-bottom: 20px;
    color: #1890ff;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }

  .params-input {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }

  .param-item {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
  }

  .param-label {
    margin-bottom: 5px;
  }

  .param-input {
    width: 100%;
  }

  .form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;

    .action-button {
      flex: 1 1 auto;
      max-width: 200px; // Prevent buttons from becoming too wide
    }
  }
  .el-divider__text {
    font-size: 18px;
    font-weight: bold;
    color: #1890ff;
  }

  .el-input-number, .el-select {
    width: 100%;
  }

  @media (max-width: 768px) {
    .param-item {
      flex-basis: 100%;
    }

    .form-actions {
      flex-direction: column;
      align-items: stretch;

      .action-button {
        width: 100%;
        max-width: none;
        margin-bottom: 10px;
        height: 40px; // Reduce button height on small screens
        font-size: 14px; // Reduce font size on small screens
      }
    }
  }

  @media (max-width: 480px) {
    .form-actions {
      .action-button {
        height: 36px; // Further reduce button height on very small screens
        font-size: 13px; // Further reduce font size on very small screens
      }
    }
  }
}
</style>
