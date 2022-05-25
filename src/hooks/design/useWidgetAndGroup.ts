/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-17 11:09:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-25 17:04:45
 */
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
  let element: any = document.querySelector(`#widget-${widget.id}`);
  if (!element) return;

  const widgetRect = element?.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = element;

  widget.style.rotate = widget.style.rotate + group.style.rotate;
  widget.style.width = offsetWidth;
  widget.style.height = offsetHeight;

  // 获取元素的中心点坐标
  const center = {
    x: widgetRect.left - canvasRect.x + widgetRect.width / 2,
    y: widgetRect.top - canvasRect.y + widgetRect.height / 2,
  };

  // 计算出元素新的 top left 坐标
  widget.style.left = center.x - widget.style.width / 2;
  widget.style.top = center.y - widget.style.height / 2;
}

export const useWidgetAndGroup = () => ({
  composeWidgetStyle,
  decomposeWidget,
});
