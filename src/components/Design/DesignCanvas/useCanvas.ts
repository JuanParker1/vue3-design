import { useDesignStore } from "@/store/design.ts";
import { useAction } from "./useAction";
import { ref, toRefs } from "vue";
import { sin, cos } from "@/utils/index.ts";
import { calculateComponentPositonAndSize } from "@/hooks/design/useAnglePositon";

let inArea = ref(false);
let canvasRect = ref({});
let areaStyle = ref<any>({});
const { widgetList } = toRefs(useDesignStore());
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
    top: currY - canvasX,
    left: currX - canvasY,
  });
}

// 选中区域
function handleMouseDown(e: any) {
  e.stopPropagation();
  e.preventDefault();

  hidenAction();
  hiddenArea();

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
    createGroup();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

function createGroup() {
  const widgets = WidgetsInGroup();
  if (!widgets.length) hiddenArea();

  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  let top = Infinity,
    left = Infinity;
  let right = -Infinity,
    bottom = -Infinity;

  widgets.forEach((w) => {
    let style;

    style = getComponentRotatedStyle(w.style);

    if (style.left < left) left = style.left;
    if (style.top < top) top = style.top;
    if (style.right > right) right = style.right;
    if (style.bottom > bottom) bottom = style.bottom;
  });

  areaStyle.value = {
    left: left + canvasX,
    top: top + canvasY,
    width: right - left,
    height: bottom - top,
  };
  setCurrWidget(null);
}

// 选中区域包含物料
function WidgetsInGroup() {
  const {
    left: areaLeft,
    top: areaTop,
    width: areaWidth,
    height: areaHeight,
  } = areaStyle.value;
  const { x: canvasX, y: canvasY } = canvasRect.value as any;

  return widgetList.value.filter((w) => {
    const { left, top, width, height } = w.style;
    if (
      areaLeft <= left + canvasX &&
      areaTop <= top + canvasY &&
      areaLeft + areaWidth >= left + width + canvasX &&
      areaTop + areaHeight >= top + height + canvasY
    ) {
      return true;
    }
  });
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
  style = { ...style };
  if (style.rotate != 0) {
    const newWidth =
      style.width * cos(style.rotate) + style.height * sin(style.rotate);
    const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
    style.left += diffX;
    style.right = style.left + newWidth;

    const newHeight =
      style.height * cos(style.rotate) + style.width * sin(style.rotate);
    const diffY = (newHeight - style.height) / 2; // 始终是正
    style.top -= diffY;
    style.bottom = style.top + newHeight;

    style.width = newWidth;
    style.height = newHeight;
  } else {
    style.bottom = style.top + style.height;
    style.right = style.left + style.width;
  }

  return style;
}

// 隐藏区域，重置样式
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
