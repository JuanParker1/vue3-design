<!--
 * @Description: 物料控制容器
 * @Autor: WangYuan1
 * @Date: 2022-05-19 17:42:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-19 20:10:59
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
import { ref, toRefs, computed } from "vue";
import { useDesignStore } from "@/store/design";
import { getCommonStyle } from "@/utils/style";
import { useGrip } from "./useGrip";

let lineThick = 3;
const { inRotate, resizeGripWidget, reotateGripWidget } = useGrip();
const { curWidget } = toRefs(useDesignStore());

// const pointList: string[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向

// grip 中心点样式
const gripStyle = computed(() => {
  let style = curWidget.value.style;

  return {
    ...getCommonStyle(style, ["width", "height"]),
    top: `${style.top + style.height / 2}px `,
    left: `${style.left + style.width / 2}px`,
  };
});

// 8个圆点样式
const points = computed(() => {
  let style = curWidget.value.style;

  return [
    {
      name: "lt",
      style: {
        top: `${-(style.height / 2 + lineThick)}px`,
        left: `${-(style.width / 2)}px`,
      },
    },
    {
      name: "t",
      style: {
        top: `${-(style.height / 2 + lineThick)}px`,
      },
    },
    {
      name: "rt",
      style: {
        top: `${-(style.height / 2 + lineThick)}px`,
        left: `${style.width / 2}px`,
      },
    },
    {
      name: "r",
      style: {
        left: `${style.width / 2}px`,
      },
    },
    {
      name: "rb",
      style: {
        top: `${style.height / 2 + lineThick}px`,
        left: `${style.width / 2}px`,
      },
    },
    {
      name: "b",
      style: {
        top: `${style.height / 2 + lineThick}px`,
      },
    },
    {
      name: "lb",
      style: {
        top: `${style.height / 2 + lineThick}px`,
        left: `${-(style.width / 2)}px`,
      },
    },
    {
      name: "l",
      style: {
        left: `${-(style.width / 2)}px`,
      },
    },
  ];
});

// 四条边动态样式
const lines = computed(() => {
  let style = curWidget.value.style;
  return [
    // top-line
    {
      top: `${-(style.height / 2 + lineThick)}px`,
      left: `${-(style.width / 2)}px`,
      height: `${lineThick}px`,
      width: `${style.width}px`,
    },
    // left-line
    {
      top: `${-(style.height / 2)}px`,
      left: `${-(style.width / 2 + lineThick)}px`,
      height: `${style.height}px`,
      width: `${lineThick}px`,
    },
    // right-line
    {
      top: `${-(style.height / 2)}px`,
      left: `${style.width / 2}px`,
      height: `${style.height}px`,
      width: `${lineThick}px`,
    },
    // bottom-line
    {
      top: `${style.height / 2}px`,
      left: `${-(style.width / 2)}px`,
      height: `${lineThick}px`,
      width: `${style.width}px`,
    },
  ];
});
</script>


<style lang="scss" scoped>
.grip {
  position: absolute;
  height: 0.5px;
  width: 0.5px;
  z-index: 0;
  background: #0e1217;
  z-index: 1;

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
