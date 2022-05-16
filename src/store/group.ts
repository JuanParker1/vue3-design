import { defineStore } from "pinia";
import { useDesignStore } from "./design";

interface GroupState {
  groupWidgets: any;
}

export const useGroupStore = defineStore({
  id: "app-group",

  state: (): GroupState => {
    return {
      groupWidgets: [],
    };
  },

  actions: {
    setGroupWidgets(widgets: any) {
      this.groupWidgets = widgets;
    },
    createGroup() {
      const { widgetList } = useDesignStore();
      const group = {
        style: {},
        widgets: [],
      };
      this.groupWidgets.forEach((w) => {
        if (w.component != "Group") {
          group.widgets.push(w);
        } else {
        }
      });
    },
  },
});
