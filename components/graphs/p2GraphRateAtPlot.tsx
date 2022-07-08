import {Scatter} from '@ant-design/plots';
import { AutoComplete } from 'antd';
import { tupleNum } from 'antd/lib/_util/type';
import { start } from 'repl';
import { to_date} from "../const/p2Utils"
const RateAtPlot = ({data}: { data: any }) => {
    const newData = data.map((val) => {
        val['대출 체결일'] = to_date(val['대출 체결일'])
        return val
    })
    const config = {
        data: newData,
        padding: 'Auto',
        appendPadding: [30,70,0,15],
        xField: '대출 체결일',
        yField: '체결이자',
        sizeField: '대출약정금',
        colorField: '자산 유형',
        color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#9a1b7a', '#3c82a5', '#e728a7', '#0093ff', '#96959c'],
        size: [4, 30],
        shape: 'circle',
        pointStyle: {
            fillOpacity: 0.8,
            stroke: '#bbb',
        },
        meta: {
            '대출 체결일' : {
                alias :'대출 체결일',
                formatter : (v) => {
                 let d1 = new Date(v).toISOString()
                    return `${d1.substring(0, 10).replace(/-/g,".")}`
                }
            },
            '체결이자' : {
                alias : '체결이자',
                formatter: (v) => `${Number(v).toFixed(2)}'%`,
            },
            '대출약정금' : {
                alias : '대출약정금',
                formatter: (v) => `${v}억원`,
            },
            '자산명' : {
                alias : '자산명'
            }
        },
        tooltip: {
            fields : ['대출 체결일','체결이자','대출약정금','자산명']
        },
        title: {
            text: "이자율",
            position: "end"
        },
        xAxis: {
            label: {
                formatter: (v) => {
                    return `${v.split('.').splice(0, 2).join("/")}`
                },
            // .split('-').splice(0, 2).join("/")
            },
            grid: {
                line: {
                    style: {
                        stroke: '#eee',
                    },
                },
            },
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
        },
        yAxis: {
            // verticalFactor: -0.1,
            label: {
                formatter: (v) => `${(parseFloat(v)).toFixed(2)} %`,
            },
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
            tickInterval: 0.005,
            maxLimit: 12.00,
            minLimit: 2.00,
        },
        style: {
            position: 'relative',
            // height: '400px',
            // width: '80vw'
        },
        legend: {
            layout: 'vertical',
            position: 'right',
            offsetX: -50,
        }
    };
    if (data.length === 0) {
        return
    }
    return (
    <div className="mt-8">
        <p className="pl-4 mb-4 text-3xl font-blinker">Debt Rate Bubble Chart</p>
        <Scatter {...config} />
    </div>);
};

export default RateAtPlot
