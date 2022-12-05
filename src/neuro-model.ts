import {
  layers, nextFrame, sequential, tensor1d,
  tensor2d, train
} from '@tensorflow/tfjs'
import {
  dataTrace100Epochs,
  dataTrace10Epochs,
  dataTrace200Epochs,
  dataTrace20Epochs
} from './chart-data'
import {
  TRAIN_DATA
} from './data'


const trainTensors= {
  sizeMb: tensor2d(TRAIN_DATA.sizeMB, [20, 1]),
  timeSec: tensor2d(TRAIN_DATA.timeSec, [20, 1]),
}

const model = sequential()
model.add(layers.dense({
  inputShape: [1],
  units: 1}))

/**
 * SGD - stochaistic gradient descent
 */
const optimizer = train.sgd(0.0005);
model.compile({optimizer, loss: 'meanAbsoluteError'});
let k = 0;
let b = 0;

model.setWeights([
  tensor2d([k], [1, 1]),
  tensor1d([b])
]);


async function InitModel(updateCallback: any, completeCallback:any){

  await model.fit(trainTensors.sizeMb, trainTensors.timeSec, {
    epochs: 200,
    callbacks: {
      async onEpochEnd(epoch: number, logs: any){
        console.log({logs})
        k = model.getWeights()[0].dataSync()[0]
        b = model.getWeights()[1].dataSync()[0]
          switch(epoch){
            case 9: {
              console.log('wrote model 10');
              updateCallback(dataTrace10Epochs, k, b, 10, 2)
              break
            }
            case 19: {
              console.log('wrote model 20');
              updateCallback(dataTrace20Epochs, k, b, 20, 3)
              break
            }
            case 99: {
              console.log('wrote model 100');
              updateCallback(dataTrace100Epochs, k, b, 100, 4)
              break
            }
            case 199: {
              console.log('wrote model 200');
              updateCallback(dataTrace200Epochs, k, b, 200, 5)
              completeCallback()
              break
            }
          }
          await nextFrame()

      }
    }

  })
}

export { model, InitModel }

