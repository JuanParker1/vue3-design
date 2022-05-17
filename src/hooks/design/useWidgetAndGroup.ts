/**
 * 物料纳入组合中的样式（改为对应百分比数据）
 * @param groupStyle 组合样式
 * @param itemStyle 目标物料样式
 */
function composeWidgetStyle(groupStyle: any, itemStyle: any) {
  itemStyle.left = (itemStyle.left - groupStyle.left) / groupStyle.width;
  itemStyle.top = (itemStyle.top - groupStyle.top) / groupStyle.height;
  itemStyle.width = itemStyle.width / groupStyle.width;
  itemStyle.height = itemStyle.height / groupStyle.height;
}

/**
 * 物料从组合拆分
 */
function decomposeWidget(widget, group, canvasRect) {
  const widgetRect = document
    .querySelector(`#widget-${widget.id}`)
    .getBoundingClientRect();

  // 获取元素的中心点坐标
  const center = {
    x: widgetRect.left - canvasRect.x + widgetRect.width / 2,
    y: widgetRect.top - canvasRect.y + widgetRect.height / 2,
  };

  widget.style.rotate = widget.style.rotate + group.style.rotate;
  widget.style.width = widget.groupStyle.width * group.style.width;
  widget.style.height = widget.groupStyle.height * group.style.height;
  // 计算出元素新的 top left 坐标
  widget.style.left = center.x - widget.style.width / 2;
  widget.style.top = center.y - widget.style.height / 2;
}

export const useWidgetAndGroup = () => ({
  composeWidgetStyle,
  decomposeWidget,
});
