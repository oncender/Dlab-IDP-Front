import React, {useState, useEffect, useReducer} from 'react'
import {ReactNode} from "react";
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from 'axios';
import {
    Button,
    Slider,
    Select
} from 'antd'
import type { SliderMarks } from 'antd/lib/slider'

import ButtonGroup from "../components/partials/buttongroup"
import MultiSelect from "../components/partials/multiSelect";
import { initFilSt, FilReducer, FILTER_ACTION } from "../components/reducers/FilterReducer";

let zip = (a1: any, a2: any) => a1.map((x, i) => [x, a2[i]]);

const Detail: NextPage = ({chartData, cardData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // category button def

    const [filterInfo, filDispat] = useReducer(FilReducer,initFilSt)
    console.log(filterInfo)

    const labels = {
        'it' : '투자유형',
        'ft': '펀드구분',
        'ccc' : '투자전략',  // no avail yet
        'ddd' : '투자자산유형' // no avail yet
    }

    const parsing = (arr: any) => {

    }

    const itValue: Array<string> = ['실물','대출','개발(펀드)','개발(PF)']
    const itDefault : Array<string> = initFilSt.category.filter(function(fil){
        fil.name == this.value},{value:labels['it']}).map((v) => {v.value})
    let temp_set : Set<string> =  new Set(itDefault)
    const itClicked = itValue.filter((v) => temp_set.has(v));
    console.log(itDefault,itClicked)
    const ftValue: Array<string> = ['Fund','PFV','Reits']
    const ftDefault : Array<string> = initFilSt.category.filter(function(fil){
        fil.name == this.value},{value:labels['ft']}).map((v) => {v.value})
    temp_set =  new Set(itDefault)
    const ftClicked = ftValue.filter((v) => temp_set.has(v));

    const cccValue: Array<string> = ['Core+','Core','Value-added','Opportunistic']
    const cccDefault : Array<string> =


    const dddValue: Array<string> = ['은행','리테일','물류','호텔']
    const assetDefault: Array<string> = ['은행','호텔']

  // chartData, cardData 파라미터로 받아서 사용
  return (
    <div className="flex-col pt-16 item-center">
      <div className="grid">
        <p className="text-4xl">필터 영역</p>
          <div className="inline-flex">
              <div className='block'>
                  <ButtonGroup
                      labels={labels['it']}
                      buttons= {itValue}
                      isclicked={itClicked}
                      dispatch = {filDispat}
                  />
                  <ButtonGroup
                      labels={labels['ft']}
                      buttons={ftValue}
                      isclicked={ftClicked}
                      dispatch = {filDispat}
                  />
              </div>
                  <div className='block'>
                      <MultiSelect
                          labels = {labels['ccc']}
                          options = {stratValue}
                          defaultOptions={stratDefault}
                          dispatch = {filDispat}
                      />
                      <MultiSelect
                          labels = {labels['ddd']}
                          options = {assetTypeValue}
                          defaultOptions={assetDefault}
                          dispatch = {filDispat}
                      />
                  </div>
          </div>

      <p className="text-4xl text-center">차트 영역</p>
        {/* 차트컴포넌트 추가 */}
      </div>
      <div className="">
      <p className="text-4xl text-center">카드 영역</p>
        {/* 카드컴포넌트 추가 */}
      </div>

    </div>
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