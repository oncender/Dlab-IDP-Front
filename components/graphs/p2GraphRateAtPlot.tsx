import {Scatter} from '@ant-design/plots';
import { AutoComplete } from 'antd';
import { tupleNum } from 'antd/lib/_util/type';
import { start } from 'repl';

const RateAtPlot = ({data}: { data: any }) => {
    const config = {
        data,
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
        tooltip: {
            customContent: (title, items) => {
                const formatter = {
                    '대출 체결일': (val) => val.replace(/-/g, '.'),
                    '체결이자': (val) => Number(val).toFixed(2) + '%',
                    '대출약정금': (val) => val + '억원',
                    '자산 유형': (val) => val,
                }
                let htmlStr = `<div style="margin:10px 0;font-weight:700;"><div class="g2-tooltip-items">`;
                items.forEach((item) => {
                htmlStr += `<div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
                        <span class="g2-tooltip-item-label" style="margin-right: 12px;">${
                        item.name
                        }</span>
                        <span class="g2-tooltip-item-value">${
                        formatter[item.name](item.value)
                        }</span>
                    </div>`;
                });
                htmlStr += '</div>';
                return htmlStr;
            },
        
        },
        title: {
            text: "이자율",
            position: "end"
        },
        xAxis: {
            label: {
                formatter: (v) => `${v.split('-').splice(0, 2).join("/")}`,
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
