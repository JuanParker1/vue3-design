import { useDesignStore } from "@/store/design.ts";
import { useAction } from "./useAction";
import { ref } from "vue";

let canvasRect = ref({});
let areaStyle = ref<any>({});

let inArea = ref(false);
const { openAction, closeAction } = useAction();

export function setCanvasRect(canvasRef: any) {
  canvasRect.value = canvasRef.value.getBoundingClientRect();
}

// 右键打开操作菜单
function handleActionMenu(e: any) {
  e.stopPropagation();
  e.preventDefault();

  const { setCurrWidget } = useDesignStore();
  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  let { target, clientY: currY, clientX: currX } = e;
  let { id } = target;

  if (id) {
    setCurrWidget(id);
  } else {
  }

  openAction({
    top: currY - canvasX,
    left: currX - canvasY,
  });
}

// 选中区域
function handleMouseDown(e: any) {
  closeAction();

  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  const { clientX: startX, clientY: startY } = e;

  areaStyle.left = startX - canvasX;
  areaStyle.top = startY - canvasY;
  inArea.value = true;

  const move = (moveEvent: any) => {
    let { clientX: currX, clientY: currY } = moveEvent;

    areaStyle.width = Math.abs(currX - startX);
    areaStyle.height = Math.abs(currY - startY);

    if (currX < startX) {
      areaStyle.left = currX - canvasX;
    }

    if (currX < startY) {
      areaStyle.top = currX - canvasY;
    }

    console.log("areaStyle", areaStyle);
  };

  const up = () => {
    inArea.value = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

export const useCanvas = () => ({
  inArea,
  areaStyle,
  canvasRect,
  setCanvasRect,
  handleActionMenu,
  handleMouseDown,
});
