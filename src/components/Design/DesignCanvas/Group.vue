<template>
  <div class="group">
    <div
      class="group-item"
      v-for="item in group.list"
      :key="item.id"
      :style="item.groupStyle"
    >
      <component :is="item.component" class="design-shell-widget" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCommonStyle } from "@/utils/style.ts";
import { onBeforeMount } from "vue-demi";

const props = defineProps({
  group: {
    type: Object,
  },
});

onBeforeMount(() => {
  props.group.list.forEach((item) => {
    item.groupStyle = { ...item.style };
    item.groupStyle.left = toPercent(
      (item.groupStyle.left - props.group.style.left) / props.group.style.width
    );
    item.groupStyle.top = toPercent(
      (item.groupStyle.top - props.group.style.top) / props.group.style.height
    );
    item.groupStyle.width = toPercent(
      item.groupStyle.width / props.group.style.width
    );
    item.groupStyle.height = toPercent(
      item.groupStyle.height / props.group.style.height
    );
  });

  console.log("props.group.list", props.group.list);
});

function toPercent(val) {
  return val * 100 + "%";
}
</script>

<style lang="scss" scoped>
.group {
  position: absolute;
  // background: #444972;

  .group-item {
    position: absolute;
  }

  .design-shell-widget {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
