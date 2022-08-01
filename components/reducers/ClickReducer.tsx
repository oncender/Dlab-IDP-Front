import {ClickActionObj, ClickStateObj} from "../const/p2Usertyp";
import {CLICK_ACTION} from "../const/p2Constant";


function clickReducer(state : ClickStateObj,action: ClickActionObj) {
    var clickSet = new Set(state.clickFilters)
    switch (action.typ){
        case CLICK_ACTION.CLICK:
            const valueLoop = action.value as string[]
            valueLoop.forEach((dat) => {
                if (clickSet.has(dat)) {
                    clickSet.delete(dat)
                } else {
                    clickSet.add(dat)
                }
            })
            return {clickFilters: Array.from(clickSet)};
        case CLICK_ACTION.CLEAR:
            return {
                clickFilters: []
            };
        case CLICK_ACTION.CLICK_MANY:
            if (action.value == undefined) return state;
            const clicks: string[] = action.value.split(",")
            if (clickSet.has(clicks[0])){
                clicks.forEach((val,idx)=> {
                    if (clickSet.has(val)){
                        clickSet.delete(val)
                    }})
            } else {
                clicks.forEach((val,idx)=> {
                    if (!clickSet.has(val)){
                        clickSet.add(val)
                    }})
            }
            return {clickFilters:Array.from(clickSet)};
        default:
            return state
    }
}
export {clickReducer}