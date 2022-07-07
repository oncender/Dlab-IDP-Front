import styles from "../../styles/Button.module.scss"
import {windowContext} from "../../pages/detail"
import {faAngry} from "@fortawesome/free-regular-svg-icons";
// import "../../styles/Button.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode, useContext} from 'react'

import {Button, Row} from 'antd'
import {FILTER_ACTION, LABELS,NAME_ICON} from "../const/p2Constant"
import {getKeyByValue} from "../const/p2Utils"


//["solid", "fa-briefcase"]
const ButtonPart = (num: number, isclicked: boolean, name: string, onClick: any) => {
    const name_gen = (size:string,fontSize:string) => {
        var labalName
        if (name.includes('기타')){
            labalName=  '기타'
        } else {
            labalName=  name
        }
        if (isclicked) {
            return (<><FontAwesomeIcon icon={NAME_ICON[name]} size={size} pull={'left'} inverse/>
                <b style={{fontSize:fontSize}}>{labalName}</b></>)
        } else {
            return (<><FontAwesomeIcon icon={NAME_ICON[name]} size={size} pull={'left'}/>
                <b style={{fontSize:fontSize}}>{labalName}</b></>)
        }
    };

    function styleGen(windowStatus: string|undefined) {
        switch (windowStatus) {
            case '':
                return {styleJs:null,divJs:null,size:null,fontSize:null}
            case 'large':
                return {styleJs:{width: "100%", fontSize: '1em'},
                        divJs:{'width': 'fit-content', 'display': 'flex', 'flexFlow':'row wrap'},
                    size:'lg',fontSize:'1em'}
            case 'medium':
                return {styleJs:{width: "95%",height:'80%', fontSize: '1em'},
                        divJs:{'width': 'fit-content', 'display': 'inline-table'},
                        size:'sm',fontSize:'1em'}
            case 'small':
                return {styleJs:{width: "90%",height:'80%', fontSize: '1em'},
                        divJs:{'width': 'fit-content', 'display': 'flex', 'flexFlow':'row wrap'},
                        size:'xs',fontSize:'1em'}
            default:
                return {styleJs:{},divJs:{},size:'',fontSize:''}
        }
    }
    var styleJs,divJs,size,fontSize
    const {windowStatus} = useContext(windowContext);
    ({styleJs, divJs, size, fontSize} = styleGen(windowStatus))
    if (isclicked) {
        return (
            <div key = {name+"div1"} style={divJs && divJs}>
                <Button
                    className={styles["ant-btn-primary"]}
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    type={'primary'}
                    shape='round' style={styleJs && styleJs}>
                    {name_gen(size && size,fontSize && fontSize)}
                </Button>
            </div>)
    } else {
        return (
            <div key = {name+"div1"} style={{'width': 'fit-content', 'display': 'inline-table'}}>
                <Button
                    className={styles["ant-btn-default"]}
                    key={name}
                    onClick={(e) => onClick(e, num)}
                    // disabled = {isclicked}
                    // type = {isclicked ? 'dashed' : 'default'}
                    shape='round' style={styleJs}>
                    {name_gen(size,fontSize)}
                </Button></div>)
    }

    // <div className="text-center text-filter-btn-clicked-self bg-filter-btn-clicked-bg">

}

const CompButtonGroup = ({label, buttons, isclicked, setClick, filDispat}:
                             { label: string, buttons: Array<string>, isclicked: Array<boolean>, setClick: Function, filDispat: Function }) => {
    // @ts-ignore
    const buttonValue: ReactNode[] = [];
    // console.log("buton render", label)
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
        <div key={label}>
            <Row key={label + 'row1'}>
                <span key={label + 'row1' + 'filter'} className="filterName">{label}</span>
            </Row>
            <Row key={label + 'row2'} className="mb-2 md:mb-5">
                {buttonValue}
            </Row>
        </div>
    )
};

export default CompButtonGroup