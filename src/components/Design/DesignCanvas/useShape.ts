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
    const downEvent = window.event;
    e.stopPropagation();
    e.preventDefault();

    let pot = { ...widgetStyle };
    const { clientX: startX, clientY: startY } = e;

    const move = (moveEvent: any) => {
      const { clientX: currX, clientY: currY } = moveEvent;
      const disX = currX - startX;
      const disY = currY - startY;
      const haveT = /t/.test(point);
      const haveR = /r/.test(point);
      const haveB = /b/.test(point);
      const haveL = /l/.test(point);
      const height = pot.height + (haveT ? -disY : haveB ? disY : 0);
      const width = pot.width + (haveL ? -disX : haveR ? disX : 0);
      const left = pot.left + (haveL ? disX : 0);
      const top = pot.top + (haveT ? disY : 0);

      emits("update:widgetStyle", {
        ...widgetStyle,
        ...{ top, left, height, width },
      });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

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
