import {ReactNode, useContext, useEffect, useState} from "react";

import {Select} from "antd";
import {SORT_LABELS} from "../const/constant";
import {getKeyByValue} from "../const/utils"

const {Option} = Select;
const SortSelect = ({curntOption, desAsc, setcurntOption, setdesAsc}:
                        { curntOption: string, desAsc: boolean, setcurntOption: Function, setdesAsc: Function }) => {

    // console.log(curntOption, desAsc,setcurntOption, setdesAsc)
    const sortOptions = Object.keys(SORT_LABELS).map((k) => {
        // @ts-ignore
        return (<Option value={SORT_LABELS[k]}></Option>)
    })
    return (
        <>
            <Select
                defaultValue={curntOption}
                style={{width: 120}}
                bordered={false}
                onChange={(value: string) => {
                    console.log(`selected ${value}`)
                    setcurntOption(value)}}>
                {sortOptions}
            </Select>
            <Select defaultValue={desAsc}
                    style={{width: 120}}
                    bordered={false}
                    onChange={(value: string) => {
                        console.log(`selected ${value}`)
                        setdesAsc(value)}}>
                <Option value={true}>오름차순</Option>
                <Option value={false}>내림차순</Option>
            </Select>
        </>)
}
export default SortSelect