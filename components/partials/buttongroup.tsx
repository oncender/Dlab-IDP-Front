import React, {ReactNode ,useEffect, useMemo, useContext} from 'react'

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
                  {labels : string, buttons : Array<string>, isclicked : Array<boolean>, dispatch: any}) => {
      const {_, filDispat} = useContext(FilContext);
      const buttonValue: ReactNode[] = [];
      console.log(labels,isclicked,filDispat)
      const onClick = (e: MouseEvent,key: number) => {
            key = Number(key)
            let actionType =  (isclicked[key]) ?  FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
            let action = {typ:actionType,value:{'name':labels,'value':e.target.textContent}}
            isclicked[key] = !isclicked[key]
            setClick([...isclicked])
            filDispat(action)
      };

      for (let i =0; i< buttons.length;i++){
            buttonValue.push(ButtonPart(i,isclicked[i],buttons[i],onClick)
                    // <ButtonPart isclicked={isclicked[i]}
                    //             key={buttons[i]}
                    //             onClick={onClick} />
            );
      };
      return (
          <div>
            <span>{labels}</span>
                {buttonValue}
          </div>
      )
}

export default ButtonGroup