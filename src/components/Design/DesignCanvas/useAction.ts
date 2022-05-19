/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-12 19:57:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-18 15:57:36
 */
import { ref, toRefs, computed } from "vue";
import { useDesignStore } from "@/store/design";
import { swapArray } from "@/utils/index";
import { Widget } from "@/types/widget";
import { createId } from "@/hooks/common";
import _ from "lodash";

interface ActionStyle {
  top?: Number;
  left?: Number;
}

let actionShow = ref(false);
let actionStyle = ref<object>({});
let copyWidget = ref(null);
const { widgetList, curWidget } = toRefs(useDesignStore());
const { setCurrWidget } = useDesignStore();

const actionList = computed(() => {
  let baseActions = [
    {
      label: "复制",
      shortcuts: ["Ctrl", "C"],
      disabled: curWidget.value == null,
      actionFun: copy,
    },
    {
      label: "粘贴",
      shortcuts: ["Ctrl", "V"],
      disabled: copyWidget.value == null,
      actionFun: paste,
    },
  ];

  let orderActions = [
    { label: "置顶", shortcuts: ["Ctrl", "-"], actionFun: top },
    { label: "上移一层", shortcuts: ["Ctrl", "+"], actionFun: up },
    { label: "下移一层", shortcuts: ["Ctrl", "-"], actionFun: down },
    { label: "置底", shortcuts: ["Ctrl", "-"], actionFun: bottom },
  ];

  return curWidget.value ? [...baseActions, ...orderActions] : baseActions;
});

// 打开行动栏
function openAction(style: ActionStyle) {
  console.log("打开行动栏");
  actionStyle.value = style;
  actionShow.value = true;
}

// 关闭行动栏
function hidenAction() {
  console.log("关闭行动栏");
  actionShow.value = false;
}

// 复制
function copy() {
  copyWidget.value = curWidget.value;
  hidenAction();
}

// 粘贴
function paste() {
  if (copyWidget.value) {
    copyWidget.value = { ..._.cloneDeep(copyWidget.value), id: createId() };
    let { style } = copyWidget.value;
    style.left += 15;
    style.top += 15;
    widgetList.value.push(copyWidget.value);
    setCurrWidget(copyWidget.value.id);
  }
  hidenAction();
}

// 上移一层
function up(e: any) {
  if (curWidget.value) {
    const max = widgetList.value.length - 1;
    const curIndex = widgetList.value.findIndex(
      (w: Widget) => w.id == curWidget.value.id
    );
    console.log("curIndex", curIndex);
    if (curIndex < max) swapArray(widgetList.value, curIndex, curIndex + 1);
  }
  hidenAction();
}

// 下移一层
function down() {
  if (curWidget.value) {
    const curIndex = widgetList.value.findIndex(
      (w: Widget) => w.id == curWidget.value.id
    );
    if (curIndex > 0) swapArray(widgetList.value, curIndex, curIndex - 1);
  }
  hidenAction();
}

// 置顶
function top() {
  if (curWidget.value) {
    const curIndex = widgetList.value.findIndex(
      (w: Widget) => w.id == curWidget.value.id
    );
    const curr = widgetList.value.splice(curIndex, 1)[0];
    widgetList.value.push(curr);
  }
  hidenAction();
}

// 置底
function bottom() {
  if (curWidget.value) {
    const curIndex = widgetList.value.findIndex(
      (w: Widget) => w.id == curWidget.value.id
    );
    const curr = widgetList.value.splice(curIndex, 1)[0];
    widgetList.value.unshift(curr);
  }
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
