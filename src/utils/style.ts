export function getCommonStyle(style: object) {
  const needUnit = ["fontSize", "width", "height", "top", "left"];
  const result = {};

  for (let [prop, value] of Object.entries(style)) {
    if (needUnit.includes(prop)) {
      result[prop] = `${value}px`;
    }
  }

  return result;
}
