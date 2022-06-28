import {useReducer, useEffect} from 'react';
import {ApiFlowObj} from "../const/p2Usertyp"

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
        case 'NOMORE':
            return {
                loading: false,
                data: state.data,
                error: false,
                hasMore: false
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
    const fetchData = async (loading: boolean) => {
        if (!start) return setStart(true);
        if (!apiState.hasMore){
            apiDispatch({type: 'NOMORE'});
            return
        }
        apiDispatch({type: 'LOADING'});
        let data
        try {
            data = await callback();
            if (loading) {
                await asyncwait(500)}
                // console.log([...data.data].length)
                // apiDispatch({type: 'SUCCESS', data: [...data.data],hasMore:data.hasMore})
            console.log([...apiState.data,...data.data])
            apiDispatch({type: 'SUCCESS', data: [...apiState.data, ...data.data],hasMore:data.hasMore})
            } catch (e) {
            apiDispatch({type: 'NOMORE'});}
    };

    // useEffect(() => {
    //         console.log("Clear")
    //         if (skip) return apiDispatch({type: 'CLEAR'});
    //         fetchData(true,true);
    //     }, clears
    // )
    useEffect(() => {
        fetchData(true);
        // eslint-disable-next-line
    }, deps);

    return [apiState, apiDispatch,fetchData];
}

export default useAsyncer;