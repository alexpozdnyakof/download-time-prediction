import Plotly from 'plotly.js-dist-min';

type ChartSetupOptions = {
  width: number,
  title: string,
  xAxisTitle: string,
  yAxisTitle: string
}
type Point = {
  x: [number, number]
  y: [number, number]
}

type Trace = {
  name: string,
  mode: string,
  type: string,
  marker: {
    symbol: string,
    size: number
  }
} & Point


export function LineChart(nestElementId: string){

  return ({
    setup(data: Array<{[key: string]: any}>, {width, title, xAxisTitle, yAxisTitle}: ChartSetupOptions){
      Plotly.newPlot(nestElementId, data, {
        width,
        title,
        xaxis: {
          title: xAxisTitle
        },
        yaxis: {
          title: yAxisTitle
        },
        font: {
          color: '#fafafa'
        },
        plot_bgcolor: '#242424',
        paper_bgcolor: '#242424'
      })
    },
    update(dataTrace: Trace, k: number, b: number, N: number, traceIndex: number){
      dataTrace.x = [0, 10]
      dataTrace.y = [b, b + (k*10)],

      Plotly.restyle(nestElementId, {
        x: [dataTrace.x],
        y: [dataTrace.y],
        name: `model after ${N} epochs`
      }, traceIndex)
    }
  })
}