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
      </div>
      <div className={styles.modelTable}>
        <table>
          <thead>
          <tr>
            <th>구분</th>
            <th>Bottom</th>
            <th>Base</th>
            <th>Top</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>은행</td>
            <td>{props.modelPredict['bankfix'][0].toFixed(2)}</td>
            <td>{props.modelPredict['bankfix'][2].toFixed(2)}</td>
            <td>{props.modelPredict['bankfix'][1].toFixed(2)}</td>
          </tr>
          <tr>
            <td>보험</td>
            <td>{props.modelPredict['insfix'][0].toFixed(2)}</td>
            <td>{props.modelPredict['insfix'][2].toFixed(2)}</td>
            <td>{props.modelPredict['insfix'][1].toFixed(2)}</td>
          </tr>
          <tr>
            <td>기타</td>
            <td>{props.modelPredict['etcfix'][0].toFixed(2)}</td>
            <td>{props.modelPredict['etcfix'][2].toFixed(2)}</td>
            <td>{props.modelPredict['etcfix'][1].toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
        <div className="mt-8 text-right">
            <Link href={`/detail?loancls=${props.loanType}&seniorstr=${props.loanPriority}`}
                  as={'/detail'}>
              <button className={styles.GoToCasesButton}>
                대출 사례 확인하기
              </button>
            </Link>
        </div>
      </div>
    </div>
  )
}