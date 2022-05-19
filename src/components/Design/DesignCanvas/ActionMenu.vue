<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-09 10:52:50
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-18 16:05:52
-->
<template>
  <ul v-show="actionShow" class="action" :style="getCommonStyle(actionStyle)">
    <li
      v-for="(action, index) in actionList"
      :key="index"
      class="action-item"
      :class="action.disabled ? 'action-item-disabled' : 'action-item-hover'"
      @click="action.actionFun($event)"
      @mousedown.stop=""
    >
      {{ action.label }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref, toRefs } from "vue-demi";
import { getCommonStyle } from "@/utils/style";
import { useAction } from "./useAction";

const { actionList, actionShow, actionStyle } = toRefs(useAction());

function stopBubbling(e: any) {
  console.log("stopBubbling");

  e.stopPropagation();
  e.preventDefault();
}
</script>

<style lang="scss" scoped>
.action {
  position: absolute;
  z-index: 9999999;
  width: 250px;
  background: hsla(0, 0%, 100%, 0.94);
  border-radius: 4px;
  box-shadow: 0 2px 10px hsl(0deg 0% 80% / 64%);
  padding: 4px 0;

  .action-item {
    padding: 0 20px;
    cursor: pointer;
    line-height: 36px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }

  .action-item-hover {
    &:hover {
      color: #fff;
      background: #ff6e7b;
    }
  }

  .action-item-disabled {
    color: #bec3c9;
  }
}
</style>
