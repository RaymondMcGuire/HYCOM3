<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:57:35
 * @FilePath: \hycom_app\src\views\chapter1\2.1\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <h3>5.4拱坝跌流消能</h3>
    </div>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </el-card>
</template>

<script lang="ts">
export default {}
</script>
