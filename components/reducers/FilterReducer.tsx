import {useReducer, createContext} from "react";
import {FILTER_ACTION} from "../const/p2Constant"
import { CategoryObj, FloatObj, FilterStateObj, ActionObj} from "../const/p2Usertyp";

const selectArr = (arrValue: Array<any>, arrTargetSelect : CategoryObj[], names: string):
    Array<boolean> => {
        // select only arrValue in arrTargetSelect value
    let selectedArr : Array<string | void> = arrTargetSelect.filter(function(fil){
        return (fil.name == names) ? true : false}).map((v) => (v.value))
    if (selectedArr.length ==0){
        return Array(arrValue.length as number).fill(false)
    }
    let temp_set : Set<string> =  new Set(selectedArr as Array<string>)
    const itClicked = (arrValue  as Array<string>).map((v) => temp_set.has(v) ? true : false);
    return itClicked
    }


// Filter Reducer define
function filReducer(state : FilterStateObj,action: ActionObj) {
    switch (action.typ){
        case FILTER_ACTION.CATEGORY_ADD:
            return {
                category:[...state.category,action.value],
                float:state.float,
            };
        case FILTER_ACTION.CATEGORY_DEL:
            return {
                category:state.category.filter(function(cate_value){
                    return cate_value.value != action.value.value ? true : false}),
                float:state.float,
            };
        case FILTER_ACTION.FLOAT_ADD:
            return {
                category:state.category,
                float:[...state.float,action.value],
            };
        case FILTER_ACTION.FLOAT_UPDATE:
            var index = state.float.findIndex(i => i.name == action.value.name)
            var newFloat = [...state.float]
            newFloat[index] = action.value as FloatObj
            // console.log("slider updated",newFloat[index].value)
            return {
                category: state.category,
                float: newFloat
            }
        default:
            return state
    }
}
const FilContext = createContext([]);
export {filReducer, selectArr, FilContext}



