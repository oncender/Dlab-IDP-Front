import { Column, G2 } from '@ant-design/plots';
import {Button} from "antd";

const AumLpcorp = ({data,chartClc,onClick}: {data:any,chartClc:boolean,onClick:Function}) => {
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
  const configClickData = {}
  const nonClickF = (item) => {
        return `${(item.loanamt )}억`}
  const onClickF =  (item) => {
        return `${(item.loanamt * 100).toFixed(2)}%`;
      }
  configClickData['isPercent'] = chartClc ? false : true
  configClickData['content'] = chartClc ? nonClickF : onClickF
  configClickData['meta'] = chartClc ? {} : {value: {min: 0,max: 1,}}
  const config = {
    data,
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
         cfg: { start: [{ trigger: 'element:click', action: 'tooltip:show' }] }
       }
    ],
    style: {
      position:'relative',
      height: '300px',
      width: '70vw'
            }
  };
  return (<>
        <Column {...config} />
        <Button
                key={'grptwoCall'}
                onClick={() => (onClick(!chartClc))}
                shape = 'default'>
                {chartClc ? 'nominal' : '%'}
             </Button>
    </>)
};

export default AumLpcorp