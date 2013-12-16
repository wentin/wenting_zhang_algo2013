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


var nodeA = new Node(canvas.width/2+Math.random()*100-50, canvas.height/2+Math.random()*100-50);
var nodeB = new Node(canvas.width/2+Math.random()*100-50, canvas.height/2+Math.random()*100-50);
 
nodeA.setDamping(0.1);
nodeB.setDamping(0.1);
 
var spring = new Spring(nodeA, nodeB);
spring.setLength(100);
spring.setStiffness(0.6);
spring.setDamping(0.3);

var mousePressed;

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();
	
function animate() {	
	// update
	  if (mousePressed == true) {
	    nodeA.x = mouseX;
	    nodeA.y = mouseY;
	  }
	 
	  // update spring
	  spring.update();
	 
	  // update node positions
	  nodeA.update();
	  nodeB.update();
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	  // draw spring

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

		context.strokeStyle= "rgb(217, 24, 40)";
		context.lineWidth = 4;

        context.beginPath();
        context.moveTo(nodeA.x, nodeA.y); 
        context.lineTo(nodeB.x, nodeB.y);
        context.stroke();
	 
	  // draw nodes
		context.fillStyle= "rgb(217, 24, 40)";
        context.beginPath();
		context.arc(nodeA.x, nodeA.y, 20, 0, 2*Math.PI);
        context.fill();
        context.beginPath();
		context.arc(nodeB.x, nodeB.y, 20, 0, 2*Math.PI);
        context.fill();
	
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