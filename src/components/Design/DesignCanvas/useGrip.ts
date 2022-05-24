/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-19 18:27:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-24 19:11:05
 */
import { ref, toRefs, computed } from "vue";
import { useDesignStore } from "@/store/design";
import { useCanvas } from "./useCanvas";
import { calculateComponentPositonAndSize } from "@/hooks/design/useAnglePositon";
import { getCommonStyle } from "@/utils/style";
import _ from "lodash";

const diff: number = 2; // 旋转吸附角度
let lineThick: number = 3; // 框边厚度
let inRotate = ref(false);
const { curWidget } = toRefs(useDesignStore());
const { canvasRect } = toRefs(useCanvas());
const { setCurrWidgetStyle } = useDesignStore();

let textWidget = ["v-text"]; // 文本物料，取消上下操作圆点，增加随物料大小改变字体大小功能

// grip 中心点样式
const gripStyle = computed(() => {
  let style = curWidget.value.style;

  return getCommonStyle(
    {
      ...style,
      ...{
        top: style.top + style.height / 2,
        left: style.left + style.width / 2,
      },
    },
    ["width", "height"]
  );
});

// 从中心的计算8个圆点样式
const points = computed(() => {
  let style = curWidget.value.style;

  let basisPoint = [
    {
      name: "lt",
      style: getCommonStyle({
        top: -(style.height / 2 + lineThick),
        left: -(style.width / 2),
      }),
    },

    {
      name: "rt",
      style: getCommonStyle({
        top: -(style.height / 2 + lineThick),
        left: style.width / 2,
      }),
    },
    {
      name: "r",
      style: getCommonStyle({
        left: style.width / 2,
      }),
    },
    {
      name: "rb",
      style: getCommonStyle({
        top: style.height / 2 + lineThick,
        left: style.width / 2,
      }),
    },

    {
      name: "lb",
      style: getCommonStyle({
        top: style.height / 2 + lineThick,
        left: -(style.width / 2),
      }),
    },
    {
      name: "l",
      style: getCommonStyle({
        left: -(style.width / 2),
      }),
    },
  ];

  // 文本类物料不包含上下节点
  let otherPoint = !textWidget.includes(curWidget?.value?.component)
    ? [
        {
          name: "t",
          style: getCommonStyle({
            top: -(style.height / 2 + lineThick),
          }),
        },
        {
          name: "b",
          style: getCommonStyle({
            top: style.height / 2 + lineThick,
          }),
        },
      ]
    : [];

  return [...basisPoint, ...otherPoint];
});

// 从中心的计算四条边动态样式
const lines = computed(() => {
  let style = curWidget.value.style;
  return [
    // top-line
    getCommonStyle({
      top: -(style.height / 2 + lineThick),
      left: -(style.width / 2),
      height: lineThick,
      width: style.width,
    }),
    // left-line
    getCommonStyle({
      top: -(style.height / 2),
      left: -(style.width / 2 + lineThick),
      height: style.height,
      width: lineThick,
    }),
    // right-line
    getCommonStyle({
      top: -(style.height / 2),
      left: style.width / 2,
      height: style.height,
      width: lineThick,
    }),
    // bottom-line
    getCommonStyle({
      top: style.height / 2,
      left: -(style.width / 2),
      height: lineThick,
      width: style.width,
    }),
  ];
});

// 调整物料大小
function resizeGripWidget(e: any, point: string) {
  e.stopPropagation();
  e.preventDefault();

  const style: any = { ...curWidget.value?.style };

  // 组件宽高比
  const proportion = style.width / style.height;

  // 获取画布位移信息
  const { x: canvasX, y: canvasY } = canvasRect.value as any;

  // 当前点击坐标
  const curPoint = {
    x: e.clientX - canvasX,
    y: e.clientY - canvasY,
  };

  // 组件中心点
  let center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  };

  // 获取对称点的坐标
  let symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };

  // 调整直角点时，保持比例改变
  const isAnglePoint = point.length == 2;
  let isFirst = true;

  const move = (moveEvent: any) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }

    const curPositon = {
      x: moveEvent.clientX - canvasX,
      y: moveEvent.clientY - canvasY,
    };

    // 调整text物料宽度时，获取text物料最新高度计算（文字跨行高度会变化）
    if (textWidget.includes(curWidget?.value?.component)) {
      let height = document.getElementById(curWidget.value.id).offsetHeight;

      // 操作边圆点
      if (!isAnglePoint) {
        style.height = height;
      }
    }

    calculateComponentPositonAndSize(
      point,
      style,
      curPositon,
      proportion,
      isAnglePoint,
      {
        center,
        curPoint,
        symmetricPoint,
      }
    );

    // 调整text物料大小时，随其高度变化改变字体大小
    if (textWidget.includes(curWidget?.value?.component)) {
      // 操作角圆点
      if (isAnglePoint) {
        let scale = style.height / curWidget.value.style.height;
        style.fontSize *= scale;
      }
    }

    setCurrWidgetStyle(style);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

// 旋转物料
function reotateGripWidget(e: any) {
  e.preventDefault();
  e.stopPropagation();

  if (!curWidget.value) return;

  const { clientX: startX, clientY: startY } = e;
  const {
    rotate,
    top: widgetY,
    left: widgetX,
    width,
    height,
  } = curWidget.value?.style;

  const centerX = widgetX + width / 2 + canvasRect.value.x;
  const centerY = widgetY + height / 2 + canvasRect.value.y;

  const move = (moveEvent: any) => {
    let { clientX: currX, clientY: currY } = moveEvent;

    // 旋转前的角度
    const rotateBefore =
      Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);
    // 旋转后的角度
    const rotateAfter =
      Math.atan2(currY - centerY, currX - centerX) / (Math.PI / 180);

    let standarRotate = getStandarRotate(rotate + rotateAfter - rotateBefore);

    setCurrWidgetStyle({ rotate: standarRotate });
  };

  const up = () => {
    inRotate.value = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  inRotate.value = true;
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

// 定义平台标准旋转角度（顺时针0-360°）
function getStandarRotate(rotate: number) {
  // 如果旋转大于等于360°，减去360°
  rotate = rotate >= 360 ? rotate - 360 : rotate;
  // 设置标准角度
  let result = rotate < -180 ? rotate + 360 : rotate;
  // 吸附
  return isNearly(result);
}

// 是否达到旋转角度吸附范围
function isNearly(target: number) {
  // 吸附0°
  if (Math.abs(target - 0) <= diff) {
    return 0;
  }
  // 吸附90°
  if (Math.abs(target - 90) <= diff) {
    return 90;
  }
  // 吸附-180°
  if (180 - target <= diff || Math.abs(-180 - target) <= diff) {
    return -180;
  }
  // 吸附-90°
  if (Math.abs(target - -90) <= diff) {
    return -90;
  }

  return target;
}

export const useGrip = () => ({
  gripStyle,
  points,
  lines,
  inRotate,
  resizeGripWidget,
  reotateGripWidget,
});
