var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
}

var particles = [];
// for (var i = 0; i < 1000; i++){
// 	var myParticle = new Particle();

// 	myParticle.setInitialCondition(Math.random()*1000,Math.random()*1000,0,0);

// 	particles.push(myParticle);
// }

for (var i = 0; i < window.innerWidth / 15 ; i++){
	particles[i] = [];
	for (var j = 0; j < window.innerHeight / 15 ; j++){
		var myParticle = new Particle();

		myParticle.setInitialCondition(i*15,j*15,0,0);

		particles[i].push(myParticle);
	}
}


window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();

var mouseX, mouseY;
function animate() {	
	// update

	for(var i = 0; i < particles.length; i++) {
	    var particlRow = particles[i];
	    for(var j = 0; j < particlRow.length; j++) {
	        //display("cube[" + i + "][" + j + "] = " + cube[j]);
	        particlRow[j].resetForce();
		
		
			//particles[i].addAttractionForce(mouseX, mouseY, 1000, 0.1);
			particlRow[j].addRepulsionForce(mouseX, mouseY, 100, 0.1);
			
			
			// particles[i].addCounterClockwiseForce(mouseX, mouseY, 1000, 0.1);
			// particles[i].addClockwiseForce(mouseX, mouseY, 200, 1);
			
			//particles[i].addForce(0,0.04);  // gravity
			particlRow[j].addDampingForce();
			particlRow[j].update();
	    }
	}
	/*for (var i = 0; i < particles.length; i++){
		particles[i].resetForce();
		
		
		//particles[i].addAttractionForce(mouseX, mouseY, 1000, 0.1);
		particles[i].addRepulsionForce(mouseX, mouseY, 100, 0.1);
		
		
		// particles[i].addCounterClockwiseForce(mouseX, mouseY, 1000, 0.1);
		// particles[i].addClockwiseForce(mouseX, mouseY, 200, 1);
		
		//particles[i].addForce(0,0.04);  // gravity
		particles[i].addDampingForce();
		particles[i].update();
	}*/
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	//ofSetColor(0x000000);

	context.fillStyle="yellow";
	context.strokeStyle="cyan";
	context.lineWidth=0.5;

	for(var i = 0; i < particles.length-1; i++) {
	    var particlRow = particles[i];
	    for(var j = 0; j < particlRow.length-1; j++) {
	        context.beginPath();
	        context.moveTo(particles[i][j].pos.x, particles[i][j].pos.y);
	        context.lineTo(particles[i][j+1].pos.x, particles[i][j+1].pos.y);
	        context.moveTo(particles[i][j].pos.x, particles[i][j].pos.y);
	        context.lineTo(particles[i+1][j].pos.x, particles[i+1][j].pos.y);
	        context.stroke();
	        //particles[i][j].draw();
	    }
	}
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();

resizeCanvas();

document.onmousemove = function(e)
{
	mouseX = e.clientX;
	mouseY = e.clientY;
};