<template>
  <div class="group">
    <Shape
      v-for="(item, index) in data.list"
      v-model:widgetStyle="item.style"
      :key="item.id"
      :id="item.id"
    >
      <component class="design-shell-widget" :is="item.component" />
    </Shape>
  </div>
</template>

<script setup lang='ts'>
import Shape from "./Shape.vue";
import { getCommonStyle } from "@/utils/style.ts";

const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.group {
  // position: absolute;
  background: #444972;

  .design-shell-widget {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
