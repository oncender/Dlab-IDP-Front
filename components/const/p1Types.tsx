interface modelPredictType {
    bankfix: [number, number];
    insfix: [number, number];
    etcfix: [number, number];
    bankfloat: [number, number];
    insfloat: [number, number];
    etcfloat: [number, number];
}

interface resultProp {
    loanType: string;
    loanPriority: string;
    modelPredict: modelPredictType;
}

interface macroProp {
    loanType: string;
    loanPriority: string;
    modelPredict: modelPredictType;
}

export type { modelPredictType, resultProp, macroProp }