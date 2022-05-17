import { ref, toRef, toRefs } from "vue";
import { useDesignStore } from "@/store/design";
import { getCommonStyle } from "@/utils/style";
import { sin, cos } from "@/utils/index";
interface MarkLine {
  type: string;
  style: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

interface LineShape {
  top: number;
  left: number;
  height: number;
  width: number;
  bottom: number;
  right: number;
  centerX: number;
  centerY: number;
}

const diff: number = 5;
const lines = ref<MarkLine[]>([]);

const { widgetList, curWidget } = toRefs(useDesignStore());
const { setCurrWidgetStyle } = useDesignStore();

// 移动显示辅助线
function detectionMarkLine() {
  hideMarkLine();
  if (!curWidget) return;

  let style: any = { ...curWidget.value.style };
  let curr = getLineShape(curWidget.value.style);

  widgetList.value
    .filter((w: any) => w.id != curWidget.value.id)
    .forEach((w: any) => {
      let item: any = getLineShape(w.style);
      let location = "";

      // 上下移动，匹配中间辅助线
      if ((location = matchY(curr.centerY, item))) {
        setCurrWidgetStyle({
          top: style.top - NearlyValue(curr.centerY, item[location]),
        });
        addLine(
          "y",
          item[location],
          Math.min(curr.left, item.left),
          Math.max(curr.right, item.right)
        );
        return;
      }

      // 上下移动，匹配上边辅助线
      if ((location = matchY(curr.top, item))) {
        setCurrWidgetStyle({
          top: style.top - NearlyValue(curr.top, item[location]),
        });

        addLine(
          "y",
          item[location],
          Math.min(curr.left, item.left),
          Math.max(curr.right, item.right)
        );
        return;
      }

      // 上下移动，匹配下边辅助线
      if ((location = matchY(curr.bottom, item))) {
        setCurrWidgetStyle({
          top: style.top - NearlyValue(curr.bottom, item[location]),
        });
        addLine(
          "y",
          item[location],
          Math.min(curr.left, item.left),
          Math.max(curr.right, item.right)
        );
        return;
      }

      // 左右移动，匹配中间辅助线
      if ((location = matchX(curr.centerX, item))) {
        setCurrWidgetStyle({
          left: style.left - NearlyValue(curr.centerX, item[location]),
        });
        addLine(
          "x",
          item[location],
          Math.min(curr.top, item.top),
          Math.max(curr.bottom, item.bottom)
        );
        return;
      }

      // 左右移动，匹配左边辅助线
      if ((location = matchX(curr.left, item))) {
        setCurrWidgetStyle({
          left: style.left - NearlyValue(curr.left, item[location]),
        });
        addLine(
          "x",
          item[location],
          Math.min(curr.top, item.top),
          Math.max(curr.bottom, item.bottom)
        );
        return;
      }

      // 左右移动，匹配右边辅助线
      if ((location = matchX(curr.right, item))) {
        setCurrWidgetStyle({
          left: style.left - NearlyValue(curr.right, item[location]),
        });
        addLine(
          "x",
          item[location],
          Math.min(curr.top, item.top),
          Math.max(curr.bottom, item.bottom)
        );
        return;
      }
    });
}

// 拖拽物料匹配目标物料纵轴对齐点
function matchY(dragValue: number, target: any) {
  if (isNearly(dragValue, target.top)) return "top";
  if (isNearly(dragValue, target.centerY)) return "centerY";
  if (isNearly(dragValue, target.bottom)) return "bottom";
  return "";
}

// 拖拽物料匹配目标物料横轴对齐点
function matchX(dragValue: number, target: any) {
  if (isNearly(dragValue, target.left)) return "left";
  if (isNearly(dragValue, target.centerX)) return "centerX";
  if (isNearly(dragValue, target.right)) return "right";
  return "";
}

// 是否达到吸附范围
function isNearly(dragValue: number, targetValue: number) {
  return Math.abs(dragValue - targetValue) <= diff;
}

// 吸附距离差值
function NearlyValue(dragValue: number, targetValue: number) {
  return dragValue - targetValue;
}

// 获取物料辅助点信息
function getLineShape(style: any): LineShape {
  let top, left, width, height;
  if (style.rotate != 0) {
    width = style.width * cos(style.rotate) + style.height * sin(style.rotate);
    left = style.left + (style.width - width) / 2;
    height = style.height * cos(style.rotate) + style.width * sin(style.rotate);
    top = style.top - (height - style.height) / 2;
  } else {
    top = style.top;
    left = style.left;
    width = style.width;
    height = style.height;
  }

  return {
    width,
    height,
    top,
    left,
    bottom: top + height,
    right: left + width,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
}

// 添加辅助线
function addLine(
  direction: string,
  location: number,
  start: number,
  end: number
) {
  switch (direction) {
    case "y":
      lines.value.push({
        type: "y",
        style: getCommonStyle({
          top: location,
          left: start,
          height: 1,
          width: end - start,
        }),
      });
      break;
    case "x":
      lines.value.push({
        type: "x",
        style: getCommonStyle({
          top: start,
          left: location,
          height: end - start,
          width: 1,
        }),
      });
      break;
  }
}

// 隐藏辅助线
function hideMarkLine() {
  lines.value = [];
}

export const useMarkLine = () => ({
  lines,
  detectionMarkLine,
  hideMarkLine,
});
