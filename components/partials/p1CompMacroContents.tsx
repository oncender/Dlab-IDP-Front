import Link from 'next/link';
import { macroProp } from '../const/p1Types';
import styles from "../../styles/Macro.module.scss";


export default function MacroContents(props: macroProp) {
  let today = new Date();
  let printDate = today.getFullYear() + "." 
  + ("0" + (1 + today.getMonth())).slice(-2) + "." + ("0" + today.getDate()).slice(-2);
  
  return (
    !props.modelPredict ? null :
    <div className={styles.macroContainer}>
      <div className={styles.resultTitle}>
        <div className={styles.titlePhrase}>
          <p >참고 벤치마크</p>
        </div>
        <div className={styles.titleDate}>
          <p >(기준일: {printDate})</p>
        </div>
      </div>
      <div className={styles.macroTable}>
        <table className={styles.tableLayout}>
          <thead>
          <tr>
            <th rowSpan={2}>종류</th>
            <th colSpan={3}>수익률</th>
            <th colSpan={3}>변동률</th>
          </tr>
          <tr>
            <th>전일</th>
            <th>1주전</th>
            <th>1개월전</th>
            <th>전일</th>
            <th>1주전</th>
            <th>1개월전</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>금융채(6개월)</td>
            <td>2.35</td>
            <td>2.13</td>
            <td>2.09</td>
            <td>2.1%</td>
            <td>5.4%</td>
            <td>12.4%</td>
          </tr>
          <tr>
            <td>산금채(1년)</td>
            <td>2.35</td>
            <td>2.13</td>
            <td>2.09</td>
            <td>2.1%</td>
            <td>5.4%</td>
            <td>12.4%</td>
          </tr>
          <tr>
            <td>국고채(3년)</td>
            <td>2.35</td>
            <td>2.13</td>
            <td>2.09</td>
            <td>2.1%</td>
            <td>5.4%</td>
            <td>12.4%</td>
          </tr>
          <tr>
            <td>국고채(1년)</td>
            <td>2.35</td>
            <td>2.13</td>
            <td>2.09</td>
            <td>2.1%</td>
            <td>5.4%</td>
            <td>12.4%</td>
          </tr>
          </tbody>
        </table>
        <p>⚠️ 금융채의 경우 금융기관별로 산출되는데 정확히 어떻게 적용할지 연구중입니다. 상기 표의 데이터는 6개월물 시중은행을 사용하였습니다.
        </p>
      </div>
    </div>
  )
}