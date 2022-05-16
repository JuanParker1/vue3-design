<template>
  <div class="group">
    <Shape
      v-for="(item, index) in data.list"
      v-model:widgetStyle="item.style"
      :key="item.id"
      :id="item.id"
      :zIndex="index"
    >
      <component class="design-shell-widget" :is="item.component" />
    </Shape>
  </div>
</template>

<script setup lang='ts'>
import Shape from "./Shape.vue";

const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
</style>
