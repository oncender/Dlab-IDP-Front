
// for filter object
interface FilterStateObj {
    category : CategoryObj[],
    float : FloatObj[]
}
interface CategoryObj {
    name : string
    value : string
}
interface FloatObj {
    name : string
    value : [number, number]
}

// for Async Hook
interface ApiFlowObj{
    loading: boolean
    data: any
    error: boolean
  }
interface ActionObj{
    typ : string,
    value : CategoryObj | FloatObj
}

// for chart Data
interface rateAtData{
    sdaterate:string
    at:string
    loandate:string
    loanamt:string
}
interface aumLpcorp{
    lpcorp:string
    loandate:string
    loanamt:string
}


export type {ActionObj, FilterStateObj, FloatObj, CategoryObj, ApiFlowObj}