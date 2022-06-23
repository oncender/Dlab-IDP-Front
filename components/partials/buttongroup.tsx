import {ReactNode} from 'react'

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
            {name_gen()}
         </Button>)
}

const ButtonGroup = ({label, buttons, isclicked, setClick,filDispat}:
                  {label : string, buttons : Array<string>, isclicked : Array<boolean>, setClick: Function, filDispat: Function}) => {
      // @ts-ignore
      const buttonValue: ReactNode[] = [];
      let name = getKeyByValue(LABELS,label)
      const onClick = (e: MouseEvent,num: number) => {
            num = Number(num)
            let actionType =  (isclicked[num]) ?  FILTER_ACTION.CATEGORY_DEL : FILTER_ACTION.CATEGORY_ADD
            let newaction ={typ:actionType,value:{'name':name,'value':buttons[num]}}
            isclicked[num] = !isclicked[num]
            setClick([...isclicked])
            filDispat(newaction)
      };

      for (let i =0; i< buttons.length;i++){
            buttonValue.push(ButtonPart(i,isclicked[i],buttons[i],onClick));};
      return (
          <div>
            <span>{label}</span>
                {buttonValue}
          </div>
      )
};

export default ButtonGroup