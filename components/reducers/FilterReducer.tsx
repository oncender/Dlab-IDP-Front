import {useReducer} from "react";

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

// Filter Default action
const FILTER_ACTION = {
    'CATEGORY_ADD':'categoryAdd',
    'CATEGORY_DEL':'categoryDel',
    'FLOAT_ADD':'floatAdd',
    'FLOAT_UPDATE':'floatUpdate',
};

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
            return {
                category:state.category.filter(cate_value=> cate_value.value != action.value.value),
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
            return {
                category: state.category,
                float: newFloat
            }
    }
}

export {FilReducer, FILTER_ACTION, initFilSt}



