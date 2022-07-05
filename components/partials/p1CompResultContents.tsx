import Link from 'next/link';
import MovingComponent from 'react-moving-text';
import { resultProp } from '../const/p1Types';
import styles from "../../styles/Result.module.scss";


export default function ResultContents(props: resultProp) {
  let today = new Date();
  let printDate = today.getFullYear() + "." 
  + ("0" + (1 + today.getMonth())).slice(-2) + "." + ("0" + today.getDate()).slice(-2);
  
  return (
    !props.modelPredict ? null :
    <div className={styles.resultContainer}>
      <div className={styles.resultTitle}>
        <div className={styles.titlePhrase}>
          <p >예상 금리</p>
        </div>
        <div className={styles.titleDate}>
          <p >(기준일: {printDate})</p>
        </div>
      </div>
      <div className={styles.modelTable}>
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
            <td>{props.modelPredict['bankfix'][0].toFixed(2)} ~ {props.modelPredict['bankfix'][1].toFixed(2)}</td>
            <td>{props.modelPredict['bankfloat'][0].toFixed(2)} ~ {props.modelPredict['bankfloat'][1].toFixed(2)}</td>
          </tr>
          <tr>
            <td>보험</td>
            <td>{props.modelPredict['insfix'][0].toFixed(2)} ~ {props.modelPredict['insfix'][1].toFixed(2)}</td>
            <td>{props.modelPredict['insfloat'][0].toFixed(2)} ~ {props.modelPredict['insfloat'][1].toFixed(2)}</td>
          </tr>
          <tr>
            <td>기타</td>
            <td>{props.modelPredict['etcfix'][0].toFixed(2)} ~ {props.modelPredict['etcfix'][1].toFixed(2)}</td>
            <td>{props.modelPredict['etcfloat'][0].toFixed(2)} ~ {props.modelPredict['etcfloat'][1].toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
        <p>⚠️ 표본수가 적은 경우 금리 모델링 값의 정확도가 떨어질 수 있습니다. (예: 후순위, 브릿지)</p>
        <div className="mt-8 text-right">
            <Link href={`/debugdetail?loancls=${props.loanType}&seniorstr=${props.loanPriority}`} as={'/detail'} >
              <a className="text-[#45f0a8] text-xl md:text-3xl underline underline-offset-4 decoration-2 mr-10">
                더 상세한 정보 확인하기 →
              </a>
            </Link>
        </div>
      </div>
    </div>
  )
}