import {useReducer, useEffect} from 'react';
import {ApiFlowObj} from "../const/usertyp"

function apiReducer(state: ApiFlowObj, action: { type: string, data: any, error: null | any, hasMore: boolean }) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: state.data,
                error: null,
                hasMore: true
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
                hasMore: action.hasMore
            };
        case 'CLEAR':
            return {
                loading: false,
                data: [],
                error: false,
                hasMore: true
            }
        case 'ERROR':
            return {
                loading: false,
                data: [],
                error: action.error,
                hasMore: true
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const asyncwait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

const initialState = {
    loading: false,
    data: [],
    error: false,
    hasMore: true
}

function useAsyncer(callback: Function, deps: any[] = [], clears: any[] = [], start: boolean=false,setStart:Function) {
    const [apiState, apiDispatch] = useReducer(apiReducer, initialState);
    const fetchData = async (loading: boolean,clear:boolean) => {
        if (!start) return setStart(true);
        apiDispatch({type: 'LOADING'});
        let data
        try {
            data = await callback();
            if (loading) {
                await asyncwait(500)
            }
            if (clear){
                console.log([...data.data].length)
                apiDispatch({type: 'SUCCESS', data: [...data.data],hasMore:data.hasMore})
            } else {
                console.log([...apiState.data,...data.data].length)
                apiDispatch({type: 'SUCCESS', data: [...apiState.data, ...data.data],hasMore:data.hasMore})
            }
        } catch (e) {
            console.log("error", e)
            apiDispatch({type: 'ERROR'});
        }
    };

    // useEffect(() => {
    //         console.log("Clear")
    //         if (skip) return apiDispatch({type: 'CLEAR'});
    //         fetchData(true,true);
    //     }, clears
    // )
    useEffect(() => {
        fetchData(true,false);
        // eslint-disable-next-line
    }, deps);

    return [apiState, apiDispatch,fetchData];
}

export default useAsyncer;