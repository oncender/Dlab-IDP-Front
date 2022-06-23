import { Scatter } from '@ant-design/plots';

const RateAtPlot = ({data}: {data:any}) => {
  const config = {
    data,
    appendPadding: 30,
    xField: 'loandate',
    yField: 'sdaterate',
    sizeField: 'loanamt',
    colorField: 'at',
    color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#9a1b7a','#3c82a5','#e728a7'],
    size: [4, 30],
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#bbb',
    },
    xAxis: {
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
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickInterval:0.005,
      maxLimit:12.00,
      minLimit:2.00,
    },
    style: {
      position:'relative',
      height: '400px',
      width: '80vw'
            }
    // quadrant: {
    //   xBaseline: 0,
    //   yBaseline: 0,
    //   labels: [
    //     {
    //       content: 'Male decrease,\nfemale increase',
    //     },
    //     {
    //       content: 'Female decrease,\nmale increase',
    //     },
    //     {
    //       content: 'Female & male decrease',
    //     },
    //     {
    //       content: 'Female &\n male increase',
    //     },
    //   ],
    // },
  };
  return <Scatter {...config} />;
};

export default RateAtPlot
