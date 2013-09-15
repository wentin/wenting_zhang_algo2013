var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var myAudiotrail = new Audiotrail();

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();
	
function animate() {	
	// update
	myAudiotrail.update();
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	myAudiotrail.draw();
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();