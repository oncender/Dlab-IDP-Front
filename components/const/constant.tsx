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
        {'name':'rate','value':'고정'}
    ],
    float :[
        {'name':'debt','value':[300E8,427E8]},
    ]
};

export const INIT_DEBT:[number,number] = [200E8,800E8]

// need to be fixed by real min max value
export const MM_DEBT:[number,number] = [1E8,1000E8]

// labels for each filter (label : button1 button2 ...) | (label \n slider ---- )
export const LABELS = {
    'it' : '투자 유형',
    'seniorstr': '대출 순위',
    'at' : '자산 유형',
    'debt' : '대출 약정금',
    'rate': '금리 종류'
}
// sorting params name
export const SORT_LABELS = {
    'it' : '투자 유형',
    'seniorstr': '대출 순위',
    'at' : '자산 유형',
    'debt' : '대출 약정금',
    'rate': '금리 종류',
    'fn':"펀드명",
    'lpcorp':"대주명회사",
    'an':"자산명",
    'loanamt':"대출약정금",
    'aum':"대출총액",
    'sdaterate':"체결이자",
    'duration':"듀레이션"
}


export const CARD_LABELS = {
    'fn':"펀드명",
    'lpcorp':"대주명회사",
    'an':"자산명",
    'loanamt':"대출약정금",
    'aum':"대출총액",
    'sdaterate':"체결이자",
    'duration':"듀레이션"
    }

export const APIURL = {
    ROWCOUNT:"/api/v1/debtRowCount",
    TABLE : "/api/v1/debt/dataTable",
    CARD_ALL:"/api/v1/debt/dataTable",
    PLTONE:"/api/v1/debt/graphLeft",
    PLTTWO:"/api/v1/debt/graphRight",
    CARDPAGE:"/api/v1/debt/dataTable" //will be replace
}
// PLTONE:"http://localhost:8080/api/v1/debt/graphLeft",
// PLTTWO:"http://localhost:8080/api/v1/debt/graphRight",


export const TEMPCSS = {
    "height": 2235,
    "width": 1440,
    "left": 761,
    "top": -560,
    "border-radius": 0
}

// For draggin type def
export const ItemTypes = {
    ContentS : 'ContentS',

}

