import { defineStore } from "pinia";

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
  },
});
