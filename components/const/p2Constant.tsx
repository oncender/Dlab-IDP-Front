import {FilterStateObj, FundDataType} from "./p2Usertyp";
import type { ColumnsType } from "antd/lib/table"
import {
    faBriefcase, faTruck, faHotel, faCartShopping, faHouseChimney, faOilWell, faBuilding,
    faBuildingCircleCheck, faHandHoldingDollar, faUsers, faMoneyCheckAlt,
    faCircleCheck, faCircleMinus, faCircleExclamation, faPercent,
    faEllipsis, faWaveSquare ,
    faBuildingLock,faClipboardList,faFileInvoiceDollar,faBridge,faShop
} from "@fortawesome/free-solid-svg-icons";
import { faViacoin, faEtsy
} from "@fortawesome/free-brands-svg-icons"
// faCircleEllipsisVertical, faWavePulse : pro

// Filter Default action
export const FILTER_ACTION = {
    'CATEGORY_ADD':'categoryAdd',
    'CATEGORY_DEL':'categoryDel',
    'FLOAT_ADD':'floatAdd',
    'FLOAT_UPDATE':'floatUpdate',
    'REPLACE':'replaceDispatch'
};

export const CLICK_ACTION = {
    'CLICK': 'click',
    'UNCLICK':'unclick',
    'CLEAR':'clear',
    "CLICK_MANY" :'clickmany',
}

// Filter Default action
export const INIT_FILST: FilterStateObj = {
    category: [

    ],
    float :[
        {'name':'debt','value':[0,5000E8]},
    ]
};

// need to be fixed by real min max value
export const MM_DEBT:[number,number] = [0,5000E8]

// labels for each filter (label : button1 button2 ...) | (label \n slider ---- )

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



export const NAME_ICON = {
    '오피스': faBriefcase,
    '물류': faTruck,
    '호텔': faHotel,
    '리테일': faCartShopping,
    '복합(오피스)': faBuilding,
    '복합(리테일)': faShop,
    '주거': faHouseChimney,
    '특별자산': faOilWell,
    '기타': faEllipsis,
    '실물': faBuildingCircleCheck,
    '대출': faHandHoldingDollar,
    '개발(펀드)': faUsers,
    '개발(PFV)': faMoneyCheckAlt, //faMoneyCheckPen
    '선': faCircleCheck,
    '중': faCircleMinus,
    '후': faCircleExclamation,
    '고정': faPercent,
    '변동': faWaveSquare,
    '담보':	faBuildingLock,
    'PF':	faClipboardList,
    '한도':	faFileInvoiceDollar,
    '부가세':	faViacoin,
    '브릿지'	:faBridge,
    '기타(대출)':	faEtsy
}
export const LABELS = {
    'it' : '투자 유형',
    'seniorstr': '대출 순위',
    'at' : '자산 유형',
    'debt' : '대출 약정금',
    'rate': '금리 종류',
    'loancls':'대출 분류',

}

