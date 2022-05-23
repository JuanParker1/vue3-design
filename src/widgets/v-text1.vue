<template>
  <div class="v-text" @keydown="handleKeydown" @keyup="handleKeyup">
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div
      :contenteditable="canEdit"
      :class="{ canEdit }"
      @dblclick="setEdit"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      @blur="handleBlur"
      ref="text"
      v-html="propValue"
      @input="handleInput"
      tabindex="0"

    ></div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
    },
  },
  data() {
    return {
      propValue: "tets",
      canEdit: false,
      ctrlKey: 17,
      isCtrlDown: false,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.propValue, e.target.innerHTML);
    },

    handleKeydown(e) {
      if (e.keyCode == this.ctrlKey) {
        this.isCtrlDown = true;
      } else if (this.isCtrlDown && this.canEdit) {
        e.stopPropagation();
      } else if (e.keyCode == 46) {
        // deleteKey
        e.stopPropagation();
      }
    },

    handleKeyup(e) {
      if (e.keyCode == this.ctrlKey) {
        this.isCtrlDown = false;
      }
    },

    handleMousedown(e) {
      if (this.canEdit) {
        e.stopPropagation();
      }
    },

    clearStyle(e) {
      e.preventDefault();
      const clp = e.clipboardData;
      const text = clp.getData("text/plain") || "";
      if (text !== "") {
        document.execCommand("insertText", false, text);
      }

      this.$emit("input", this.propValue, e.target.innerHTML);
    },

    handleBlur(e) {
      this.propValue = e.target.innerHTML || "&nbsp;";
      this.canEdit = false;
    },

    setEdit() {
      this.canEdit = true;
      // 全选
      this.selectText(this.$refs.text);
    },

    selectText(element) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .canEdit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>