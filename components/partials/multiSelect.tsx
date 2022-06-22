import {Select} from "antd";
import React, {ReactNode} from "react";

export default function MultiSelect(props: any){
    const optionNode: ReactNode[] = [];
    for (let i=0; i < props.options.length;i++){
        optionNode.push(<Select key={props.options[i]}>{props.options[i]}</Select>);
    };
    const changeOptions = (value: string[]) => {
        // props.FilterUpdate(value)
        // console.log(`selected ${value}`);
    };

    return (
        <>
            <span> {props.labels} </span>
            <Select mode = "multiple"
                    allowClear
                    style={{width:'50%'}}
                    placeholder="Please select"
                    defaultValue={props.defaultOptions}
                    onChange={changeOptions}>
                {optionNode}
            </Select>
        </>
)}

