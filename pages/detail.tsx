import styles from "../styles/Detail.module.scss"
import {Divider, Layout} from 'antd'

import React, {useEffect, useReducer, useMemo, useState, useRef, useCallback, ReactNode, createContext} from 'react'
import type {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import { useRouter } from 'next/router'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Hook Import
import {filReducer} from "../components/reducers/FilterReducer";
import useAsyncer from "../components/hook/useAsyncer";
import useMoveScrool from "../components/hook/useScroll"
import useWindowSize from "../components/hook/useWindowSize"
// Component Import
import {useDrag, useDrop} from 'react-dnd';
import AsideFilters from "../components/partials/p2CompAsideFilters"
import RateAtPlot from "../components/graphs/p2GraphRateAtPlot";
import AumLpcorp from "../components/graphs/p2GraphAumLpcorp";
import CompCardGroup from "../components/partials/p2CompCardGroup";
import CompSortSelect from "../components/partials/p2CompSortSelect";
// Component dependent Import
import {APIURL, INIT_FILST, INIT_DEBT, LABELS, MM_DEBT, SORT_LABELS, ItemTypes} from "../components/const/p2Constant"
import {parseFloatDef, apiParamGen, groupbyKeys, sortObjectVal, urlGen, detailQueryParser} from "../components/const/p2Utils";
import {
    fromApiV1,
    rateAtData,
    aumLpcorp,
    cardComp,
    pageCountTyp,
    ApiFlowObj,
    FilterStateObj
} from "../components/const/p2Usertyp"
import axios from "axios";
import CompDragDrop from "../components/partials/p2CompDragDrop";
import Header from '../components/Header'
import Footer from "../components/Footer";

export const windowContext = createContext({windowStatus:''});

const Detail: NextPage = ({
    chartData,
    cardData,
    //fromHomeData
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    // Get URL parameters via next router and setting up filter states
    const router = useRouter();
    const filterInitialValues = detailQueryParser(router.query);
    const fromHomeData = {filterInit: filterInitialValues, sldrInit: INIT_DEBT}
    console.log("hellow",fromHomeData)
    /* State & Reducer DEF */
    // all category reducer def
    // @ts-ignore
    const [filterInfo, filDispat] = useReducer(filReducer, fromHomeData.filterInit);
    console.log('filterInfo',filterInfo)
    // for window comp size handle
    const windowNow = useWindowSize()
    function windowSizeStr(windowNow:{width:number|undefined,height:number|undefined}):string{
        var {width,height} = windowNow
        if (width && (width > 1180)){
            return 'large'
        } else if (width && (width >830)){
            return 'medium'
        } else if (width){
            return 'small'
        } else {
            return ''
        }
    }
    const windowContextval =  windowSizeStr(windowNow)
    // chartData State
    const [rowCount, setRowCount] = useState(0);
    const [chartD, setCharD] = useState(chartData);
    const [chartClc, setChartClc] = useState(false);
    // cardData State
    const [cardPage, setCardPage] = useState(1);
    const [start, setStart] = useState(false);
    const [element, onMoveToElement] = useMoveScrool()
    const [apiState, apiDispatch, _] = useAsyncer(getCardPage, [cardPage,], [], start, setStart);
    const [cardFontRel, setcardFontRel] = useState({fn: 42, an: 56, lpcorp: 56})

    useEffect(
        () => {
            if (typeof document != 'undefined') {
                let cardDOM = document.querySelector("div[custom=col21]");
                if (cardDOM) {
                    var cardWidth = parseFloat(window.getComputedStyle(cardDOM).width)
                    var cardfontSize = parseInt(window.getComputedStyle(cardDOM).fontSize)
                    console.log("cardWidth",cardWidth,cardfontSize,parseInt((cardWidth / (cardfontSize * 2)).toString()) - 1)
                    var fnPlace = 4*parseInt((cardWidth / (cardfontSize * 2)).toString()) - 1
                    var anPlace = 4*parseInt((cardWidth / (cardfontSize * 1.5)).toString()) - 1
                    var lpcorpPlace = 4*parseInt((cardWidth / (cardfontSize * 1.5)).toString()) - 1
                    console.log('result',{fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                    if (fnPlace != cardFontRel.fn && anPlace != cardFontRel.an && lpcorpPlace != cardFontRel.lpcorp) {
                        setcardFontRel({fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                        // console.log("ccc", {fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                    }
                }
            }
        }, [windowNow]
    )


    // sorting State
    const [selctState, setSelect] = useState(SORT_LABELS['it']);
    const [ascState, setAscState] = useState(true);
    // const [slcClickState,setSlcClickState]:[ReactNode[],Function] = useState([]);
    // chart component dependent param def

    // chart component dependent param def
    const preProcessChart = (data1: fromApiV1[], data2: fromApiV1[]) => {
        setRowCount(data1.length)
        console.log("length in preProcessChart", data2.length, data1.length)
        let alldata: { one: aumLpcorp[], two: rateAtData[] } = {one: [], two: []}
        // @ts-ignore
        alldata['one'] = data1.map((item) => {
            return {
                "체결이자": parseFloatDef(item.sdaterate, null),
                "자산 유형": item.at,
                "대출 체결일": item.loandate,
                "대출약정금": parseFloatDef(item.loanamt, null)
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

        let reqConfig1: {} = {
            method: "GET",
            url: APIURL.PLTONE + "?",
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
                console.log("error1", e)
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

        function imagePath(img: string): string {
            if (!parseInt(img)) {
                // after mock image file added.
                return ''  //e.g. mock_pic/{img}.png
            } else {
                return `building_pic/${img}.png` // only {number} returned in api
            }

        }

        const compData: cardComp[] = data.map((val) => {
            return {
                fn: val.fn,
                lpcorp: val.lpcorp,
                an: val.an,
                aum: parseFloatDef(val.aum, null),
                loanamt: parseFloatDef(val.loanamt, null),
                sdaterate: parseFloatDef(val.sdaterate, null),
                duration: durationParser(parseFloatDef(val.duration, 0)),
                img: imagePath(val.img),
                fc: val.fc,
                idx: val.idx,
            }
        })
        return {
            data: compData,
            hasMore: true
        }
    }

    async function getCardPage(ret: boolean = true) {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        let params = Object.assign({}, apiParamGen(filterInfo),
            {'pageCount': cardPage});
        console.log('cardgen', ["http://localhost:8080/", urlGen(APIURL.CARDPAGE, params)].join(""))
        var cancel
        var reqConfig: {} = {
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
    const rowCountResult = useMemo(() => {
        return (
            <div className={styles.title}>
                <span>총 대출건수는 </span>
                <span><b>{rowCount}</b></span>
                <span>건 입니다.</span>
            </div>
        )
    }, [rowCount])

    const solSect = (<CompSortSelect curntOption={selctState} desAsc={ascState}
                                     setcurntOption={setSelect} setdesAsc={setAscState}/>)
    // level 0
    const asideFil = useMemo(() => {
        return (
            <div className={styles.asideFiltersJs} key ="asidefilterjs" index={1}>
                <AsideFilters
                    fromHomeData={fromHomeData}
                    filDispat={filDispat}
                />
            </div>
        )
    }, [])

    // dnd zero layour def
    const [zeroArr, setZeroArr] = useState(['chart1', 'chart2']);
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
        )
    }, [chartD, chartClc])

    const cardComps = useMemo(() => {
            return (
                <div className={styles.card} >
                    <span className={styles.filter}>
                        {rowCountResult}
                        <div className={styles.sort}>
                            {solSect}
                        </div>
                    </span>
                    <span className={styles.board}>
                        <CompCardGroup data={apiState.data}
                                       refFunc={lastCardRef}
                                       fontRel={cardFontRel}
                        />
                    <div className={styles.boardError}>
                        {apiState.loading && "로딩중입니다...."}
                        {apiState.error && "에러발생XXXX"}
                    </div>
                    </span>
                </div>)
        }, [apiState.data, rowCount,cardFontRel]
    )
    //cardFontRel


    // API.SCROLL CARD
    // cardData State
    // filter to api query
    useEffect(() => {
        // after filter updated, Graph should be reloaded
        getGraph();
        apiDispatch({type: 'CLEAR'})
        onMoveToElement()
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
            <Header />
            <windowContext.Provider value={{windowStatus:windowContextval}}>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.sectionContents}>
                        <div className={styles.leftBlankJs} key ='leftblank' index={0}/>
                        {asideFil}
                        <div className={styles.contentJs} key="contents_all" index={2}>
                            {chartComps}
                            {cardComps}
                        </div>
                        <div className={styles.rightBlankJs} key = "rightblank" index={3} />
                    </div>
                </DndProvider>
            </windowContext.Provider>
            <Footer />
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

    return {
        props: {
            chartData,
            cardData,
        }
    }
}


export default Detail