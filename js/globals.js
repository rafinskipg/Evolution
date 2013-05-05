//GLOBALS
// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 500;
document.getElementById('game').appendChild(canvas);
//Canvas for chart
var canvasChart = document.createElement("canvas");
var contextChart = canvasChart.getContext("2d");
canvasChart.width = 300;
canvasChart.height = 300;
document.getElementById('chart').appendChild(canvasChart);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/bg.png";

//Quad tree
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);

var positions = [];

var then;


//CREATURE OPTIONS
var startingHeight = 4;
var startingWidth = 4;

//Chart options
//See more at http://www.chartjs.org/docs/
var data = [
	{
		value: 0,
		color:"black"
	}		
]
var chart = new Chart(contextChart).Pie(data,{animation:false});