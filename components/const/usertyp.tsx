

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

export type {ActionObj, FilterStateObj, FloatObj, CategoryObj}