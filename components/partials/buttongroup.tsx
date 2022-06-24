import "../../styles/Button.module.css"
import {faCheckSquare, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faAngry} from "@fortawesome/free-regular-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode} from 'react'

import {Button, Row } from 'antd'
import {FILTER_ACTION, LABELS} from "../const/constant"
import {getKeyByValue} from "../const/utils"

import {
    faBriefcase, faTruck, faHotel, faCartShopping, faHouseChimney, faOilWell, faBuilding,
    faBuildingCircleCheck, faHandHoldingDollar, faUsers, faMoneyCheckAlt,
    faCircleCheck, faCircleMinus, faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

const NAME_ICON = {
    '오피스': faBriefcase,
    '물류': faTruck,
    '호텔': faHotel,
    '리테일': faCartShopping,
    '복합': faBuilding,
    '주거': faHouseChimney,
    '특별자산': faOilWell,
    '기타': '',
    '실물': faBuildingCircleCheck,
    '대출': faHandHoldingDollar,
    '개발(펀드)': faUsers,
    '개발(PF)': faMoneyCheckAlt, //faMoneyCheckPen
    '선': faCircleCheck,
    '중': faCircleMinus,
    '후': faCircleExclamation
}

/*
- 자산유형
    - 오피스 : fa-briefcase
    - 물류 : fa-truck
    - 호텔 : fa-hotel
    - 리테일 : fa-cart-shopping
    - 복합 : fa-buildings
    - 주거 : fa-house-chimney
    - 특별자산 : fa-oil-well
    - 기타 :
- 투자유형
    - 실물 : fa-building-circle-check
    - 대출 : fa-hand-holding-dollar
    - 개발(펀드) : fa-users
    - 개발(PF) : fa-money-check-pen
- 대출순위
    - 선 : fa-circle-check
    - 중 : fa-circle-minus
    - 후 : fa-circle-exclamation
 */

//["solid", "fa-briefcase"]
const ButtonPart = (num: number, isclicked: boolean, name: string, onClick: any) => {
    const name_gen = () => {
        if (isclicked) {
            return (<div className ={"text-filter-btn-clicked-self"}><FontAwesomeIcon icon={NAME_ICON[name]} size="lg" pull={'left'} inverse/><b>{name}</b></div>)
        } else {
            return (<div className ={"text-filter-btn-unclicked-self"} ><FontAwesomeIcon icon={NAME_ICON[name]} size="lg" pull={'left'}/><b>{name}</b></div>)
        }
    }
    if (isclicked) {
        return (
            <div className={"text-center bg-filter-btn-clicked-bg"} style={{'width':'fit-content','display':'inline-table'}}>
                <Button
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    type = {'primary'}
                    shape='default'>
                    {name_gen()}
                </Button>
            </div>)
    } else {
        return (
            <div className={"text-center bg-filter-btn-unclicked-bg"} style={{'width':'fit-content','display':'inline-table'}}>

                <Button
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    // type = {isclicked ? 'dashed' : 'default'}
                    shape='default'>
                    {name_gen()}
                </Button></div>)
    }

    // <div className="text-center text-filter-btn-clicked-self bg-filter-btn-clicked-bg">

}

const ButtonGroup = ({label, buttons, isclicked, setClick, filDispat}:
                         { label: string, buttons: Array<string>, isclicked: Array<boolean>, setClick: Function, filDispat: Function }) => {
    // @ts-ignore
    const buttonValue: ReactNode[] = [];
    let name = getKeyByValue(LABELS, label)
    const onClick = (e: MouseEvent, num: number) => {
        num = Number(num)
        let actionType = (isclicked[num]) ? FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
        let newaction = {typ: actionType, value: {'name': name, 'value': buttons[num]}}
        isclicked[num] = !isclicked[num]
        setClick([...isclicked])
        filDispat(newaction)
    };

    for (let i = 0; i < buttons.length; i++) {
        buttonValue.push(ButtonPart(i, isclicked[i], buttons[i], onClick));
    }
    ;
    return (
        <>
        <Row>
            <span><b>{label}</b></span>
        </Row>
        <Row>
            {buttonValue}
        </Row>
            </>
    )
};

export default ButtonGroup