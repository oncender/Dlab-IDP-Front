import {G2, Scatter} from '@ant-design/plots';
import {AutoComplete} from 'antd';
import {tupleNum} from 'antd/lib/_util/type';
import {start} from 'repl';
import {useRouter} from "next/router";
import {aumLpcorp} from "../const/p2Usertyp";
import {commaSep, sortString} from "../const/p2Utils";

const RateAtPlot = ({
                        data,
                        clickFilterDispat
                    }: { data: aumLpcorp[], clickFilterDispat: Function }) => {
    const router = useRouter()
    if (typeof data == undefined || data.length === 0) {
        return
    }
    G2.registerInteraction('element-hovering', {
        showEnable: [
            {trigger: 'element:mouseenter', action: 'cursor:pointer'},
            {trigger: 'element:mouseleave', action: 'cursor:default'},
        ],
    });


    const config = {
        data: data.sort((a, b) => sortString(a, b, '대출 체결일', true)),
        padding: 'Auto',
        appendPadding: [30, 70, 0, 15],
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
            '대출 체결일': {
                alias: '대출 체결일',
                formatter: (v) => {
                    let d1 = new Date(v)
                    d1.setDate(d1.getDate() + 1);
                    d1 = d1.toISOString()
                    return `${d1.substring(0, 10).replace(/-/g, ".")}`
                    // return v.replace(/-/g,'.')
                }
            },
            '체결이자': {
                alias: '체결이자',
                formatter: (v) => `${Number(v).toFixed(2)}%`,
            },
            '대출약정금': {
                alias: '대출약정금',
                formatter: (v) => `${commaSep(v)}억원`,
            },
            '자산명': {
                alias: '자산명'
            }
        },
        tooltip: {
            fields: ['대출 체결일', '체결이자', '대출약정금', '자산명']
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
            itemValue: {
                formatter: (text, item) => {
                    const items = data.filter((d) => d['자산 유형'] === item.value);
                    if (item.value=='주거'){
                        items.reduce((a, b) => {
                            return (a + parseFloat(b['체결이자']))
                    },0)
                    }
                    return items.length ? (items.reduce((a, b) => {
                        var bval
                        if (b['체결이자']){
                            bval = parseFloat(b['체결이자'])
                        } else {
                            bval =0
                        }
                        return (a + bval)
                    }, 0) / items.length).toFixed(2)+"%" : '-';
                },
                style: {
                    opacity: 0.65,
                }
            }
        },

        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'element-hovering',
            },
        ],
        onReady: (plot) => {
            plot.on('element:dblclick', (...vars) => {
                router.push({
                        pathname: '/detailInfo',
                        query: {idx: vars[0].data.data.idx, fc: vars[0].data.data.fc},
                        options: {shallow: true}
                    },
                    "/detailInfo")
            });
            plot.on('element:click', (...vars) => {
                    var action: string = 'click'
                    clickFilterDispat({typ: action, value: vars[0].data.data.idx})
                }
            )
        },
    }
    if (data.length === 0) {
        return
    }
    return (
        <div className="mt-8">
            <p className="pl-4 mb-4 text-3xl font-blinker font-semibold">Debt Rate Bubble Chart</p>
            <Scatter {...config} />
        </div>);
};

export default RateAtPlot
