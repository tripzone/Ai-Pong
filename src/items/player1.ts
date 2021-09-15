import Paddle from './paddle';

class Player1 extends Paddle {
	score: number;
	color: string;
	constructor(x, y, width, height, color = "#262626") {
		super(x, y, width, height, color);
		this.score = 0;
	}

	setX(xValue) {
		this.x = xValue;
	}

	update(keysDown, windowDimensions) {
		for (var key in keysDown) {
			var value = Number(key);
			if (value == 37) {
				// left arrow
				super.move(-this.maxSpeed, 0, windowDimensions.width);
			} else if (value == 39) {
				 // right arrow pressed
				super.move(this.maxSpeed, 0, windowDimensions.width);
			} else {
				super.move(0, 0, windowDimensions.width);
			}
		}
		if (Object.keys(keysDown).length === 0) {
			// No keys pressed
			super.move(0, 0, windowDimensions.width);
		}
	}
	render(context) {
		super.render(context);
	}
}

export default Player1;
