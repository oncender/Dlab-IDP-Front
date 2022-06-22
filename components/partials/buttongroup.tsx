import {ReactNode ,useEffect, useMemo, useContext, useState} from 'react'

import { Button } from 'antd'
import { FilContext } from "../reducers/FilterReducer"
import {FILTER_ACTION, LABELS} from "../const/constant"
import { getKeyByValue } from "../const/utils"

const ButtonPart = (num:number ,isclicked: boolean, name: string, onClick: any) => {
    const name_gen = () => {
        return name +  (isclicked ? ' - 눌림(이모티콘으로 바뀜)':'')
    }
    return (
         <Button
            key={name}
            onClick={(e) => onClick(e,num)}
            // disabled = {isclicked}
            // type = {isclicked ? 'dashed' : 'default'}
            shape = 'default'>
            {name_gen(name,isclicked)}
         </Button>)
}

const ButtonGroup = ({label, buttons, isclicked, setClick}:
                  {label : string, buttons : Array<string>, isclicked : Array<boolean>, setClick: any}) => {
      const {_,filDispat} = useContext(FilContext);
      const buttonValue: ReactNode[] = [];
      const [action,setAction] = useState({typ:null});
      let name = getKeyByValue(LABELS,label)
      const onClick = (e: MouseEvent,num: number) => {
            num = Number(num)
            let actionType =  (isclicked[num]) ?  FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
            setAction({typ:actionType,value:{'name':name,'value':e.target.textContent}})
            isclicked[num] = !isclicked[num]
            setClick([...isclicked])
      };
      useEffect(() => {
          filDispat(action)
        }, [action]);

      for (let i =0; i< buttons.length;i++){
            buttonValue.push(ButtonPart(i,isclicked[i],buttons[i],onClick));};
      return (
          <div>
            <span>{label}</span>
                {buttonValue}
          </div>
      )
}

export default ButtonGroup