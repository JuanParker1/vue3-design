/**
 * 数组元素交换位置
 * @param arr 数组
 * @param index1 位置1下标
 * @param index2  位置2下标
 */
export function swapArray<T>(arr: T[], index1: number, index2: number) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
}