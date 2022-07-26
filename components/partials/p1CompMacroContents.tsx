import { macroProp } from '../const/p1Types';
import styles from "../../styles/Macro.module.scss";
import { formatDate, formatPrintDate } from "../const/p2Utils";
import { macroType } from "../const/p1Types"

const upIcon = "▲";
const downIcon = "▼";

export default function MacroContents(props: macroProp) {
  let data = props.macroData?.data;
  if(!data) 
    return;

  const benchmarks : {[key: string]: string} = {
    kr1y: '국고채(1년)',
    kr3y : '국고채(3년)',
    cd91d : 'CD(91일)',
    ifd1y : '산금채(1년)',
    // koribor3m : '(6개월)'
  }

  function getRecentDate(arr: macroType[]): macroType {
    let max = arr[0];
    for (let i=1; i<=arr.length; i++) {
      if (arr[i]?.date > max.date) {
        max = arr[i];
      }
    }
    return max
  }

  function getWeekAgoDate(arr: macroType[], recentDate: Date) : macroType {
    const minDate = formatDate(new Date(new Date(recentDate).setDate(recentDate.getDate() - 7)))
    let newArr = arr.filter((item) => item.date >= minDate);
    let min = newArr[0]
    for (let i=1; i<newArr.length; i++){
      if (newArr[i]?.date < min.date && newArr[i].date >= minDate) {
        min = newArr[i];
      }
    }
    return min;
  }
  
  function getMonthAgoDate(arr: macroType[], recentDate: Date) : macroType {
    const minDate = formatDate(new Date(new Date(recentDate).setMonth(recentDate.getMonth() - 1)))
    let newArr = arr.filter((item) => item.date >= minDate);
    let min = newArr[0]
    for (let i=1; i<newArr.length; i++){
      if (newArr[i]?.date < min.date && newArr[i].date >= minDate) {
        min = newArr[i];
      }
    }
    return min;
  }

  let filteredData = [];

  for (let [key, value] of Object.entries(data)) {
    if (key in benchmarks) {
      const recent = getRecentDate(value);
      const rDate = new Date(Number(recent.date.substring(0,4)), Number(recent.date.substring(4,6))-1, Number(recent.date.substring(6,8)));
      const weekAgo = getWeekAgoDate(value, rDate);
      const monthAgo = getMonthAgoDate(value, rDate);

      filteredData.push({
        id: key,
        name: benchmarks[key],
        recentDate: recent.date,
        recent: recent.value.toFixed(2),
        weekAgo: weekAgo.value.toFixed(2),
        monthAgo: monthAgo.value.toFixed(2),
        weekChange: ((recent.value/weekAgo.value - 1) * 100).toFixed(2),
        monthChange: ((recent.value/monthAgo.value - 1) * 100).toFixed(2),
      });
    }
  }

  return (
    !props.macroData ? null :
    <div className={styles.macroContainer}>
      <div className={styles.resultTitle}>
        <div className={styles.titlePhrase}>
          <p >참고 벤치마크</p>
        </div>
        <div className={styles.titleDate}>
          <p>(기준일: {formatPrintDate(filteredData[0].recentDate)})</p>
        </div>
      </div>
      <div className={styles.macroTable}>
        <table className={styles.tableLayout}>
          <thead>
          <tr>
            <th rowSpan={2}>종류</th>
            <th colSpan={3}>수익률(%)</th>
            <th colSpan={3}>변동률(%)</th>
          </tr>
          <tr>
            <th>기준일</th>
            <th>1주전</th>
            <th>1개월전</th>
            <th>1주</th>
            <th>1개월</th>
          </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.recent}</td>
                <td>{d.weekAgo}</td>
                <td>{d.monthAgo}</td>
                <td className={Number(d.weekChange) < 0 ? styles.minus : styles.plus}>
                  { Number(d.weekChange) < 0 ? downIcon : upIcon }
                  {d.weekChange}
                </td>
                <td className={Number(d.monthChange) < 0 ? styles.minus : styles.plus}>
                  { Number(d.monthChange) < 0 ? downIcon : upIcon }
                  {d.monthChange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>⚠️ 금융채의 경우 금융기관별로 산출되는데 정확히 어떻게 적용할지 연구중입니다.</p>
          {/* <br/>
          ⚠️ 상기 표의 데이터는 6개월물 시중은행을 사용하였습니다.</p> */}
      </div>
    </div>
  )
}