import React, { useState, useRef, useEffect } from 'react';
import type { NextPage, GetStaticProps, InferGetStaticPropsType  } from 'next';
import MovingComponent from 'react-moving-text';
import mainStyles from "../styles/Main.module.scss";
import GridLoader from 'react-spinners/GridLoader';
import BigSelect from '../components/partials/p1CompBigSelectMain';
import ResultContents from '../components/partials/p1CompResultContents';
import MacroContents from '../components/partials/p1CompMacroContents';
import HowItWorksContents from '../components/partials/p1CompHowItWorksContents';
import QnAContents from '../components/partials/p1QnA';
import Footer from "../components/Footer";
import axios from "axios";
import { formatDate } from "../components/const/p2Utils";
import { qna2Type, questionType } from '../components/const/p1Types'


const GET_MESSAGE_URL = "/v2/message/totalMessage";

const Home: NextPage = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [loanPriority, setLoanPriority] = useState('선');
  const [loanType, setLoanType] = useState('담보');
  const [loading, setLoading] = useState(false);
  const [modelResult, setModelResult] = useState();
  const [macroData, setMacroData] = useState();
  const [qnaData, setQnaData] = useState<questionType[]>([]);
  const focusRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    contents.sort((a, b) => a.msgNum - b.msgNum);
    let newContents: questionType[] = [];
    contents.map((content: qna2Type) => {
        if (content.subthread === 0) {
            newContents.push({
                msgNum: content.msgNum,
                userName: content.username,
                password: content.password,
                content: content.content,
                time: content.time,
                answers: [],
            });
        } else {
            newContents[content.msgNum].answers.push({
                sequence: content.subthread,
                userName: content.username,
                password: content.password,
                content: content.content,
                time: content.time,
            });
        }
    })
    newContents.sort((a, b) => b.msgNum - a.msgNum);
    newContents = newContents.slice(0,3);
    newContents.map(item => item.answers.sort((a, b) => b.sequence - a.sequence));
    setQnaData(newContents)
}, []);

  type API_URL_TYPE = {
    [key : string]: string;
  };
  const API_URL : API_URL_TYPE = {
    MODEL : "/api/v1/model/pred",
    MACRO : "/api/v2/macro/dataTable",
  }

  const handleLoanPriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanPriority(event.target.value)
  }
  const handleLoanType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(event.target.value)
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await getData();
    const min=1200, max=4000;
    const term = Math.floor(Math.random() * (max-min) + min) // 0.5 ~ 2.5 second
    setLoading(true)

    setTimeout(() => {setLoading(false)}, term)
    focusRef.current!.scrollIntoView();
  }

  const getData = async () => {
    const dateUntil = new Date();
    const dateFrom = new Date(new Date(dateUntil).setMonth(dateUntil.getMonth() - 2));

    const promises = [];
    promises.push(axios.get(
      API_URL["MODEL"] + `?seniorstr=${loanPriority}&loancls=${loanType}`)
      .then((res)=>{setModelResult(res.data)}).catch(e => { console.log(e) }))
    promises.push(axios.get(
      API_URL["MACRO"] + `?dateFrom=${formatDate(dateFrom)}&dateUntil=${formatDate(dateUntil)}`)
      .then((res)=>{setMacroData(res.data)}).catch(e => { console.log(e) }))
    Promise.all(promises);
  }

  const prioritySelectValue = [
      { key: '선', value : '선순위'},
      { key: '중', value : '중순위'},
      { key: '후', value : '후순위'}];

  const loanTypeSelectValue = [
    { key: '담보', value : '담보대출'},
    { key: 'PF', value : 'PF대출'},
    { key: '부가세', value : '부가세대출'},
    { key: '브릿지', value : '브릿지대출'},
    { key: '한도', value : '한도대출'}];

  return (
    <div className="w-full">
      <div className="h-auto lg:h-192 bg-blue-500">
        <div className="flex justify-center h-full bg-cover bg-center" 
          style={{backgroundImage: "url(background-01.png)"}}>
          <div className="lg:flex h-full w-full justify-around">
            <div className="flex h-1/2 justify-center items-center mt-20 md:mt-8 lg:mt-0 lg:h-full">
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
                <MovingComponent
                  type="slideInFromRight"
                  duration="2000ms"
                  delay="0s"
                  direction="normal"
                  timing="ease"
                  iteration="1"
                  fillMode="none"
                  className="text-center">
                  <button className={mainStyles.CheckRateButton}
                  onClick={handleClick}>
                    지금 확인해보기
                  </button>
                </MovingComponent>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex justify-center items-center" ref={focusRef}>
            {loading?
            <div className="my-20 transition transform delay-150 duration-300">
              <GridLoader loading={loading} color='#0078d0' size={30} />
            </div>
            :
            <div>
              <ResultContents 
                loanType={loanType} 
                loanPriority={loanPriority}
                modelPredict={modelResult!}/>
              <MacroContents
                macroData={macroData!}/>
              </div>
            }
          </div>
        </div>
        <QnAContents content = {qnaData}/>
        <HowItWorksContents />
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apiBaseUrl = process.env.API_SERVER_URL;
  
  let res = await fetch(apiBaseUrl + GET_MESSAGE_URL);
  let contents = await res.json();

  return {
      props : {
          contents,
      },
  };
}

export default Home