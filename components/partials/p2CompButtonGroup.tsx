import styles from "../../styles/Button.module.scss"
import {windowContext} from "../../pages/detail"
import {faCheckSquare, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faAngry} from "@fortawesome/free-regular-svg-icons";
// import "../../styles/Button.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode, useContext} from 'react'

import {Button, Row} from 'antd'
import {FILTER_ACTION, LABELS} from "../const/p2Constant"
import {getKeyByValue} from "../const/p2Utils"

import {
    faBriefcase, faTruck, faHotel, faCartShopping, faHouseChimney, faOilWell, faBuilding,
    faBuildingCircleCheck, faHandHoldingDollar, faUsers, faMoneyCheckAlt,
    faCircleCheck, faCircleMinus, faCircleExclamation, faPercent,
    faEllipsis, faWaveSquare
} from "@fortawesome/free-solid-svg-icons";
// faCircleEllipsisVertical, faWavePulse : pro


const NAME_ICON = {
    '오피스': faBriefcase,
    '물류': faTruck,
    '호텔': faHotel,
    '리테일': faCartShopping,
    '복합': faBuilding,
    '주거': faHouseChimney,
    '특별자산': faOilWell,
    '기타': faEllipsis,
    '실물': faBuildingCircleCheck,
    '대출': faHandHoldingDollar,
    '개발(펀드)': faUsers,
    '개발(PF)': faMoneyCheckAlt, //faMoneyCheckPen
    '선': faCircleCheck,
    '중': faCircleMinus,
    '후': faCircleExclamation,
    '고정': faPercent,
    '변동': faWaveSquare,
}

//["solid", "fa-briefcase"]
const ButtonPart = (num: number, isclicked: boolean, name: string, onClick: any) => {
    const name_gen = () => {
        var size,fontSize
        if (windowStatus =='large'){
            size = 'lg'
            fontSize= '1em'
        } else if (windowStatus =='medium'){
            size = ''
            fontSize= '1em'
        } else{
            size = 'xs'
            fontSize= '1em'
        }
        if (isclicked) {
            return (<><FontAwesomeIcon icon={NAME_ICON[name]} size={size} pull={'left'} inverse/>
                <b style={{fontSize:'fontSize'}}>{name}</b></>)
        } else {
            return (<><FontAwesomeIcon icon={NAME_ICON[name]} size={size} pull={'left'}/>
                <b style={{fontSize:'fontSize'}}>{name}</b></>)
        }
    };
    const {windowStatus} = useContext(windowContext);
    function styleGen(windowStatus: string) {
        switch (windowStatus) {
            case '':
                return
            case 'large':
                return [{width: "100%", fontSize: '1em'},
                    {'width': 'fit-content', 'display': 'flex', 'flexFlow':'row wrap'}]
            case 'medium':
                return [{width: '100%', fontSize: '1em'},
                    {'width': 'fit-content', 'display': 'inline-table'}]
            case 'small':
                return [{width: '100%', fontSize: '1em'},
                    {'width': 'fit-content', 'display': 'flex', 'flexFlow':'row wrap'}]
        }
    }
    const [styleJs,divJs] = styleGen(windowStatus);
    if (isclicked) {
        return (
            <div style={divJs}>
                <Button
                    className={styles["ant-btn-primary"]}
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    type={'primary'}
                    shape='round' style={styleJs}>
                    {name_gen()}
                </Button>
            </div>)
    } else {
        return (
            <div style={{'width': 'fit-content', 'display': 'inline-table'}}>

                <Button
                    className={styles["ant-btn-default"]}
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    // type = {isclicked ? 'dashed' : 'default'}
                    shape='round' style={styleJs}>
                    {name_gen()}
                </Button></div>)
    }

    // <div className="text-center text-filter-btn-clicked-self bg-filter-btn-clicked-bg">

}

const CompButtonGroup = ({label, buttons, isclicked, setClick, filDispat}:
                             { label: string, buttons: Array<string>, isclicked: Array<boolean>, setClick: Function, filDispat: Function }) => {
    // @ts-ignore
    const buttonValue: ReactNode[] = [];
    console.log("buton render", label)
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
                <span className="filterName">{label}</span>
            </Row>
            <Row>
                {buttonValue}
            </Row>
        </>
    )
};

export default CompButtonGroup