import { defineStore } from "pinia";
import { useDesignStore } from './design'
import { swapArray } from '@/utils/index.ts'

interface ActionState {
    actionShow: Boolean
    actionStyle: ActionStyle
}

interface ActionStyle {
    top?: Number
    left?: Number
}

export const useActiontore = defineStore({
    id: 'app-action',
    state: (): ActionState => {
        return {
            actionShow: false,
            actionStyle: {}
        };
    },
    actions: {
        // 打开行动栏
        openAction(actionStyle: ActionStyle) {
            this.actionStyle = actionStyle
            this.actionShow = true
        },
        
        // 关闭行动栏
        closeAction() {
            this.actionShow = false
        },

        // 上移一层
        up() {
            const { widgetList, curWidget } = useDesignStore()
            const max = widgetList.length - 1
            const curIndex = widgetList.findIndex(w => w.id == curWidget.id)
            if (curIndex < max)
                swapArray(widgetList, curIndex, curIndex + 1)
            this.closeAction()
        },

        // 下移一层
        down() {
            const { widgetList, curWidget } = useDesignStore()
            const curIndex = widgetList.findIndex(w => w.id == curWidget.id)
            if (curIndex > 0)
                swapArray(widgetList, curIndex, curIndex - 1)
            this.closeAction()
        },

        // 置顶
        top() {
            const { widgetList, curWidget } = useDesignStore()
            const curIndex = widgetList.findIndex(w => w.id == curWidget.id)
            const curr = widgetList.splice(curIndex, 1)[0]
            widgetList.push(curr)
            this.closeAction()
        },

        // 置底
        bottom() {
            const { widgetList, curWidget } = useDesignStore()
            const curIndex = widgetList.findIndex(w => w.id == curWidget.id)
            const curr = widgetList.splice(curIndex, 1)[0]
            widgetList.unshift(curr)
            this.closeAction()
        },
    }
})