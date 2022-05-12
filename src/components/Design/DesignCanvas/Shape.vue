<template>
  <div
    class="shape"
    :style="getShapeStyle(props.widgetStyle)"
    @mousedown="handleMoveShape($event, props.id, props.widgetStyle)"
  >
    <div class="shape-mask" :id="id"></div>

    <slot></slot>

    <template v-if="active">
      <template v-if="!inMove">
        <!-- 旋转按钮 -->
        <div
          class="shape-rotate"
          @mousedown="handleRotateShape($event, props.widgetStyle)"
        >
          <img src="https://s.tuguaishou.com/site/editor/assetRotate.svg" />
          <span v-show="inRotate" class="shape-rotat-val"
            >{{ Math.round(props.widgetStyle.rotate) }}°</span
          >
        </div>

        <!-- 操作圆点 -->
        <div
          v-for="(item, index) in pointList"
          :key="index"
          class="shape-point"
          :class="'shape-point-' + item"
          :style="getShapePonitStyle(item, props.widgetStyle)"
          @mousedown="handleShrinkShape($event, item, props.widgetStyle)"
        ></div>

        <div class="shape-line"></div>
      </template>
      <template v-else>
        <div class="shape-move"></div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import { useShape } from "./useShape";
import { useDesignStore } from "@/store/design.ts";

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

const {
  inMove,
  inRotate,
  getShapeStyle,
  getShapePonitStyle,
  handleMoveShape,
  handleShrinkShape,
  handleRotateShape,
} = useShape(emits);
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  .shape-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10000;
    &:hover {
      cursor: move;
      border: 1px solid #ff6e7b;
    }
  }
  .shape-rotate {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 4;
    margin: 14px 0 0 -11px;

    &:hover {
      cursor: url(https://s.tuguaishou.com/site/editor/hand.png) 8 8, auto;
    }

    .shape-rotat-val {
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

  .shape-line {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid #ff6e7b;
    z-index: 99;
  }

  .shape-move {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid #ff6e7b;
    opacity: 0.2;
    z-index: 99;
  }

  .shape-point {
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    position: absolute;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 20%);
    border: 1px solid #ff6e7b;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
    cursor: e-resize;

    &-l {
      margin-left: 1px;
      cursor: w-resize;
      width: 8px;
      height: 18px;
      border-radius: 4px;
    }

    &-r {
      margin-left: -1px;
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
      margin: 2px 0 0 2px;
    }

    &-rt {
      margin: 0 0 0 -2px;
    }

    &-lb {
      margin: -2px 0 0 2px;
    }

    &-rb {
      margin: -2px 0 0 -2px;
    }
  }
}
</style>