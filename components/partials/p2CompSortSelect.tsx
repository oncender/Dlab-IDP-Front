import {ReactNode, useContext, useEffect, useState} from "react";
import {Select} from "antd";
import {SORT_LABELS} from "../const/p2Constant";
import {getKeyByValue} from "../const/p2Utils"

const {Option} = Select;
const CompSortSelect = ({curntOption, desAsc, setcurntOption, setdesAsc}:
                        { curntOption: string, desAsc: boolean, setcurntOption: Function, setdesAsc: Function }) => {


    const stylesJs = {width:"11%",fontSize:'1em'}//styleGen(windowStatus)
    console.log(stylesJs)
    const sortOptions = Object.keys(SORT_LABELS).map((k) => {
        // @ts-ignore
        return (<Option value={SORT_LABELS[k]}></Option>)
    })
    return (
        <>
            <Select
                defaultValue={curntOption}
                style={stylesJs}
                bordered={false}
                onChange={(value: string) => {
                    console.log(`selected ${value}`)
                    setcurntOption(value)}}>
                {sortOptions}
            </Select>
            <Select defaultValue={desAsc}
                    style={stylesJs}
                    bordered={false}
                    onChange={(value: string) => {
                        console.log(`selected ${value}`)
                        setdesAsc(value)}}>
                <Option value={true}>오름차순</Option>
                <Option value={false}>내림차순</Option>
            </Select>
        </>)
}
export default CompSortSelect