<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 14:49:05
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-25 17:21:35
-->
<template>
  <div class="image w-full h-full">
    <img class="w-full h-full" src="../assets/test.png" @dblclick="dblclick" />
  </div>
</template>

<script setup lang='ts'>
function dblclick() {
  console.log("双击");
}
</script>

<style lang="scss" scoped>
</style>
