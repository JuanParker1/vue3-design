/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-11 11:22:18
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 19:57:48
 */
import { defineStore } from "pinia";
import _ from "lodash";
import widgets from "@/mock/widget";
import { createId } from "@/hooks/common";
import { WidgetStyle, Widget } from "@/types/widget";

interface DesignState {
  curWidget: Widget | null;
  curGroupWidget: Widget | null;
  widgetList: Widget[];
}

export const useDesignStore = defineStore({
  id: "app-design",

  state: (): DesignState => {
    return {
      widgetList: [],
      curWidget: null, // 当前选中物料
      curGroupWidget: null, // 当前选中组合内物料
    };
  },

  actions: {
    // 开始拖拽物料
    handleDragStart(e: any) {
      e.dataTransfer.setData("component", e.target.dataset.component);
    },

    // 物料拖拽中
    handleDragOver(e: any) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    // 物料拖拽结束
    handleDrop(e: any, canvas: any) {
      console.log("canvas", canvas);
      e.preventDefault();
      e.stopPropagation();
      const rectInfo = canvas.getBoundingClientRect();
      let curWidget = widgets.find(
        (c: Widget) => c.component == e.dataTransfer.getData("component")
      );
      this.curWidget = curWidget ? _.cloneDeep(curWidget) : null;

      if (this.curWidget) {
        this.curWidget.id = createId(8);
        this.curWidget.style.left =
          e.clientX - rectInfo.x - this.curWidget.style.width / 2;
        this.curWidget.style.top =
          e.clientY - rectInfo.y - this.curWidget.style.height / 2;
        this.widgetList.push(this.curWidget);
      }
    },

    // 设置当前操作物料
    setCurrWidget(id: string | undefined) {
      if (id) {
        if (this.curWidget?.id == id) return;

        this.curWidget = this.widgetList.find((w) => w.id == id);
        console.log("this.curWidget", this.curWidget);
      } else {
        this.curWidget = null;
        this.curGroupWidget = null;
      }
    },
    // 修改当前物料样式
    setCurrWidgetStyle(style: Object) {
      Object.keys(style).forEach((key) => {
        this.curWidget.style[key] = style[key];
      });
    },
    // 删除物料
    deleteWidget(target: string | string[]) {
      if (typeof target == "string") {
        this.widgetList = this.widgetList.filter((w) => w.id != target);
      } else {
        this.widgetList = this.widgetList.filter((w) => !target.includes(w.id));
      }
    },
    setCurGroupWidget(id: string) {
      this.widgetList.map((item: any) => {
        if (item.component == "Group") {
          let temp = item.list.find((w: any) => w.id == id);
          if (temp) {
            this.curWidget = item;
            this.curGroupWidget = temp;
          }
        }
      });
    },
  },
});
