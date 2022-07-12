import {Column, G2} from '@ant-design/plots';
import {Button} from "antd";

const AumLpcorp = ({data, chartClc, onClick,chartClcNoEtc, onchartClcNoEtc,clickFilterDispat}:
                       { data: any, chartClc: boolean,  onClick: Function,
                         chartClcNoEtc: boolean, onchartClcNoEtc: Function ,clickFilterDispat:Function}) => {
    G2.registerInteraction('element-link', {
        showEnable: [
        { trigger: 'element:mouseenter', action: 'cursor:pointer' },
        { trigger: 'element:mouseleave', action: 'cursor:default' },
        ],
        start: [
            {
                trigger: 'interval:mouseenter',
                action: 'element-link-by-color:link',
            },
        ],
        end: [
            {
                trigger: 'interval:mouseleave',
                action: 'element-link-by-color:unlink',
            },
        ],
    });

    const configClickData :{isPercent:boolean,content:Function,meta:any} = {}
    const nonClickF = (item) => {
        return `${(item.loanamt)}억`
    }
    const onClickF = (item) => {
        return `${parseFloat(item.loanamt * 100).toFixed(0)}%`;
    }
    configClickData['isPercent'] = !chartClc
    configClickData['content'] = chartClc ? nonClickF : onClickF
    configClickData['meta'] = chartClc ? {} : {value: {min: 0, max: 1,}}
    var newD
    if (chartClcNoEtc) {
        newD = data.filter((val) => val.lpcorp != "기타(상위 10개 대주 제외)")
    } else {
        newD = data
    }
    if (typeof newD == undefined || newD.length ===0){
        return
    }
    const config = {
        data:newD,
        appendPadding: 30,
        xField: 'loandate',
        yField: 'loanamt',
        seriesField: 'lpcorp',
        colorField: 'lpcorp',
        color: ['#f96900','#ffd500', '#82cab2', '#193442', '#d18768', '#9a1b7a', '#3c82a5', '#e728a7', '#0093ff', '#96959c','#786E96','C8C5C0'],
        isPercent: configClickData['isPercent'],
        isStack: true,
        meta: configClickData['meta'],
        label: {
            position: 'middle',
            content: configClickData['content'],
            style: {
                fill: '#fff',
            },
        },
        tooltip: true,
        interactions: [
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
                cfg: {start: [
                    {trigger: 'interval:mouseenter', action: 'tooltip:show'},
                    {trigger: 'element:click', action: 'tooltip:show'}]
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
                    if (items.length){
                        var formatval = (items.reduce((a, b) => {
                            return (a + parseFloat(b['loanamt']))
                    }, 0))
                        var allloan = data.reduce((a, b) => {
                            return (a + parseFloat(b['loanamt']))}, 0)
                        formatval = chartClc ? (formatval).toFixed(0)+"억" : (100*formatval/allloan).toFixed(0)+"%"
                        return formatval
                    } else{
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
            zIndex: 0
            // height: '300px',
            // width: '70vw'
        }
    };
    let bl = !chartClc ? "-92px" : "-55px"
    let bll = !chartClc ? "-52px" : "-52px"
    const chartTitle = !chartClc ? (
        <>
            <span>Loan-Amt </span>
            <span style={{color:'red'}}>Percent</span>
            <span>-Column Plot by Lenders</span>
            </>) : (<><span>Loan-Amt </span><span style={{color:'red'}}>Sum</span><span>-Column Plot by Lenders</span></>)
    return (
        <div style={{"display": 'flex', "flexFlow": 'column nowrap', "justifyContent": "space-between", "marginTop": "4rem"}}>
            <p className="pl-4 mb-4 text-3xl font-blinker">{chartTitle}</p>
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