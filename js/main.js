var canvas, ctx;
var canvasWrapper;

var menuCheckbox;

var color = {
	"r": 127,
	"g": 127,
	"b": 127
};

var colorInfo;

var darkening = [0, 15, -6]; // top, left, right; in %

var interval;
var mode = "stop";


function init() {
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");

	canvasWrapper = document.querySelector("#canvas-wrapper");
	menuCheckbox = document.querySelector("#menu-checkbox");

	colorInfo = {
		"r": document.querySelector("#color-red"),
		"g": document.querySelector("#color-green"),
		"b": document.querySelector("#color-blue")
	};

	resize();
	clickEvents();
}

function resize() {
	const size = Math.min(canvasWrapper.clientWidth, canvasWrapper.clientHeight);
	const scale = window.devicePixelRatio;

	canvas.style.width = size + "px";
	canvas.style.height = size + "px";

	canvas.width = Math.floor(size * scale);
	canvas.height = Math.floor(size * scale);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
}

function changeColor(component, change) {
	clearInterval(interval);
	mode = "stop";

	color[component] += change;

	if (color[component] > 255) color[component] = 255;
	if (color[component] < 0) color[component] = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);

	updateColorInfo(component);
}

function runColorChangingRandom(delay = 300) {
	clearInterval(interval);

	if (mode != "random") {
		mode = "random";

		interval = window.setInterval(function() {
			for (let component in color) {
				color[component] = getRandomInt(0, 255);
			}
			
			if (!menuCheckbox.checked)
				updateColorInfo();

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
		}, delay);
	} else
		mode = "stop";
}

function runColorChangingAlgorithm(step = 10, delay = 5) {
	clearInterval(interval);

	if (mode != "algorithm") {
		mode = "algorithm";

		const components = ["b", "g", "r"];
		let coeffs = [1, 1, 1];
		let component = 0;

		interval = window.setInterval(function() {
			const curComp = components[component];
			color[curComp] += step * coeffs[component];

			if (color[curComp] > 255 || color[curComp] < 0) {
				coeffs[component] *= -1;
				component = (component == 2) ? 0 : (component + 1);

				color[curComp] = color[curComp] > 0 ? 255 : 0;
			} else
				component = 0;
			
			if (!menuCheckbox.checked)
				updateColorInfo(component);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
		}, delay);
	} else
		mode = "stop";
}

function clickEvents() {
	document.querySelector("#menu-colors-icon").onclick = () => {
		updateColorInfo();
		menuCheckbox.checked = false;
	};

	document.querySelector("#menu-flashing-icon").onclick = () => {
		menuCheckbox.checked = true;
	};
}

function updateColorInfo(component) {
	if (component == "r" || !component) {
		colorInfo["r"].style.backgroundColor = `rgb(${color["r"]}, 0, 0)`;
		colorInfo["r"].innerText = color["r"];
	}
	
	if (component == "g" || !component) {
		colorInfo["g"].style.backgroundColor = `rgb(0, ${color["g"]}, 0)`;
		colorInfo["g"].innerText = color["g"];
	}
	
	if (component == "b" || !component) {
		colorInfo["b"].style.backgroundColor = `rgb(0, 0, ${color["b"]})`;
		colorInfo["b"].innerText = color["b"];
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}