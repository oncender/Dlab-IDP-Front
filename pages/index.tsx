import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Button, Slider } from 'antd'
import type { SliderMarks } from 'antd/lib/slider'
import FormOutlined from '@ant-design/icons'

const marks: SliderMarks = {
  2011: {style: {paddingLeft: '20px'}, label: '2011'},
  2022: {style: {paddingRight: '20px'}, label: '2022'},
  // 2011: '2011', 2022: '2022'
}

const Home: NextPage = () => {
  const [startYear, setStartYear] = useState(2011)
  const [endYear, setEndYear] = useState(2022)

  const handleYearSlider = (value: [number, number]) => {
    setStartYear(value[0]);
    setEndYear(value[1]);
  }


  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-96 max-w-md md:max-w-lg rounded flex-col item-center shadow-lg my-2 px-2">
        <div className="flex justify-between bg-blue-100">
          <div>{startYear}</div>
          <div>{endYear}</div>
        </div>
        <div className="p-4">
          <p className="text-base text-gray-700">연도</p>
          <Slider
            range
            marks={marks}
            min={2011}
            max={2022}
            step={1}
            defaultValue={[2011, 2022]}
            onChange={(value) => {handleYearSlider(value)}}
          />
        </div>
        <div className="p-4">
          <p className="text-base text-gray-500">대출 약정금(억)</p>
          <Slider
            range
            min={10}
            max={5000}
            step={100}
            defaultValue={[1000, 3000]}
            // onChange={(value) => {handleYearSlider(value)}}
          />
        </div>
        <div className="p-4">
          <p className="text-base text-gray-500">대출 약정금(억)</p>
          <Slider
            range
            min={10}
            max={5000}
            step={100}
            defaultValue={[1000, 3000]}
            // onChange={(value) => {handleYearSlider(value)}}
          />
        </div>
        <div className="px-6 py-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<FormOutlined/>}>
              Get a Quote
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Home


