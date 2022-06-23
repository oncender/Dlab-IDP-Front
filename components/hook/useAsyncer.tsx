import { useReducer, useEffect } from 'react';
import { ApiFlowObj } from "../const/usertyp"

function apiReducer(state: ApiFlowObj, action: {type:string,data:any,error:null|any}) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: state.data,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'CLEAR':
      return {
    loading: false,
    data: [],
    error: false
  }
    case 'ERROR':
      return {
        loading: false,
        data: [],
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const initialState = {
    loading: false,
    data: [],
    error: false
  }
function useAsyncer(callback: Function ,deps = [],clears:[], skip = false) {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);
  const fetchData = async () => {
    apiDispatch({ type: 'LOADING' });
    let data
    try {
       data = await callback();
       apiDispatch({ type: 'SUCCESS', data:[...apiState.data,...data.data]})
    } catch (e) {
      console.log("error",e)
      apiDispatch({ type: 'ERROR'});
    }
  };
  // useEffect(()=>{
  //   console.log("Clear")
  //   ;
  //   if (skip) return;
  //   return ( ()=> fetchData());
  //     },clears
  // )
  useEffect(() => {
    console.log("deps!!")
    if (skip) return apiDispatch({ type: 'CLEAR'});
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [apiState, fetchData];
}

export default useAsyncer;