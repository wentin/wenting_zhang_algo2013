/*Created By Wenting Zhang 
About Javascript Random Seed function study
Javascript Math.random() don't have random seed functionality
using http://davidbau.com/encode/seedrandom-min.js makes Math.random() seedable

javascript color blend mode globalCompositeOperation
*/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

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

var tileCount = 20;
 
var colorLeft = new THREE.Color("rgb(197, 0, 123)");
var colorRight = new THREE.Color("rgb(87, 35, 129)");
 
var alphaLeft = 100;
var alphaRight = 100;
 
var actRandomSeed = 0;
var mouseX, mouseY;

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
	Math.seedrandom(actRandomSeed);
	context.globalCompositeOperation = 'lighter';
	// darker lighter multiply

	context.lineCap = 'round';
	var width = canvas.width, height = canvas.height;
	  for (var gridY=0; gridY<tileCount; gridY++) {
	    for (var gridX=0; gridX<tileCount; gridX++) {
	 
	      var posX = width/tileCount*gridX;
	      var posY = height/tileCount*gridY;
	 
	      var toggle = Math.floor(Math.random()*2);
	 	  //var toggle = Math.floor(random()*2);
	      if (toggle == 0) {

			context.strokeStyle= "rgba(217, 24, 40, 0.8)";
			context.lineWidth = mouseX/10;
	        context.beginPath();
	        context.moveTo(posX, posY); 
	        context.lineTo(posX+width/tileCount, posY+height/tileCount);
	        context.stroke();
	      }
	      if (toggle == 1) {

			context.strokeStyle= "rgba(3, 140, 140, 0.8)";
			//context.strokeStyle= "rgba("+colorRight.r+", "+colorRight.g+", "+colorRight.b+", "+alphaRight/100+")";
			context.lineWidth = mouseY/10;
	        context.beginPath();
	        context.moveTo(posX, posY+width/tileCount); 
	        context.lineTo(posX+height/tileCount, posY);
	        context.stroke();
	      }
	    }
	  }
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();
resizeCanvas();

document.onclick = function(e)
{
	actRandomSeed = Math.random()*100000;
};

document.onmousemove = function(e)
{
	mouseX = e.clientX;
	mouseY = e.clientY;
};