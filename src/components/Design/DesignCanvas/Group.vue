<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-16 11:43:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-24 14:12:23
-->
<template>
  <div class="group">
    <div
      class="group-item"
      :class="
        curGroupWidget && curGroupWidget.id == item.id
          ? 'group-item-active'
          : ''
      "
      v-for="item in group.list"
      :key="item.id"
      :style="getCommonStyle(item.groupStyle, 'fontSize', '%')"
      :id="'widget-' + item.id"
      @click="setCurGroupWidget(item.id)"
    >
      <component
        :is="item.component"
        :item="item"
        class="design-shell-widget"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCommonStyle } from "@/utils/style";
import { onBeforeMount } from "vue-demi";
import { useWidgetAndGroup } from "@/hooks/design/useWidgetAndGroup";
import { useDesignStore } from "@/store/design";
import { ref, toRefs } from "vue";

const props = defineProps({
  group: {
    default: (): any => {},
  },
});

const { composeWidgetStyle } = useWidgetAndGroup();
const { curGroupWidget } = toRefs(useDesignStore());
const { setCurGroupWidget } = useDesignStore();

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
  // user-select: none;

  .group-item {
    position: absolute;
    // user-select: none;
    z-index: 100;
  }

  .group-item-active {
    outline: 1px solid #ff6e7b;
  }

  .design-shell-widget {
    position: absolute;
    width: 100%;
    height: 100%;
    // user-select: none;
  }
}
</style>
