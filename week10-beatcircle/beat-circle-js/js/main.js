var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var mouseX;
var count = 150;
var simplex = new SimplexNoise();

// var FFTSIZE = 32;      // number of samples for the analyser node FFT, min 32
// var TICK_FREQ = 20;     // how often to run the tick function, in milliseconds
// var assetsPath = "assets/"; // Create a single item to load.
// var src = assetsPath + "05-Binrpilot-Underground.mp3";  // set up our source
// var soundInstance;      // the sound instance we create
// var analyserNode;       // the analyser node that allows us to visualize the audio
// var freqFloatData, freqByteData, timeByteData;  // arrays to retrieve data from analyserNode
// var waves = new createjs.Container();

// createjs.Sound.addEventListener("fileload", createjs.proxy(handleLoad,this)); // add an event listener for when load is completed
// createjs.Sound.registerSound(src);  // register sound, which preloads by default

window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
         animate();
}

canvas.addEventListener('mousemove', mouseMove, false);
function mouseMove(pos) {
	mouseX = pos.clientX;
	mouseY = pos.clientY;
}

canvas.addEventListener("mouseup",mouseReleased,false);
function mouseReleased() {

}
window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();



function animate() {	
	// update
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	var faderX = mouseX/canvas.width;
 
	  var angle = 2*Math.PI/count;
	  for (var i=0; i<count; i++){
	    // positions
	    var randomX = simplex.noise2D(i/10, 1)*canvas.width; 
	    var randomY = simplex.noise2D(i/30+1000, 1)*canvas.height;
	    //var randomX = Math.random()*canvas.width; 
	    //var randomY = Math.random()*canvas.height;
	    var circleX = canvas.width/2 + Math.cos(angle*i)*300;
	    var circleY = canvas.height/2 + Math.sin(angle*i)*300;
	 
	    var x = randomX + faderX*(circleX - randomX);
	    var y = randomY + faderX*(circleY - randomY);
	 
	 	context.fillStyle="rgba(0,130,164,1)";
		context.beginPath();
		context.arc(x, y, 5, 0, 2*Math.PI);
		context.fill();
	  }
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();

resizeCanvas();