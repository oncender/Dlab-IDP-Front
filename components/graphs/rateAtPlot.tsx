import { Scatter } from '@ant-design/plots';

const RateAtPlot = ({data}: {data:any}) => {

  const config = {
    appendPadding: 30,
    data,
    xField: 'change in female rate',
    yField: 'change in male rate',
    sizeField: 'pop',
    colorField: 'continent',
    color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
    size: [4, 30],
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#bbb',
    },
    xAxis: {
      min: -25,
      max: 5,
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
    },
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
      labels: [
        {
          content: 'Male decrease,\nfemale increase',
        },
        {
          content: 'Female decrease,\nmale increase',
        },
        {
          content: 'Female & male decrease',
        },
        {
          content: 'Female &\n male increase',
        },
      ],
    },
  };
  console.log("chart1 rateAtPlot ",config)
  return <Scatter {...config} />;
};

export default RateAtPlot
