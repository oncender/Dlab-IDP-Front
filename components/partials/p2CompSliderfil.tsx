import {SliderMarks} from "antd/lib/slider";
import {ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {Slider} from "antd";
import {FILTER_ACTION, ALL_LABEL} from "../const/p2Constant";
import { getKeyByValue } from "../const/p2Utils"


const CompSliderfil = ({label,curntval,mmVal,setSlider,filDispat} :
    {label: string, curntval: [number,number], mmVal: [number,number], setSlider: Function, filDispat: Function}) => {
    let name = getKeyByValue(ALL_LABEL,label)
    const handleYearSlider = (value: [number, number]) => {
        let actionType = FILTER_ACTION.FLOAT_UPDATE
        setSlider(value)
        filDispat({"typ":actionType,"value":{"name":name,"value":value}})
      }
    const calcStep = (curntval:[number,number],mmVal:[number,number]) =>{
            // todo need to calc logic for exponentially
            if (curntval[1] >= 100E8){
                return 10E8
            } else if (curntval[1] >= 1000E8){
                return 500E8
            } else {
                return 1E8
            }
        };
    const sliders: JSX.Element = useMemo(() => {
        const marks: SliderMarks = {
        [curntval[0]]: {style: {paddingLeft: '1%',fontSize:'0.9em'}, label: `${curntval[0]/1E8}억`},
        [curntval[1]]: {style: {paddingRight: ((curntval[1]/1E8)> 4000? '20%': '0%'),fontSize:'0.9em'}, label: `${curntval[1]/1E8}억`},
        }
        return (<Slider
            range={true}
            marks={marks}
            min={mmVal[0]}
            max={mmVal[1]}
            step={calcStep(curntval,mmVal)}
            defaultValue={curntval}
            key={'slider'+label}
            onAfterChange={(value) => {handleYearSlider(value)}}
            // onChange={(value) => {handleYearSlider(value)}}
        />)
    },[curntval]);

    return (
        <div key={label} className="mt-8">
            <span className="filterName">
                {label}
            </span>
            {sliders}
        </div>
    )}

export default CompSliderfil