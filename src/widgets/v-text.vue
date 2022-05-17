<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 14:49:05
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 18:41:10
-->
<template>
  <div class="text">
    <img class="w-full h-full" src="../assets/test.png" @click="clickItem"/>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "@vue/reactivity";

let text = ref("text");
function clickItem(){
  console.log('clickItem');
  
}
</script>

<style lang="scss" scoped>
</style>
