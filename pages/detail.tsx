import styles from "../styles/Detail.module.scss"

import React, {
    useEffect,
    useReducer,
    useMemo,
    useState,
    useRef,
    useCallback,
    ReactNode,
    createContext,
    useLayoutEffect
} from 'react'
import type {NextPage} from 'next'
// , GetServerSideProps, InferGetServerSidePropsType
import {useRouter} from 'next/router'
import {Button} from "antd";
// import {DndProvider} from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';
//<DndProvider backend={HTML5Backend}>

// Hook Import
import {filReducer} from "../components/reducers/FilterReducer";
import useAsyncer from "../components/hook/useAsyncer";
import useMoveScrool from "../components/hook/useScroll"
import useWindowSize from "../components/hook/useWindowSize"
// Component Import

import AsideFilters from "../components/partials/p2CompAsideFilters"
import RateAtPlot from "../components/graphs/p2GraphRateAtPlot";
import AumLpcorp from "../components/graphs/p2GraphAumLpcorp";
import CompCardGroup from "../components/partials/p2CompCardGroup";
import CompSortSelect from "../components/partials/p2CompSortSelect";
// Component dependent Import
import {APIURL, FILTER_ACTION, INIT_FILST, SORT_LABELS,} from "../components/const/p2Constant"
import {
    windowSizeStr,
    apiParamGen,
    groupbyKeys,
    sortObjectVal,
    urlGen,
    detailQueryParser,
    parseFloatDef,
    parseIntDef, setCookie, getCookie, sortForChartOnly
} from "../components/const/p2Utils";
import {
    fromApiV1,
    rateAtData,
    aumLpcorp,
    cardComp,
    pageCountTyp,
    chartTyp, FilterStateObj
} from "../components/const/p2Usertyp"
import axios from "axios";
import Header from '../components/Header'
import Footer from "../components/Footer";
import CompDataTable from "../components/partials/p2CompTable";

export const windowContext = createContext({windowStatus: ''});

