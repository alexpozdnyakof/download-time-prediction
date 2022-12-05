import { TRAIN_DATA, TEST_DATA } from './data';

const dataTraceTrain = {
  x: TRAIN_DATA.sizeMB,
  y: TRAIN_DATA.timeSec,
  name: 'TRAIN_DATA',
  mode: 'markers',
  type: 'scatter',
  marker: {symbol: "circle", size: 8}
};
const dataTraceTest = {
  x: TEST_DATA.sizeMB,
  y: TEST_DATA.timeSec,
  name: 'TEST_DATA',
  mode: 'markers',
  type: 'scatter',
  marker: {symbol: "triangle-up", size: 10}
};

const dataTrace10Epochs = {
  x: [0, 2],
  y: [0, 0.01],
  name: 'model after N epochs',
  mode: 'lines',
  line: {color: 'azure', width: 1, dash: 'dot'},
};
const dataTrace20Epochs = {
  x: [0, 2],
  y: [0, 0.01],
  name: 'model after N epochs',
  mode: 'lines',
  line: {color: 'green', width: 2, dash: 'dash'}
};
const dataTrace100Epochs = {
  x: [0, 2],
  y: [0, 0.01],
  name: 'model after N epochs',
  mode: 'lines',
  line: {color: 'red', width: 3, dash: 'longdash'}
};
const dataTrace200Epochs = {
  x: [0, 2],
  y: [0, 0.01],
  name: 'model after N epochs',
  mode: 'lines',
  line: {color: 'cyan', width: 4, dash: 'solid'}
};

export { dataTraceTrain, dataTraceTest, dataTrace10Epochs, dataTrace20Epochs, dataTrace100Epochs, dataTrace200Epochs}