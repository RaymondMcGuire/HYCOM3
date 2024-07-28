<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 10:23:54
 * @FilePath: \hycom_app\src\components\HycomForm\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <h2>{{ title }}</h2>
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
          <br>

          <el-row :gutter="20">
            <h3>请输入参数:</h3>
          </el-row>

          <br>

          <slot name="params_input_region" />

          <el-row :gutter="20">
            <div
              v-for="(item, index) in data"
              :key="index"
            >
              <el-col :span="4">
                <!-- <math-jax :latex="'' + index + ''" /> -->
                <math-jax :latex="'' + index + ''" />
              </el-col>

              <el-col :span="8">
                <el-form-item>
                  <div v-if="index === '实用堰类型'">
                    <el-select
                      v-model="data[index]"
                      placeholder="请选择类型"
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
                      placeholder="请选择形状"
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
                      placeholder="请选择堰型"
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
                      placeholder="请选择进口底坎边缘"
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
                      placeholder="请选择可冲类别"
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
                      placeholder="请选择类型"
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
                    <el-input v-model="data[index]" />
                  </div>
                  <div v-else-if="typeof data[index] === 'boolean'">
                    <el-switch v-model="data[index]" />
                  </div>
                  <div v-else-if="typeof data[index] === 'string'">
                    <el-input v-model="data[index]" />
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-row>

          <slot name="table_sec_anchor" />

          <el-row :gutter="20">
            <el-col
              :span="8"
              style="text-align: center"
            >
              <el-button
                type="primary"
                @click="onCalculate"
              >
                计算
              </el-button>
            </el-col>

            <el-col
              :span="8"
              style="text-align: center"
            >
              <el-button
                type="primary"
                @click="onDemo"
              >
                算例
              </el-button>
            </el-col>
            <el-col
              :span="8"
              style="text-align: center"
            >
              <el-button
                type="primary"
                @click="onReset"
              >
                清空
              </el-button>
            </el-col>
          </el-row>
          <slot />
          <h3>结果:</h3>
          <br>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <el-input
                  v-model="form.result"
                  readonly=""
                />
              </el-form-item>
            </el-col>
          </el-row>

          <div>
            <h3>算例:</h3>
            <br>
            <p>
              {{ demoContent }}
            </p>
            <br>
            <b> {{ demoResult }}</b>
          </div>
          <br>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueParamaters from '@/components/VueParamaters/index.vue'

import { syyType, shapeType, tfyType, jkdkbyType } from '@/hycom_lib/common'
import ParamExplain from './components/ParamExplain.vue'
import { MathJax } from 'mathjax-vue'

@Component({
  components: {
    VueParamaters,
    ParamExplain,
    MathJax
  }
})
export default class HycomForm extends Vue {
  @Prop() title!: string;
  @Prop() data!: Object;
  @Prop() initData!: Object;

  @Prop() demoContent!: string;
  @Prop() demoResult!: string;
  @Prop() formulas!: Object;

  public form = { result: '' };
  public syyOptions = [
    {
      label: '实用堰',
      value: syyType.syy
    },
    {
      label: '宽顶堰',
      value: syyType.kdy
    }
  ];

  public shapeOptions = [
    {
      label: '矩形断面',
      value: shapeType.RECTANGLE
    },
    {
      label: '梯形断面',
      value: shapeType.LADDER
    }
  ];

  public tfyTypeOptions = [
    {
      label: 'a型',
      value: tfyType.a
    },
    {
      label: 'b型',
      value: tfyType.b
    }
  ];

  public jkdkbyTypeOptions = [
    {
      label: '方角',
      value: jkdkbyType.fj
    },
    {
      label: '圆角',
      value: jkdkbyType.yj
    }
  ];

    public kechongOptions = [
      {
        label: '难冲',
        value: 0.8
      },
      {
        label: '可冲',
        value: 1.1
      },
      {
        label: '较易冲',
        value: 1.4
      },
      {
        label: '易冲',
        value: 1.8
      }
    ];

  public table221Options = [
    {
      label: '混凝土衬砌',
      options: [
        {
          value: '0.0115',
          label: '壁面顺直,有抹光的水泥浆面层或经磨光表面光滑者'
        },
        {
          value: '0.0125',
          label: '壁面顺直,采用钢模且拼接良好者'
        },
        {
          value: '0.0135',
          label: '壁面顺直,采用木摸拼接缝间凸凹度在3mm~5mm内者'
        },
        {
          value: '0.015',
          label: '壁面不够顺直,木摸拼接不良,缝间凸凹度在5mm~20mm者'
        },
        {
          value: '0.017',
          label: '粗糙的混凝土'
        }
      ]
    },
    {
      label: '喷混凝土',
      options: [
        {
          value: '0.0225',
          label: '岩石表面平整'
        },
        {
          value: '0.030',
          label: '岩石表面高低不平'
        }
      ]
    },
    {
      label: '喷浆护面',
      options: [
        {
          value: '0.0205',
          label: '喷浆护面'
        }
      ]
    },
    {
      label: '水泥浆砌块石护面',
      options: [
        {
          value: '0.0175',
          label: '渠底、壁面较顺直,砌石面较平整,拼接良好,1m2内不平整度约为30mm~50mm者'
        },
        {
          value: '0.025',
          label: '平整度较差'
        }
      ]
    },
    {
      label: '干砌块石或乱石护坡',
      options: [
        {
          value: '0.022',
          label: '渠底、壁面欠顺直,干砌石拼接一般'
        },
        {
          value: '0.029',
          label: '干砌块石平整度较差或乱石护坡'
        }
      ]
    },
    {
      label: '岩石',
      options: [
        {
          value: '0.025',
          label: '经过良好修整的'
        },
        {
          value: '0.0315',
          label: '经过中等修整的'
        },
        {
          value: '0.04',
          label: '未经修整,凸凹甚大者'
        }
      ]
    }
  ]

  public onDemo() {
    this.$emit('beforeOnDemo')
    for (let key in this.data) {
      (this.data as any)[key] = (this.initData as any)[key]
    }
  }

  public onReset() {
    this.$emit('beforeOnReset')
    for (let key in this.data) {
      if (typeof (this.data as any)[key] === 'boolean') {
        (this.data as any)[key] = false
      } else {
        (this.data as any)[key] = ''
      }
    }

    this.form.result = ''
  }

  public onCalculate() {
    this.$emit('beforeOnCalculate')
  }

  public CheckToken() {}
}
</script>

<style lang="scss">
.line {
  text-align: center;
}

.el-form-item__content {
  margin-left: 0px !important;
}
</style>
