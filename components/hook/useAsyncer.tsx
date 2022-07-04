import {useReducer, useEffect} from 'react';
import {ApiFlowObj} from "../const/p2Usertyp"

function apiReducer(state: ApiFlowObj,
                    action: { type: string, data: any, error: null | any, hasMore: boolean, rcn: number, pagecnt: number }) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: state.data,
                error: null,
                hasMore: true,
                rcn: state.rcn,
                pagecnt: state.pagecnt
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
                hasMore: action.hasMore,
                rcn: action.rcn,
                pagecnt: action.pagecnt
            };
        case 'CLEAR':
            return {
                loading: false,
                data: state.data,
                error: false,
                hasMore: true,
                rcn: 0,
                pagecnt: 1
            }
        case 'NOMORE':
            return {
                loading: false,
                data: state.data,
                error: false,
                hasMore: false,
                rcn: state.rcn,
                pagecnt: state.pagecnt
            }
        case 'ERROR':
            return {
                loading: false,
                data: [],
                error: action.error,
                hasMore: true,
                rcn: state.rcn,
                pagecnt: state.pagecnt
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
    hasMore: true,
    rcn: 0,
    pagecnt: 1
}

function useAsyncer(callback: Function, deps: any[] = [], clears: any[] = [],
                    start: boolean = false, setStart: Function,dataInit?:undefined) {
    var initials
    if (dataInit){
        initials = dataInit
    } else {
        initials = initialState
    }
    const [apiState, apiDispatch] = useReducer(apiReducer, initials);
    const fetchData = async (loading: boolean) => {
        if (!start) return setStart(true);
        if (!apiState.hasMore) {
            apiDispatch({type: 'NOMORE'});
            return
        }
        apiDispatch({type: 'LOADING'});
        let data
        try {
            data = await callback();
            if (loading) {
                console.log('delay 1000')
                await asyncwait(1000)
            }
            apiDispatch({
                type: 'SUCCESS',
                data: [...apiState.data, ...data.data],
                hasMore: data.hasMore,
                rcn: data.rcn,
                pagecnt: apiState.pagecnt + 1
            })
        } catch (e) {
            apiDispatch({type: 'NOMORE'});
        }
    };
    const clearData = async () => {
        console.log('dispatch clear call', apiState.data)
        if (!start) return setStart(true);
        apiDispatch({type: 'LOADING'});
        let data
        try {
            data = await callback({pagecount:1});
            apiDispatch({
                type: 'SUCCESS',
                data: [...data.data],
                hasMore: data.hasMore,
                rcn: data.rcn,
                pagecnt: 2
            })
        } catch (e) {
            console.log('error in dispatch', e)
            apiDispatch({type: 'NOMORE'});
        }
        // console.log(data.data)
    };
    useEffect(() => {
            console.log('dispatch clear start', clears, start)
            clearData();
        }, clears
    );

    useEffect(() => {
        fetchData(true);
        // eslint-disable-next-line
    }, deps);

    return [apiState, apiDispatch, fetchData, clearData];
}

export default useAsyncer;