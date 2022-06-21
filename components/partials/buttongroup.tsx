import {ReactNode ,useEffect, useMemo, useContext, useState} from 'react'

import { Button } from 'antd'
import {FILTER_ACTION} from "../reducers/constant"
import { FilContext } from "../reducers/FilterReducer"
const ButtonPart = (key:number ,isclicked: boolean, name: string, onClick: any) => {
    return (
         <Button
            onClick={(e) => onClick(e,key)}
            // disabled = {isclicked}
            type = {isclicked ? 'dashed' : 'default'}
            shape = 'default'>
            {name}
         </Button>)
}

const ButtonGroup = ({labels, buttons, isclicked, setClick}:
                  {labels : string, buttons : Array<string>, isclicked : Array<boolean>, setClick: any}) => {
      const {_, filDispat} = useContext(FilContext);
      const buttonValue: ReactNode[] = [];
      const [action,setAction] = useState({typ:null});
      const onClick = (e: MouseEvent,key: number) => {
            key = Number(key)
            let actionType =  (isclicked[key]) ?  FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
            setAction({typ:actionType,value:{'name':labels,'value':e.target.textContent}})
            isclicked[key] = !isclicked[key]
            setClick([...isclicked])
      };
      useEffect(() => {
          filDispat(action)
        }, [action]);

      for (let i =0; i< buttons.length;i++){
            buttonValue.push(ButtonPart(i,isclicked[i],buttons[i],onClick));};
      return (
          <div>
            <span>{labels}</span>
                {buttonValue}
          </div>
      )
}

export default ButtonGroup