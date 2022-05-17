<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-12 20:47:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 17:07:48
-->
<template>
  <div class="area" v-show="inArea" :style="getCommonStyle(areaStyle)"></div>
</template>

<script setup lang='ts'>
import { ref, toRefs } from "vue-demi";
import { getCommonStyle } from "@/utils/style";
import { useGroup } from "./useGroup";

const { inArea, areaStyle } = toRefs(useGroup());
</script>

<style lang="scss" scoped>
.area {
  position: absolute;
  border: solid 1px #ff6e7b;
  background: #ff6e7b05;
}
</style>
