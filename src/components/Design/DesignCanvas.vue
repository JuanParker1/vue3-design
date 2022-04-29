<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 15:04:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-29 17:29:01
-->
<template>
  <div class="design-container">
    <div
      class="design-shell"
      @drop="handleDrop"
      @dragover="handleDragOver"
    ></div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs } from "@vue/reactivity";
import _ from "lodash";
import widgets from "../../mock/widget";

interface widgetType {
  id: string;
  // component: string;
  // label: string;
  // icon: string;
  // animations: object;
  // events: object;
  // style: object;
}

const canvas = reactive({
  widget: {},
});

function handleDrop<T extends widgetType>(e: any): T {
  const id = e.dataTransfer.getData("id");
  let widget: T = _.cloneDeep(widgets.find((item: any) => item.id == id));
  return widget;
}

function handleDragOver(e: any): void {
  e.preventDefault();

  console.log("handleDragOver");
}
</script>

<style lang="scss" scoped>
.design-container {
  width: 100%;
  min-width: 500px;
  height: calc(100vh - 54px);
  overflow: auto;

  .design-shell {
    width: 375px;
    height: 675px;
    background: #fff;
    margin: 30px auto;
  }
}
</style>
