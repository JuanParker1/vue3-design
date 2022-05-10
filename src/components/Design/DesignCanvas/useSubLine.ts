import { ref, toRef, toRefs } from "vue";
import { useDesignStore } from "@/store/design";

interface SubLine {
  type: string;
  show: boolean;
  style: { [key: string]: any };
}

interface Condition {
  isNearly: boolean;
  type: string;
  lineShift: number;
}

interface Conditions {
  top: Condition[];
  left: Condition[];
}

let c = {
  name: "123",
};

const lines = ref<SubLine[]>([
  { type: "xt", show: false, style: {} },
  { type: "xc", show: false, style: {} },
  { type: "xb", show: false, style: {} },
  { type: "yl", show: false, style: {} },
  { type: "yc", show: false, style: {} },
  { type: "yr", show: false, style: {} },
]);

const diff: number = 5;

const { widgetList, curWidget } = toRefs(useDesignStore());
const { setCurrWidgetStyle } = useDesignStore();

function detectionSubLine1() {
  hideSubLine();
  widgetList.value.forEach((widget) => {
    if (widget.id == curWidget.value.id) return;

    let { top, left, width, height } = widget.style;
    const right = left + width;
    const bottom = top + height;

    let {
      top: currTop,
      left: currLeft,
      width: currWidth,
      height: currHeight,
    } = curWidget.value.style;
    const currRight = currLeft + currWidth;
    const currBottom = currTop + currHeight;

    const conditions: Conditions = {
      top: [
        {
          type: "xt",
          isNearly: isNearly(currTop, top),
          lineShift: top,
        },
        {
          type: "xt",
          isNearly: isNearly(currTop, bottom),
          lineShift: bottom,
        },
        {
          type: "xb",
          isNearly: isNearly(currBottom, top),
          lineShift: top,
        },
        {
          type: "xb",
          isNearly: isNearly(currBottom, bottom),
          lineShift: bottom,
        },
      ],
      left: [],
    };

    Object.keys(conditions).forEach((key) => {
      conditions[key].forEach((condition: Condition) => {
        if (!condition.isNearly) return;

        const line: SubLine = lines.value.find(
          (item) => item.type == condition.type
        ) as SubLine;

        // 对齐吸附
        lineAdsorb(key, condition);

        line.show = true;
        line.style[key] = `${condition.lineShift}px`;

        console.log("触发。。");
        console.log("line", line);
      });
    });
  });
}

function detectionSubLine() {
  hideSubLine();
  let curr = getLineShape(curWidget.value.style);
  console.log("curr", curr);

  widgetList.value
    .filter((w: any) => w.id != curWidget.value.id)
    .forEach((item) => {
      item = getLineShape(item.style);
      console.log("item", item);

      if (isNearly(curr.t, item.t)) {
      }
    });
}

function getLineShape(style: any) {
  let { top, left, width, height } = style;

  return {
    w: width,
    h: height,
    t: top,
    l: left,
    b: top + height,
    r: left + width,
    lc: top + width / 2,
    tc: left + height / 2,
  };
}

// 隐藏辅助线
function hideSubLine() {
  lines.value.forEach((line) => {
    line.show = false;
    line.style = {};
  });
}

// 对齐吸附
function lineAdsorb(key: string, condition: Condition) {
  console.log("对齐吸附");
  console.log("key", key);

  //   return {
  //     top: condition.lineShift,
  //   };

  //   setCurrWidgetStyle;
}

function isNearly(dragValue: number, targetValue: number) {
  return Math.abs(dragValue - targetValue) <= diff;
}

export const useSubLine = () => ({
  lines,
  detectionSubLine,
  hideSubLine,
});
