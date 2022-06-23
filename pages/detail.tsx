import {Divider} from 'antd'
import React, {useEffect, useReducer, useMemo, useState, useRef, useCallback} from 'react'
import type {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'

// Hook Import
import {filReducer, selectArr, FilContext} from "../components/reducers/FilterReducer";
import useAsyncer from "../components/hook/useAsyncer";

// Component Import
import ButtonGroup from "../components/partials/buttongroup"
import SliderFil from "../components/partials/sliderfil";
import RateAtPlot from "../components/graphs/rateAtPlot";
import AumLpcorp from "../components/graphs/aumLpcorp";
import CardGroup from "../components/partials/cardGroup"

// Component dependent Import
import {APIURL, INIT_FILST, INIT_DEBT, LABELS, MM_DEBT} from "../components/const/constant"
import {parseFloatDef, apiParamGen, groupbyKeys, sortObjectVal, urlGen} from "../components/const/utils";
import {fromApiV1, rateAtData, aumLpcorp, cardComp, pageCountTyp} from "../components/const/usertyp"
import axios from "axios";


const Detail: NextPage = ({
                              chartData,
                              cardData,
                              fromHomeData
                          }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    /* State & Reducer DEF */
    // all category reducer def
    const [filterInfo, filDispat] = useReducer(filReducer as Function, fromHomeData.filterInit)
    // chartData State
    const [chartD, setCharD] = useState(chartData)
    const [chartClc, setChartClc] = useState(false)

    // button component dependent param def
    const itValue: Array<string> = ['실물', '대출', '개발(펀드)', '개발(PF)'];
    const itClicked = selectArr(itValue, INIT_FILST.category, 'it');
    const [clickArrIt, setClickArrIt] = useState(itClicked);

    const seniorstrValue: Array<string> = ['선', '중', '후'];
    const seniorstrClicked = selectArr(seniorstrValue, INIT_FILST.category, 'seniorstr');
    const [clickArrSeniorstr, setClickArrSeniorstr] = useState(seniorstrClicked);

    const atValue: Array<string> = ['오피스', '물류', '호텔', '리테일', '복합', '주거', '특별자산', '기타'];
    const atClicked = selectArr(atValue, INIT_FILST.category, 'at');
    const [clickArrAt, setClickArrAt] = useState(atClicked);

    const rateValue: Array<string> = ['고정', '변동'];
    const rateClicked = selectArr(rateValue, INIT_FILST.category, 'rate');
    const [clickArrRate, setClickArrRate] = useState(rateClicked);
    // slider component dependent def
    const [sldrval, setSldrval] = useState(fromHomeData.sldrInit)
    // chart component dependent param def
    const preProcessChart = (data1: fromApiV1[], data2: fromApiV1[]) => {
        let alldata: { one: aumLpcorp[], two: rateAtData[] } = {one: {}, two: {}}

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
            {
                return !val.lpcorp.includes("사모")
            }
        }).sort(
            (a, b) => sortObjectVal(a, b, 'loanamt')).slice(-10).reverse()
            .reduce((r, o) => {
                r.add(o.lpcorp)
                return r
            }, new Set)
        data2 = groupbyKeys(data2, 'loanamt', ['lpcorp', 'loandate'])

        // @ts-ignore
        const topn: rateAtData[] = data2.filter((val) => {
            return topNcorp.has(val["lpcorp"])
        }).sort(
            (a, b) => sortObjectVal(a, b, 'loandate')
        )
        // @ts-ignore
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
        return alldata
    }
    // card component dependent param def
    //: fromApiV1[]
    // const preProcessCard = (data:any) => {
    //     function durationParser(num: number): string {
    //         // @ts-ignore
    //         let year = parseInt(num / 12);
    //         let month = num % 12;
    //         let durStr = '';
    //         if (year > 0) {
    //             durStr += `${year}년`
    //         }
    //         if (month != 0) {
    //             durStr += year == 0 ? "" : " "
    //             durStr += `${month}개월`
    //         }
    //         return durStr;
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         // const compDataPageSplit: cardComp[] = data.map((val) => {
    //         //     return {
    //         //         fn: val.fn,
    //         //         lpcorp: val.lpcorp,
    //         //         an: val.an,
    //         //         aum: parseFloatDef(val.aum, null),
    //         //         loanamt: parseFloatDef(val.loanamt, null),
    //         //         sdaterate: parseFloatDef(val.sdaterate, null),
    //         //         duration: durationParser(parseFloatDef(val.duration, 0))
    //         //     }
    //         // })
    //         // todo after pagecount api updated,delow need delete,above should be run
    //         const compData: cardComp[] = data.data.data.map((val) => {
    //             return {
    //                 fn: val.fn,
    //                 lpcorp: val.lpcorp,
    //                 an: val.an,
    //                 aum: parseFloatDef(val.aum, null),
    //                 loanamt: parseFloatDef(val.loanamt, null),
    //                 sdaterate: parseFloatDef(val.sdaterate, null),
    //                 duration: durationParser(parseFloatDef(val.duration, 0))
    //             }
    //         })
    //         const compDataPageSplit: pageCountTyp = {
    //             data: compData.reduce((r, o, i) => {
    //                 let key = Math.floor(Math.random() * compData.length)
    //                 if (i < 10) {
    //                     r.push(compData[key])
    //                 }
    //                 return r
    //             }, []),
    //             hasMore: true
    //         }
    //         resolve(compDataPageSplit)
    //     })
    // }

    const preProcessCard = (data: fromApiV1[]) => {
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

        // const compDataPageSplit: cardComp[] = data.map((val) => {
        //     return {
        //         fn: val.fn,
        //         lpcorp: val.lpcorp,
        //         an: val.an,
        //         aum: parseFloatDef(val.aum, null),
        //         loanamt: parseFloatDef(val.loanamt, null),
        //         sdaterate: parseFloatDef(val.sdaterate, null),
        //         duration: durationParser(parseFloatDef(val.duration, 0))
        //     }
        // })
        // todo after pagecount api updated,delow need delete,above should be run

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
        const compDataPageSplit: pageCountTyp = {
            data: compData.reduce((r, o, i) => {
                let key = Math.floor(Math.random() * compData.length)
                if (i < 10) {
                    r.push(compData[key])
                }
                return r
            }, []),
            hasMore: true
        }
        return compDataPageSplit
    }


    /* Component DEF */
    // button component def
    const iTButton = useMemo(() => {
            return (<ButtonGroup
                label={LABELS['it']}
                buttons={itValue}
                isclicked={clickArrIt}
                setClick={setClickArrIt}
                filDispat={filDispat}
            />)
        }, [clickArrIt]
    )
    const seniorstrButton = useMemo(() => {
        return (<ButtonGroup
            label={LABELS['seniorstr']}
            buttons={seniorstrValue}
            isclicked={clickArrSeniorstr}
            setClick={setClickArrSeniorstr}
            filDispat={filDispat}
        />)
    }, [clickArrSeniorstr])
    const aTButton = useMemo(() => {
            return (<ButtonGroup
                label={LABELS['at']}
                buttons={atValue}
                isclicked={clickArrAt}
                setClick={setClickArrAt}
                filDispat={filDispat}
            />)
        }, [clickArrAt]
    )
    const rateButton = useMemo(() => {
            return (<ButtonGroup
                label={LABELS['rate']}
                buttons={rateValue}
                isclicked={clickArrRate}
                setClick={setClickArrRate}
                filDispat={filDispat}
            />)
        }, [clickArrRate]
    )
    // slider component def
    const lamtSldr = useMemo(() => {
        return (
            <SliderFil
                label={LABELS['debt']}
                curntval={sldrval}
                setSlider={setSldrval}
                mmVal={MM_DEBT}
                filDispat={filDispat}
            />)
    }, [sldrval])
    // chart component def
    const chartOne = useMemo(() => {
        return (<RateAtPlot data={chartD.one}/>)
    }, [chartD.one])
    const chartTwo = useMemo(() => {
        return (<AumLpcorp data={chartD.two}
                           chartClc={chartClc}
                           onClick={setChartClc}
        />)
    }, [chartD.two, chartClc])

    // card component def


    /* request api function */
    // API.TABLE
    let isSubscribed = true;

    async function getGraph(isSubscribed: boolean) {
        let params = apiParamGen(filterInfo)
        let url1: string = urlGen(APIURL.PLTONE, params)
        let url2: string = urlGen(APIURL.PLTTWO, params)
        const response1 = await fetch(
            url1, {method: "get"}).catch(e => {
            console.warn(`Fetch 2 error: ${e.message}`)
            return null
        })
        const response2 = await fetch(
            url2, {method: "get"}).catch(e => {
            console.warn(`Fetch 2 error: ${e.message}`)
            return null
        })
        if ((response1 == null) || (response2 == null)) {
            return
        }
        const data1 = await response1.json();
        const data2 = await response2.json();
        if (isSubscribed) {
            setCharD(preProcessChart(data1['datag1'], data2['datag2']))
        }
    }

    async function getCardPage() {
        // setter: State setter callback, should be given in the Hook or elsewhere,
        let params = apiParamGen(filterInfo)
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
        } catch (req) {
            console.log("res start")
        }
        res = preProcessCard(res.data.data)
        return res;
    }
    //preProcessCard

    // API.SCROLL CARD
    // cardData State
    const [cardD, setCardD] = useState(cardData)
    const [cardPage, setCardPage] = useState(0);

    // filter to api query
    useEffect(() => {
        getGraph(isSubscribed);
        return (() => {
            isSubscribed = false
            setStart(true)
            setCardPage(1)
        })
    }, [filterInfo])

    useEffect(()=>{
        setStart(false),[]
    })
    const [start,setStart] = useState(true)
    const [apiState, fetchData] = useAsyncer(getCardPage, [cardPage,filterInfo],[filterInfo], start);

    const hasMore = true
    const observer = useRef();
    const lastCardRef = useCallback(
        (node: any) => {
            console.log("called!!")
            if (apiState.loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCardPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [apiState.loading, hasMore]
    );

    const cardBoard = (<CardGroup data={apiState.data}
                                  refFunc={lastCardRef}/>)


    return (
        <div>
            <div className="flex">
                <aside className="self-start sticky top-16 border border-solid border-gray-300 rounded-lg w-64 ml-16">
                    사이드바 sticky
                    {iTButton}
                    {aTButton}
                    {seniorstrButton}
                    {rateButton}
                    {lamtSldr}
                </aside>
            </div>

            <div className="grow flex-col mt-16 mr-16 items-center">
                <div className="h-96">
                    <p className="text-4xl text-center">차트 영역</p>
                    {/*{chartOne}*/}
                    <Divider orientation="left"/>
                    {/*{chartTwo}*/}
                </div>
                <Divider orientation="left"/>
                <div className="h-96">
                    <p className="text-4xl text-center">카드 영역</p>
                    {cardBoard}
                    <div>{apiState.loading && "로딩중입니다...."}</div>
                    <div>{apiState.error && "에러발생XXXX"}</div>
                </div>
            </div>
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