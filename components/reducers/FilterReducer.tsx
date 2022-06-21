import {useReducer, createContext} from "react";
import {FILTER_ACTION} from "./constant"

interface CategoryObj {
    name : string
    value : string
}
interface FloatObj {
    name : string,
    value : [number, number]
}
interface FilterStateObj {
    category : CategoryObj[],
    float : FloatObj[]
}

interface ActionObj{
    typ : string,
    value : CategoryObj | FloatObj
}

const initFilSt: FilterStateObj = {
    category: [
        {'name':'투자유형','value':'실물'},
        {'name':'투자유형','value':'대출'},
        {'name':'펀드구분','value':'PFV'},
        {'name':'투자전략','value':'Value-added'},
        {'name':'투자자산유형','value':'은행'},
    ],
    float :[
        {'name':'연도','value':[2011,2017]},
        {'name':'AUM','value':[450000000,2500000000]},
        {'name':'대출약정금','value':[150000000000,427000000000]},
    ]
};


const selectArr = (arrValue: Array<any>, arrTargetSelect : CategoryObj[], names: string):
    [Array<string | void>,Array<boolean | void>] => {
        // select only arrValue in arrTargetSelect value
    let selectedArr : Array<string | void> = arrTargetSelect.filter(function(fil){
        return (fil.name == names) ? true : false}).map((v) => (v.value))
    if (selectedArr.length ==0){
        return [[],[]]
    }
    let temp_set : Set<string> =  new Set(selectedArr as Array<string>)
    const itClicked = (arrValue  as Array<string>).map((v) => temp_set.has(v) ? true : false);
    return [selectedArr,itClicked]
    }


// Filter Reducer define
function FilReducer(state : FilterStateObj,action: ActionObj) {
    console.log('Reducer state : ',state, 'Reducer Action :', action)
    switch (action.typ){
        case FILTER_ACTION.CATEGORY_ADD:
            return {
                category:[...state.category,action.value],
                float:state.float,
            };
        case FILTER_ACTION.CATEGORY_DEL:
            let c = {
                category:state.category.filter(function(cate_value){
                    // console.log("incallback:",cate_value.value,action.value.value)
                    return cate_value.value != action.value.value ? true : false}),
                float:state.float,
            }
            return c;
        case FILTER_ACTION.FLOAT_ADD:
            return {
                category:state.category,
                float:[...state.float,action.value],
            };
        case FILTER_ACTION.FLOAT_UPDATE:
            var index = state.float.findIndex(i => i.name == action.value.name)
            var newFloat = [...state.float]
            newFloat[index] = action.value as FloatObj
            return {
                category: state.category,
                float: newFloat
            }
        default:
            return state
    }
}
const FilContext = createContext(initFilSt);
export {FilReducer, initFilSt, selectArr, FilContext}



