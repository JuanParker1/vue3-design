/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-09 10:52:50
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 17:04:54
 */
import { useDesignStore } from "@/store/design";
import { useAction } from "./useAction";
import { ref, toRefs } from "vue";

let canvasRect = ref({});
const { setCurrWidget } = useDesignStore();
const { openAction, hidenAction } = useAction();

export function setCanvasRect(canvasRef: any) {
  canvasRect.value = canvasRef.value.getBoundingClientRect();
}

// 右键打开操作菜单
function handleActionMenu(e: any) {
  console.log("右键打开操作菜单");
  e.stopPropagation();
  e.preventDefault();

  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  let { target, clientY: currY, clientX: currX } = e;
  let { id } = target;

  if (id) {
    setCurrWidget(id);
  } else {
  }

  openAction({
    left: currX - canvasX,
    top: currY - canvasY,
  });
}

export const useCanvas = () => ({
  canvasRect,
  setCanvasRect,
  handleActionMenu,
});
