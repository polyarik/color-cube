var ww, wh;
var canvas, ctx;

var color = {
	"r": 127,
	"g": 127,
	"b": 127
};

var darkening = [0, 15, -6]; // top, left, right; in %

var interval;
var mode = "stop";

var switched = false;


function main() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	resize();

	$(window).resize(function() {
		resize();
	});
	
	clickEvents();
}

function resize() {
	ww = $(window).width();
	wh = $(window).height();

	var wrapperWidth = +$("#canvas-wrapper").css("width").replace("px", "");
	var wrapperHeight = +$("#canvas-wrapper").css("height").replace("px", "");

	canvas.width = Math.min(wrapperWidth, wrapperHeight);
	canvas.height = Math.min(wrapperWidth, wrapperHeight);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
}

function clickEvents() {
	$(".button").click(function() {
		clearInterval(interval);
		mode = "stop";

		const component = this.id[0];
		const action = +this.id.substring(1);

		color[component] += action;

		if (color[component] > 255) color[component] = 255;
		if (color[component] < 0) color[component] = 0;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);

		updateColorInfo(component);
	});

	$("#mode-algorithm").click(function() {
		clearInterval(interval);

		if (mode != "algorithm") {
			mode = "algorithm";

			const components = ["b", "g", "r"];
			let coeffs = [1, 1, 1];
			let component = 0;

			let step = 10;
			let delay = 5;

			interval = window.setInterval(function() {
				const curComp = components[component];
				color[curComp] += step * coeffs[component];

				if (color[curComp] > 255 || color[curComp] < 0) {
					coeffs[component] *= -1;
					component = (component == 2) ? 0 : (component + 1);

					color[curComp] = color[curComp] > 0 ? 255 : 0;
				} else
					component = 0;
				
				if (!switched)
					updateColorInfo(component);

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
			}, delay);
		} else
			mode = "stop";
	});

	$("#mode-random").click(function() {
		clearInterval(interval);

		if (mode != "random") {
			mode = "random";

			let delay = 300;

			interval = window.setInterval(function() {
				for (let component in color) {
					color[component] = getRandomInt(0, 255);
				}
				
				if (!switched)
					updateColorInfo();

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawCube(canvas.width/2, canvas.height, canvas.width/2, canvas.height/2, canvas.height/2, color);
			}, delay);
		} else
			mode = "stop";
	});

	$("#switch").click(function() {
		if (switched)
			updateColorInfo();

		switched = !switched;
	});

	$("#menu-colors-icon").click(function() {
		updateColorInfo();

		switched = false;
		$("#menu-checkbox").prop("checked", switched);
	});

	$("#menu-flashing-icon").click(function() {
		switched = true;
		$("#menu-checkbox").prop("checked", switched);
	});
}

function updateColorInfo(component) {
	if (component == "r" || !component) {
		$("#color-red").css("background-color", `rgb(${color["r"]}, 0, 0)`);
		$("#color-red").text(color["r"]);
	}
	
	if (component == "g" || !component) {
		$("#color-green").css("background-color", `rgb(0, ${color["g"]}, 0)`);
		$("#color-green").text(color["g"]);
	}
	
	if (component == "b" || !component) {
		$("#color-blue").css("background-color", `rgb(0, 0, ${color["b"]})`);
		$("#color-blue").text(color["b"]);
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}