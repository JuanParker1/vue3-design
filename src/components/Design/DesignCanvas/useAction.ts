import { ref } from "vue";
import { useDesignStore } from "@/store/design.ts";
import { swapArray } from "@/utils/index.ts";
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
  actionStyle.value = style;
  actionShow.value = true;
}

// 关闭行动栏
function closeAction() {
  actionShow.value = false;
}

// 上移一层
function up() {
  const { widgetList, curWidget } = useDesignStore();
  const max = widgetList.length - 1;
  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  if (curIndex < max) swapArray(widgetList, curIndex, curIndex + 1);
  closeAction();
}

// 下移一层
function down() {
  const { widgetList, curWidget } = useDesignStore();
  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  if (curIndex > 0) swapArray(widgetList, curIndex, curIndex - 1);
  closeAction();
}

// 置顶
function top() {
  const { widgetList, curWidget } = useDesignStore();
  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  const curr = widgetList.splice(curIndex, 1)[0];
  widgetList.push(curr);
  closeAction();
}

// 置底
function bottom() {
  const { widgetList, curWidget } = useDesignStore();
  const curIndex = widgetList.findIndex((w: Widget) => w.id == curWidget.id);
  const curr = widgetList.splice(curIndex, 1)[0];
  widgetList.unshift(curr);
  closeAction();
}

export const useAction = () => ({
  actionList,
  actionShow,
  actionStyle,
  openAction,
  closeAction,
  up,
  down,
  top,
  bottom,
});
