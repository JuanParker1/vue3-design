
<template>
  <div
    class="text"
    @dblclick="enterEdit"
    @mousedown="handleMousedown"
    @keydown="handleKeydown"
  >
    <div
      ref="textRef"
      :contenteditable="isEidt"
      v-html="props.item.value"
    ></div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";

const props = defineProps({
  item: {
    default: (): any => {},
  },
});

let isEidt = ref(false);
const textRef = ref<HTMLElement | null>(null);

function enterEdit(e: any) {
  console.log("enterEdit");
  isEidt.value = true;
  selectAll();
}

// 文本全选
function selectAll() {
  const selection: any = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(textRef.value as any);
  selection.removeAllRanges();
  selection.addRange(range);
}

function handleMousedown(e: any) {
  if (isEidt.value) {
    e.stopPropagation();
    console.log("handleMousedown");
  }
}

function handleKeydown(e: any) {
  console.log("handleKeydown");
  console.log("e.keyCod", e.keyCode);
  if ([8, 46].includes(e.keyCode)) {
    // deleteKey
    console.log("deleteKey");
    e.stopPropagation();
  }
}
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  height: 100%;
  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>
