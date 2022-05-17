import { useDesignStore } from "@/store/design.ts";
import { useAction } from "./useAction";
import { useCanvas } from "./useCanvas";
import { ref, toRefs } from "vue";
import { sin, cos } from "@/utils/index.ts";
import { createId } from "@/hooks/common";
import { useWidgetAndGroup } from "@/hooks/design/useWidgetAndGroup.ts";

let inArea = ref(false);
let areaStyle = ref<any>({});
let areaWidgets = ref<any>([]);
const { canvasRect } = toRefs(useCanvas());
const { widgetList } = toRefs(useDesignStore());
const { setCurrWidget, deleteWidget } = useDesignStore();
const { openAction, hidenAction } = useAction();
const { decomposeWidget } = useWidgetAndGroup();

// 拖拽选中区域，选择包含物料
function selectedArea(e: any) {
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
    createArea();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

// 拖拽选中区域完成，创建物料区域
function createArea() {
  areaWidgets.value = WidgetsInGroup();
  console.log("areaWidgets", areaWidgets);
  if (!areaWidgets.value.length) hiddenArea();

  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  let top = Infinity,
    left = Infinity;
  let right = -Infinity,
    bottom = -Infinity;

  areaWidgets.value.forEach((w) => {
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

// 遍历区域包含物料
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

// 获取一个物料旋转 rotate 后的样式
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

// 清除区域
function clearArea() {
  hiddenArea();
  areaWidgets.value = [];
}

// 创建组合
function createGroup() {
  const { x: canvasX, y: canvasY } = canvasRect.value as any;
  const { left, top, width, height } = areaStyle.value;
  let style = {
    rotate: 0,
    top: top - canvasY,
    left: left - canvasX,
    width,
    height,
  };

  let group = {
    id: createId(),
    component: "Group",
    style,
    list: [],
  };
  areaWidgets.value.forEach((w) => {
    if (w.component != "group") {
      group.list.push(w);
    } else {
    }
  });

  deleteWidget(areaWidgets.value.map((w) => w.id));
  widgetList.value.push(group);

  clearArea();
  setCurrWidget(group.id);
}

// 拆分组合
function breakGroup(id: string) {
  let group = widgetList.value.find((item) => item.id == id);
  console.log("group", group);
  group.list.forEach((item) => {
    decomposeWidget(item, group, canvasRect.value);
    delete item.groupStyle;
    widgetList.value.push(item);
  });

  deleteWidget(group.id);
  console.log("widgetList", widgetList);
}

export const useGroup = () => ({
  inArea,
  areaStyle,
  areaWidgets,
  selectedArea,
  createGroup,
  breakGroup,
});
