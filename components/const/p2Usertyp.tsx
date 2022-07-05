// for filter object
interface FilterStateObj {
    category: CategoryObj[],
    float: FloatObj[]
}

interface CategoryObj {
    name: string
    value: string
}

interface FloatObj {
    name: string
    value: [number, number]
}

// for Async Hook
interface ApiFlowObj {
    loading: boolean
    data: any
    error: boolean
    rcn: number,
    pagecnt: number
}

interface ActionObj {
    typ: string,
    value: CategoryObj | FloatObj | FilterStateObj
}

// for chart Data
interface rateAtData {
    sdaterate: string
    at: string
    loandate: string
    loanamt: string
}

interface fromApiV1 {
    [key: string]: string
}

interface aumLpcorp {
    sdaterate: number
    at: string
    loandate: string
    loanamt: number
    an: string
}

interface rateAtData {
    lpcorp: string
    loandate: number
    loanamt: number
}

interface cardComp {
    img?: string  // source url for each card image or icon
    fn: string
    lpcorp: string
    an: string
    loan: number
    sdaterate: number
    duration: string
    loanamt: number
    idx: string
    fc: string,
    loancls: string,
    seniorstr: string,
    it: string,
    at: string,
    rate: string,
}

interface pageCountTyp {
    data: cardComp[],
    hasMore: boolean,
    rcn: number
}

interface chartTyp {
    data: { one: fromApiV1[], two: fromApiV1[] }[],
    hasMore: boolean,
    rcn: number,
}

interface FundDataType {
    fc: string,
    fn: string,
    sdate: string,
    mdate: string,
    an: string,
    ac: string,
    domfor: string,
    at: string,
    ft: string,
    strat: string,
    area: string,
    equity: string,
    loan: string,
    aum: string,
    ltv: string,
    ro: string,
    loandate: string,
    lpnum: string,
    lp: string,
    lpcorp: string,
    lpt: string,
    seniorstr: string,
    loanuse: string,
    loantype: string,
    loancls: string,
    addr: string,
    loanamt: string,
    loanrpy: string,
    rate: string,
    loanintcls: string,
    loanintfloat: string,
    sdaterate: string,
    spread: string,
    loanpremium: string,
    intdur: string,
    laterate: string,
    lateratecls: string,
    sdatelaterate: string,
    earlypremium: string,
    earlypremiumcls: string,
    guranteelimit: string,
    dscr: string,
    intdeposit: string,
    default: string,
    opinion: string,
    lender: string,
    trustee: string,
    amc: string,
    financialinst: string,
    mm: string,
    cashsupp: string,
    debtundwrt: string,
    builder: string,
    duration: string,
}


export type {
    ActionObj, FilterStateObj, FloatObj, CategoryObj, ApiFlowObj,
    fromApiV1, rateAtData, aumLpcorp, cardComp, pageCountTyp, chartTyp, FundDataType
}