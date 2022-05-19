/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-19 17:24:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-19 20:31:25
 */
import { defineEmits, ref } from "vue";
import { WidgetStyle } from "@/types/widget";
import { getCommonStyle } from "@/utils/style";
import { useAction } from "./useAction";
import { useMarkLine } from "./useMarkLine";
import { useDesignStore } from "@/store/design";
import { calculateComponentPositonAndSize } from "@/hooks/design/useAnglePositon";

export function useShape(emits: any) {
  const { hidenAction } = useAction();
  const { detectionMarkLine, hideMarkLine } = useMarkLine();
  const { setCurrWidget } = useDesignStore();
  let inMove = ref(false);

  // 移动 shape
  function handleMoveShape(e: any, id: string, widgetStyle: WidgetStyle) {
    e.preventDefault();
    e.stopPropagation();

    // 关闭菜单
    hidenAction();
    setCurrWidget(id);

    const { top: widgetY, left: widgetX } = widgetStyle;
    const { clientX: startX, clientY: startY } = e;

    const move = (moveEvent: any) => {
      inMove.value = true;
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
      inMove.value = false;
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  function getShapeStyle(widgetStyle: WidgetStyle) {
    let { rotate, top, left, width, height } = widgetStyle;
    return getCommonStyle({ rotate, top, left, width, height });
  }

  return {
    inMove,
    getShapeStyle,
    handleMoveShape,
  };
}
