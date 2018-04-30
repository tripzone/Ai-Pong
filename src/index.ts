import Ball from './items/ball';
import createCanvas from './items/canvas';
import Player1 from './items/player1';
import Player2 from './items/player2';

let paused = false;

const getColor = () => {
	const date = new Date();
	// if (date.getHours() < 9 || date.getHours() > 17) {
	// 	return "#2F2F25";
	// }
	// return "#F2F2F2";
	return '#2F2F25';
}

const setPaused = (pauseStatus: boolean) => {
	paused = pauseStatus;
};

// Array to hold training data
let data = [];

const waitForId = (id: string) => new Promise((resolve, reject) => {
	setTimeout(() => {
		const button = document.getElementById(id);
		if (button) {
			resolve(button);
		}
	}, 1000)
})

waitForId('pause-button').then((button: HTMLElement) => {
	button.addEventListener('click', () => {
		paused = !paused;
	})
});

waitForId('log-data').then((button: HTMLElement) => {
	button.addEventListener('click', () => {
		console.log(data);
	});
});

const BACKGROUND_COLOR: string = "#FFFFFF";
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BORDER = 30;

const animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	function (callback) { window.setTimeout(callback, 1000 / 60) };

var keysDown = {};

window.addEventListener("keydown", function (event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
	delete keysDown[event.keyCode];
});

const windowDimensions = {
	width: window.innerWidth - BORDER,
	height: window.innerHeight - BORDER,
};


const canvas = createCanvas(windowDimensions);

canvas.width = windowDimensions.width;
canvas.height = windowDimensions.height;

const context = canvas.getContext('2d');

window.onload = function () {
	document.body.appendChild(canvas);
	animate(step);
};

const step = function () {
	if (!paused) {
		update();
		render();
	}
	animate(step);
};

const update = function () {
	player.update(keysDown, windowDimensions);
	computer.update(ball, windowDimensions);
	ball.update(player, computer, windowDimensions, data);
};

var player = new Player1((windowDimensions.width - PADDLE_WIDTH) / 2, windowDimensions.height - BORDER, PADDLE_WIDTH, PADDLE_HEIGHT, getColor());
var computer = new Player2((windowDimensions.width - PADDLE_WIDTH) / 2, 0 + BORDER, PADDLE_WIDTH, PADDLE_HEIGHT, getColor());
var ball = new Ball(windowDimensions.width / 2, windowDimensions.height / 2, 0, 20, 5, getColor());

var render = function () {
	context.fillStyle = BACKGROUND_COLOR;
	context.fillRect(0, 0, windowDimensions.width, windowDimensions.height);
	player.render(context);
	computer.render(context);
	ball.render(context);
	context.font = "30px Arial";
	context.fillText(String(computer.score), 0, BORDER);
	context.fillText(String(player.score), 0, windowDimensions.height - BORDER);
};

export { setPaused };
