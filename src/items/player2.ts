import Paddle from './paddle';

class Player2 extends Paddle {
	score: number;
	error: number;
	constructor(x, y, width, height, color = "#262626", error = 10) {
		super(x, y, width, height, color);
		this.score = 0;
		this.error = error;
	}

	update(ball, windowDimensions) {
		let diff = -((this.x + (this.width / 2)) - ball.x);
		if (diff < 0 && diff < -this.maxSpeed) {
			diff = -this.maxSpeed;
		} else if (diff > 0 && diff > this.maxSpeed) { // max speed right
			diff = this.maxSpeed;
		}
		super.move(diff + Math.random() * this.error, 0, windowDimensions.width);
		if (this.x < 0) {
			this.x = 0;
		} else if (this.x + this.width > windowDimensions.width) {
			this.x = windowDimensions.width - this.width;
		}
	}
	render(context) {
		super.render(context);
	}
}

export default Player2;
