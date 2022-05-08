import { defineEmits } from "vue";
import { WidgetStyle } from "@/types/widget";
import { getCommonStyle } from "@/utils//style.ts";
import { useActiontore } from "@/store/action.ts";
import { useSubLine } from './useSubLine'


export function useShape(emits: any) {
  const { closeAction } = useActiontore();
  const { detectionSubLine } = useSubLine()

  // 移动 shape
  function handleMoveShape(e: any, widgetStyle: WidgetStyle) {
    e.preventDefault();
    e.stopPropagation();

    // 关闭菜单
    closeAction()

    const { top: widgetY, left: widgetX } = widgetStyle;
    const { clientX: startX, clientY: startY } = e;

    const move = (moveEvent: any) => {
      const { clientX: currX, clientY: currY } = moveEvent;

      let left = currX - startX + Number(widgetX);
      let top = currY - startY + Number(widgetY);

      emits("update:widgetStyle", { ...widgetStyle, ...{ top, left } });

      // 开启辅助线检查
      detectionSubLine()
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
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
  function handleShrinkShape(
    e: any,
    point: string,
    widgetStyle: WidgetStyle
  ) {
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

  function getShapeStyle(widgetStyle: WidgetStyle) {
    let { top, left, width, height } = widgetStyle
    return getCommonStyle({ top, left, width, height })
  }

  return { handleMoveShape, getShapePonitStyle, handleShrinkShape, getShapeStyle };
}
