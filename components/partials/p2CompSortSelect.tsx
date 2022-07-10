import {ReactNode, useContext, useEffect, useState} from "react";
import {Select} from "antd";
import {ALL_LABEL} from "../const/p2Constant";
import {getKeyByValue} from "../const/p2Utils"
import {windowContext} from "../../pages/detail";

const {Option} = Select;
const CompSortSelect = ({curntOption, desAsc, setcurntOption, setdesAsc}:
                        { curntOption: string, desAsc: boolean, setcurntOption: Function, setdesAsc: Function }) => {

    function styleGen(windowStatus: string|undefined) {
        switch (windowStatus) {
            case '':
                return {styleJs:{},divJs:{},size:'',fontSize:''}
            case 'large':
                return {styleJs:{width: "11%", fontSize: '1em'},
                        }
            case 'medium':
                return {styleJs:{width: "15%",fontSize: '1em'},
                        }
            case 'small':
                return {styleJs:{width: "15%", fontSize: '1em'},
                        }
            default:
                return {styleJs:{}}
        }
    }
    var styleJs,divJs,size,fontSize
    const {windowStatus} = useContext(windowContext);
    ({styleJs} = styleGen(windowStatus))


    const sortOptions = Object.keys(ALL_LABEL).map((k) => {
        // @ts-ignore
        return (<Option key={"sortOptions"+ALL_LABEL[k]} value={ALL_LABEL[k]}></Option>)
    })
    return (
        <>
            <Select
                key ={'sort1'}
                defaultValue={curntOption}
                style={styleJs}
                bordered={false}
                onChange={(value: string) => {
                    console.log(`selected ${value}`)
                    setcurntOption(value)}}>
                {sortOptions}
            </Select>
            <Select
                    key ={'sort2'}
                    defaultValue={desAsc}
                    style={styleJs}
                    bordered={false}
                    onChange={(value: string) => {
                        console.log(`selected ${value}`)
                        setdesAsc(value)}}>
                <Option key="sortOptionsAsc" value={true}>오름차순</Option>
                <Option key="sortOptionsDesc" value={false}>내림차순</Option>
            </Select>
        </>)
}
export default CompSortSelect