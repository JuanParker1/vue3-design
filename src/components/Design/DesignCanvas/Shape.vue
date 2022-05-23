<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-19 17:25:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-23 11:13:45
-->
<template>
  <div
    class="shape"
    :style="getShapeStyle(props.widgetStyle)"
    @mousedown="handleMoveShape($event, props.id, props.widgetStyle)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import { useShape } from "./useShape";
import { useDesignStore } from "@/store/design";

const props = defineProps({
  widgetStyle: {
    type: Object,
    default: {},
  },
  active: {
    type: Boolean,
  },
  id: {
    type: String,
  },
});

const pointList: string[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向

const emits = defineEmits(["update:widgetStyle"]);

const { setCurrWidget } = useDesignStore();

const { inMove, getShapeStyle, handleMoveShape } = useShape(emits);
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  box-sizing: content-box;

  &:hover {
    cursor: move;
    outline: 1px solid #ff6e7b !important;
  }
}
</style>