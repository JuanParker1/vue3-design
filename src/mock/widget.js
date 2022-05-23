/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 11:30:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-23 11:10:51
 */
export default [
  {
    id: '1',
    component: 'v-image', // 组件名称，需要提前注册到 Vue
    label: '图片', // 左侧组件列表中显示的名字
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {}, // 事件列表
    style: {
      // 组件样式
      rotate: 0,
      width: 100,
      height: 100,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: ''
    }
  },
  {
    id: '2',
    component: 'v-text', // 组件名称，需要提前注册到 Vue
    label: '文字', // 左侧组件列表中显示的名字
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {}, // 事件列表
    value: '测试文本',
    style: {
      // 组件样式
      rotate: 0,
      width: 100,
      height: 30,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: ''
    }
  }
]
