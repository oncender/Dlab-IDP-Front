import React, { useState } from 'react'
import type { NextPage } from 'next'
import BigSelect from '../components/partials/bigSelectMain'

const Home: NextPage = () => {
  const [loanPriority, setLoanPriority] = useState('선')
  const [loanType, setLoanType] = useState('담보대출')

  const handleLoanPriority = (value: string) => {
    setLoanPriority(value);
  }
  const prioritySelectValue = [
      { key: '선', value : '선순위'},
      { key: '중', value : '중순위'},
      { key: '후', value : '후순위'}]

  const loanTypeSelectValue = [
    { key: '담보', value : '담보대출'},
    { key: 'PF', value : 'PF대출'},
    { key: '한도', value : '한도대출'}]

  return (
    <div className="w-full">
      <div className="h-screen lg:h-192 bg-blue-500">
        <div className="flex justify-center h-full bg-cover bg-center" 
          style={{backgroundImage: "url(background-01.png)"}}>
          <div className="lg:flex h-full w-full justify-around">
            <div className="flex h-1/2 justify-center items-center lg:h-full">
              <div className="flex-col">
                <div className="text-white text-7xl sm:text-8xl md:text-9xl font-semibold font-blinker mb-6">Next Loan</div>
                <div className="text-white text-lg sm:text-2xl md:text-3xl font-blinker mt-1">Trained 937 loan case data-set in 160 funds</div>
                <div className="text-white text-lg sm:text-2xl md:text-3xl font-blinker mt-1">Data provided by largest estate AMC in Korea</div>
                <div className="text-white text-lg sm:text-2xl md:text-3xl font-blinker mt-6 text-end">Powered by D-engine</div>
              </div>
            </div>
            <div className="flex h-1/2 justify-center items-center lg:h-full lg:items-end">
              <div className="flex-col">
                <div className="flex mb-4">
                  <BigSelect options={prioritySelectValue}/>
                  <BigSelect options={loanTypeSelectValue}/>
                </div>
                <div className="text-white text-2xl sm:text-4xl md:text-5xl font-sans font-light mb-12">적정이자가 궁금하신가요?</div>
                <button className="bg-[#67FFBF] w-full h-16 text-2xl sm:w-72 sm:h-16 sm:text-3xl sm:m-10 md:w-96 md:h-20 md:text-4xl md:mb-20 rounded-lg text-blue-900 transition hover:scale-110 hover:duration-150 hover:ease-in-out hover:bg-[#BAFBE0]">
                  지금 확인해보기
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="h-64 bg-slate-400">
        어떤 컨텐츠
      </div>
    </div>
  )
}

export default Home


