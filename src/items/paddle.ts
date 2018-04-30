class Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	xSpeed: number;
	ySpeed: number;
	color: string;
	maxSpeed: number
	constructor(x, y, width, height, color = "#fafafa", maxSpeed = 10) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.color = color;
		this.maxSpeed = maxSpeed;
	}

	render(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	move(x, y, windowDimensions) {
		this.x += x;
		this.y += y;
		this.xSpeed = x;
		this.ySpeed = y;
		if (this.x < 0) { // all the way to the left
			this.x = 0;
			this.xSpeed = 0;
		} else if (this.x + this.width > windowDimensions.width) { // all the way to the right
			this.x = windowDimensions.width - this.width;
			this.xSpeed = 0;
		}
	}

	resetPosition(x: number, y: number = this.y) {
		this.x = x;
		this.y = y;
	}
}

export default Paddle;
