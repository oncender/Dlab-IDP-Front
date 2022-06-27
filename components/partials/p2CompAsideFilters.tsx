import styles from "../../styles/Aside.module.scss"
import {selectArr} from "../reducers/FilterReducer";
import {INIT_FILST, ItemTypes, LABELS, MM_DEBT} from "../const/p2Constant";
import React, {useMemo, useState, useEffect} from "react";
import {
    fromApiV1,
    rateAtData,
    aumLpcorp,
    cardComp,
    pageCountTyp,
    ApiFlowObj,
    FilterStateObj
} from "../const/p2Usertyp"
import CompButtonGroup from "./p2CompButtonGroup";
import CompSliderfil from "./p2CompSliderfil";
import { useDrag, useDrop } from 'react-dnd';

const AsideFilters = ({id, index ,fromHomeData,filDispat}:
                          {   id: string, index: number,
                              fromHomeData:{filterInit:FilterStateObj,sldrInit:[number,number]},
                              filDispat:Function,styleJs:{[key:string]:string}
                          }) => {
    // button component dependent param def
    const itValue: Array<string> = ['실물', '대출', '개발(펀드)', '개발(PF)'];
    const itClicked = selectArr(itValue, INIT_FILST.category, 'it');
    const [clickArrIt, setClickArrIt] = useState(itClicked);

    const seniorstrValue: Array<string> = ['선', '중', '후'];
    const seniorstrClicked = selectArr(seniorstrValue, INIT_FILST.category, 'seniorstr');
    const [clickArrSeniorstr, setClickArrSeniorstr] = useState(seniorstrClicked);

    const atValue: Array<string> = ['오피스', '물류', '호텔', '리테일', '복합', '주거', '특별자산', '기타'];
    const atClicked = selectArr(atValue, INIT_FILST.category, 'at');
    const [clickArrAt, setClickArrAt] = useState(atClicked);

    const rateValue: Array<string> = ['고정', '변동'];
    const rateClicked = selectArr(rateValue, INIT_FILST.category, 'rate');
    const [clickArrRate, setClickArrRate] = useState(rateClicked);
    // slider component dependent def
    const [sldrval, setSldrval] = useState(fromHomeData.sldrInit)

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
                    {iTButton}
                    {aTButton}
                    {seniorstrButton}
                    {rateButton}
                    {lamtSldr}
                </aside>
    )
}

export default AsideFilters