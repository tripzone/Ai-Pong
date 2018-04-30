import { position, train } from '../ml/mlr';
import { setPaused } from '../index';

class Ball {
	x: number;
	y: number
	xSpeed: number;
	ySpeed: number;
	radius: number;
	color: string;
	dataPoint = {
		input: [],
		output: [],
	};
	trained: boolean = false;
	constructor(x: number, y: number, xSpeed: number, ySpeed: number, radius: number, color: string = "#e4e4e4") {
		this.x = x;
		this.y = y;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.radius = radius;
		this.color = color;
	}

	render(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 2 * Math.PI, 0);
		context.fillStyle = this.color;
		context.fill();
	}

	update(player1, player2, windowDimensions, data) {
		// Check if ball is coming towards player1
		if (this.ySpeed > 0){
			// Check if first datapoint found, if not, register it
			if (this.dataPoint.input.length === 0) {
				this.dataPoint.input = [this.x, this.y];
			} else if (this.dataPoint.input.length === 2) {
				// check for second datapoint
				this.dataPoint.input = [...this.dataPoint.input, this.x, this.y];
				if (this.trained) {
					player1.x = position(this.dataPoint.input)[0] - player1.width/2;
				}
			}
		}

		this.x += this.xSpeed;
		this.y += this.ySpeed;
		var top_x = this.x - this.radius;
		var top_y = this.y - this.radius;
		var bottom_x = this.x + this.radius;
		var bottom_y = this.y + this.radius;

		if (this.x - this.radius < 0) { // hitting the left wall
			this.x = 0 + this.radius;
			this.xSpeed = -this.xSpeed;
		} else if (this.x + this.radius > windowDimensions.width) { // hitting the right wall
			this.x = windowDimensions.width - this.radius;
			this.xSpeed = -this.xSpeed;
		}

		if (this.y < 0 || this.y > windowDimensions.height) { // a point was scored
			player1.resetPosition((windowDimensions.width - player1.width) / 2);
			player2.resetPosition((windowDimensions.width - player1.width) / 2);
			if (this.y < 0) {
				player1.score = player1.score + 1;
			} else {
				player2.score = player2.score + 1;
				// This is where the paddle should have intercepted
				this.dataPoint.output = [this.x, this.y];
				console.log(this.dataPoint);
				data.push(this.dataPoint);
				setPaused(true);
				// Train regression here
				train(data);
				this.trained = true;
				this.dataPoint = {input: [], output: []};
				data = [];
				setPaused(false);
			}
			// player1.resetPosition((windowDimensions.width-player1.width)/2);
			// player2.resetPosition((windowDimensions.width-player2.width)/2);

			this.xSpeed = 0;
			//   this.ySpeed = MAX_BALL_SPEED;
			this.x = windowDimensions.width / 2;
			this.y = windowDimensions.height / 2;
		}

		if (top_y > windowDimensions.height / 2) {
			// if (top_y < (player1.y + player1.height) && bottom_y > player1.y && top_x < (player1.x + player1.width) && bottom_x > player1.x) {
			if (top_x < (bottom_y > player1.y && player1.x + player1.width) && bottom_x > player1.x) {
				// hit the player's paddle
				this.ySpeed = -this.ySpeed;
				this.xSpeed += (player1.xSpeed / 2);
				this.y += this.ySpeed;

				// This is where the paddle should have intercepted
				this.dataPoint.output = [this.x, this.y];
				console.log(this.dataPoint);
				data.push(this.dataPoint);
				this.dataPoint = {input: [], output: []};
			}
		} else {
			// if (top_y < (player2.y + player2.height) && bottom_y > player2.y && top_x < (player2.x + player2.width) && bottom_x > player2.x) {
			if (top_x < (top_y < (player2.y + player2.height) && player2.x + player2.width) && bottom_x > player2.x) {
				// hit the computer's paddle
				this.ySpeed = -this.ySpeed;
				this.xSpeed += (player2.xSpeed / 2);
				this.y += this.ySpeed;
			}
		}
	}
}

export default Ball;
