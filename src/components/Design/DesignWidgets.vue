<template>
  <div class="design-widget" @dragstart="handleDragStart">
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="design-widget-item shadow"
      :draggable="true"
      :data-component="widget.component"
    >
      <span>{{ widget.label }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import widgets from "../../mock/widget";
import { useDesignStore } from "@/store/design";

const { handleDragStart } = useDesignStore();
</script>

<style lang="scss" scoped>
.design-widget {
  display: flex;
  width: 200px;
  height: 100%;
  background: #fff;

  .design-widget-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 12px;
    color: #fff;
    background: #ff6e7b;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
