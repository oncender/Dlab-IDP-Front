import React, {ReactNode} from 'react'
import React, {useEffect, useState, useMemo} from 'react'

import { Button } from 'antd'
import {FILTER_ACTION} from "../reducers/constant"

const ButtonPart = (isclicked: boolean, key: string, onClick: any) => {
    return (
         <Button
            key = {key}
            onClick={onClick}
            // disabled = {isclicked}
            type = {isclicked ? 'dashed' : 'default'}
            shape = 'default'>
            {key}
         </Button>)
}

const ButtonGroup = ({labels, buttons, isclicked, dispatch}:
                  {labels : string, buttons : Array<string>, isclicked : Array<boolean>, dispatch: any}) => {
      const buttonValue: ReactNode[] = [];
      console.log(labels,isclicked)
      const onClick = (e: MouseEvent) => {
            let actionType =  (e.currentTarget.disabled) ?  FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
            let action = {typ:actionType,value:{'name':labels,'value':e.target.textContent}}
            console.log(action)
            dispatch(action)
      };

      for (let i =0; i< buttons.length;i++){
            buttonValue.push(ButtonPart(isclicked[i],buttons[i],onClick)
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