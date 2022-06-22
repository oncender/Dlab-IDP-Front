import {SliderMarks} from "antd/lib/slider";
import {ReactNode, useContext, useEffect, useState} from "react";
import {Slider} from "antd";
import {FilContext} from "../reducers/FilterReducer";
import {FILTER_ACTION, LABELS} from "../const/constant";
import { getKeyByValue } from "../const/utils"

const SliderFil = ({label,curntval,mmVal,setSlider} :
    {label: string, curntval: [number,number], mmVal: [number,number], setSlider: Function}) => {

    const {_,filDispat} = useContext(FilContext);
    const [action,setAction] = useState({typ:null});

    let mark1:number = curntval[0]
    let mark2:number = curntval[1]
    const marks: SliderMarks = {
        mark1: {style: {paddingLeft: '20px'}, label: '2011'},
        mark2: {style: {paddingRight: '20px'}, label: '2022'},
        }
        let name = getKeyByValue(LABELS,label)
    const handleYearSlider = (value: [number, number]) => {
        let actionType = FILTER_ACTION.FLOAT_UPDATE
        setSlider(value)
        setAction({"typ":actionType,"value":{"name":name,"value":value}})
      }
    const calcStep = (curntval:[number,number],mmVal:[number,number]) =>{
            // todo need to calc logic
            return 1E8
        }


    useEffect(() => {
        filDispat(action)
        }, [action]);

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
            onChange={(value) => {handleYearSlider(value)}}
        />)
    return (
        <>
            <span key ={'span'+label}>
                {label}
            </span>
            {sliders}
        </>
    )}

export default SliderFil