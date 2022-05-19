/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-05-07 13:57:09
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-19 20:03:50
 */
export interface WidgetStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  rotate: number;
}

export interface Widget {
  id: string;
  component: string;
  label: string;
  icon: string;
  animations: object;
  events: object;
  style: WidgetStyle;
}

export interface Coordinate {
  x: number;
  y: number;
}
