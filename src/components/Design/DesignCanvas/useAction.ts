/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-12 19:57:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 17:16:55
 */
import { ref } from "vue";
import { useDesignStore } from "@/store/design";
import { swapArray } from "@/utils/index";
import { Widget } from "@/types/widget";

interface ActionState {
  actionShow: Boolean;
  actionStyle: ActionStyle;
}

interface ActionStyle {
  top?: Number;
  left?: Number;
}

let actionShow = ref(false);
let actionStyle = ref<object>({});

const actionList = [
  { label: "复制", shortcuts: ["Ctrl", "C"], actionFun: "copy" },
  { label: "复制", shortcuts: ["Ctrl", "C"], actionFun: "shear" },
  { label: "粘贴", shortcuts: ["Ctrl", "V"], actionFun: "paste" },
  { label: "置顶", shortcuts: ["Ctrl", "-"], actionFun: top },
  { label: "上移一层", shortcuts: ["Ctrl", "+"], actionFun: up },
  { label: "下移一层", shortcuts: ["Ctrl", "-"], actionFun: down },
  { label: "置底", shortcuts: ["Ctrl", "-"], actionFun: bottom },
];

// 打开行动栏
function openAction(style: ActionStyle) {
  console.log("打开行动栏");
  actionStyle.value = style;
  console.log("style", style);
  actionShow.value = true;
}

// 关闭行动栏
function hidenAction() {
  actionShow.value = false;
}

// 上移一层
function up() {
  const { widgetList, curWidget } = useDesignStore();
  if (!curWidget) return;

  const max = widgetList.length - 1;
  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  if (curIndex < max) swapArray(widgetList, curIndex, curIndex + 1);
  hidenAction();
}

// 下移一层
function down() {
  const { widgetList, curWidget } = useDesignStore();
  if (!curWidget) return;

  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  if (curIndex > 0) swapArray(widgetList, curIndex, curIndex - 1);
  hidenAction();
}

// 置顶
function top() {
  const { widgetList, curWidget } = useDesignStore();
  if (!curWidget) return;

  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  const curr = widgetList.splice(curIndex, 1)[0];
  widgetList.push(curr);
  hidenAction();
}

// 置底
function bottom() {
  const { widgetList, curWidget } = useDesignStore();
  if (!curWidget) return;

  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  const curr = widgetList.splice(curIndex, 1)[0];
  widgetList.unshift(curr);
  hidenAction();
}

export const useAction = () => ({
  actionList,
  actionShow,
  actionStyle,
  openAction,
  hidenAction,
  up,
  down,
  top,
  bottom,
});
