import {Column, G2} from '@ant-design/plots';
import {Button} from "antd";

const AumLpcorp = ({data, chartClc, chartClcNoEtc, onClick, onchartClcNoEtc}:
                       { data: any, chartClc: boolean, chartClcNoEtc: boolean, onClick: Function,
                         onchartClcNoEtc: Function }) => {
    G2.registerInteraction('element-link', {
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
        return `${parseFloat(item.loanamt * 100).toFixed(2)}%`;
    }
    configClickData['isPercent'] = !chartClc
    configClickData['content'] = chartClc ? nonClickF : onClickF
    configClickData['meta'] = chartClc ? {} : {value: {min: 0, max: 1,}}
    var newD
    if (chartClcNoEtc) {
        newD = data
    } else {
        newD = data
    }
    const config = {
        newD,
        appendPadding: 30,
        xField: 'loandate',
        yField: 'loanamt',
        seriesField: 'lpcorp',
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
        title: {
            text: "대출약정금",
            position: "end"
        },
        tooltip: true,
        interactions: [
            {
                type: 'element-highlight-by-color',
            },
            {
                type: 'element-link',
            },
            {
                type: 'tooltip',
                cfg: {start: [{trigger: 'element:click', action: 'tooltip:show'}]}
            }
        ],
        style: {
            position: 'relative',
            order: 0,
            zIndex: 0
            // height: '300px',
            // width: '70vw'
        }
    };
    let bl = !chartClc ? "-160px" : "-121px"
    let bll = !chartClc ? "-120px" : "-120px"
    return (
        <div style={{"display": 'flex', "flexFlow": 'column nowrap', "justifyContent": "space-between"}}>
            <Button
                style={{
                    "alignSelf": 'flex-end', 'order': 1, "borderRadius": "0.5rem",
                    "marginBotton": '10px', 'left': `${bl}`, "bottom": '135px', "zIndex": 1
                }}
                key={'grptwoCall'}
                onClick={() => (onClick(!chartClc))}
                shape='default'>
                {chartClc ? 'nominal' : '%'}
            </Button>
            <Button
                style={{
                    "alignSelf": 'flex-end', 'order': 1, "borderRadius": "0.5rem",
                    "marginBotton": '10px', 'left': `${bll}`, "bottom": '135px', "zIndex": 1
                }}
                key={'noEtc'}
                onClick={() => (onchartClcNoEtc(!chartClcNoEtc))}
                shape='default'>
                {chartClcNoEtc ? 'etc포함O' : 'etc포함X'}
            </Button>
            {/*<Column {...config} />*/}
        </div>)
};

export default AumLpcorp