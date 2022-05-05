<template>
  <div class="shape" @mousedown="handleMouseDownOnShape">
    <slot></slot>
    <div
      v-for="(item, index) in pointList"
      :key="index"
      class="shape-point"
      :style="getShapePonitStyle(item)"
      @mousedown="MouseDownOnPoint(item)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { inject, toRefs } from "vue-demi";
import { useDesignStore } from "@/store/design";

const props = defineProps({
  defaultStyle: {
    type: Object,
    default: {},
  },
});

const canvasRef = inject("canvasRef");

const { setShapeStyle, getCurrWidget } = useDesignStore();
const { curWidget } = toRefs(useDesignStore());

const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向

// 移动shape
function handleMouseDownOnShape(e: any) {
  console.log("handleMouseDownOnShape");
  console.log("handleMouseDownOnShape");
  e.preventDefault();
  e.stopPropagation();

  const { top: widgetY, left: widgetX } = props.defaultStyle;
  const { clientX: startX, clientY: startY } = e;

  const move = (moveEvent: any) => {
    const { clientX: currX, clientY: currY } = moveEvent;

    let left = currX - startX + Number(widgetX);
    let top = currY - startY + Number(widgetY);

    // setShapeStyle({ top, left });
    curWidget.value.style.top = top;
    curWidget.value.style.left = left;
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

// 计算 shape 8个圆点位置
function getShapePonitStyle(point: string) {
  const { width, height } = toRefs(props.defaultStyle);
  const haveT = /t/.test(point);
  const haveR = /r/.test(point);
  const haveB = /b/.test(point);
  const haveL = /l/.test(point);
  let left,
    top = 0;

  // 计算四个角位置
  if (point.length == 2) {
    left = haveR ? width.value : 0;
    top = haveB ? height.value : 0;
  } else {
    // 计算上下边两点位置
    if (haveT || haveB) {
      left = width.value / 2;
      top = haveB ? height.value : 0;
    }
    // 计算左右边两点位置
    if (haveL || haveR) {
      top = height.value / 2;
      left = haveR ? width.value : 0;
    }
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
}

function MouseDownOnPoint(point: string) {
  const e = window.event;
  e.preventDefault();

  let pot = curWidget.value.style;
  const { clientX: startX, clientY: startY } = e;

  const move = (moveEvent: any) => {
    const { clientX: currX, clientY: currY } = moveEvent;
    const disX = currX - startX;
    const disY = currY - startY;
    console.log('currY', currY);
    console.log('startY', startY);
    console.log('disY', disY);
    const haveT = /t/.test(point);
    const haveR = /r/.test(point);
    const haveB = /b/.test(point);
    const haveL = /l/.test(point);
    const height = pot.height + (haveT ? -disY : haveB ? disY : 0);
    console.log("pot.height", pot.height);
    console.log(
      "haveT ? -disY : haveB ? disY : 0",
      haveT ? -disY : haveB ? disY : 0
    );
    const width = pot.width + (haveL ? -disX : haveR ? disX : 0);
    const left = pot.left + (haveL ? disX : 0);
    const top = pot.top + (haveT ? disY : 0);

    // setShapeStyle({ top, left, height, width });
    curWidget.value.style.top = top;
    curWidget.value.style.left = left;
    curWidget.value.style.height = height;
    curWidget.value.style.width = width;
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  border: 3px solid #ff4555;

  &:hover {
    cursor: move;
  }

  .shape-point {
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    position: absolute;
    margin-top: -8px;
    margin-left: -8px;
    border-radius: 50%;
    z-index: 100;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 20%);
    border: 1px solid #ff4555;
    cursor: e-resize;
  }
}
</style>