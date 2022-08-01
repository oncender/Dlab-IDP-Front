interface modelPredictType {
    bankfix: [number, number, number];
    insfix: [number, number, number];
    etcfix: [number, number, number];
    bankfloat: [number, number, number];
    insfloat: [number, number, number];
    etcfloat: [number, number, number];
}

interface macroType {
    date: string;
    value: number;
}
interface marcoDataType {
    [key: string]: macroType[]
}

interface macroDataType {
    last: string;
    data: marcoDataType;
}

interface resultProp {
    loanType: string;
    loanPriority: string;
    modelPredict: modelPredictType;
}

interface macroProp {
    macroData: macroDataType;
}

interface macroTable {
    [key: string] : []
}

export type { modelPredictType, resultProp, macroProp, macroType, macroTable }