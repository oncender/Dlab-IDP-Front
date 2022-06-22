import { useReducer, useEffect } from 'react';
import { ApiFlowObj } from "../const/usertyp"

function apiReducer(state: ApiFlowObj, action: {type:string,data:any,error:null|any}) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Asyncer(callback: Function, deps = [], skip = false) {
  const [apiState, apiDispatch] = useReducer(apiReducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    apiDispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      apiDispatch({ type: 'SUCCESS', data });
    } catch (e) {
      apiDispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [apiState, fetchData];
}

export default Asyncer;