const Detail: NextPage = () => {

    // Get URL parameters via next router and setting up filter states
    const router = useRouter();
    const [start, setStart] = useState(false);
    const [contentType, setContentType] = useState(false); // if true talbe will be viewed.
    /* State & Reducer DEF */
    // @ts-ignore
    const [filterInfo, filDispat] = useReducer(filReducer, INIT_FILST); // all filter variable controller def
    const [asideFil, setAsideFil] = useState<HTMLElement | null>(null);
    useLayoutEffect(() => {
        var filterI: FilterStateObj
        if (Object.keys(router.query).length !== 0) {
            filterI = detailQueryParser(router.query);
        } else {
            var cookietemp = getCookie('filterInfoCookie')
            if (cookietemp) {
                filterI = JSON.parse(cookietemp)
            } else {
                filterI = INIT_FILST
            }
        }
        console.log('router: ', router.query, 'filterI: ', filterI, "filterInfo: ", filterInfo)
        var newaction = {typ: FILTER_ACTION.REPLACE, value: filterI}
        setStart(true)
        filDispat(newaction)
        console.log("filterInfo: ", filterInfo)
        setAsideFil(
            <div className={styles.asideFiltersJs} key="asidefilterjs" index={1}>
                <AsideFilters
                    fromHomeData={filterI}
                    filDispat={filDispat}
                    start={start}
                />
            </div>)
    }, [])
    // window size getter
    const windowNow = useWindowSize() // for body window component size handle different card layout
    const windowContextval = windowSizeStr(windowNow)
    const [scrollTop, onScrollTop] = useMoveScrool()  // after filter is updated, scroll should go to top
    useEffect(() => {
        // after filter updated, Graph should be reloaded
        setCookie('filterInfoCookie', JSON.stringify(filterInfo), {secure: true, 'max-age': 3600})
        onScrollTop()
        console.log('cookietemp after: ', getCookie('filterInfoCookie'))
        cardclearData()
    }, [filterInfo])

    const [cardApiState, cardApiDispatch, cardfetchData, cardclearData] = useAsyncer(getCardPage, [], [contentType], start, setStart);  // After cardPage updated, Card data is updated.
    const [cardFontRel, setcardFontRel] = useState({fn: 42, an: 56, lpcorp: 56})
    // sorting State
    const [selctState, setSelect] = useState(SORT_LABELS['it']);
    const [ascState, setAscState] = useState(true);
    // card component dependent param def
    const preProcessCard = (data: fromApiV1[],pageNow:string): pageCountTyp => {
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
            return durStr ? durStr : "데이터 없음";
        }

        function imagePath(img: string,at:string): string {
            if (!parseInt(img)) {
                // after mock image file added.
                // SET no PIC building TYPE : 1 or 2
                return `no_pic_building/${at}2.png`  //e.g. mock_pic/{img}.png
            } else {
                return `building_pic/${img}.png` // only {number} returned in api
            }

        }

        let compData : cardComp[]
        if (!contentType) {
            compData  = data.data.map((val) => {
                return {
                    fn: val.fn,
                    lpcorp: val.lpcorp,
                    an: val.an,
                    loan: parseInt(parseIntDef(val.loan, null) / 1E8),
                    loanamt: parseInt(parseIntDef(val.loanamt, null) / 1E8),
                    sdaterate: parseFloatDef(val.sdaterate, null),
                    duration: durationParser(parseIntDef(val.duration, 0)),
                    img: imagePath(val.img,val.at),
                    fc: val.fc,
                    idx: val.idx,
                    loancls: val.loancls,
                    seniorstr: val.seniorstr,
                    it: val.it,
                    at: val.at,
                    rate: val.rate,
                    loandate:val.loandate.replace(/-/g,".")
                }
            })
        } else {
            compData = data.data
        }
        return {
            data: compData,
            hasMore: (data.rC >= (pageNow) * 10) ? true : false,// check next page is available
            rcn: data.rC
        }
    }

    async function getCardPage(props: any) {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        let params
        const pageNow: string = (typeof props == 'undefined') ? cardApiState.pagecnt : props.pagecount
        if (!contentType) {
            params = Object.assign({}, apiParamGen(filterInfo),
                {'pageCount': pageNow});
        } else {
            params = apiParamGen(filterInfo)
        }
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
        res = preProcessCard(res.data,pageNow)
        console.log("data card", res)
        return res;
    }

    // infinite scroll ref
    const observer = useRef();

    const lastCardRef = useCallback(
        // observer always refer last card div component
        (node: any) => {
            if (cardApiState.loading) return;
            //
            if (observer.current) { // @ts-ignore
                observer.current.disconnect();
            }
            // if need to more load (hasMore == true), observer redefine & cardPage +1
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && cardApiState.hasMore) {
                    cardfetchData(true)
                    // setCardPage((prev) => prev + 1);
                }
            });
            if (node) {
                // @ts-ignore
                observer.current.observe(node);
            }
        },
        [cardApiState.loading, cardApiState.hasMore]
    );
    useEffect(
        () => {
            let cardDOM = document.querySelector("div[custom=col21]");
            if (cardDOM) {
                var cardWidth = parseFloat(window.getComputedStyle(cardDOM).width)
                var cardfontSize = parseInt(window.getComputedStyle(cardDOM).fontSize)
                console.log("cardWidth", cardWidth, cardfontSize, parseInt((cardWidth / (cardfontSize * 2)).toString()) - 1)
                var fnPlace = 4 * parseInt((cardWidth / (cardfontSize * 2)).toString()) - 1
                var anPlace = 4 * parseInt((cardWidth / (cardfontSize * 1.5)).toString()) - 1
                var lpcorpPlace = 4 * parseInt((cardWidth / (cardfontSize * 1.5)).toString()) - 1
                console.log('result', {fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                if (fnPlace != cardFontRel.fn && anPlace != cardFontRel.an && lpcorpPlace != cardFontRel.lpcorp) {
                    setcardFontRel({fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})

                }
            }
        }, [windowNow]
    )

    const sortSelect = (<CompSortSelect curntOption={selctState} desAsc={ascState}
                                        setcurntOption={setSelect} setdesAsc={setAscState}/>)
    const cardComps = useMemo(() => {
            return (
                <div className={styles.card}>
                <span className={styles.filter}>
                    <div className={styles.title}>
                        <span>총 대출건수는 </span>
                        <span><b>{cardApiState.rcn}</b></span>
                        <span>건 입니다.</span>
                    </div>
                    <Button onClick={() => (setContentType(!contentType))}>
                        {contentType ? '카드보기' : '테이블 보기'}
                    </Button>
                    {contentType ? (<div />) : (<div className={styles.sort}>
                        {sortSelect}
                    </div>)}
                </span>
                    {contentType ? (
                        <div style={{justifyContent:'end',display:'flex',flexFlow:'row wrap'}}>
                            <CompDataTable data={cardApiState.data}/>
                            <Button
                                style={{marginTop:"-1.5%",marginBottom:"20%"}}
                                onClick={() => (setContentType(!contentType))}>
                            <span>다운로드</span>
                            </Button>
                        </div>

                    ) : (
                        <span className={styles.board}>
                    <CompCardGroup data={cardApiState.data}
                                   refFunc={lastCardRef}
                                   fontRel={cardFontRel}/>
                    <div className={styles.boardError}>
                        {cardApiState.loading && "로딩중입니다...."}
                        {cardApiState.error && "에러발생XXXX"}
                    </div>
                </span>
                    )}
                </div>)
        }
        , [cardApiState.data, cardFontRel]
    )

    ///////////////////////////////////  chart //////////////////////////
    const [chartClc, setChartClc] = useState(false);  // chart y data type -> % scale ~ raw numeric value
    const [chartClcNoEtc, setChartClcNoEtc] = useState(false);  // include '기타' or not
    const chartDInit = {
        loading: false, data: [{one: [], two: []}],
        error: false, hasMore: true,
        rcn: 0, pagecnt: 1
    }   // for useAsyncer hook error handling
    const [chartApiState, chartApiDispatch, _, chartclearData] = useAsyncer(getGraph, [], [filterInfo],
        start, setStart, chartDInit);  // After filterInfo updated, chart data is updated.
    // chart component dependent param def
    const preProcessChart = (data1: fromApiV1[], data2: fromApiV1[]): chartTyp => {
        let alldata: { one: aumLpcorp[], two: rateAtData[] } = {one: [], two: []}
        // @ts-ignore

        alldata['one'] = data1.map((item) => {
            return {
                "자산명": item.an,
                "체결이자": parseFloatDef(item.sdaterate, null),
                "자산 유형": item.at,
                "대출 체결일": item.loandate,
                "대출약정금": parseIntDef(item.loanamt, null) / 1E8,
            }
        });

        data2 = data2.map((item) => {
            return {
                "lpcorp": item.lpcorp,
                "loandate": parseIntDef(item.loandate.slice(0, 4)),
                "loanamt": parseIntDef(item.loanamt, 0) / 1E8
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
        })
        // @ts-ignore
        // non top 10 copr should be replaced to "기타"
        const nontopn: rateAtData[] = groupbyKeys(data2.filter((val) => {
                return !topNcorp.has(val["lpcorp"])
            }),
            'loanamt', ['loandate']).map((item) => {
                return {
                    "lpcorp": "기타(상위 10개 대주 제외)", "loandate": item.loandate, "loanamt": item.loanamt
                }
            }
        )
        alldata['two'] = topn.concat(nontopn).sort(
            (a, b) => sortForChartOnly(a, b, 'loandate')
        );
        //     .sort(
        //     (a, b) => sortForChartOnly(a, b, 'loandate')
        // )
        return {data: [alldata], hasMore: false, rcn: 0}
    }

    async function getGraph(props: any) {
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
        return preProcessChart(res1.data['datag1'], res2.data['datag2'])
    }

    const chartOne = useMemo(() => {
        return (chartApiState.data[0] && <RateAtPlot data={chartApiState.data[0].one}/>)
    }, [chartApiState.data[0].one])
    const chartTwo = useMemo(() => {
        return (chartApiState.data[0] && <AumLpcorp data={chartApiState.data[0].two}
                                                    chartClc={chartClc}
                                                    onClick={setChartClc}
                                                    chartClcNoEtc={chartClcNoEtc}
                                                    onchartClcNoEtc={setChartClcNoEtc}
        />)
    }, [chartApiState.data[0].two, chartClc, chartClcNoEtc])

    const [chartComps, setChartComps] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setChartComps(
            <div className={styles.chart} ref={scrollTop}>
                {chartOne}
                {chartTwo}
            </div>
        )
    }, [chartApiState.data[0], chartClc, chartClcNoEtc])


    return (
        <div>
            <Header/>
            <windowContext.Provider value={{windowStatus: windowContextval}}>
                <div className={styles.sectionContents}>
                    <div className={styles.leftBlankJs} key='leftblank' index={0}/>
                    {asideFil}
                    <div className={styles.contentJs} key="contents_all" index={2}>
                        {chartComps}
                        {cardComps}
                    </div>
                    <div className={styles.rightBlankJs} key="rightblank" index={3}/>
                </div>
            </windowContext.Provider>
            <Footer/>
        </div>
    )
}

export default Detail