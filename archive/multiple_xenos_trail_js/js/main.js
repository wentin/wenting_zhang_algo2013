var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();

var yourQueueLine = new QueueLine(14, "#ffff00", 7);
//var myQueueLine = new QueueLine(12, "rgba(255, 255, 255, 0.4)", 10);
	
function animate() {	
	// update
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	//myQueueLine.draw();
	yourQueueLine.draw();
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();