export const ALL_LABEL: {[key:string]:string}= {
        'fc': '펀드코드'
        ,'it' : '투자 유형'
        , 'an': '자산명'
        , 'fn': '펀드명'
        , 'loan': 'LOAN 총액'
        , 'loanamt': '대출약정금'
        , 'lpcorp': '대주명'
        , 'lpt': '대주명분류'
        , 'seniorstr': '대출순위'
        , 'sdaterate': '체결일이자율'

        , 'addr': '토지주소'
        , 'sdate': '설정일'
        , 'mdate': '만기일'
        , 'domfor': '국내/해외'
        , 'ft': '펀드구분'
        , 'strat': '투자전략'
        , 'area': '연면적(평)'
        , 'equity': 'EQUITY 총액'

        , 'aum': 'AUM 총액'
        , 'ltv': 'LTV'
        , 'ro': '롤오버'
        , 'loandate': '대출계약체결일'
        , 'lpnum': '대주수'
        , 'lp': '대주'
        , 'loanuse': '대출용도'
        , 'loantype': '대출종류'
        , 'loancls': '대출분류'

        , 'loanrpy': '대출금상환방식'
        , 'rate': '금리종류'
        , 'loanintcls': '대출이자율분류'
        , 'loanintfloat': '변동이자율기준'

        , 'spread': '스프레드'
        , 'loanpremium': '대출취급수수료'
        , 'intdur': '이자기간'
        , 'laterate': '연체이자율'
        , 'lateratecls': '연체이자율분류'
        , 'sdatelaterate': '체결일연체이자율'
        , 'earlypremium': '조기상환수수료'
        , 'earlypremiumcls': '조기상환 수수료분류'
        , 'guranteelimit': '담보한도율'
        , 'dscr': 'DSCR'
        , 'intdeposit': '이자유보금'
        , 'default': '채무불이행요건'
        , 'opinion': '대주의의사결정'
        , 'lender': '차주'
        , 'trustee': '신탁업자'
        , 'amc': '집합투자업자'
        , 'financialinst': '대리금융기관'
        , 'mm': '자금관리자'
        , 'cashsupp': '자금보충인'
        , 'debtundwrt': '채무인수인'
        , 'builder': '시공사'
        , 'duration': '듀레이션'
    }


export const NumberColumns: Set = new Set([
    'loan','loanamt','sdaterate','area','equity','aum','ltv','ro','lpnum','spread','loanpremium','intdur','lateratecls','sdatelaterate','guranteelimit','intdeposit','duration'
])
export const FilterColumns: Set = new Set([
    'fc','an','fn','lpcorp','lpt','seniorstr','domfor','ft','strat','lp','lender','trustee','amc','financialinst','mm','cashsupp','debtundwrt','builder'
])

