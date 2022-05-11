import { defineEmits, ref, toRefs } from "vue";
import { WidgetStyle } from "@/types/widget";
import { getCommonStyle } from "@/utils//style.ts";
import { useActiontore } from "@/store/action.ts";
import { useMarkLine } from "./useMarkLine";
import { useDesignStore } from "@/store/design.ts";
import { useCanvas } from "./useCanvas";

export function useShape(emits: any) {
  const { closeAction } = useActiontore();
  const { detectionMarkLine, hideMarkLine } = useMarkLine();
  const { setCurrWidget } = useDesignStore();
  const { canvasRect } = toRefs(useCanvas());
  const diff: number = 2; // 旋转吸附角度
  let showRotateValue = ref(false);

  // 移动 shape
  function handleMoveShape(e: any, id: string, widgetStyle: WidgetStyle) {
    e.preventDefault();
    e.stopPropagation();

    setCurrWidget(id);

    // 关闭菜单
    closeAction();

    const { top: widgetY, left: widgetX } = widgetStyle;
    const { clientX: startX, clientY: startY } = e;

    const move = (moveEvent: any) => {
      const { clientX: currX, clientY: currY } = moveEvent;

      let left = currX - startX + Number(widgetX);
      let top = currY - startY + Number(widgetY);

      emits("update:widgetStyle", { ...widgetStyle, ...{ top, left } });

      // 开启辅助线检查
      detectionMarkLine();
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      hideMarkLine();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  // 计算 shape 操作圆点位置
  function getShapePonitStyle(point: string, widgetStyle: WidgetStyle) {
    const { width, height } = widgetStyle;
    const haveT = /t/.test(point);
    const haveR = /r/.test(point);
    const haveB = /b/.test(point);
    const haveL = /l/.test(point);
    let left,
      top = 0;

    // 计算四个角位置
    if (point.length == 2) {
      left = haveR ? 100 : 0;
      top = haveB ? 100 : 0;
    } else {
      // 计算上下边两点位置
      if (haveT || haveB) {
        left = 50;
        top = haveB ? 100 : 0;
      }
      // 计算左右边两点位置
      if (haveL || haveR) {
        top = 50;
        left = haveR ? 100 : 0;
      }
    }

    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  }

  // 改变 shape 大小
  function handleShrinkShape(e: any, point: string, widgetStyle: WidgetStyle) {
    e.stopPropagation();
    e.preventDefault();

    let { x: canvasX, y: canvasY } = canvasRect.value as any;
    const { rotate, top: widgetY, left: widgetX, width, height } = widgetStyle;
    const startX = e.clientX - canvasX;
    const startY = e.clientY - canvasY;

    // 物料初始中心点
    const centerPoint = {
      x: widgetX + width / 2,
      y: widgetY + width / 2,
    };

    // 对称点
    const symmetricPoint = {
      x: centerPoint.x - (startX - centerPoint.x),
      y: centerPoint.y - (startY - centerPoint.y),
    };

    const move = (moveEvent: any) => {
      const cuurPoint = {
        x: moveEvent.clientX - canvasX,
        y: moveEvent.clientY - canvasY,
      };

      const curCenterPoint = {
        x: cuurPoint.x + (cuurPoint.x + symmetricPoint.x) / 2,
        y: cuurPoint.y + (cuurPoint.y + symmetricPoint.y) / 2,
      };
      const newTopLeftPoint = calculateRotatedPointCoordinate(
        cuurPoint,
        curCenterPoint,
        -rotate
      );
      const newBottomRightPoint = calculateRotatedPointCoordinate(
        symmetricPoint,
        curCenterPoint,
        -rotate
      );

      const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
      const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

      if (newWidth > 0 && newHeight > 0) {
        emits("update:widgetStyle", {
          ...widgetStyle,
          ...{
            width: Math.round(newWidth),
            height: Math.round(newHeight),
            left: Math.round(newTopLeftPoint.x),
            top: Math.round(newTopLeftPoint.y),
          },
        });
      }
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  function calculateRotatedPointCoordinate(point, center, rotate) {
    return {
      x:
        (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
        (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
        center.x,
      y:
        (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
        (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
        center.y,
    };
  }

  function angleToRadian(angle) {
    return (angle * Math.PI) / 180;
  }

  // -------------------------------------

  // 旋转 shape
  function handleRotateShape(e: any, widgetStyle: WidgetStyle) {
    e.preventDefault();
    e.stopPropagation();

    const { clientX: startX, clientY: startY } = e;
    const { rotate, top: widgetY, left: widgetX, width, height } = widgetStyle;
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

      emits("update:widgetStyle", {
        ...widgetStyle,
        ...{ rotate: standarRotate },
      });
    };

    const up = () => {
      showRotateValue.value = false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    showRotateValue.value = true;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  function getShapeStyle(widgetStyle: WidgetStyle) {
    let { rotate, top, left, width, height } = widgetStyle;
    return getCommonStyle({ rotate, top, left, width, height });
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

  return {
    showRotateValue,
    getShapeStyle,
    getShapePonitStyle,
    handleMoveShape,
    handleRotateShape,
    handleShrinkShape,
  };
}
