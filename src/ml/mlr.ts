var smr = require('smr')
var regression = new smr.Regression({ numX: 4, numY: 1 })


const train = (data) => {
	data.forEach((item)=> regression.push({x:item.input, y:[item.output[0]]} ));
	console.log('successfully trained');
} 

const position = (data) => {
	return regression.hypothesize({ x: data })

}

export{train, position,};
