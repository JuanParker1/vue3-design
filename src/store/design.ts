import { defineStore } from "pinia";
import _ from "lodash";
import widgets from "@/mock/widget";
import { createId } from "@/hooks/common";
import { WidgetStyle, Widget } from "@/types/widget";
interface DesignState {
  curWidget: Widget | null;
  widgetList: Widget[];
}

export const useDesignStore = defineStore({
  id: "app-design",
  state: (): DesignState => {
    return {
      widgetList: [],
      curWidget: null,
    };
  },
  actions: {
    handleDragStart(e: any) {
      e.dataTransfer.setData("component", e.target.dataset.component);
    },

    handleDragOver(e: any) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    handleDrop(e: any, canvas: any) {
      e.preventDefault();
      e.stopPropagation();
      const rectInfo = canvas.getBoundingClientRect();
      let curWidget = widgets.find(
        (c: Widget) => c.component == e.dataTransfer.getData("component")
      );
      this.curWidget = curWidget ? _.cloneDeep(curWidget) : null;

      if (this.curWidget) {
        this.curWidget.id = createId(8);
        this.curWidget.style.top = e.clientY - rectInfo.y;
        this.curWidget.style.left = e.clientX - rectInfo.x;
        this.widgetList.push(this.curWidget);
      }
    },

    getCurrWidget() {
      return this.curWidget;
    },

    setShapeStyle({ top, left, width, height, rotate }: WidgetStyle) {
      if (this.curWidget) {
        if (top) this.curWidget.style.top = top;
        if (left) this.curWidget.style.left = left;
        if (width) this.curWidget.style.width = width;
        if (height) this.curWidget.style.height = height;
        if (rotate) this.curWidget.style.rotate = rotate;
      }
    },
  },
});
