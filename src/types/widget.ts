export interface WidgetStyle {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
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
