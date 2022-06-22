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
import { INIT_FILST, INIT_LOANAMT,LABELS, MM_LOANAMT } from "../components/const/constant"


// let zip = (a1: any, a2: any) => a1.map((x, i) => [x, a2[i]]);

const Detail: NextPage = ({chartData, cardData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // category button def
    const [filterInfo, filDispat] = useReducer(filReducer as Function,INIT_FILST)
    console.log("filterinfo init",filterInfo)
    const ButtonGender = (label : string, buttons : Array<string>, isclicked : Array<boolean>, setClick: Function) => {
        return (<ButtonGroup
                      label={label}
                      buttons= {buttons}
                      isclicked={isclicked}
                      setClick = {setClick}
                  />)
    }
    const sliderGender = (label : string,curntval : [number,number], setSlider: Function) =>{
        return (
            <SliderFil
                label={label}
                curntval={curntval}
                setSlider={setSlider}
                mmVal={MM_LOANAMT}
            />)
    }

    // button component dependent param def
    const itValue: Array<string> = ['실물','대출','개발(펀드)','개발(PF)']
    const itClicked = selectArr(itValue,INIT_FILST.category,LABELS['it'])
    const [clickArrit,setClickArrit] = useState(itClicked)

    const seniorstrValue: Array<string> = ['선','중','후']
    const seniorstrClicked = selectArr(seniorstrValue,INIT_FILST.category,LABELS['seniorstr'])
    const [clickArrseniorstr,setClickArrseniorstr] = useState(seniorstrClicked)

    const atValue: Array<string> = ['오피스','물류','호텔','리테일','복합','주거','특별자산','기타']
    const atClicked = selectArr(atValue,INIT_FILST.category,LABELS['at'])
    const [clickArrat,setClickArrat] = useState(atClicked)
    
    // button component def
    const iTButton = useMemo(() => ButtonGender(
        LABELS['it'],itValue,clickArrit,setClickArrit),[clickArrit]
    )
    const seniorstrButton = useMemo(() => ButtonGender(
        LABELS['seniorstr'],seniorstrValue,clickArrseniorstr,setClickArrseniorstr),[clickArrseniorstr]
    )
    const aTButton = useMemo(() => ButtonGender(
        LABELS['at'],atValue,clickArrat,setClickArrat),[clickArrat]
    )
    
    // slider component dependent def
    const [sldrval, setSldrval] = useState(INIT_LOANAMT)
    const lamtSldr = useMemo(() =>
    sliderGender(LABELS['loanamt'],sldrval, setSldrval),[sldrval])



    return (
        <FilContext.Provider value ={{filterInfo, filDispat}}>
            <div className="flex">
                <aside className="self-start sticky top-16 border border-solid border-gray-300 rounded-lg w-64 ml-16">
                    사이드바 sticky
                        {iTButton}
                        {seniorstrButton}
                        {lamtSldr}
                        {aTButton}
                </aside>
            </div>

            <div className="grow flex-col mt-16 mr-16 items-center">
                  <div className="h-96">
                    <p className="text-4xl text-center">차트 영역</p>
                      {/* 차트컴포넌트 추가 */}
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
  const chartData = { "x": "123", "Y": "456"}
  const cardData = {"name": "1", "aum": "2"}

  return {
    props: {
      chartData,
      cardData,
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