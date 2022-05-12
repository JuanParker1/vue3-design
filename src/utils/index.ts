import { Coordinate } from "@/types/widget.ts";

/**
 * 数组元素交换位置
 * @param arr 数组
 * @param index1 位置1下标
 * @param index2  位置2下标
 */
export function swapArray<T>(arr: T[], index1: number, index2: number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
}

/**
 * 角度转弧度
 * @param angle 角度
 * @returns 弧度
 * Math.PI = 180 度
 */
export function angleToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

/**
 * 求两点之间的中点坐标
 * @param p1 点1坐标
 * @param p2 点2坐标
 * @returns 中间的坐标
 */
export function getCenterPoint(p1: Coordinate, p2: Coordinate): Coordinate {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

/**
 * 计算目标点旋转前坐标
 * @param point 目标点
 * @param center 中间点
 * @param rotate 角度
 * @returns 旋转前坐标点
 */
export function calculateRotatedPointCoordinate(
  point: Coordinate,
  center: Coordinate,
  rotate: number
) {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y,
  };
}

export function sin(rotate: number) {
  return Math.abs(Math.sin(angleToRadian(rotate)));
}

export function cos(rotate: number) {
  return Math.abs(Math.cos(angleToRadian(rotate)));
}
