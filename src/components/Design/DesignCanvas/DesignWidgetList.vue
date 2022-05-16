<template>
  <div class="design-list">
    <Shape
      v-for="(item, index) in list"
      v-model:widgetStyle="item.style"
      :key="item.id"
      :id="item.id"
      :zIndex="index"
      :active="curWidget && item.id === curWidget.id"
    >
      <Group v-if="item.component == 'group'" :data="item" />
      <component v-else class="design-list-widget" :is="item.component" />
    </Shape>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useDesignStore } from "@/store/design.ts";
import Widget from "@/types/widget.ts";
import Shape from "./Shape.vue";
import Group from "./Group.vue";

const props = defineProps({
  list: {
    default: (): Widget[] => [],
  },
});

const { widgetList, curWidget } = toRefs(useDesignStore());
</script>

<style lang="scss" scoped>
.design-list {
  .design-list-widget {
    position: absolute;
    width: 100%;
    height: 100%;
    user-select: none;
  }
}
</style>
