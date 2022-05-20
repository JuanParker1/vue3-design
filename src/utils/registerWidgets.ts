/*
 * @Description: 自动注册物料
 * @Autor: WangYuan1
 * @Date: 2022-05-20 15:16:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-20 15:41:51
 */

const files: any = import.meta.globEager(`@/widgets/*.vue`);

export default function install(app: any) {
  Object.keys(files).forEach((path: string) => {
    let name = path.split("/")[2];
    name = name.replace(/(\.vue)/g, "");
    let component = files[path]?.default;
    app.component(name, component);
  });
}
