<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 15:04:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-29 17:29:01
-->
<template>
  <div
    ref="canvasRef"
    class="design-container"
    @dragover="handleDragOver"
    @drop="handleDrop($event, canvasRef)"
  >
    <div class="design-shell">
      <Shape
        v-for="item in widgetList"
        :default-style="item.style"
        :style="getShapeStyle(item.style)"
      >
        <component :is="item.component" :style="getWidgetStyle(item.style)" />
      </Shape>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useDesignStore } from "@/store/design";
import Shape from "./Shape";
import { provide } from "vue-demi";

const { handleDrop, handleDragOver } = useDesignStore();
const { widgetList } = toRefs(useDesignStore());
const canvasRef = ref(null);

provide("canvasRef", canvasRef);

function getWidgetStyle(style: any) {
  return {
    width: `100%`,
    height: `100%`,
  };
}

function getShapeStyle(style: any) {
  return {
    position: "absolute",
    top: `${style.top}px`,
    left: `${style.left}px`,
    width: `${style.width}px`,
    height: `${style.height}px`,
  };
}
</script>

<style lang="scss" scoped>
.design-container {
  position: relative;
  width: 100%;
  min-width: 500px;
  height: calc(100vh - 54px);
  overflow: auto;

  .design-shell {
    width: 375px;
    height: 675px;
    background: #fff;
    margin: 30px auto;
  }
}
</style>
