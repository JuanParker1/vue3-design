import { ref, toRefs } from "vue";
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
    name:"123"
}

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

function detectionSubLine() {
  hideSubLine();
  widgetList.value.forEach((widget) => {
    if (widget.id == curWidget.value.id) return;

    let { top, left, width, height } = widget.style;
    const right = left + width;
    const bottom = top + height;

    const conditions: Conditions = {
      top: [
        {
          isNearly: isNearly(curWidget.value.style.top, top),
          type: "xt",
          lineShift: top,
        },
        {
          isNearly: isNearly(curWidget.value.style.top, bottom),
          type: "xt",
          lineShift: bottom,
        },
        {
          isNearly: isNearly(
            curWidget.value.style.top + curWidget.value.style.height,
            top
          ),
          type: "xb",
          lineShift: top,
        },
        {
          isNearly: isNearly(
            curWidget.value.style.top + curWidget.value.style.height,
            bottom
          ),
          type: "xb",
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
        ) as SubLine

        getWidgetShiftStyle(key, condition);
        console.log(
          "getWidgetShiftStyle(key, condition)",
          getWidgetShiftStyle(key, condition)
        );
        // 对齐吸附
        setCurrWidgetStyle(getWidgetShiftStyle(key, condition));

        line.show = true;
        line.style[key] = `${condition.lineShift}px`;

        console.log("触发。。");
        console.log("line", line);
      });
    });
  });
}

// 隐藏辅助线
function hideSubLine() {
  lines.value.forEach((line) => {
    line.show = false;
    line.style = {};
  });
}

function getWidgetShiftStyle(key: string, condition: Condition) {
  return {
    top: condition.lineShift,
  };
}

function isNearly(dragValue: number, targetValue: number) {
  return Math.abs(dragValue - targetValue) <= diff;
}

export const useSubLine = () => ({
  lines,
  detectionSubLine,
  hideSubLine,
});