// 'sdate','mdate','loandate','
export const FundColumns: ColumnsType<FundDataType> = [
    { title: '자산명', dataIndex: 'an', key: 'an', fixed:'left', width: 150, ellipsis: true },
    { title: '펀드코드', dataIndex: 'fc', key: 'fc',width: 100, ellipsis: true ,sorter : true },
    { title: '펀드명', dataIndex: 'fn', key: 'fn',  width: 250, ellipsis: true,sorter : true },
    { title: 'LOAN 총액(원)', dataIndex: 'loan', key: 'loan', width: 200 , ellipsis: true ,sorter : true },
    { title: '대출약정금(원)', dataIndex: 'loanamt', key: 'loanamt', width: 200 ,ellipsis: true , sorter : true },
    { title: '대주명', dataIndex: 'lpcorp', key: 'lpcorp', width: 170, ellipsis: true },
    { title: '대주명분류', dataIndex: 'lpt', key: 'lpt', width: 120 ,ellipsis: true ,},
    { title: '대출순위', dataIndex: 'seniorstr', key: 'seniorstr', width: 100 },
    { title: '체결일이자율(%)', dataIndex: 'sdaterate', key: 'sdaterate', width: 120, sorter : true  ,ellipsis: true },
    { title: '변동이자율기준', dataIndex: 'loanintfloat', key: 'loanintfloat', width: 120 ,ellipsis: true },
    { title: '스프레드', dataIndex: 'spread', key: 'spread', width: 120 ,ellipsis: true },
    { title: '토지주소', dataIndex: 'addr', key: 'addr', width: 150, ellipsis: true },
    { title: '설정일', dataIndex: 'sdate', key: 'sdate', width: 120 , sorter : true ,ellipsis: true },
    { title: '만기일', dataIndex: 'mdate', key: 'mdate', width: 120 , sorter : true,ellipsis: true  },
    { title: '국내/해외', dataIndex: 'domfor', key: 'domfor', width: 100,ellipsis: true  },
    { title: '펀드구분', dataIndex: 'ft', key: 'ft', width: 100 ,ellipsis: true },
    { title: '투자전략', dataIndex: 'strat', key: 'strat', width: 100 ,ellipsis: true },
    { title: '연면적(평)', dataIndex: 'area', key: 'area', width: 100 ,ellipsis: true },
    { title: 'EQUITY 총액(원)', dataIndex: 'equity', key: 'equity', width: 200 , sorter : true,ellipsis: true  },

    { title: 'AUM 총액(원)', dataIndex: 'aum', key: 'aum', width: 200 , sorter : true ,ellipsis: true },
    { title: 'LTV', dataIndex: 'ltv', key: 'ltv', width: 120 , sorter : true ,ellipsis: true },
    { title: '롤오버', dataIndex: 'ro', key: 'ro', width: 100 ,ellipsis: true },
    { title: '대출계약체결일', dataIndex: 'loandate', key: 'loandate', width: 130 ,ellipsis: true },
    { title: '대주수', dataIndex: 'lpnum', key: 'lpnum', width: 70 , sorter : true ,ellipsis: true },
    { title: '대주', dataIndex: 'lp', key: 'lp', width: 170, ellipsis: true },


    { title: '대출용도', dataIndex: 'loanuse', key: 'loanuse', width: 150, ellipsis: true },
    { title: '대출종류', dataIndex: 'loantype', key: 'loantype', width: 150 ,ellipsis: true },
    { title: '대출분류', dataIndex: 'loancls', key: 'loancls', width: 100 ,ellipsis: true },

    { title: '대출금상환방식', dataIndex: 'loanrpy', key: 'loanrpy', width: 200 ,ellipsis: true },
    { title: '금리종류', dataIndex: 'rate', key: 'rate', width: 100 ,ellipsis: true },
    { title: '대출이자율분류', dataIndex: 'loanintcls', key: 'loanintcls', width: 120 ,ellipsis: true },

    { title: '대출취급수수료', dataIndex: 'loanpremium', key: 'loanpremium', width: 120 ,ellipsis: true },
    { title: '이자기간', dataIndex: 'intdur', key: 'intdur', width: 100 ,ellipsis: true },
    { title: '연체이자율', dataIndex: 'laterate', key: 'laterate', width: 150 ,ellipsis: true },
    { title: '연체이자율분류', dataIndex: 'lateratecls', key: 'lateratecls', width: 100 ,ellipsis: true },
    { title: '체결일연체이자율', dataIndex: 'sdatelaterate', key: 'sdatelaterate', width: 100 ,ellipsis: true },
    { title: '조기상환수수료', dataIndex: 'earlypremium', key: 'earlypremium', width: 200, ellipsis: true },
    { title: '조기상환 수수료분류', dataIndex: 'earlypremiumcls', key: 'earlypremiumcls', width: 100 ,ellipsis: true },
    { title: '담보한도율', dataIndex: 'guranteelimit', key: 'guranteelimit', width: 100 ,ellipsis: true },
    { title: 'DSCR', dataIndex: 'dscr', key: 'dscr', width: 100 ,ellipsis: true },
    { title: '이자유보금', dataIndex: 'intdeposit', key: 'intdeposit', width: 100 ,ellipsis: true },
    { title: '채무불이행요건', dataIndex: 'default', key: 'default', width: 120, ellipsis: true },
    { title: '대주의의사결정', dataIndex: 'opinion', key: 'opinion', width: 120, ellipsis: true },
    { title: '차주', dataIndex: 'lender', key: 'lender', width: 150, ellipsis: true },
    { title: '신탁업자', dataIndex: 'trustee', key: 'trusted', width: 150, ellipsis: true },
    { title: '집합투자업자', dataIndex: 'amc', key: 'amc', width: 150, ellipsis: true },
    { title: '대리금융기관', dataIndex: 'financialinst', key: 'financialinst', width: 150, ellipsis: true },
    { title: '자금관리자', dataIndex: 'mm', key: 'mm', width: 150, ellipsis: true },
    { title: '자금보충인', dataIndex: 'cashsupp', key: 'cashsupp', width: 150, ellipsis: true },
    { title: '채무인수인', dataIndex: 'debtundwrt', key: 'debtundwrt', width: 100, ellipsis: true },
    { title: '시공사', dataIndex: 'builder', key: 'builder', width: 150, ellipsis: true },
    { title: '듀레이션', dataIndex: 'duration', key: 'duration', width: 100 ,ellipsis: true },
]
