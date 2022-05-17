<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 15:24:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-17 09:55:21
-->
<template>
  <div class="design-operator">
    <template v-if="areaWidgets.length > 1">
      <button @click="createGroup">组合</button>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs } from "vue";
import { useGroup } from "@/components/Design/DesignCanvas/useGroup.ts";
import { useGroupStore } from "@/store/group.ts";

let { areaWidgets } = toRefs(useGroup());
let { createGroup } = useGroup();
</script>

<style lang="scss" scoped>
.design-operator {
  width: 300px;
  height: 100%;
  background: #fff;
}
</style>
