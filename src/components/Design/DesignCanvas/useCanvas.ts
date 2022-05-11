import { useDesignStore } from "@/store/design.ts";
import { useActiontore } from "@/store/action.ts";
import { ref } from "vue";

let canvasRect = ref({});
const { openAction, closeAction } = useActiontore();

export function setCanvasRect(canvasRef: any) {
  canvasRect.value = canvasRef.value.getBoundingClientRect();
}

// 右键打开操作菜单
function handleActionMenu(e: any) {
  console.log("e", e);
  e.stopPropagation();
  e.preventDefault();

  const { setCurrWidget } = useDesignStore();

  let { target, clientY: currY, clientX: currX } = e;

  let { id } = target;

  if (id) {
    setCurrWidget(id);
  } else {
  }

  openAction({
    top: currY - canvasRect.value.y,
    left: currX - canvasRect.value.x,
  });
}

export function handleDesignContainer() {
  closeAction();
}

export const useCanvas = () => ({
  canvasRect,
  setCanvasRect,
  handleActionMenu,
  handleDesignContainer,
});
