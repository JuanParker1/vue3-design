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

  const { clientX: startX, clientY: startY } = e;

  areaStyle.value.left = startX;
  areaStyle.value.top = startY;
  inArea.value = true;

  const move = (moveEvent: any) => {
    let { clientX: currX, clientY: currY } = moveEvent;

    areaStyle.value.width = Math.abs(currX - startX);
    areaStyle.value.height = Math.abs(currY - startY);

    if (currX < startX) {
      areaStyle.value.left = currX;
    }

    if (currY < startY) {
      areaStyle.value.top = currY;
    }
  };

  const up = () => {
    hiddenArea();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function hiddenArea() {
  inArea.value = false;
  areaStyle.value = {};
}

export const useCanvas = () => ({
  inArea,
  areaStyle,
  canvasRect,
  setCanvasRect,
  handleActionMenu,
  handleMouseDown,
});
