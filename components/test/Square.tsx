import React, {useEffect, useState} from "react";


export const Square = (props : {value : number}) => {
  const [value, setValue] = useState(props.value);
  const onClick = () => {setValue(value+1);};
  useEffect( () => {
      console.log(value);
      }, [value]
  );
  return (
    <button className="square" onClick={onClick}>
        {value}
      </button>
  );
};
