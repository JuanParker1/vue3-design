<template>
  <div class="group">
    <div
      class="group-item"
      v-for="item in group.list"
      :key="item.id"
      :style="getCommonStyle(item.groupStyle, 'fontSize', '%')"
      :id="'widget-' + item.id"
    >
      <component :is="item.component" class="design-shell-widget" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCommonStyle } from "@/utils/style.ts";
import { onBeforeMount } from "vue-demi";
import { useWidgetAndGroup } from "@/hooks/design/useWidgetAndGroup.ts";

const props = defineProps({
  group: {
    default: (): any => {},
  },
});

const { composeWidgetStyle } = useWidgetAndGroup();

onBeforeMount(() => {
  props.group.list.forEach((item) => {
    item.groupStyle = { ...item.style };
    composeWidgetStyle(props.group.style, item.groupStyle);
  });
});
</script>

<style lang="scss" scoped>
.group {
  position: absolute;
  // background: #444972;
  user-select: none;

  .group-item {
    position: absolute;
    user-select: none;
  }

  .design-shell-widget {
    position: absolute;
    width: 100%;
    height: 100%;
    user-select: none;
  }
}
</style>
