
<template>
  <div class="text">
    <div
      class="text-content"
      ref="textRef"
      tabindex="0"
      @dblclick="enterEdit"
      @mousedown="handleMousedown"
      @keydown="handleKeydown"
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
  isEidt.value = true;
  selectAll();
  // 获取焦点
  textRef.value && textRef.value.focus();
}

// 文本全选
function selectAll() {
  const selection: any = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(textRef.value as any);
  console.log("textRef.value", textRef.value);
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
  padding: 5px;
  .text-content {
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>
