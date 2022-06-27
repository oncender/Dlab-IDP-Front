import {SliderMarks} from "antd/lib/slider";
import {ReactNode, useContext, useEffect, useState} from "react";
import {Slider} from "antd";
import {FILTER_ACTION, LABELS} from "../const/p2Constant";
import { getKeyByValue } from "../const/p2Utils"
import styles from "../../styles/Button.module.scss";

const CompSliderfil = ({label,curntval,mmVal,setSlider,filDispat} :
    {label: string, curntval: [number,number], mmVal: [number,number], setSlider: Function, filDispat: Function}) => {

    const marks: SliderMarks = {
        [curntval[0]]: {style: {paddingLeft: '20px'}, label: `${curntval[0]/1E8}억`},
        [curntval[1]]: {style: {paddingRight: '20px'}, label: `${curntval[1]/1E8}억`},
        }
    let name = getKeyByValue(LABELS,label)
    const handleYearSlider = (value: [number, number]) => {
        let actionType = FILTER_ACTION.FLOAT_UPDATE
        setSlider(value)
        filDispat({"typ":actionType,"value":{"name":name,"value":value}})
      }
    const calcStep = (curntval:[number,number],mmVal:[number,number]) =>{
            // todo need to calc logic for exponentially
            return 1E8
        }
    const sliders: ReactNode[] = [];
    sliders.push(
        <Slider
            range
            marks={marks}
            min={mmVal[0]}
            max={mmVal[1]}
            step={calcStep(curntval,mmVal)}
            defaultValue={curntval}
            key={'slider'+label}
            onAfterChange={(value) => {handleYearSlider(value)}}
            // onChange={(value) => {handleYearSlider(value)}}
        />)
    return (
        <div key ={label}>
            <span className="filterName">
                {label}
            </span>
            {sliders}
        </div>
    )}

export default CompSliderfil