import * as synaptic from 'synaptic';

const { Layer, Network, Trainer } = synaptic;

const inputLayer = new Layer(10);
const hiddenLayer = new Layer(100);
const outputLayer = new Layer(10);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const neuralNet = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

const trainer = new Trainer(neuralNet);
const train = (trainingSet) => {
	trainer.train(trainingSet, {
		rate: .1,
		iterations: 2000,
		error: .1,
		shuffle: true,
		log: 1,
		cost: Trainer.cost.CROSS_ENTROPY
	});
}

export {
	train,
	neuralNet,
};
