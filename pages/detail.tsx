import styles from "../styles/Detail.module.scss"
import {Divider} from 'antd'

import React, {useEffect, useReducer, useMemo, useState, useRef, useCallback, ReactNode} from 'react'
import type {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Hook Import
import {filReducer, selectArr, FilContext} from "../components/reducers/FilterReducer";
import useAsyncer from "../components/hook/useAsyncer";
import useMoveScrool from "../components/hook/useScroll"
// Component Import
import {useDrag, useDrop} from 'react-dnd';
import AsideFilters from "../components/partials/asideFilters"
import RateAtPlot from "../components/graphs/rateAtPlot";
import AumLpcorp from "../components/graphs/aumLpcorp";
import CardGroup from "../components/partials/cardGroup";
import SortSelect from "../components/partials/sortSelect";
// Component dependent Import
import {APIURL, INIT_FILST, INIT_DEBT, LABELS, MM_DEBT, SORT_LABELS, ItemTypes} from "../components/const/constant"
import {parseFloatDef, apiParamGen, groupbyKeys, sortObjectVal, urlGen} from "../components/const/utils";
import {
    fromApiV1,
    rateAtData,
    aumLpcorp,
    cardComp,
    pageCountTyp,
    ApiFlowObj,
    FilterStateObj
} from "../components/const/usertyp"
import axios from "axios";
import DragDrop from "../components/partials/dragDrop";


const Detail: NextPage = ({
                              chartData,
                              cardData,
                              fromHomeData
                          }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    /* State & Reducer DEF */
    // all category reducer def
    // @ts-ignore
    const [filterInfo, filDispat] = useReducer(filReducer, fromHomeData.filterInit);
    // chartData State
    const [rowCount, setRowCount] = useState(0);
    const [chartD, setCharD] = useState(chartData);
    const [chartClc, setChartClc] = useState(false);
    // cardData State
    const [cardPage, setCardPage] = useState(1);
    const [start, setStart] = useState(false);
    const [element, onMoveToElement] = useMoveScrool()
    const [apiState, apiDispatch, _] = useAsyncer(getCardPage, [cardPage,], [], start, setStart);
    // sorting State
    const [selctState, setSelect] = useState(SORT_LABELS['it']);
    const [ascState, setAscState] = useState(true);
    // const [slcClickState,setSlcClickState]:[ReactNode[],Function] = useState([]);

    // css item for dynamic grid change
    const asidefilters_js = {
        "style": {
            "grid-column": "1/8",
            "grid-row": "1"
        },  //4+5+3+2+2}
        "key": "asidefilter",
        "index": 0
    }
    const content_js = {
        "style": {
            "grid-column": '8/40',
            "grid-row": "1fr"
        },
        "key": "contents_all",
        "index": 1
    }
    const blank_js = {
        "style": {
            "grid-column": '40/41',
            "grid-row": "1/41"
        },
        "key": "contents_all",
        "index": 1

    }
    const cardcomps_js = {
        "style": {},
    }
    const chartcomps_js = {
        "grid-column": '8/40',
        "grid-row": '1/20',
    }


    // chart component dependent param def
    const preProcessChart = (data1: fromApiV1[], data2: fromApiV1[]) => {
        console.log("data1 length in preProcessChart", data1.length)
        let alldata: { one: aumLpcorp[], two: rateAtData[] } = {one: [], two: []}
        // @ts-ignore
        alldata['one'] = data1.map((item) => {
            return {
                "sdaterate": parseFloatDef(item.sdaterate, null),
                "at": item.at,
                "loandate": item.loandate,
                "loanamt": parseFloatDef(item.loanamt, null)
            }
        });

        data2 = data2.map((item) => {
            return {
                "lpcorp": item.lpcorp,
                "loandate": item.loandate.slice(0, 4),
                "loanamt": parseFloatDef(item.loanamt, 0)
            }
        });

        const topNcorp: Set<string> = groupbyKeys(data2, 'loanamt', ['lpcorp']).filter((val) => {
            // to ignoring 이지스사모... corp names
            {
                return !val.lpcorp.includes("사모")
            }
        }).sort(
            // sort by all loan amount sum of each corp & slicing only top 10
            (a, b) => sortObjectVal(a, b, 'loanamt')).slice(-10).reverse()
            .reduce((r, o) => {
                r.add(o.lpcorp)
                return r
            }, new Set)
        data2 = groupbyKeys(data2, 'loanamt', ['lpcorp', 'loandate'])

        // @ts-ignore
        // top 10 copr select
        const topn: rateAtData[] = data2.filter((val) => {
            return topNcorp.has(val["lpcorp"])
        }).sort(
            (a, b) => sortObjectVal(a, b, 'loandate')
        )
        // @ts-ignore
        // non top 10 copr should be replaced to "기타"
        const nontopn: rateAtData[] = groupbyKeys(data2.filter((val) => {
                return !topNcorp.has(val["lpcorp"])
            }),
            'loanamt', ['loandate']).map((item) => {
                return {
                    "lpcorp": "기타", "loandate": item.loandate, "loanamt": item.loanamt
                }
            }
        ).sort(
            (a, b) => sortObjectVal(a, b, 'loandate')
        )
        alldata['two'] = topn.concat(nontopn)
        // console.log(alldata['one'], alldata['two'])
        return alldata
    }

    async function getGraph() {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        let params = apiParamGen(filterInfo)
        let cancel
        console.log(urlGen(APIURL.PLTONE, params))
        let reqConfig1: {} = {
            method: "GET",
            url: APIURL.PLTONE,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }
        let reqConfig2: {} = {
            method: "GET",
            url: APIURL.PLTTWO,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }
        let res1
        let res2
        try {
            res1 = await axios(reqConfig1);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("error2", e)
            }
        }
        try {
            res2 = await axios(reqConfig2);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("error2", e)
            }
        }
        // @ts-ignore
        setRowCount(res1.data['datag1'].length)
        setCharD(preProcessChart(res1.data['datag1'], res2.data['datag2']))

    }

    // card component dependent param def
    const preProcessCard = (data: fromApiV1[]): pageCountTyp => {
        function durationParser(num: number): string {
            // @ts-ignore
            let year = parseInt(num / 12);
            let month = num % 12;
            let durStr = '';
            if (year > 0) {
                durStr += `${year}년`
            }
            if (month != 0) {
                durStr += year == 0 ? "" : " "
                durStr += `${month}개월`
            }
            return durStr;
        }

        const compData: cardComp[] = data.map((val) => {
            return {
                fn: val.fn,
                lpcorp: val.lpcorp,
                an: val.an,
                aum: parseFloatDef(val.aum, null),
                loanamt: parseFloatDef(val.loanamt, null),
                sdaterate: parseFloatDef(val.sdaterate, null),
                duration: durationParser(parseFloatDef(val.duration, 0))
            }
        })
        // return = {
        //     data: compData,
        //     hasMore: true
        // }
        // todo after pagecount api updated,delow need delete,above should be run, hasMore logic need to be added.
        return {
            data: compData.reduce((r: cardComp[], o: cardComp, i: number) => {
                let key = Math.floor(Math.random() * compData.length)
                if (i < 10) {
                    r.push(compData[key])
                }
                return r
            }, []),
            hasMore: true
        }
    }

    async function getCardPage(ret: boolean = true) {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        let params = Object.assign({},apiParamGen(filterInfo),
            {'pageCount': cardPage});
        // just for mock
        // params['pagenum'] = cardPage
        let cancel
        let reqConfig: {} = {
            method: "GET",
            url: APIURL.CARDPAGE,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }

        let res;
        try {
            res = await axios(reqConfig);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("error", e)
            }
        }
        // @ts-ignore
        res = preProcessCard(res.data.data as fromApiV1[])
        if (ret) {
            return res;
        } else {
            apiDispatch({type: 'SUCCESS', data: [...res.data], hasMore: res.hasMore})
        }
    }

    // infinite scroll ref
    const observer = useRef();

    const lastCardRef = useCallback(
        // observer always refer last card div component
        (node: any) => {
            if (apiState.loading) return;
            //
            if (observer.current) { // @ts-ignore
                observer.current.disconnect();
            }
            // if need to more load (hasMore == true), observer redefine & cardPage +1
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && apiState.hasMore) {
                    setCardPage((prev) => prev + 1);
                }
            });
            if (node) {
                // @ts-ignore
                observer.current.observe(node);
            }
        },
        [apiState.loading, apiState.hasMore]
    );

    /* Component DEF */
    // level 1
    const chartOne = useMemo(() => {
        return (<RateAtPlot data={chartD.one}/>)
    }, [chartD.one])
    const chartTwo = useMemo(() => {
        return (<AumLpcorp data={chartD.two}
                           chartClc={chartClc}
                           onClick={setChartClc}
        />)
    }, [chartD.two, chartClc])
    const solSect = (<SortSelect curntOption={selctState} desAsc={ascState}
                                 setcurntOption={setSelect} setdesAsc={setAscState}/>)
    // level 0
    const asideFil_old = useMemo(() => {
        return (
            <div style={asidefilters_js.style}>
                <AsideFilters
                    fromHomeData={fromHomeData}
                    filDispat={filDispat}
                />
            </div>
        )
    }, [])
    const asideFil = useMemo(() => {
        return (
                <AsideFilters
                    fromHomeData={fromHomeData}
                    filDispat={filDispat}
                />
        )
    }, [])


        // dnd zero layour def
    const [zeroArr, setZeroArr] = useState(['chart1','chart2']);
    const [dragAside, setDragAside] = useState(false);
    const moveContentZero = (contentID: string, toIndex: number) => {
        const index = zeroArr.indexOf(contentID);
        let newOrder = [...zeroArr];
        newOrder.splice(index, 1);
        newOrder.splice(toIndex, 0, contentID);
        setZeroArr(newOrder)
    };


    const chartComps = useMemo(() => {
        return (
            <div className={styles.chart} ref={element}>
                {chartOne}
                {chartTwo}
            </div>
        )},[chartD, chartClc])
    //
    // const chartComps = useMemo(() => {
    //     return (
    //         <div className={styles.chart} ref={element}>
    //             {
    //                 <DragDrop
    //         id={'chart1'}
    //         index={0}
    //         moveContentZero={moveContentZero}
    //         someDragging={dragAside}
    //         setsomeDragging={setDragAside}
    //         content={chartOne}
    //         itemType={ItemTypes.ContentS}
    //         style={{}}
    //     />}
    //             {
    //                         <DragDrop
    //         id={'chart2'}
    //         index={1}
    //         moveContentZero={moveContentZero}
    //         someDragging={dragAside}
    //         setsomeDragging={setDragAside}
    //         content={chartTwo}
    //         itemType={ItemTypes.ContentS}
    //         style={{}}
    //     />
    //                 }
    //         </div>)
    // }, [chartD, chartClc])
    const cardComps = useMemo(() => {
            console.log(apiState.data.length)
            onMoveToElement()
            return (
                <div className={styles.card} style={cardcomps_js.style}>
                    <span className={styles.filter}>
                        <div className={styles.title}>총 대출건수는 {rowCount}건 입니다.</div>
                        {/*"border-b-2" style={{"width":"40%"}}*/}
                        <div className={styles.sort}style={{'display':'flex','justify-content':'flex-end'}}>
                            {solSect}
                    </div>
                    </span>
                    <span className={styles.board}>
                        <CardGroup data={apiState.data}
                                   refFunc={lastCardRef}
                        />
                    <div className={styles.boardError}>
                        {apiState.loading && "로딩중입니다...."}
                        {apiState.error && "에러발생XXXX"}
                    </div>
                    </span>
                </div>)
        }, [apiState.data]
    )

    const DContent = (
        <DragDrop
            id={'Contents'}
            index={1}
            moveContentZero={moveContentZero}
            someDragging={dragAside}
            setsomeDragging={setDragAside}
            content={(<>
                    {chartComps}
                    {cardComps}
            </>)}
            itemType={ItemTypes.ContentS}
            style={content_js.style}
        />
    )
    const DBlock = (
        <DragDrop
            id={'NullBlock'}
            index={2}
            moveContentZero={moveContentZero}
            someDragging={dragAside}
            setsomeDragging={setDragAside}
            content={(
                <div style={blank_js.style}>
                    only for testing
                </div>
            )}
            itemType={ItemTypes.ContentS}/>
    )



    // API.SCROLL CARD
    // cardData State
    // filter to api query
    useEffect(() => {
        // after filter updated, Graph should be reloaded
        getGraph();
        apiDispatch({type: 'CLEAR'})
        return (() => {
            // after filter updated, CardPage should be reloaded
            setStart(true)
            if (cardPage != 1) {
                setCardPage(1)
            } else {
                getCardPage(false)
            }

        })
    }, [filterInfo])


    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.sectionContents}>
                    {asideFil_old}
                    <div style={content_js.style}>
                    {chartComps}
                    {cardComps}
                    </div>
                    <div style={blank_js.style}>
                        only for testing
                    </div>
                    {/*{DAside}*/}
                    {/*{DContent}*/}
                    {/*{DBlock}*/}
                    {/*{asideFil}*/}
                    {/*<div style={content_js.style}>*/}
                    {/*    {chartComps}*/}
                    {/*    {cardComps}*/}
                    {/*</div>*/}


                </div>
            </DndProvider>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // 더미 데이터
    const chartData: { one: rateAtData[], two: aumLpcorp[] } = {one: [], two: []}
    // chartData.one = await fetch('https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json')
    //     .then((response) => response.json())
    // chartData.two = await fetch(
    //     'https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json')
    //     .then((response) => response.json())
    // const cardData = {"name": "1", "aum": "2"}
    const cardData: { [key: number]: cardComp[] } = {}
    const fromHomeData = {filterInit: INIT_FILST, sldrInit: INIT_DEBT}

    return {
        props: {
            chartData,
            cardData,
            fromHomeData
        }
    }

    // 실제 API 콜
    // chartResponse = await axiox.get(ChartURL)
    // chartResponse = await axiox.get(cardURL)

    // return {
    //   props: {
    //     chartResponse.data,
    //     chartResponse.data,
    //   }
    // }
}

export default Detail