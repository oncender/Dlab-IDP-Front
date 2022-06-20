import React, { useState, useEffect } from 'react'
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from 'axios';
import { 
  Button,
  Slider 
} from 'antd'
import type { SliderMarks } from 'antd/lib/slider'


const Detail: NextPage = ({chartData, cardData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  // chartData, cardData 파라미터로 받아서 사용

  return (
    <div className="flex-col pt-16 item-center">
      <div className="">
        <p className="text-4xl">필터 영역</p>
        {/* 필터컴포넌트 추가 */}
      </div>
      <div className="">
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