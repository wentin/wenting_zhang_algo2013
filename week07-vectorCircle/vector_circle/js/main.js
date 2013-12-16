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
 
var maxCount = 5000; //max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];
var closestIndex = [];
 
var minRadius = 3;
var maxRadius = 50;
 
// for mouse and arrow up/down interaction
var mouseRect = 30;

var mousePressed;

x[0] = 200;
y[0] = 100;
r[0] = 50;
closestIndex[0] = 0;

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
	// create a random position
	  var width = canvas.width, height = canvas.height;
	  var newX = Math.random()*(width-2*maxRadius) + maxRadius;
	  var newY = Math.random()*(height-2*maxRadius) + maxRadius;
	  var newR = minRadius;
	 
	  // create a random position according to mouse position
	  if (mousePressed == true) {
	    newX = Math.random()*(mouseRect) + mouseX-mouseRect/2;
	    newY = Math.random()*(mouseRect) + mouseY-mouseRect/2;
	    newR = 1;
	  }
	 
	  var intersection = false;
	 
	  // find out, if new circle intersects with one of the others
	  for(var i=0; i < currentCount; i++) {

	      var a = new THREE.Vector2(newX, newY);
	      var b = new THREE.Vector2(x[i],y[i]);
	      var d = a.distanceTo(b);
	    //var d = dist(newX,newY, x[i],y[i]);
	    if (d < (newR + r[i])) {
	      intersection = true;
	      //break;
	    }
	  }
	 
	  // no intersection ... add a new circle
	  if (intersection == false) {
	    // get closest neighbour and closest possible radius
	    var newRadius = width;
	    for(var i=0; i < currentCount; i++) {
	      //var d = dist(newX,newY, x[i],y[i]);
	      var a = new THREE.Vector2(newX, newY);
	      var b = new THREE.Vector2(x[i],y[i]);
	      var d = a.distanceTo(b);

	      if (newRadius > d-r[i]) {
	        newRadius = d-r[i];
	        closestIndex[currentCount] = i;
	      }
	    }
	 
	    if (newRadius > maxRadius) newRadius = maxRadius;
	     
	    x[currentCount] = newX;
	    y[currentCount] = newY;
	    r[currentCount] = newRadius;
	    currentCount++;
	  }
	 
	  // draw them
	  for (var i=0 ; i < currentCount; i++) {
	    /*stroke(0);
	    strokeWeight(1.5);
	    ellipse(x[i],y[i], r[i]*2,r[i]*2);
	    stroke(226, 185, 0);
	    strokeWeight(0.75);
	    var n = closestIndex[i];
	    line(x[i],y[i], x[n],y[n]);*/


		context.strokeStyle= "rgb(217, 24, 40)";
		context.lineWidth = 1.5;
        context.beginPath();
		context.arc(x[i], y[i], r[i], 0, 2*Math.PI);
        context.stroke();

		context.strokeStyle= "rgb(3, 140, 140)";
		context.lineWidth = 0.75;
	    var n = closestIndex[i];
        context.beginPath();
        context.moveTo(x[i],y[i]); 
        context.lineTo(x[n],y[n]);
        context.stroke();
	  }
	 
	  // visualize the random range of the new positions
	  if (mousePressed == true) {
		context.strokeStyle= "rgb(255,200,0)";
		context.lineWidth = 2;

	    context.rect(mouseX-mouseRect/2,mouseY-mouseRect/2,mouseRect,mouseRect);
        context.stroke();
	  }
	 
	  //if (currentCount >= maxCount) noLoop();
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();

resizeCanvas();

document.onmousedown = function(e)
{
	mousePressed = true;
};


document.onmouseup = function(e)
{
	mousePressed = false;
};

document.onmousemove = function(e)
{
	mouseX = e.clientX;
	mouseY = e.clientY;
};