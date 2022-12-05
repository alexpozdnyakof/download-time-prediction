import './style.css'
import {InitModel, model} from  './neuro-model'
import { LineChart } from './chart'
import {
  dataTraceTrain,
  dataTraceTest,
  dataTrace10Epochs,
  dataTrace20Epochs,
  dataTrace100Epochs,
  dataTrace200Epochs
} from './chart-data'
import { Tensor, tensor2d } from '@tensorflow/tfjs'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="chart"></div>
  <div id="messages"></div>
  <div id="prediction"></div>
  </div>
`


function trainingComplete(){
    setupCompleteMessage()
    setupTimePrediction()
}

const chart = LineChart('chart')
chart.setup([dataTraceTrain, dataTraceTest, dataTrace10Epochs, dataTrace20Epochs, dataTrace100Epochs, dataTrace200Epochs], {
  width: 700,
  title: 'Model fit result',
  xAxisTitle: 'size (MB)',
  yAxisTitle: 'time (sec)'
})

;(async () => await InitModel(chart.update, trainingComplete))()

function setupCompleteMessage(){
  const html = '<div class="message_complete">Training complete, you can try to predict time</div>'
  document.querySelector<HTMLDivElement>('#messages')!.innerHTML = html
}

function setupTimePrediction(){
  const form = `
    <form id="form-prediction">
      <div>
        <label for="sizeMb">File size(MB):</label>
        <input type="text" value="0" id="sizeMb"/>
      </div>
    </form>
    <p>(!) see result in browser console</p>
  `
  document.querySelector<HTMLDivElement>('#prediction')!.innerHTML = form
  const input = document.querySelector('#sizeMb') as HTMLInputElement

  document.querySelector('#form-prediction')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const result = predictTime([Number(input.value)])
    result.print()
  })
}

function predictTime(value: [number]){
  const predict = model.predict(tensor2d([value])) as Tensor
  return predict
}

