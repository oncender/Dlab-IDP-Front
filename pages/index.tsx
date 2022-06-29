import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import MovingComponent from 'react-moving-text';
import tableStyles from "../styles/Table.module.scss";
import mainStyles from "../styles/main.module.scss";
import GridLoader from 'react-spinners/GridLoader';
import BigSelect from '../components/partials/p1CompBigSelectMain';
import useMoveScrool from "../components/hook/useScroll";


const Home: NextPage = () => {
  const [loanPriority, setLoanPriority] = useState('선순위');
  const [loanType, setLoanType] = useState('담보대출');
  const [loading, setLoading] = useState(false);
  const [start,setStart] = useState(false);
  const [element, onMoveToElement] = useMoveScrool('end')
  const handleLoanPriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanPriority(prioritySelectValue.filter((val)=>(val.value==event.target.value))[0].key)
  }
  const handleLoanType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(loanTypeSelectValue.filter((val)=>(val.value==event.target.value))[0].key)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const min=1500, max=4500;
    const term = Math.floor(Math.random() * (max-min) + min) // 0.5 ~ 2.5 second
    setLoading(true)
    onMoveToElement()
    setTimeout(() => {
      setLoading(false)
      setStart(true)
    }, term)

  }

  const prioritySelectValue = [
      { key: '선', value : '선순위'},
      { key: '중', value : '중순위'},
      { key: '후', value : '후순위'}];

  const loanTypeSelectValue = [
    { key: '담보', value : '담보대출'},
    { key: 'PF', value : 'PF대출'},
    { key: '한도', value : '한도대출'}];
  const displayTable = start ? 'block' :'none'

  return (
    <div className="w-full">
      <div className="h-auto lg:h-192 bg-blue-500">
        <div className="flex justify-center h-full bg-cover bg-center" 
          style={{backgroundImage: "url(background-01.png)"}}>
          <div className="lg:flex h-full w-full justify-around">
            <div className="flex h-1/2 justify-center items-center lg:h-full">
              <div className="flex-col">
                <div className={mainStyles.mainTitle}>Next Loan</div>
                <div className={mainStyles.mainDesc1}>Trained 937 loan case data-set in 160 funds</div>
                <div className={mainStyles.mainDesc1}>Data provided by largest estate AMC in Korea</div>
                <div className={mainStyles.mainDesc1}>Powered by D-engine</div>
              </div>
            </div>
            <div className="flex h-1/2 justify-center items-center lg:h-full lg:items-end">
              <div className="flex-col">
                <div className="flex mt-12 mb-4 justify-center lg:mt-0 lg:justify-start">
                  <BigSelect options={prioritySelectValue} handleChange={handleLoanPriority} />
                  <BigSelect options={loanTypeSelectValue} handleChange={handleLoanType} />
                </div>
                <div className={mainStyles.mainDesc2}>적정이자가 궁금하신가요?</div>
                <button className="bg-[#67FFBF] w-full h-12 text-2xl my-4 mb-6
                sm:w-72 sm:h-16 sm:text-3xl sm:m-10 
                md:w-96 md:h-20 md:text-4xl md:mb-20 
                rounded-lg text-blue-900 transition hover:scale-110 hover:duration-150 hover:ease-in-out hover:bg-[#BAFBE0]"
                  onClick={handleClick}>
                  지금 확인해보기
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-center items-center">
          {loading?
          <div className="my-20 transition transform delay-150 duration-300">
            <GridLoader loading={loading} color='#67FFBF' size={30} />
          </div>
          :
          <div className={tableStyles.modelTable} style={{display:displayTable}}>
            <table>
              <thead>
              <tr>
                <th>구분</th>
                <th>고정</th>
                <th>변동</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>은행</td>
                <td>1.1 ~ 2.0</td>
                <td>1.1 ~ 2.0</td>
              </tr>
              <tr>
                <td>보험</td>
                <td>1.1 ~ 2.0</td>
                <td>1.1 ~ 2.0</td>
              </tr>
              <tr>
                <td>기타</td>
                <td>1.1 ~ 2.0</td>
                <td>1.1 ~ 2.0</td>
              </tr>
              </tbody>
            </table>
            <p>⚠️ 경고문구 여기에 넣어서 잘 보이는지 확인해보기</p>
            <div className="mt-8 text-right">
              <MovingComponent
                type="pulse"
                duration="1500ms"
                delay="1s"
                direction="alternate"
                timing="ease-in-out"
                iteration="infinite"
                fillMode="none">
                <Link href={`/detail?loancls=${loanType}&seniorstr=${loanPriority}`} as={'/detail'}>
                  <a className="text-[#45f0a8] text-3xl underline underline-offset-4 decoration-2">
                    더 상세한 정보 확인하기 →
                  </a>
                </Link>
              </MovingComponent>
            </div>
          </div>
          }
        </div>
        <div ref={element} />
      </div>
    </div>
  )
}

export default Home