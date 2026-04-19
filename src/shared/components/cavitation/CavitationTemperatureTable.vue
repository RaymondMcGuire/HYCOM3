<template>
  <div>
    <el-table
      :data="table251"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
      empty-text=" "
    >
      <el-table-column
        label="水温C°"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="水柱高hv(m)"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="0"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.06"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="5"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.09"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="10"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.13"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="15"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.17"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="20"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.24"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="25"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.32"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="30"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.43"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="40"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.75"
          align="center"
        />
      </el-table-column>
    </el-table>

    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CavitationTemperatureTable',
  props: {
    type: {
      type: String,
      default: 't1'
    }
  },
  data() {
    return {
      table251: []
    }
  }
})
</script>
