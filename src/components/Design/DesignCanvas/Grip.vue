<!--
 * @Description: 物料控制容器
 * @Autor: WangYuan1
 * @Date: 2022-05-19 17:42:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-19 18:56:49
-->
<template>
  <div
    class="grip"
    v-if="curWidget"
    :style="getCommonStyle(curWidget.style, ['width', 'height', 'rotate'])"
  >
    <!-- 四条边 -->
    <div
      class="absolute bg-#ff6e7b"
      v-for="(line, index) in lines"
      :key="index"
      :style="line"
    ></div>

    <!-- <div
      v-for="(item, index) in points"
      :key="index"
      class="grip-point"
      @mousedown="resizeGripWidget($event, item.name)"
    ></div> -->

    <div
      class="grip-rotate"
      :style="{
        top: `${curWidget.style.height}px`,
        left: `${curWidget.style.width / 2}px`,
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
import { ref, toRefs, computed } from "vue";
import { useDesignStore } from "@/store/design";
import { getCommonStyle } from "@/utils/style";
import { useGrip } from "./useGrip";

const { inRotate, resizeGripWidget, reotateGripWidget } = useGrip();
const { curWidget } = toRefs(useDesignStore());

// const pointList: string[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向

const points = computed(() => [
  {
    name: "lt",
  },
]);

// 四条边动态样式
const lines = computed(() => {
  let style = curWidget.value.style;
  console.log(
    "rotate: `rotate(${style.rotate}deg)`",
    `rotate(${style.rotate}deg)`
  );
  return [
    // top-line
    {
      top: "-3px",
      height: "3px",
      width: `${style.width}px`,
      transform: `rotate(${style.rotate}deg)`,
    },
    // left-line
    {
      left: "-3px",
      top: "-3px",
      width: "3px",
      height: `${style.height + 6}px`,
      transform: `rotate(${style.rotate}deg)`,
    },
    // right-line
    {
      top: "-3px",
      width: "3px",
      left: `${style.width}px`,
      height: `${style.height + 6}px`,
      transform: `rotate(${style.rotate}deg)`,
    },
    // bottom-line
    {
      height: "3px",
      top: `${style.height}px`,
      width: `${style.width}px`,
      transform: `rotate(${style.rotate}deg)`,
    },
  ];
});
</script>


<style lang="scss" scoped>
.grip {
  position: absolute;
  height: 1px;
  width: 1px;
  z-index: 0;
  background: #0e1217;

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
  }

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
}
</style>
