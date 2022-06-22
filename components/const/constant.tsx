import { FilterStateObj } from "./usertyp";

// Filter Default action
export const FILTER_ACTION = {
    'CATEGORY_ADD':'categoryAdd',
    'CATEGORY_DEL':'categoryDel',
    'FLOAT_ADD':'floatAdd',
    'FLOAT_UPDATE':'floatUpdate',
};

// Filter Default action
export const INIT_FILST: FilterStateObj = {
    category: [
        {'name':'it','value':'실물'},
        {'name':'it','value':'대출'},
        {'name':'seniorstr','value':'선'},
        {'name':'at','value':'중'},
        {'name':'at','value':'오피스'},
        {'name':'at','value':'호텔'},
        {'name':'rate','value':'고금리'}
    ],
    float :[
        {'name':'loanamt','value':[150000000000,427000000000]},
    ]
};

export const INIT_LOANAMT:[number,number] = [15E8,427E8]

// need to be fixed by real min max value
export const MM_LOANAMT:[number,number] = [1E8,1000E8]

// labels for each filter (label : button1 button2 ...) | (label \n slider ---- )
export const LABELS = {
    'it' : '투자 유형',
    'seniorstr': '대출 순위',
    'at' : '자산 유형',
    'loanamt' : '대출 약정금',
    'rate': '금리 종류'
}


