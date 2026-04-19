<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter2 } from '@/hycom_lib/chapter2'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema,
  parseAssignmentResult
} from '@/shared/calculations'

type ChangSangAerationResult = {
  raw: string;
  L1?: string;
  d1?: string;
  v?: string;
  L2?: string;
  d0?: string;
  v0?: string;
}

const fields: FieldSchema[] = [
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'h', latex: 'h', type: 'number' },
  { key: 'l', latex: 'l', type: 'number' },
  { key: 'i', latex: 'i', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q: 76,
    b: 10,
    h: 0.3,
    l: 2.174,
    i: 0.138
  },
  description: '深圳某水库,采用开敞式溢洪道,由进口控制段、泄槽段、消力池组成,溢洪道轴线布置与坝轴线垂直,全长约107.5m。控制段为溢流堰,长15.0m,分两孔,每孔过流宽10.0m,中墩厚2m,堰顶高程47.55m,堰高5.0m。堰体的后部与泄槽衔接。泄槽段长83.0m,桩号为0+012.00~0+065.00 段纵坡为13.8% , 桩号为0+065.00~0+095.00 段纵坡为26.7%。为降低下泄水流的流速、减少河床冲刷,采用台阶式泄槽;每个台阶高0.3m,共49 个台阶,每个台阶步长2.174m。泄槽宽度为10m,高3m。泄槽下游与泄洪洞共用消力池,底板顶高程为29.0m。消力池长12.5m,宽23.5m,末端设1.5m 高的尾坎,下设2m 深的混凝土防掏墙。消力池下游设0.5m 厚混凝土护坦与原河道衔接。正常蓄水位47.55m,校核水位49.06m,2000年一遇洪水为校核洪水,洪峰流量185 m^3/s,调蓄后下泄119 m^3/s,溢洪道下泄76 m^3/s。',
  expectedResult: 'L1=34.5300; d1=1.1618; v=6.5416; L2=68.9496; d0=1.2269; v0=6.1945'
}

const formulas = {
  0: 'L_1 :从堰顶算起至掺气点的长度,m',
  1: 'd_1 :掺气点水深,m',
  2: 'v :掺气点平均流速,m/s',
  3: 'L_2 :出现均匀流掺气水流的距离,m',
  4: 'd_0 :均匀掺气水流的水深,m',
  5: 'v_0 :均匀掺气流平均流速,m/s',
  6: 'd_c :临界水深,m',
  7: 'q :单宽流量 m^3/s-m',
  8: '\\alpha :坡角',
  9: 'h :台阶的步高,m',
  10: 'l :台阶的步长,m',
  11: 'k :糙度,m',
  12: 'F :摩擦系数'
}

const resultSchema = createAssignmentResultSchema<ChangSangAerationResult>([
  { key: 'L1', label: 'L1', latex: 'L_1' },
  { key: 'd1', label: 'd1', latex: 'd_1' },
  { key: 'v', label: 'v', latex: 'v' },
  { key: 'L2', label: 'L2', latex: 'L_2' },
  { key: 'd0', label: 'd0', latex: 'd_0' },
  { key: 'v0', label: 'v0', latex: 'v_0' }
])

export default defineComponent({
  name: 'Section161Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.6.1 台阶溢洪道水力计算昌桑计算方法',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const raw = Chapter2.csff263(
            Number(input.Q),
            Number(input.b),
            Number(input.h),
            Number(input.l),
            Number(input.i)
          )

          return raw.includes('=')
            ? parseAssignmentResult<ChangSangAerationResult>(raw)
            : { raw }
        },
        formatResult: (result: ChangSangAerationResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ChangSangAerationResult>
    }
  }
})
</script>
