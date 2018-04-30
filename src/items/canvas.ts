const createCanvas = (windowDimensions) => {
	const canvas = document.createElement('canvas');
	canvas.width = windowDimensions.width;
	canvas.height = windowDimensions.height;
	return canvas;
}
export default createCanvas;
