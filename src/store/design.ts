import { defineStore } from "pinia";
import _ from "lodash";
import widgets from "../mock/widget.js";

interface widgetDetail {
    id: string;
    component: string;
    label: string;
    icon: string;
    animations: object;
    events: object;
    style: any;
}

interface DesignState {
    curWidget: widgetDetail | null;
    widgetList: widgetDetail[];
}

interface ShapeStyle {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    rotate?: number;
}

export const useDesignStore = defineStore({
    id: 'app-design',
    state: (): DesignState => {
        return {
            widgetList: [],
            curWidget: null,
        }
    },
    actions: {
        handleDragStart(e: any) {
            e.dataTransfer.setData('component', e.target.dataset.component)
        },

        handleDragOver(e: any) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleDrop(e: any, canvas: any) {
            console.log('handleDrop');
            e.preventDefault()
            e.stopPropagation()
            console.log('e', e);
            const rectInfo = canvas.getBoundingClientRect()
            console.log('rectInfo', rectInfo);
            console.log('canvas', canvas);
            let curWidget = widgets.find((c: widgetDetail) => c.component == e.dataTransfer.getData('component'))
            this.curWidget = curWidget ? _.cloneDeep(curWidget) : null;

            if (this.curWidget) {
                this.curWidget.style.top = e.clientY - rectInfo.y
                this.curWidget.style.left = e.clientX - rectInfo.x
                this.widgetList.push(this.curWidget)
                console.log('this.widgetList', this.widgetList);
            }
        },

        getCurrWidget(){
            return this.curWidget
        },

        setShapeStyle({ top, left, width, height, rotate }: ShapeStyle) {
            if (this.curWidget) {
                if (top) this.curWidget.style.top = top
                if (left) this.curWidget.style.left = left
                if (width) this.curWidget.style.width = width
                if (height) this.curWidget.style.height = height
                if (rotate) this.curWidget.style.rotate = rotate
            }
        }
    }
})
