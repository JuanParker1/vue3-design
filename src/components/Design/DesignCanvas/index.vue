<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 15:04:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-25 14:11:44
-->
<template>
  <div
    class="design-container"
    @drop="handleDrop($event, canvasRef)"
    @dragover="handleDragOver"
    @mousedown="selectedArea"
  >
    <div class="design-shell" ref="canvasRef" @contextmenu="handleActionMenu">
      <div class="design-editor">
        <Shape
          v-for="(item, index) in widgetList"
          v-model:widgetStyle="item.style"
          :key="item.id"
          :id="item.id"
          :zIndex="index + 1"
          :active="curWidget && item.id === curWidget.id"
        >
          <Group
            v-if="item.component == 'Group'"
            class="design-shell-widget"
            :group="item"
          />
          <component
            v-else
            class="design-shell-widget"
            :item="item"
            :is="item.component"
          />
        </Shape>
      </div>

      <!-- 当前物料控制容器 -->
      <Grip />

      <!-- 右键行动菜单 -->
      <ActionMenu ref="contentMeauRef" />

      <!-- 辅助线 -->
      <MarkLine />
    </div>
  </div>
  <Area />
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, provide } from "vue-demi";
import { useDesignStore } from "@/store/design";
import { useCanvas } from "./useCanvas";
import { useGroup } from "./useGroup";
import Shape from "./Shape.vue";
import ActionMenu from "./ActionMenu.vue";
import MarkLine from "./MarkLine.vue";
import Area from "./Area.vue";
import Group from "./Group.vue";
import Grip from "./Grip.vue";

const { widgetList, curWidget } = toRefs(useDesignStore());
const { handleDrop, handleDragOver, initCanvaConfig } = useDesignStore();

const canvasRef = ref<HTMLElement | null>(null);
const contentMeauRef = ref<HTMLElement | null>(null);
const { setCanvasRect, handleActionMenu } = useCanvas();
const { selectedArea } = useGroup();

// 渲染后，设置canvasRef
onMounted(() => {
  setCanvasRect(canvasRef);
});
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

    .design-editor {
      position: absolute;
      height: 100%;
      width: 100%;
      overflow: hidden;
      z-index: 1;
    }

    .design-shell-widget {
      position: absolute;
      width: 100%;
      height: 100%;
      // user-select: none;
    }
  }
}
</style>
