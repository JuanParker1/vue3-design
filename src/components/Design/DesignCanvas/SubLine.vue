<template>
  <ul class="sub-line">
    <li
      :style="line.style"
      class="sub-line-item"
      :class="line.type == 'x' ? 'xline' : 'yline'"
      v-for="(line, index) in lines"
      :key="index"
    ></li>
  </ul>
</template>

<script lang="ts" setup>
import { useSubLine } from "./useSubLine";

const { lines } = useSubLine();
</script>

<style lang="scss" scoped>
.sub-line {
  .sub-line-item {
    position: absolute;
    z-index: 1000;
  }

  .yline {
    background-image: linear-gradient(
      to right,
      #ff6e7b 35%,
      rgba(255, 255, 255, 0) 0%
    ); /* 35%设置虚线点x轴上的长度 */
    background-position: bottom; /* top配置上边框位置的虚线 */
    background-size: 10px 1px; /* 第一个参数设置虚线点的间距；第二个参数设置虚线点y轴上的长度 */
    background-repeat: repeat-x;
  }

  .xline {
    background-image: linear-gradient(
      #ff6e7b 35%,
      rgba(255, 255, 255, 0) 0%
    ); /* 35%设置虚线点y轴上的长度 */
    background-position: left; /* right配置右边框位置的虚线 */
    background-size: 1px 10px; /* 第一个参数设置虚线点x轴上的长度；第二个参数设置虚线点的间距 */
    background-repeat: repeat-y;
  }
}
</style>