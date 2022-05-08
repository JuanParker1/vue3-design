import { ref, toRefs } from "vue";
import { useDesignStore } from '@/store/design';

interface SubLine {
    type: String;
    show: Boolean;
    style: Object;
}

interface Condition {
    isNearly: Boolean,
    type: string,
    lineShift: number,
}

interface Conditions {
    top: Condition[],
    left: Condition[],
}

const lines = ref<SubLine[]>([
    { type: "xt", show: false, style: {} },
    { type: "xc", show: false, style: {} },
    { type: "xb", show: false, style: {} },
    { type: "yl", show: false, style: {} },
    { type: "yc", show: false, style: {} },
    { type: "yr", show: false, style: {} },
]);

const diff: number = 2

const { widgetList, curWidget } = toRefs(useDesignStore());

function detectionSubLine() {

    hideSubLine()
    widgetList.value.forEach(widget => {
        if (widget.id == curWidget.value.id) return

        let { top, left, width, height } = widget.style
        const right = left + width
        const bottom = top + height

        const conditions: Conditions = {
            top: [
                {
                    isNearly: isNearly(curWidget.value.style.top, top),
                    type: 'xt',
                    lineShift: top,
                }
            ],
            left: [

            ]
        }

        Object.keys(conditions).forEach(key => {
            conditions[key].forEach((condition) => {
                if (!condition.isNearly) return

                const line: SubLine = lines.value.find(item => item.type == condition.type)

                line.show = true
                line.style[key] = `${condition.lineShift}px`

                console.log('触发。。');
                console.log('line', line);

            })
        })

    });
}

function hideSubLine() {
    lines.value.forEach(line => {
        line.show = false
        line.style = {}
    });
}

function isNearly(dragValue: number, targetValue: number) {
    return Math.abs(dragValue - targetValue) <= diff
}

export const useSubLine = (() => ({
    lines,
    detectionSubLine
}))
