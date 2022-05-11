export function getCommonStyle(style: object) {
  const needUnit = ["fontSize", "width", "height", "top", "left"];
  const result: any = {};

  for (let [prop, value] of Object.entries(style)) {
    if (needUnit.includes(prop)) {
      result[prop] = `${value}px`;
    }

    // 旋转
    if (prop == "rotate") {
      result.transform = `rotate(${value}deg)`;
    }
  }

  return result;
}