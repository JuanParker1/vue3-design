
<template>
  <div class="text" @dblclick="enterEdit">
    <span
      :id="item.id"
      class="text-content"
      ref="textRef"
      tabindex="0"
      :contenteditable="isEidt"
      :style="{ fontSize: `${props.item.style.fontSize}px` }"
      v-html="props.item.value"
      @mousedown="handleMousedown"
      @keydown="handleKeydown"
      @blur="exitEdit"
      @input="changeVal"
    ></span>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from "vue";
import _ from "lodash";

const props = defineProps({
  item: {
    default: (): any => {},
  },
});

let isEidt = ref(false);
const textRef = ref<HTMLElement | null>(null);

// 进入编辑模式
function enterEdit(e: any) {
  isEidt.value = true;
  selectAll();
  // 获取焦点
  textRef.value && textRef.value.focus();
}

// 失去焦点模式，退出编辑
function exitEdit(e: any) {
  console.log("失去焦点，退出编辑");
  props.item.value = e.target.innerHTML || "&nbsp;";
  isEidt.value = false;
}

// 修改text
function changeVal(e: any) {
  // props.item.value = e.target.innerHTML || "&nbsp;";
  console.log("props.item.value", e.target.innerHTML);
  // 获取当前高度,更新给物料
  if (textRef.value) {
    props.item.style.height = textRef.value.getBoundingClientRect().height;
  }
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
  }
}

// 特殊按键操作
function handleKeydown(e: any) {
  // console.log("handleKeydown");
  // console.log("e.keyCod", e.keyCode);
  if ([8, 46].includes(e.keyCode)) {
    // deleteKey
    e.stopPropagation();
  }
}
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  text-align: center;
  .text-content {
    display: inline-block;
    outline: none;
    line-height: 1.8;
    word-break: break-all;
  }
}
</style>
