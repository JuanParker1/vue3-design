export function getCommonStyle(
  style: object,
  filter: string[] = [],
  unit = "px"
) {
  const needUnit = ["fontSize", "width", "height", "top", "left"];
  const result: any = {};

  for (let [prop, value] of Object.entries(style)) {
    if (filter.includes(prop)) continue;

    if (needUnit.includes(prop)) {
      result[prop] = unit == "px" ? `${value}px` : `${value * 100}%`;
    }

    // 旋转
    if (prop == "rotate") {
      result.transform = `rotate(${value}deg)`;
    }
  }

  return result;
}
