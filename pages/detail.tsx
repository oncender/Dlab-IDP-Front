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
import {apiParamGen, getKeyByValue, objectMap} from "../components/const/utils";
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
    console.log("dummy chartD",chartD)
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
        return (<AumLpcorp data={chartD.two}/>)},[chartD.two])


    /* request api function */
    // API.TABLE
    async function getTable(){
        let params:any = apiParamGen(filterInfo)
        console.log(params)
        const response = await axios.get(
            APIURL.TABLE,{
                params: params
            });
      return response.data;
    }
    // API.SCROLL CARD
    async function getCard(){
        let params:any = apiParamGen(filterInfo)
        console.log(params)
        const response = await axios.get(
            APIURL.CARD,{
                params: params
            });
      return response.data;
    }

    // filter to api query
    useEffect(() => {
        // console.log("need produce api query",filterInfo.category)
        // const all_dat: any = getTable().then((response) => response.json())
        // const g: any= {}
        // g[one] = all_dat['datag1']
        // g[two] = all_dat['datag2']
        // setCharD(g)
        const newchartD = {one:chartD.one,two:chartD.two}
        setCharD(newchartD)
        console.log("Chart D is setted",newchartD)
        // setCardD(getCard().then((response) => response.json()))
        },[filterInfo])
    // useEffect(() => {
    //     console.log("Graph need to updated!")
    // },[chartD])
    // useEffect(() => {
    //     console.log("Card need to updated!")
    //     // Rendering logic for Card ...
    // },[cardD])

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
    const chartData = { one: {}, two: {}}
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