<template>
  <ul v-show="actionShow" class="action" :style="getCommonStyle(actionStyle)">
    <li
      class="action-item"
      v-for="(action, index) in actionCollection"
      :key="index"
      @click="action.actionFun"
    >
      {{ action.label }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref, toRefs } from "vue-demi";
import { getCommonStyle } from "@/utils//style.ts";
import { useActiontore } from "@/store/action.ts";

let location = ref({});

const { up, down, bottom, top } = useActiontore();
const { actionShow, actionStyle } = toRefs(useActiontore());

const actionCollection = [
  { label: "复制", shortcuts: ["Ctrl", "C"], actionFun: "copy" },
  { label: "复制", shortcuts: ["Ctrl", "C"], actionFun: "shear" },
  { label: "粘贴", shortcuts: ["Ctrl", "V"], actionFun: "paste" },
  { label: "置顶", shortcuts: ["Ctrl", "-"], actionFun: top },
  { label: "上移一层", shortcuts: ["Ctrl", "+"], actionFun: up },
  { label: "下移一层", shortcuts: ["Ctrl", "-"], actionFun: down },
  { label: "置底", shortcuts: ["Ctrl", "-"], actionFun: bottom },
];
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

    &:hover {
      color: #fff;
      background: #ff6e7b;
    }
  }
}
</style>
