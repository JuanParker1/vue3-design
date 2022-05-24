<!--
 * @Description: 物料控制容器
 * @Autor: WangYuan1
 * @Date: 2022-05-19 17:42:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-24 20:10:35
-->
<template>
  <div class="grip" v-if="curWidget" :style="gripStyle">
    <!-- 四条边 -->
    <div
      class="absolute bg-#ff6e7b"
      v-for="(line, index) in lines"
      :key="index"
      :style="line"
    ></div>

    <!-- 8个圆点 -->
    <div
      v-for="(item, index) in points"
      :key="index"
      class="grip-point"
      :class="'grip-point-' + item.name"
      :style="item.style"
      @mousedown="resizeGripWidget($event, item.name)"
    ></div>

    <!-- 旋转按钮 -->
    <div
      class="grip-rotate"
      :style="{
        top: `${curWidget.style.height / 2}px`,
      }"
      @mousedown.stop="reotateGripWidget"
    >
      <img src="https://s.tuguaishou.com/site/editor/assetRotate.svg" />
      <span v-show="inRotate" class="grip-rotat-val"
        >{{ Math.round(curWidget.style.rotate) }}°</span
      >
    </div>
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from "vue";
import { useDesignStore } from "@/store/design";
import { useGrip } from "./useGrip";

const { gripStyle, inRotate, points, lines } = toRefs(useGrip());
const { curWidget } = toRefs(useDesignStore());
const { resizeGripWidget, reotateGripWidget } = useGrip();
</script>


<style lang="scss" scoped>
.grip {
  position: absolute;
  height: 0.5px;
  width: 0.5px;
  z-index: 0;
  z-index: 1;

  .grip-rotate {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 4;
    margin: 14px 0 0 -11px;
    user-select: none;

    &:hover {
      cursor: url(https://s.tuguaishou.com/site/editor/hand.png) 8 8, auto;
    }

    .grip-rotat-val {
      position: absolute;
      top: 40px;
      left: 50%;
      height: 28px;
      padding: 0 8px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: #fff;
      background: #0e1217;
      border-radius: 4px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  .grip-point {
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    position: absolute;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 20%);
    border: 1px solid #ff6e7b;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
    box-sizing: content-box;
    cursor: e-resize;

    &-l {
      margin-left: -2px;
      cursor: w-resize;
      width: 8px;
      height: 18px;
      border-radius: 4px;
    }

    &-r {
      margin-left: 2px;
      cursor: w-resize;
      width: 8px;
      height: 18px;
      border-radius: 4px;
    }

    &-t {
      margin-top: 1px;
      cursor: n-resize;
      width: 18px;
      height: 8px;
      border-radius: 4px;
    }

    &-b {
      margin-top: -1px;
      cursor: n-resize;
      width: 18px;
      height: 8px;
      border-radius: 4px;
    }

    &-lt {
      margin: 1px 0 0 -1px;
    }

    &-rt {
      margin: 1px 0 0 1px;
    }

    &-lb {
      margin: -1px 0 0 -1px;
    }

    &-rb {
      margin: -1px 0 0 1px;
    }
  }
}
</style>
