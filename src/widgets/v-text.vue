<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 14:49:05
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-27 14:50:42
-->
<template>
  <div class="text " >
    {{ text }}
  </div>
</template>

<script setup lang='ts'>
import { ref } from "@vue/reactivity";

let text = ref("text");
</script>

<style lang="scss" scoped>
</style>
