import styles from "../styles/Detail.module.scss"

import React, {createContext, useEffect, useLayoutEffect, useMemo, useReducer, useState} from 'react'
import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {useRouter} from 'next/router'
import {Button} from "antd";


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
import {ALL_LABEL, APIURL, FILTER_ACTION, INIT_FILST, SERVER_URL} from "../components/const/p2Constant"
import {
    CardFontSizeCalc,
    getKeyByValue,
    groupbyKeys,
    groupbyKeyString,
    PageCookieGet,
    PageCookieSet,
    parseFloatDef,
    parseIntDef,
    sortFloat,
    sortForChartOnly,
    sortObjectVal,
    sortString,
    windowSizeStr
} from "../components/const/p2Utils";
import {
    aumLpcorp,
    cardComp,
    CategoryObj,
    chartTyp,
    FilterStateObj,
    FloatObj,
    fromApiV1,
    pageCountTyp,
    rateAtData
} from "../components/const/p2Usertyp"
import Header from '../components/Header'
import Footer from "../components/Footer";
import CompDataTable from "../components/partials/p2CompTable";
import {clickReducer} from "../components/reducers/ClickReducer";
import useInfiniteScroll from "../components/hook/useInfiniteScroll";

export const windowContext = createContext({windowStatus: ''});

