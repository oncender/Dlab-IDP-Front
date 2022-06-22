import {
    Button,
    Slider,
    Select
} from 'antd'
import type { SliderMarks } from 'antd/lib/slider'
import axios from 'axios';

import React, {useEffect, useReducer, useMemo, createContext, useState} from 'react'
import {ReactNode} from "react";
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ButtonGroup from "../components/partials/buttongroup"
import SliderFil from "../components/partials/sliderfil";
import { filReducer ,selectArr, FilContext } from "../components/reducers/FilterReducer";
import {APIURL, INIT_FILST, INIT_LOANAMT, LABELS, MM_LOANAMT} from "../components/const/constant"
import {apiParamGen, getKeyByValue, groupbyKeys, objectMap, sortObjectVal, urlGen} from "../components/const/utils";
import { rateAtData, aumLpcorp } from "../components/const/usertyp"
import Asyncer from "../components/reducers/Asyncer";
import {CategoryObj} from "../components/const/usertyp";
import RateAtPlot from "../components/graphs/rateAtPlot";
import AumLpcorp from "../components/graphs/aumLpcorp";


// let zip = (a1: any, a2: any) => a1.map((x, i) => [x, a2[i]]);

const Detail: NextPage = ({chartData, cardData,fromHomeData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    /* State & Reducer DEF */
    // all category reducer def
    const [filterInfo, filDispat] = useReducer(filReducer as Function, fromHomeData.filterInit)
    // chartData State
    const [chartD,setCharD] = useState(chartData)
    const [chartClc,setChartClc] = useState(false)
    // cardData State
    const [cardD,setCardD] = useState(cardData)


    // button component dependent param def
    const itValue: Array<string> = ['실물','대출','개발(펀드)','개발(PF)'];
    const itClicked = selectArr(itValue,INIT_FILST.category,'it');
    const [clickArrIt,setClickArrIt] = useState(itClicked);

    const seniorstrValue: Array<string> = ['선','중','후'];
    const seniorstrClicked = selectArr(seniorstrValue,INIT_FILST.category,'seniorstr');
    const [clickArrSeniorstr,setClickArrSeniorstr] = useState(seniorstrClicked);

    const atValue: Array<string> = ['오피스','물류','호텔','리테일','복합','주거','특별자산','기타'];
    const atClicked = selectArr(atValue,INIT_FILST.category,'at');
    const [clickArrAt,setClickArrAt] = useState(atClicked);

    const rateValue: Array<string> = ['고정','변동'];
    const rateClicked = selectArr(rateValue,INIT_FILST.category,'rate');
    const [clickArrRate,setClickArrRate] = useState(rateClicked);
    // slider component dependent def
    const [sldrval, setSldrval] = useState(fromHomeData.sldrInit)
    // chart component dependent param def
    const preProcessChart = (data1:rateAtData[],data2:aumLpcorp[]) => {
        let alldata = { one: {}, two: {}}
        alldata['one'] = data1.map((item)=>{
             return {
                 "sdaterate": parseFloat(item.sdaterate) ? parseFloat(item.sdaterate) : null,
                 "at": item.at,
                 "loandate":item.loandate,
                 "loanamt": parseFloat(item.loanamt) ? parseFloat(item.loanamt) : null
             }})
        data2 = data2.map((item)=>{
             return {
                 "lpcorp": item.lpcorp,
                 "loandate":item.loandate.slice(0,4),
                 "loanamt": parseFloat(item.loanamt) ? parseFloat(item.loanamt) : 0
             }})
        const topNcorp : Set<string>= groupbyKeys(data2,'loanamt',['lpcorp']).filter((val)=>{
            {return !val.lpcorp.includes("사모") ? true : false}
        }).sort(
            (a,b) =>sortObjectVal(a,b,'loanamt')).slice(-10).reverse()
            .reduce((r,o) => {
                r.add(o.lpcorp)
                return r},new Set)
        data2 = groupbyKeys(data2,'loanamt',['lpcorp','loandate'])
        data2 = data2.filter( (val) => {return topNcorp.has(val["lpcorp"])}).sort(
            (a,b) =>sortObjectVal(a,b,'loandate')
        )
        console.log(data2)
        alldata['two'] = data2
        return alldata
    }


    /* Component DEF */
    // button component def
    const iTButton = useMemo(() => {
        return (<ButtonGroup
                      label={LABELS['it']}
                      buttons= {itValue}
                      isclicked={clickArrIt}
                      setClick = {setClickArrIt}
                  />)
    },[clickArrIt]
    )
    const seniorstrButton = useMemo(() =>{
        return (<ButtonGroup
                      label={LABELS['seniorstr']}
                      buttons= {seniorstrValue}
                      isclicked={clickArrSeniorstr}
                      setClick = {setClickArrSeniorstr}
                  />)},[clickArrSeniorstr])
    const aTButton = useMemo(() =>{
        return (<ButtonGroup
                      label={LABELS['at']}
                      buttons= {atValue}
                      isclicked={clickArrAt}
                      setClick = {setClickArrAt}
                  />)},[clickArrAt]
    )
    const rateButton = useMemo(() =>{
        return (<ButtonGroup
                      label={LABELS['rate']}
                      buttons= {rateValue}
                      isclicked={clickArrRate}
                      setClick = {setClickArrRate}
                  />)},[clickArrRate]
    )
    // slider component def
    const lamtSldr = useMemo(() =>{
        return (
            <SliderFil
                label={LABELS['loanamt']}
                curntval={sldrval}
                setSlider={setSldrval}
                mmVal={MM_LOANAMT}

            />)
    },[sldrval])
    // chart component def
    const chartOne = useMemo(() => {
        return (<RateAtPlot data={chartD.one}/>)},[chartD.one])
    const chartTwo = useMemo(() => {
        return (<AumLpcorp data={chartD.two}
                           chartClc={chartClc}
                           onClick={setChartClc}
        />)},[chartD.two,chartClc])


    /* request api function */
    // API.TABLE
    // }
    let isSubscribed = true;
    async function getGraph(isSubscribed:boolean) {
        let params = apiParamGen(filterInfo)
        let url1: string = urlGen(APIURL.PLTONE, params)
        let url2: string = urlGen(APIURL.PLTTWO, params)

        const response1 = await fetch(
            url1, {method: "get"})
        const response2 = await fetch(
            url2, {method: "get"})
        const data1 = await response1.json() ;
        const data2 = await response2.json() ;
        if (isSubscribed) {
            setCharD(preProcessChart(data1['datag1'], data2['datag2']))
        }
    }
    // API.SCROLL CARD
    async function getCard(){
        let params:any = apiParamGen(filterInfo)
        const response = await axios.get(
            APIURL.CARD,{
                params: params
            }).then((response) => {

        })
        .catch(() => {
        });
      return response;
    }

    // filter to api query
    useEffect(() => {
        getGraph(isSubscribed);
        const newchartD = {one:chartD.one,two:chartD.two};
        return () => isSubscribed = false;
        },[filterInfo])

    return (
        <FilContext.Provider value ={{filterInfo, filDispat}}>
            <div className="flex">
                <aside className="self-start sticky top-16 border border-solid border-gray-300 rounded-lg w-64 ml-16">
                    사이드바 sticky
                    {iTButton}
                    {aTButton}
                    {seniorstrButton}
                    {rateButton}
                    {/*{lamtSldr}*/}
                </aside>
            </div>

            <div className="grow flex-col mt-16 mr-16 items-center">
                  <div className="h-96">
                    <p className="text-4xl text-center">차트 영역</p>
                      {chartOne}
                      {chartTwo}
                  </div>
                  <div className="h-96">
                    <p className="text-4xl text-center">카드 영역</p>
                      {/* 카드컴포넌트 추가 */}
                  </div>
                </div>
            </FilContext.Provider>
      )
    }

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    // 더미 데이터
    const chartData = { one: [], two: []}
    chartData.one = await fetch('https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json')
        .then((response) => response.json())
    chartData.two = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json')
        .then((response) => response.json())
    const cardData = {"name": "1", "aum": "2"}
    const fromHomeData = {filterInit:INIT_FILST,sldrInit:INIT_LOANAMT}

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