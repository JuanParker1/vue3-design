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
    @click="handleDesignContainer"
  >
    <div class="design-shell" ref="canvasRef" @contextmenu="handleActionMenu">
      <Shape
        v-for="(item, index) in widgetList"
        v-model:widgetStyle="item.style"
        :key="item.id"
        :id="item.id"
        :zIndex="index"
        :active="item.id === curWidget.id"
      >
        <component class="design-shell-widget" :is="item.component" />
      </Shape>

      <!-- 右键行动菜单 -->
      <ActionMenu ref="contentMeauRef"></ActionMenu>

      <!-- 辅助线 -->
      <SubLine></SubLine>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, provide } from "vue-demi";
import { useDesignStore } from "@/store/design.ts";
import { useCanvas } from "./useCanvas";
import Shape from "./Shape.vue";
import ActionMenu from "./ActionMenu.vue";
import SubLine from "./SubLine.vue";

const { widgetList, curWidget } = toRefs(useDesignStore());
const { handleDrop, handleDragOver } = useDesignStore();

const canvasRef = ref<HTMLElement | null>(null);
const contentMeauRef = ref<HTMLElement | null>(null);
const { handleActionMenu, handleDesignContainer } = useCanvas(
  contentMeauRef,
  canvasRef
);
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
      width: 100%;
      height: 100%;
    }
  }
}
</style>
