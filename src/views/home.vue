<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 10:58:44
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-12 19:41:56
-->
<template>
  <div class="editor">
    <!-- header -->
    <div class="editor-head"></div>

    <!-- body -->
    <div class="editor-body">
      <DesignWidgets />
      <DesignCanvas />
      <DesignOperator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import DesignWidgets from "@/components/Design/DesignWidgets.vue";
import DesignCanvas from "@/components/Design/DesignCanvas/index.vue";
import DesignOperator from "@/components/Design/DesignOperator.vue";

const y = ref(2);
11;
</script>

<style lang='scss'>
.editor {
  background: #f0f3f4;

  .editor-head {
    width: 100%;
    height: 54px;
    background: #fff;
    border: solid 1px #eee;
  }

  .editor-body {
    display: flex;
    height: calc(100vh - 54px);
  }
}
</style>