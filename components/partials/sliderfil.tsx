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
    const calcStep = (curntval:[number&2],mmVal:[number&2]) =>{
            // todo need to calc logic
            return 1E8
        }


    useEffect(() => {
        filDispat(action)
        }, [action]);

    const sliders: ReactNode[] = [];
    sliders.push(<Slider
                range
                marks={marks}
                min={mmVal[0]}
                max={mmVal[1]}
                step={calcStep(mmVal,curntval)}
                defaultValue={curntval}
                onChange={(value) => {handleYearSlider(value)}}
            />)
    return (
        <div>
            <span>
                {label}
            </span>
            {sliders}
        </div>
    )}

export default SliderFil