// const Detail: NextPage = ({chartData,cardData}: InferGetServerSidePropsType<typeof getServerSideProps>
const Detail: NextPage = ({dataFieldData}: InferGetStaticPropsType<typeof getStaticProps>
) => {
    // Get URL parameters via next router and setting up filter states
    const router = useRouter();
    const [start, setStart] = useState(false);
    const [contentType, setContentType] = useState(true); // if true talbe will be viewed.
    /* State & Reducer DEF */
    // @ts-ignore
    const [filterInfo, filDispat] = useReducer(filReducer, INIT_FILST); // all filter variable controller def
    const [asideFil, setAsideFil] = useState<JSX.Element | null>(null);
    const [clickFilter, clickFilterDispat] = useReducer(clickReducer, {clickFilters: []});

    useLayoutEffect(() => {
        let filterI: FilterStateObj
        filterI = PageCookieGet(router, 'filterInfoCookie', INIT_FILST)
        setStart(true)
        // @ts-ignore
        filDispat({typ: FILTER_ACTION.REPLACE, value: filterI})
        const asideNow:JSX.Element = (<div className={styles.asideFiltersJs} key="asidefilterjs" index={1}>
                <AsideFilters
                    fromHomeData={filterI}
                    filDispat={filDispat}
                    start={start}
                />
            </div>)
        setAsideFil(asideNow)
    }, [])
    // window size getter
    const windowNow = useWindowSize() // for body window component size handle different card layout
    const windowContextval = windowSizeStr(windowNow)
    const [scrollTop, onScrollTop] = useMoveScrool('center')  // after filter is updated, scroll should go to top
    useEffect(() => {
        // after filter updated, Graph should be reloaded
        PageCookieSet(filterInfo, 'filterInfoCookie')
        onScrollTop()
        setPageCnt(1)
        clickFilterDispat({typ: "clear"})
    }, [filterInfo])

    const [cardApiState, cardApiDispatch, cardfetchData, cardclearData] = useAsyncer(filterCardPage, [], [filterInfo, contentType], start, setStart);  // After cardPage updated, Card data is updated.
    const [pageCnt,setPageCnt] = useState(1)
    const [cardFontRel, setcardFontRel] = useState({fn: 42, an: 56, lpcorp: 56})
    // sorting State
    const [selctState, setSelect] = useState(ALL_LABEL['it']);
    const [ascState, setAscState] = useState(true);
    // card component dependent param def
    const preProcessCard = (data: fromApiV1[], pageNow: string): pageCountTyp => {
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

        function imagePath(img: string, at: string): string {
            if (!parseInt(img)) {
                // after mock image file added.
                // SET no PIC building TYPE : 1 or 2
                return `no_pic_building/${at}2.png`  //e.g. mock_pic/{img}.png
            } else {
                return `building_pic/${img}.png` // only {number} returned in api
            }

        }

        let compData: fromApiV1[] | cardComp[]
        if (!contentType) {
            compData = data.map((val) => {
                return {
                    fn: val.fn,
                    lpcorp: val.lpcorp,
                    an: val.an,
                    loan: parseInt(parseIntDef(val.loan, 0) / 1E8),
                    loanamt: parseInt(parseIntDef(val.loanamt, 0) / 1E8),
                    sdaterate: parseFloatDef(val.sdaterate, null),
                    duration: durationParser(parseIntDef(val.duration, 0)),
                    img: imagePath(val.img, val.at),
                    fc: val.fc,
                    idx: val.idx,
                    loancls: val.loancls,
                    seniorstr: val.seniorstr,
                    it: val.it,
                    at: val.at,
                    rate: val.rate,
                    loandate: val.loandate.replace(/-/g, "."),
                    lpt:val.lpt,
                    ft:val.ft,
                    area: parseFloatDef(val.area, 0),
                    equity:parseFloatDef(val.equity, 0),
                    aum:parseFloatDef(val.aum, 0),
                    ltv:parseFloatDef(val.ltv, 0),
                    spread:val.spread,
                    dscr:val.dscr
                }
            })
        } else {
            if (!data.length) return
            const tempKey = Object.keys(data[0])
            compData = data.map((val) => {
                val.area = val.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                tempKey.map((k) => {
                    val[k] = val[k].replace(/(Null|^\s*$)/g, '-')
                })
                return val
            })
        }
        return {
            data: compData,
            hasMore: (compData.length >= (pageCnt) * 10),// check next page is available
            rcn: compData.length//data.rC
        }
    }
    const filterObjectGen = (catenow: CategoryObj[]) => {
        return catenow.reduce((r, o) => {
            if (o.name in r) {
                if (typeof r[o.name] == 'string') {
                    r[o.name] = new Set([r[o.name], o.value])
                } else {
                    r[o.name].add(o.value)
                }
            } else {
                r[o.name] = o.value
            }
            return r
        }, {}) as { [key: string]: string | Set<string> }
    }

    // To replace data request to Backend
    const fiterDataGen = (filterI: FilterStateObj) => {
        const newFil = filterObjectGen(filterI.category)
        var allData = Object.keys(newFil).reduce((filteredD: fromApiV1[], nowfil: string) => {
            if (typeof newFil[nowfil] == 'string') {
                return filteredD.filter((val) => val[nowfil] == newFil[nowfil])
            } else {
                return filteredD.filter((val) => newFil[nowfil].has(val[nowfil]))
            }
        }, dataFieldData)
        allData = filterI.float.reduce((filteredD: fromApiV1[], Float: FloatObj) => {
            if (Float['name'] == 'debt') {
                return filteredD.filter((val) => (Float.value[0] <= parseFloatDef(val.loanamt, 0)) && (parseFloatDef(val.loanamt, 0) <= Float.value[1]))
            } else {
                return filteredD.filter((val) => (Float.value[0] <= parseFloatDef(val[Float.name], 0)) && (parseFloatDef(val[Float.name], 0) <= Float.value[1]))
            }
        }, allData)
        return allData
    }

    async function filterCardPage(props: any) {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        const allData: fromApiV1[] = fiterDataGen(filterInfo)
        return preProcessCard(allData, 1)
    }

    // infinite scroll ref
    const [observer, lastCardRef] = useInfiniteScroll(() => {
            setPageCnt((prev) => prev + 1)
        },
        cardApiState.loading,
        cardApiState.hasMore)
    useEffect(
        () => {
            let cardDOM = document.querySelector("div[custom=col21]");
            if (cardDOM) {
                const [fnPlace, anPlace, lpcorpPlace] = CardFontSizeCalc(
                    parseFloat(window.getComputedStyle(cardDOM).width),
                    parseInt(window.getComputedStyle(cardDOM).fontSize)
                )
                if (fnPlace != cardFontRel.fn && anPlace != cardFontRel.an && lpcorpPlace != cardFontRel.lpcorp) {
                    setcardFontRel({fn: fnPlace, an: anPlace, lpcorp: lpcorpPlace})
                }
            }
        }, [windowNow]
    )

    const sortSelect = (<CompSortSelect curntOption={selctState} desAsc={ascState}
                                        setcurntOption={setSelect} setdesAsc={setAscState}/>)

    const sortData = (newData: any[], selctState: string): any[] => {
        const sortkey = getKeyByValue(ALL_LABEL, selctState) as string
        var sortfunc: Function
        if (typeof newData[0][sortkey] == 'number') {
            sortfunc = sortFloat
        } else {
            sortfunc = sortString
        }
        return newData.sort((a, b) => sortfunc(a, b, sortkey, ascState)).slice(0, pageCnt * 10)
    }

    function NoDataCardOrTable() {
        return (
            <div className={styles.card}>
                <span className={styles.filter}>
                    <div className={styles.title}>
                        <span>총 대출건수는 </span>
                        <span><b>{0}</b></span>
                        <span>건 입니다.</span>
                    </div>
                    <Button className={styles.contentButton} onClick={() => (setContentType(!contentType))}>
                        {contentType ? '카드보기' : '테이블 보기'}
                    </Button>
                    <Button className={styles.contentButton}>
                        필터초기화
                    </Button>
                    {contentType ? (<div/>) : (<div className={styles.sort}>
                        {sortSelect}
                    </div>)}
                </span>
            </div>)
    }

    //count:number,newData:any[],headers:{ label: string, key: string }[],name:string,contentType : boolean
    function DataCardOrTable(contentType: boolean, newData: any[], headers: { label: string, key: string }[], name: string) {
        if (contentType) {
            return (
                <div className={styles.card}>
                <span className={styles.filter}>
                    <div className={styles.title}>
                        <span>총 대출건수는 </span>
                        <span><b>{cardApiState.rcn}</b></span>
                        <span>건 입니다.</span>
                    </div>
                    <Button className={styles.contentButton} onClick={() => (setContentType(!contentType))}>
                        카드보기
                    </Button>
                    <Button className={styles.contentButton} onClick={() => {
                        // to trigger rendering datatable
                        filDispat({
                            typ: FILTER_ACTION.REPLACE,
                            value: {category: filterInfo.category, float: filterInfo.float}
                        })
                    }}>
                        필터초기화
                    </Button>
                    <div/>
                </span>
                    <div style={{justifyContent: 'end', display: 'flex', flexFlow: 'row wrap', overflowX: 'scroll'}}>
                        <CompDataTable data={newData} headers={headers} exportFileName={`${name}.csv`}/>
                    </div>
                </div>)
        } else {
            return (
                <div className={styles.card}>
                <span className={styles.filter}>
                    <div className={styles.title}>
                        <span>총 대출건수는 </span>
                        <span><b>{cardApiState.rcn}</b></span>
                        <span>건 입니다.</span>
                    </div>
                    <Button className={styles.contentButton} onClick={() => (setContentType(!contentType))}>
                        테이블 보기
                    </Button>
                    <Button className={styles.contentButton} onClick={() => {
                        // to trigger rendering datatable
                        filDispat({
                            typ: FILTER_ACTION.REPLACE,
                            value: {category: filterInfo.category, float: filterInfo.float}
                        })
                    }}>
                        필터초기화
                    </Button>
                    <div className={styles.sort}>
                        {sortSelect}
                    </div>
                </span>
                    <span className={styles.board}>
                    <CompCardGroup data={newData}
                                   refFunc={lastCardRef}
                                   fontRel={cardFontRel}/>
                    <div className={styles.boardError}>
                        {cardApiState.loading && "로딩중입니다...."}
                        {cardApiState.error && "에러발생XXXX"}
                    </div>
                </span>
                </div>)
        }
    }

    const dataFilterByIndex = (clickFilter, cardApiState) => {
        const clickFilterSet = new Set(clickFilter.clickFilters)
        if (!clickFilterSet.size) {
            return cardApiState.data
        } else {
            return cardApiState.data.filter((val) => {
                return clickFilterSet.has(val.idx)
            })
        }
    }
    const csvElementGen = (data: any[], filterInfo: FilterStateObj): [{ label: string, key: string }[], string] => {
        const headers: { label: string, key: string }[] = Object.keys(data[0]).map((val) => {
            return {label: ALL_LABEL[val], key: val}
        })
        var name = filterInfo.category.map((val) => val.value).join("_")
        if (filterInfo.float.length) {
            name += "__" + filterInfo.float[0].value.map((val) => val.toString()).join("_")
        }
        return [headers, name]
    }

    const cardComps = useMemo(() => {
            if (!cardApiState.data.length) {
                return (NoDataCardOrTable())
            } else {
                var newData
                newData = dataFilterByIndex(clickFilter, cardApiState)
                const [headers, name] = csvElementGen(newData, filterInfo)
                newData = contentType ? newData : sortData(newData, selctState)
                return DataCardOrTable(contentType, newData, headers, name)
            }
        }
        , [cardApiState.data, cardFontRel, clickFilter.clickFilters,pageCnt,selctState,ascState]
    )

    ///////////////////////////////////  chart //////////////////////////
    const [chartClc, setChartClc] = useState(true);  // chart y data type -> % scale ~ raw numeric value
    const [chartClcNoEtc, setChartClcNoEtc] = useState(false);  // include '기타' or not
    const chartDInit = {
        loading: false, data: [{one: [], two: []}],
        error: false, hasMore: true,
        rcn: 0, pagecnt: 1
    }   // for useAsyncer hook error handling
    const [chartApiState, chartApiDispatch, _, chartclearData] = useAsyncer(filterGraph, [], [filterInfo],
        start, setStart, chartDInit);  // After filterInfo updated, chart data is updated.
    // chart component dependent param def
    const preProcessChart = (data1: fromApiV1[], data2: fromApiV1[]): chartTyp => {
        let alldata: { one: rateAtData[], two: aumLpcorp[] } = {one: [], two: []}
        // @ts-ignore
        alldata['one'] = data1.map((item) => {
            return {
                'fc': item.fc,
                'idx': item.idx,
                "자산명": item.an,
                "체결이자": parseFloatDef(item.sdaterate, null),
                "자산 유형": item.at,
                "대출 체결일": item.loandate,
                "대출약정금": parseIntDef(item.loanamt, null) / 1E8,
            }
        });

        data2 = data2.map((item) => {
            return {
                'idx': item.idx,
                "lpcorp": item.lpcorp,
                "loandate": parseIntDef(item.loandate.slice(0, 4)),
                "loanamt": parseInt(parseIntDef(item.loanamt, 0) / 1E8)

            }
        });
        var topNArrOb: { loanamt: number, lpcorp: string }[] = groupbyKeys(data2, 'loanamt', ['lpcorp']).filter((val) => {
            // to ignoring 이지스사모... corp names
            {
                return !val.lpcorp.includes("사모")
            }
        }).sort(
            // sort by all loan amount sum of each corp & slicing only top 10
            (a, b) => sortObjectVal(a, b, 'loanamt')).slice(-10).reverse()
        const topNcorp: Set<string> = topNArrOb.reduce((r, o) => {
            r.add(o.lpcorp)
            return r
        }, new Set)
        var topNArr: string[] = topNArrOb.map((val) => val.lpcorp)
        var GroupedAll = groupbyKeys(data2, 'loanamt', ['lpcorp', 'loandate'])
        var GroupedAllidx = groupbyKeyString(data2, 'idx', ['lpcorp', 'loandate'])
        GroupedAll.map((val, idnum) => {
            val['idx'] = GroupedAllidx[idnum]['idx'].slice(0, -1)
        })
        // @ts-ignore
        // top 10 copr select
        const topn: rateAtData[] = GroupedAll.filter((val) => {
            return topNcorp.has(val["lpcorp"])
        }).sort((a, b) => topNArr.indexOf(a.lpcorp) - topNArr.indexOf(b.lpcorp));
        // @ts-ignore
        // non top 10 copr should be replaced to "기타"
        const nontopN = GroupedAll.filter((val) => {
            return !topNcorp.has(val["lpcorp"])
        })
        var nontopnAll: rateAtData[] = groupbyKeys(nontopN,
            'loanamt', ['loandate'])
        var nontopnAllIdx = groupbyKeyString(nontopN, 'idx', ['loandate'])
        nontopnAll = nontopnAll.map((item, idnum) => {
            return {
                "lpcorp": "기타(상위 10개 대주 제외)", "loandate": item.loandate, "loanamt": item.loanamt,
                "idx": nontopnAllIdx[idnum]['idx'].slice(0, -1)
            }
        })
        alldata['two'] = topn.concat(nontopnAll).sort(
            (a, b) => sortForChartOnly(a, b, 'loandate')
        );
        //     .sort(
        //     (a, b) => sortForChartOnly(a, b, 'loandate')
        // )
        return {data: [alldata], hasMore: false, rcn: 0}
    }

    async function filterGraph(props: any) {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        const allData: fromApiV1[] = fiterDataGen(filterInfo)
        return preProcessChart(allData, allData)
    }


    const chartOne = useMemo(() => {
        return (chartApiState.data[0] &&
            <RateAtPlot data={chartApiState.data[0].one} clickFilter={clickFilter.clickFilters}
                        clickFilterDispat={clickFilterDispat}/>)
    }, [chartApiState.data[0].one])
    const chartTwo = useMemo(() => {
        return (chartApiState.data[0] && <AumLpcorp data={chartApiState.data[0].two}
                                                    chartClc={chartClc}
                                                    onClick={setChartClc}
                                                    chartClcNoEtc={chartClcNoEtc}
                                                    onchartClcNoEtc={setChartClcNoEtc}
                                                    clickFilterDispat={clickFilterDispat}
        />)
    }, [chartApiState.data[0].two, chartClc, chartClcNoEtc])

    const [chartComps, setChartComps] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setChartComps(
            <div className={styles.chart} ref={scrollTop}>
                {chartTwo}
                {chartOne}
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

export const getStaticProps: GetStaticProps = async (context) => {
// export const getServerSideProps: GetServerSideProps = async (context) => {
    var dev = process.env.NEXT_PUBLIC_ENV == 'debug';
    // dev = true
    const server = dev ? 'http://127.0.0.1:8080' : SERVER_URL;
    const dataFieldData = await fetch(`${server}${APIURL.CARDPAGE}`).then(res => {
        return res.json()
    }).then(res => res.data)
    return {
        props: {
            dataFieldData,
        }
    }
}

export default Detail