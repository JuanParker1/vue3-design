<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 15:04:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-07 17:14:37
-->
<template>
  <div
    class="design-container"
    @dragover="handleDragOver"
    @drop="handleDrop($event, canvasRef)"
  >
    <div
      class="design-shell"
      ref="canvasRef"
      @contextmenu="handleContextMenu($event)"
    >
      <Shape
        v-for="item in widgetList"
        v-model:widgetStyle="item.style"
        :key="item.id"
        :id="item.id"
        :active="item.id === curWidget.id"
        :style="getShapeStyle(item.style)"
      >
        <component
          class="design-shell-widget"
          :is="item.component"
          :style="getWidgetStyle(item.style)"
        />
      </Shape>

      <ContextMenu ref="ContentMeauRef"></ContextMenu>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, provide } from "vue-demi";
import { useDesignStore } from "@/store/design.ts";
import { useCanvas } from "./useCanvas";
import Shape from "./Shape.vue";
import ContextMenu from "./ContextMenu.vue";

const { handleDrop, handleDragOver } = useDesignStore();
const { widgetList, curWidget } = toRefs(useDesignStore());

const canvasRef = ref<HTMLElement | null>(null);
const ContentMeauRef = ref<HTMLElement | null>(null);
const { handleContextMenu } = useCanvas(ContentMeauRef);
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
    position: relative;
    width: 375px;
    height: 675px;
    background: #fff;
    margin: 30px auto;

    .design-shell-widget {
      position: absolute;
    }
  }
}
</style>
