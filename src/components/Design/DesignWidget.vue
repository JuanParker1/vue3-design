<template>
  <div class="design-widget" @dragstart="handleDragStart">
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="design-widget-item shadow"
      :draggable="true"
      :data-id="widget.id"
    >
      <span>{{ widget.label }}</span>
      <span>xx</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import widgets from "../../mock/widget";

function handleDragStart(e: any) {
  console.log("handleDragStart");

  e.dataTransfer.setData("id", e.target.dataset.id);
}
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
    cursor: grab;
    background: red;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
