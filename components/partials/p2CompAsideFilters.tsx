import styles from "../../styles/Aside.module.scss"
import {selectArr} from "../reducers/FilterReducer";
import {LABELS, MM_DEBT} from "../const/p2Constant";
import React, {useEffect, useMemo, useState} from "react";
import {
    FilterStateObj
} from "../const/p2Usertyp"
import CompButtonGroup from "./p2CompButtonGroup";
import CompSliderfil from "./p2CompSliderfil";

const AsideFilters = ({fromHomeData,filDispat, start}:
                          {   fromHomeData:FilterStateObj,
                              filDispat:Function,styleJs:{[key:string]:string}
                              start:boolean
                          }) => {
    // button component dependent param def
    const itValue: Array<string> = ['실물', '대출', '개발(펀드)', '개발(PFV)'];
    const itClicked = selectArr(itValue, fromHomeData.category, 'it');
    const [clickArrIt, setClickArrIt] = useState(itClicked);

    const seniorstrValue: Array<string> = ['선', '중', '후'];
    const seniorstrClicked = selectArr(seniorstrValue, fromHomeData.category, 'seniorstr');
    const [clickArrSeniorstr, setClickArrSeniorstr] = useState(seniorstrClicked);

    const atValue: Array<string> = ['오피스', '물류', '호텔', '리테일', '복합(리테일)', '주거', '특별자산', '기타'];
    const atClicked = selectArr(atValue, fromHomeData.category, 'at');
    const [clickArrAt, setClickArrAt] = useState(atClicked);

    const rateValue: Array<string> = ['고정', '변동'];
    const rateClicked = selectArr(rateValue, fromHomeData.category, 'rate');
    const [clickArrRate, setClickArrRate] = useState(rateClicked);

    const loanClsValue: Array<string> = ['담보', '브릿지','한도','부가세','PF','기타(대출)'];
    const loanClsClicked = selectArr(loanClsValue, fromHomeData.category, 'loancls');
    const [clickLoanCls, setClickLoanCls] = useState(loanClsClicked);
    // slider component dependent def
    const [sldrval, setSldrval] = useState(fromHomeData.float.filter((val)=> val.name==='debt')[0].value)
    useEffect(() => {
        // if (!start) return
        setClickArrIt(itClicked)
        setClickArrSeniorstr(seniorstrClicked)
        setClickArrAt(atClicked)
        setClickArrRate(rateClicked)
        setClickLoanCls(loanClsClicked)
        setSldrval(fromHomeData.float.filter((val)=> val.name==='debt')[0].value)
    },[fromHomeData])

    // button component def
    const iTButton = useMemo(() => {
        return (<CompButtonGroup
            label={LABELS['it']}
            buttons={itValue}
            isclicked={clickArrIt}
            setClick={setClickArrIt}
            filDispat={filDispat}
        />)
    }, [clickArrIt])
    const seniorstrButton = useMemo(() => {
        return (<CompButtonGroup
            label={LABELS['seniorstr']}
            buttons={seniorstrValue}
            isclicked={clickArrSeniorstr}
            setClick={setClickArrSeniorstr}
            filDispat={filDispat}
        />)
    }, [clickArrSeniorstr])
    const aTButton = useMemo(() => {
        return (<CompButtonGroup
            label={LABELS['at']}
            buttons={atValue}
            isclicked={clickArrAt}
            setClick={setClickArrAt}
            filDispat={filDispat}
        />)
    }, [clickArrAt])
    const rateButton = useMemo(() => {
        return (<CompButtonGroup
            label={LABELS['rate']}
            buttons={rateValue}
            isclicked={clickArrRate}
            setClick={setClickArrRate}
            filDispat={filDispat}
        />)
    }, [clickArrRate])
    const loanClsButton = useMemo(() => {
        return (<CompButtonGroup
            label={LABELS['loancls']}
            buttons={loanClsValue}
            isclicked={clickLoanCls}
            setClick={setClickLoanCls}
            filDispat={filDispat}
        />)
    }, [clickLoanCls])

    // slider component def
    const lamtSldr = useMemo(() => {
        return (
            <CompSliderfil
                label={LABELS['debt']}
                curntval={sldrval}
                setSlider={setSldrval}
                mmVal={MM_DEBT}
                filDispat={filDispat}
            />)
    }, [sldrval])
    return (
         <aside className={styles.aside}>
                    {loanClsButton}
                    {iTButton}
                    {aTButton}
                    {seniorstrButton}
                    {rateButton}
                    {lamtSldr}
                </aside>
    )
}

export default AsideFilters