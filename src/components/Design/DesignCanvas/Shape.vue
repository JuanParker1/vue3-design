<template>
  <div class="shape" @mousedown="handleMoveShape($event, props.widgetStyle)">
    <slot></slot>
    <div
      v-for="(item, index) in pointList"
      :key="index"
      class="shape-point"
      :class="'shape-point-' + item"
      :style="getShapePonitStyle(item, props.widgetStyle)"
      @mousedown="handleShrinkShape($event, item, props.widgetStyle)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import { useShape } from "./useShape";

const props = defineProps({
  widgetStyle: {
    type: Object,
    default: {},
  },
});

const emits = defineEmits(["update:widgetStyle"]);

const { handleMoveShape, getShapePonitStyle, handleShrinkShape } =
  useShape(emits);

const pointList: string[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  border: 3px solid #ff6e7b;

  &:hover {
    cursor: move;
  }

  .shape-point {
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    position: absolute;
    z-index: 100;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 20%);
    border: 1px solid #ff6e7b;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: e-resize;

    &-l {
      margin-left: -1px;
      cursor: w-resize;
      width: 8px;
      height: 18px;
      border-radius: 4px;
    }

    &-r {
      margin-left: 1px;
      cursor: w-resize;
      width: 8px;
      height: 18px;
      border-radius: 4px;
    }

    &-t {
      margin-top: -1px;
      cursor: n-resize;
      width: 18px;
      height: 8px;
      border-radius: 4px;
    }

    &-b {
      margin-top: 1px;
      cursor: n-resize;
      width: 18px;
      height: 8px;
      border-radius: 4px;
    }
  }
}
</style>