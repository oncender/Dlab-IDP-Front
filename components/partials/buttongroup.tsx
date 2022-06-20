import React, {ReactNode} from 'react'
import { Button } from 'antd'


const ButtonGroup = ({labels, buttons, isclicked, dispatch}:
                  {labels : string, buttons : Array<string>, isclicked : Array<boolean>, dispatch: any}) => {
      const buttonValue: ReactNode[] = [];
      const onClick = (e: MouseEvent) => {
            dispatch(e.target)
      };

      for (let i =0; i< buttons.length;i++){
            // React Memo needed
            console.log(`Button ${buttons[i]} MADEN!!`)
            buttonValue.push(
                <Button
                    isclicked = {isclicked[i]}
                    key = {buttons[i]}
                    value={{'name':labels,'value': buttons[i]}}
                    typ={'category'}
                    onClick={onClick}>
                  {buttons[i]}
            </Button>);
      };
      return (
          <div>
            <span>{labels}</span>
                {buttonValue}
          </div>
      )
}

export default ButtonGroup