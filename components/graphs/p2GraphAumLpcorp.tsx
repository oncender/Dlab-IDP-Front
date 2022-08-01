import {Column, G2} from '@ant-design/plots';
import {Button} from "antd";
import {commaSep} from "../const/p2Utils";

const AumLpcorp = ({data, chartClc, onClick, chartClcNoEtc, onchartClcNoEtc, clickFilterDispat}:
                       {
                           data: any, chartClc: boolean, onClick: Function,
                           chartClcNoEtc: boolean, onchartClcNoEtc: Function, clickFilterDispat: Function
                       }) => {

    const configClickData: { isPercent: boolean, content: Function, meta: any } = {}
    const nonClickF = (item) => {
        return `${commaSep(item.loanamt)}`
    }
    const onClickF = (item) => {
        return `${parseFloat((item.loanamt * 100).toString()).toFixed(0)}%`;
    }
    G2.registerInteraction('element-hovering-cursor', {
        showEnable: [
            {trigger: 'element:mouseenter', action: 'cursor:pointer'},
            {trigger: 'element:mouseleave', action: 'cursor:default'},
        ],
    });
    G2.registerInteraction('element-link', {
            showEnable: [
                {trigger: 'element:mouseenter', action: 'cursor:pointer'},
                {trigger: 'element:mouseleave', action: 'cursor:default'},
            ],
            start: [
                {
                    trigger: 'element:mouseenter',
                    action: 'element-link-by-color:link',
                },
            ],
            end: [
                {
                    trigger: 'element:mouseleave',
                    action: 'element-link-by-color:unlink',
                },
            ],
        });

    configClickData['isPercent'] = !chartClc
    configClickData['content'] = chartClc ? nonClickF : onClickF
    configClickData['meta'] = {
        'loandate': {
            alias: '대출 연도',
        },
        'loanamt': {
            alias: '대출약정금',
            formatter: (v) => chartClc ? `${commaSep(v)}억원` : `${commaSep(v)}`,
        },
        'lpcorp': {
            alias: '대주'
        }
    }
    if (chartClc){
        configClickData['meta'] = Object.assign(configClickData['meta'], {value: {min: 0, max: 1}});
    }
    var newD
    if (chartClcNoEtc) {
        newD = data.filter((val) => val.lpcorp != "기타(상위 10개 대주 제외)")
    } else {
        newD = data
    }
    if (typeof newD == undefined || newD.length === 0) {
        return
    }
    const config = {
        data: newD,
        appendPadding: 30,
        xField: 'loandate',
        yField: 'loanamt',
        seriesField: 'lpcorp',
        colorField: 'lpcorp',
        color: ['#004B57', '#AED3E3', '#82cab2', '#193442', '#d18768', '#9a1b7a', '#3c82a5', '#e728a7', '#0093ff', '#96959c', '#786E96', '#C8C5C0'],
            //'#f96900','#ffd500'
        // ['#004B57','#006A89',
            // '#002F5C','#002A7C',
            // '#008DC0','#86BEDA',
            // '#AED3E3','#BBD2EC',
            // '#C5D4EB','#5B61A1',
            // '#A7AED3','#DFE9F5']
        isPercent: configClickData['isPercent'],
        isStack: true,
        meta: configClickData['meta'],
        label: {
            position: 'middle',
            content: configClickData['content'],
            style: {
                fill: '#fff',
                fontSize:'10px'
            },
        },
        tooltip: true,
        interactions: [
            { type : 'element-hovering-cursor'},
            {
                type: 'element-selected',
            },
            {
                type: 'element-highlight-by-color',
            },
            {
                type: 'element-link',
            },
            {
                type: 'tooltip',
                cfg: {
                    start: [
                        {trigger: 'element:mouseenter', action: 'tooltip:show'},
                        {trigger: 'interval:click', action: 'tooltip:show'}],
                      end: [
                        {
                            trigger: 'element:mouseleave',
                            action: 'tooltip:hide',
                        }]
                }
            }
        ],
        onReady: (plot) => {
            plot.on('element:click', (...vars) => {
                    var action: string = 'clickmany'
                    clickFilterDispat({typ: action, value: vars[0].data.data.idx})
                    // clickFilterDispat({typ: action, value: vars[0].data.data.idx})
                }
            )
        },
        legend: {
            position: 'right-top',
            offsetY: 30,
            itemValue: {
                formatter: (text, item) => {
                    const items = data.filter((d) => d['lpcorp'] === item.value);
                    if (items.length) {
                        var formatval = (items.reduce((a, b) => {
                            return (a + parseFloat(b['loanamt']))
                        }, 0))
                        var allloan = data.reduce((a, b) => {
                            return (a + parseFloat(b['loanamt']))
                        }, 0)
                        formatval = chartClc ? commaSep((formatval).toFixed(0)) + "억" : (100 * formatval / allloan).toFixed(0) + "%"
                        return formatval
                    } else {
                        return '-';
                    }
                },
                style: {
                    opacity: 0.65,
                }
            },
            itemName: {
                formatter: (val) => {
                    if (val === '기타(상위 10개 대주 제외)') {
                        return '기타(Top10 제외)'
                    }
                    return val.replace('주식회사', '').trim()
                }
            }
        },
        style: {
            position: 'relative',
            order: 0,
            zIndex: 0,
        },
    };
    let bl = !chartClc ? "-115px" : "-98px"
    let bll = !chartClc ? "-75px" : "-94px"
    const chartTitle = !chartClc ? (
        <p className="pl-4 mb-4 text-3xl font-semibold">
            <span style={{fontFamily: "Blinker, sans-serif"}}>Loan-Amt </span>
            <span style={{color: 'red',fontFamily: "Blinker, sans-serif"}}>Percent</span>
            <span style={{fontFamily: "Blinker, sans-serif"}}>-Column Plot by Lenders</span>
        </p>) : (<p className="pl-4 mb-4 text-3xl font-semibold">
                    <span style={{fontFamily: "Blinker, sans-serif"}} >Loan-Amt </span>
                    <span style={{color: 'red',fontFamily: "Blinker, sans-serif"}}>Sum</span>
                    <span style={{fontFamily: "Blinker, sans-serif"}}>-Column Plot by Lenders</span></p>)
    return (
        <div style={{
            "display": 'flex',
            "flexFlow": 'column nowrap',
            "justifyContent": "space-between",
            "marginTop": "4rem",
            "marginBottom": "-4%"
        }}>
            {chartTitle}
            <Button
                style={{
                    "alignSelf": 'flex-end', 'order': 1, "borderRadius": "0.5rem",
                    "marginBotton": '10px', 'left': `${bl}`, "bottom": '105px', "zIndex": 1
                }}
                key={'grptwoCall'}
                onClick={() => (onClick(!chartClc))}
                shape='default'>
                {chartClc ? 'nominal' : '%'}
            </Button>
            <Button
                style={{
                    "alignSelf": 'flex-end', 'order': 1, "borderRadius": "0.5rem",
                    "marginBotton": '10px', 'left': `${bll}`, "bottom": '105px', "zIndex": 1
                }}
                key={'noEtc'}
                onClick={() => (onchartClcNoEtc(!chartClcNoEtc))}
                shape='default'>
                {chartClcNoEtc ? 'etc포함O' : 'etc포함X'}
            </Button>
            <Column {...config} />
        </div>)
};

export default AumLpcorp