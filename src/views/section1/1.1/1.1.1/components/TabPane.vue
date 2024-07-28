<template>
  <div v-if="type === 't1'">
    <el-table
      :data="table211"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="first"
        label="Hd/H0"
        min-width="150"
        align="center"
      />
      <el-table-column
        label="P1/Hd"
        align="center"
      >
        <el-table-column
          prop="a"
          label="0.2"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="b"
          label="0.4"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="c"
          label="0.6"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="d"
          label="1.0"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="e"
          label=">=1.33"
          min-width="120"
          align="center"
        />
      </el-table-column>
    </el-table>
  </div>
  <div v-else-if="type === 't2'">
    <el-table
      :data="table212"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="first"
        label="上游坝面坡度△y:△x"
        min-width="150"
        align="center"
      />
      <el-table-column
        label="P1/Hd"
        align="center"
      >
        <el-table-column
          prop="a"
          label="0.2"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="b"
          label="0.4"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="c"
          label="0.6"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="d"
          label="0.8"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="e"
          label="1.0"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="f"
          label="1.2"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="g"
          label="1.3"
          min-width="120"
          align="center"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TabPane'
})
export default class extends Vue {
  @Prop({ default: 't1' }) private type!: string;

  data() {
    return {
      table211: [
        {
          first: 0.4,
          a: 0.425,
          b: 0.43,
          c: 0.431,
          d: 0.433,
          e: 0.436
        },
        {
          first: 0.5,
          a: 0.438,
          b: 0.442,
          c: 0.445,
          d: 0.448,
          e: 0.451
        },
        {
          first: 0.6,
          a: 0.45,
          b: 0.455,
          c: 0.458,
          d: 0.46,
          e: 0.464
        },
        {
          first: 0.7,
          a: 0.458,
          b: 0.463,
          c: 0.468,
          d: 0.472,
          e: 0.476
        },
        {
          first: 0.8,
          a: 0.467,
          b: 0.474,
          c: 0.477,
          d: 0.482,
          e: 0.486
        },
        {
          first: 0.9,
          a: 0.473,
          b: 0.48,
          c: 0.485,
          d: 0.491,
          e: 0.494
        },
        {
          first: 1.0,
          a: 0.473,
          b: 0.48,
          c: 0.485,
          d: 0.491,
          e: 0.494
        },
        {
          first: 1.1,
          a: 0.482,
          b: 0.491,
          c: 0.496,
          d: 0.502,
          e: 0.507
        },
        {
          first: 1.2,
          a: 0.485,
          b: 0.495,
          c: 0.499,
          d: 0.506,
          e: 0.51
        },
        {
          first: 1.3,
          a: 0.496,
          b: 0.5,
          c: 0.5,
          d: 0.508,
          e: 0.513
        }
      ],

      table212: [
        {
          first: '3:1',
          a: 1.009,
          b: 1.007,
          c: 1.004,
          d: 1.002,
          e: 1.0,
          f: 0.998,
          g: 0.997
        },
        {
          first: '3:2',
          a: 1.015,
          b: 1.011,
          c: 1.006,
          d: 1.002,
          e: 0.999,
          f: 0.996,
          g: 0.993
        },
        {
          first: '3:3',
          a: 1.021,
          b: 1.015,
          c: 1.007,
          d: 1.002,
          e: 0.998,
          f: 0.993,
          g: 0.988
        }
      ]
    }
  }
}
</script>
