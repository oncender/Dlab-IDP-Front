import {registerAction} from "@antv/g2/src/core";
import Highlight from "@antv/g2/src/interaction/action/element/highlight";
import Element from "@antv/g2/src/geometry/element";
import {getElements, getElementValue} from "@antv/g2/src/interaction/action/util";
import {G2} from "@ant-design/plots";

G2.registerInteraction('element-hovering-cursor', {
    showEnable: [
        {trigger: 'element:mouseenter', action: 'cursor:pointer'},
        {trigger: 'element:mouseleave', action: 'cursor:default'},
    ],
});
G2.registerInteraction('element-link', {
        showEnable: [
            {trigger: 'element:mouseenter', action: 'cursor:pointer'},
            {trigger: 'element:mouseleave', action: 'cursor:default'},
        ],
        start: [
            {
                trigger: 'element:mouseenter',
                action: 'element-link-by-color:link',
            },
        ],
        end: [
            {
                trigger: 'element:mouseleave',
                action: 'element-link-by-color:unlink',
            },
        ],
    });


G2.registerInteraction('brush-visible', {
    showEnable: [
        {trigger: 'plot:mouseenter', action: 'cursor:crosshair'},
        {trigger: 'plot:mouseleave', action: 'cursor:default'},
    ],
    start: [
        {
            trigger: 'plot:mousedown',
            action: ['rect-mask:start', 'rect-mask:show', 'element-range-highlight:start'],
        },
    ],
    processing: [
        {
            trigger: 'plot:mousemove',
            action: ['rect-mask:resize', 'element-range-highlight:highlight'],
        },
        {trigger: 'mask:end', action: ['element-filter:filter']},
    ],
    end: [
        {
            trigger: 'plot:mouseup',
            action: ['rect-mask:end', 'rect-mask:hide', 'element-range-highlight:end', 'element-range-highlight:clear'],
        },
    ],
    rollback: [
        {
            trigger: 'dblclick',
            action: ['element-filter:clear'],
        },
    ],
});
G2.registerInteraction('brush', {
    showEnable: [
        {trigger: 'plot:mouseenter', action: 'cursor:crosshair'},
        {trigger: 'plot:mouseleave', action: 'cursor:default'},
    ],
    start: [
        {
            trigger: 'plot:mousedown',
            action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
        },
    ],
    processing: [
        {
            trigger: 'plot:mousemove',
            action: ['rect-mask:resize'],
        },
    ],
    end: [
        {
            trigger: 'plot:mouseup',
            action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
        },
    ],
    rollback: [{trigger: 'dblclick', action: ['brush:reset']}],
});

// class HighlightEtc extends Highlight {
//     protected setStateByElement(element: Element, enable: boolean) {
//         const view = this.context.view;
//         const metaAttr = element.geometry.getAttribute('etc');
//         if (!metaAttr) {
//             return;
//         }
//         const scale = view.getScaleByField(metaAttr.getFields()[0]);
//         const value = getElementValue(element, scale.field);
//         const elements = getElements(view);
//         const highlightElements = elements.filter((el) => {
//             return getElementValue(el, scale.field) === value;
//         });
//         this.setHighlightBy(elements, (el) => highlightElements.includes(el), enable);
//     }
// }


export default G2;