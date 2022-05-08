<template>
  <ul class="sub-line">
    <li
      class="sub-line-item"
      :class="line.type.includes('x') ? 'xline' : 'yline'"
      :style="line.style"
      v-for="(line, index) in lines"
      v-show="line.show"
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
    background: #59c7f9;
    z-index: 1000;
  }

  .xline {
    width: 100%;
    height: 1px;
  }

  .yline {
    width: 1px;
    height: 100%;
  }
}
</style>