<template>
  <div v-show="show" class="meau" :style="location">
    {{ location }}
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue-demi";
import { getCommonStyle } from "@/utils//style.ts";

let show = ref(false);
let location = ref({});

function showContextMenu(locationStyle: any) {
  console.log("locationStyle", locationStyle);
  show.value = true;
  location.value = getCommonStyle(locationStyle);
}

defineExpose({
  showContextMenu,
});
</script>

<style lang="scss" scoped>
.meau {
  position: absolute;
  z-index: 9999999;
  width: 250px;
  background: hsla(0, 0%, 100%, 0.94);
  border-radius: 4px;
  box-shadow: 0 2px 10px hsl(0deg 0% 80% / 64%);
  padding: 4px 0;
}
</style>
