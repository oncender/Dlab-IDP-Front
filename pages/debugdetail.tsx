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
    parseIntDef, setCookie, getCookie
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
import Detail from "./detail";

export const windowContext = createContext({windowStatus: ''});

const DEBUGDetail: NextPage = () => {

    // Get URL parameters via next router and setting up filter states
    const router = useRouter();
    const [start, setStart] = useState(false);
    /* State & Reducer DEF */
    // @ts-ignore
    const [filterInfo, filDispat] = useReducer(filReducer, INIT_FILST); // all filter variable controller def
    const [asideFil, setAsideFil] = useState<HTMLElement | null>(null);
    useLayoutEffect(() => {
        var filterI:FilterStateObj
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
        console.log('router: ',router.query,'filterI: ',filterI ,"filterInfo: ",filterInfo)
        var newaction = {typ: FILTER_ACTION.REPLACE, value: filterI}
        filDispat(newaction)
        console.log("filterInfo: ",filterInfo)
        return ( () => {
            setAsideFil(
            <div className={styles.asideFiltersJs} key="asidefilterjs" index={1}>
                <AsideFilters
                    fromHomeData={filterI}
                    filDispat={filDispat}
                />
            </div>)
        })
    }, [])
    // window size getter
    const windowNow = useWindowSize() // for body window component size handle different card layout
    const windowContextval = windowSizeStr(windowNow)
    const [scrollTop, onScrollTop] = useMoveScrool()  // after filter is updated, scroll should go to top
    useEffect(() => {
        // after filter updated, Graph should be reloaded
        setCookie('filterInfoCookie', JSON.stringify(filterInfo), {secure: true, 'max-age': 3600})
        setStart(true)
        onScrollTop()
        console.log('cookietemp after: ',getCookie('filterInfoCookie'))
        cardclearData()
    }, [filterInfo])

    const [cardApiState, cardApiDispatch, cardfetchData, cardclearData] = useAsyncer(getCardPage, [], [], start, setStart);  // After cardPage updated, Card data is updated.
    const [cardFontRel, setcardFontRel] = useState({fn: 42, an: 56, lpcorp: 56})
    // sorting State
    const [selctState, setSelect] = useState(SORT_LABELS['it']);
    const [ascState, setAscState] = useState(true);
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

        const compData: cardComp[] = data.data.map((val) => {
            return {
                fn: val.fn,
                lpcorp: val.lpcorp,
                an: val.an,
                loan: parseInt(parseIntDef(val.loan, null) / 1E8),
                loanamt: parseInt(parseIntDef(val.loanamt, null) / 1E8),
                sdaterate: parseIntDef(val.sdaterate, null),
                duration: durationParser(parseIntDef(val.duration, 0)),
                img: imagePath(val.img),
                fc: val.fc,
                idx: val.idx,
                loancls: val.loancls,
                seniorstr: val.seniorstr,
                it: val.it,
                at: val.at,
                rate: val.rate,
            }
        })

        return {
            data: compData,
            hasMore: (data.rC > (cardApiState.pagecnt + 1) * 10) ? true : false,// check next page is available
            rcn: data.rC
        }

    }

    async function getCardPage(props: any) {
        // setter: State setter callback, should be given in the Hook or elsewhere,

        let params = Object.assign({}, apiParamGen(filterInfo),
            {'pageCount': (typeof props.pagecount == 'undefined') ? cardApiState.pagecnt : props.pagecount});
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
        res = preProcessCard(res.data)
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
                    cardfetchData()
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
                    // console.log("ccc", {fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                }
            }
        }, [windowNow]
    )

    const solSect = (<CompSortSelect curntOption={selctState} desAsc={ascState}
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
                        <div className={styles.sort}>
                            {solSect}
                        </div>
                    </span>
                    <span className={styles.board}>
                        <CompCardGroup data={cardApiState.data}
                                       refFunc={lastCardRef}
                                       fontRel={cardFontRel}
                        />
                    <div className={styles.boardError}>
                        {cardApiState.loading && "로딩중입니다...."}
                        {cardApiState.error && "에러발생XXXX"}
                    </div>
                    </span>
                </div>)
        }, [cardApiState.data, cardFontRel]
    )
    return (
        <div>
            <Header/>
            <windowContext.Provider value={{windowStatus: windowContextval}}>
                <div className={styles.sectionContents}>
                    <div className={styles.leftBlankJs} key='leftblank' index={0}/>
                    {asideFil}
                    <div className={styles.contentJs} key="contents_all" index={2}>
                    {/*    {chartComps}*/}
                        {cardComps}
                    </div>
                    <div className={styles.rightBlankJs} key="rightblank" index={3}/>
                </div>
            </windowContext.Provider>
            <Footer/>
        </div>
    )
}

export default DEBUGDetail