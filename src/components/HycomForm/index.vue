<template>
  <div class="hycom-form">
    <el-container>
      <el-header>
        <h2 class="form-title">
          {{ title }}
        </h2>
      </el-header>
      <el-main>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
        >
          <slot name="equ_explain_anchor" />

          <param-explain :formulas="formulas" />

          <slot name="table_fir_anchor" />

          <el-divider content-position="left">
            输入参数
          </el-divider>

          <slot name="params_input_region" />

          <div class="params-input">
            <div
              v-for="(value, index) in data"
              :key="index"
              class="param-item"
            >
              <div class="param-label">
                <math-jax :latex="index" />
              </div>
              <div class="param-input">
                <el-form-item>
                  <div v-if="index === '实用堰类型'">
                    <el-select
                      v-model="data[index]"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="syy in syyOptions"
                        :key="syy.value"
                        :label="syy.label"
                        :value="syy.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="index === '断面形状'">
                    <el-select
                      v-model="data[index]"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="sp in shapeOptions"
                        :key="sp.value"
                        :label="sp.label"
                        :value="sp.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="index === '驼峰堰堰型'">
                    <el-select
                      v-model="data[index]"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="sp in tfyTypeOptions"
                        :key="sp.value"
                        :label="sp.label"
                        :value="sp.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="index === '进口底坎边缘'">
                    <el-select
                      v-model="data[index]"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="sp in jkdkbyTypeOptions"
                        :key="sp.value"
                        :label="sp.label"
                        :value="sp.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="index === '可冲类别'">
                    <el-select
                      v-model="data[index]"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="sp in kechongOptions"
                        :key="sp.value"
                        :label="sp.label"
                        :value="sp.value"
                      />
                    </el-select>
                  </div>
                  <div v-else-if="index === '水流边壁类型'">
                    <el-select
                      v-model="data[index]"
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
                  <div v-else-if="typeof data[index] === 'number'">
                    <el-input-number
                      v-model="data[index]"
                      style="width: 100%;"
                    />
                  </div>
                  <div v-else-if="typeof data[index] === 'boolean'">
                    <el-switch v-model="data[index]" />
                  </div>
                  <div v-else-if="typeof data[index] === 'string'">
                    <el-input v-model="data[index]" />
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

          <p>{{ demoContent }}</p>
          <strong>{{ demoResult }}</strong>
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

  onDemo(): void {
    for (const key in this.initData) {
      this.data[key] = this.initData[key]
    }
    this.$emit('beforeOnDemo')
  }

  onReset(): void {
    for (const key in this.data) {
      this.data[key] = ''
    }
    this.form.result = ''
    this.$emit('beforeOnReset')
  }

  onCalculate(): void {
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
