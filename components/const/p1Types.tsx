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

interface qnaType {
    question: string;
    answer: string;
}

interface qnaProps {
    item: questionType;
}

interface qna2Type {
    msgNum: number,
    username: string,
    password: string,
    subthread: number,
    time: string,
    content: string,
}

interface answerType {
    sequence: number,
    userName: string,
    password: string,
    content: string,
    time: string,
}

interface questionType {
    msgNum: number,
    userName: string,
    password: string,
    content: string,
    time: string,
    answers : answerType[],
}

export type { 
    modelPredictType, 
    resultProp, 
    macroProp, 
    macroType, 
    macroTable, 
    qnaType, 
    qnaProps, 
    qna2Type,
    answerType,
    questionType,
}