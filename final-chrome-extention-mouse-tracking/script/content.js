/****global function *************/
function distance(one,two){
    var a, b
    if(one[0] > one[1]){
        a = one[1] - one[0]
    }else{
        a = one[0] - one[1]
    }
    if(two[0] > two[1]){
        b = two[1] - two[0]
    }else{
        b = two[0] - two[1]
    }

    var c = a^2 + b^2;
    return Math.sqrt(c);
}

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();

function startAnimation(){
	$( "body" ).append( '<canvas id="myCanvas" />' );
	var canvas=document.getElementById("myCanvas");
	var context=canvas.getContext("2d");
	window.addEventListener('resize', resizeCanvas, false);

	function Point(x,y){
		this.x=x;
		this.y=y;
	}

	function QueueLine(n, color, radius) {
		this.n = n;
		this.color = color;
		this.radius = radius;
		this.position = [];
		for (var i = 0; i < n; i++)
			this.position.push(new Point(0, 0));
			
		this.positionB = [];
		for (var i = 0; i < n; i++)
			this.positionB.push(new Point(0, 0));
		//http://stackoverflow.com/questions/1338599/addeventlistener-this
	}

	QueueLine.prototype.draw = function(x, y){
		this.positionB[0].x = x;
		this.positionB[0].y = y;		

		context.fillStyle=this.color;
		context.arc(this.position[0].x + 0.5*(this.positionB[0].x - this.position[0].x), this.position[0].y + 0.5*(this.positionB[0].y - this.position[0].y),this.radius,0,2*Math.PI);
		this.position[0].x = this.position[0].x + 0.5*(this.positionB[0].x - this.position[0].x);
		this.position[0].y = this.position[0].y + 0.5*(this.positionB[0].y - this.position[0].y);
		for (var i = 1; i < this.n; i++) {
			this.positionB[i].x = this.position[i-1].x;
			this.positionB[i].y = this.position[i-1].y;
			context.beginPath();
			context.arc(this.position[i].x + 0.5*(this.positionB[i].x - this.position[i].x), this.position[i].y + 0.5*(this.positionB[i].y - this.position[i].y),this.radius-0.4*i,0,2*Math.PI);
			this.position[i].x = this.position[i].x + 0.5*(this.positionB[i].x - this.position[i].x);
			this.position[i].y = this.position[i].y + 0.5*(this.positionB[i].y - this.position[i].y);
			context.fill();
		}
	};

	function Particle() {
		//ctor

		this.pos = new THREE.Vector2(0,0);
	    this.vel = new THREE.Vector2(0,0);
	    this.frc = new THREE.Vector2(0,0);
		
		this.setInitialCondition(0,0,0,0);
		this.damping = 0.2;

		//add event listener
		var self = this;
		window.addEventListener('mousemove',  function(pos) { 
			self.mouseMove(self, pos) 
		}, false);
	}

	Particle.prototype.resetForce = function(){
		this.frc.set(0,0);
	}

	Particle.prototype.addForce = function(x, y){
		this.frc.set(this.frc.x + x, this.frc.y + y);
	}

	Particle.prototype.addDampingForce = function(){
		this.frc.set(this.frc.x - this.vel.x * this.damping, this.frc.y - this.vel.y * this.damping);
	}

	Particle.prototype.addRepulsionForce = function(px, py, radius, strength){
		// var posOfForce = new THREE.Vector2(px, py);
		
		// var diff = new THREE.Vector2();
		// diff.subVectors(this.pos - posOfForce)
		
		var diff = new THREE.Vector2(this.pos.x - px, this.pos.y - py);
		if (diff.length() < radius){
			var pct = 1 - (diff.length() / radius);
			diff.normalize();
			this.frc.x += diff.x * pct * strength;
			this.frc.y += diff.y * pct * strength;
		}
	}

	Particle.prototype.addAttractionForce = function(px, py, radius, strength){
		// var posOfForce = new THREE.Vector2(px, py);
		
		// var diff = new THREE.Vector2();
		// diff.subVectors(this.pos - posOfForce)
		
		var diff = new THREE.Vector2(this.pos.x - px, this.pos.y - py);
		if (diff.length() < radius){
			var pct = 1 - (diff.length() / radius);
			diff.normalize();
			this.frc.x -= diff.x * pct * strength;
			this.frc.y -= diff.y * pct * strength;
		}
	}

	Particle.prototype.addClockwiseForce = function(px, py, radius, strength){
		//var posOfForce = new THREE.Vector2(px, py);
		
		var diff = new THREE.Vector2(this.pos.x - px, this.pos.y - py);
		//diff.subVectors(this.pos - posOfForce)
		
		if (diff.length() < radius){
			var pct = 1 - (diff.length() / radius);
			diff.normalize();
			this.frc.x -= diff.x * pct * strength;
			this.frc.y += diff.y * pct * strength;
		}
	}

	Particle.prototype.addCounterClockwiseForce = function(px, py, radius, strength){
		// var posOfForce = new THREE.Vector2(px, py);
		
		// var diff = new THREE.Vector2();
		// diff.subVectors(this.pos - posOfForce)
		
		var diff = new THREE.Vector2(this.pos.x - px, this.pos.y - py);
		if (diff.length() < radius){
			var pct = 1 - (diff.length() / radius);
			diff.normalize();
			this.frc.x += diff.x * pct * strength;
			this.frc.y -= diff.y * pct * strength;
		}
	}

	Particle.prototype.setInitialCondition = function(px, py, vx, vy){
	    this.pos.set(px,py);
		this.vel.set(vx,vy);
	}

	Particle.prototype.update = function(){
		this.vel.addVectors(this.vel, this.frc);
		this.pos.addVectors(this.pos, this.vel);
	};

	Particle.prototype.draw = function(){
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, 1, 0, 2*Math.PI);

		context.fill();
	};

	Particle.prototype.mouseMove = function(self, pos){
		//self.positionB[0].x = pos.clientX;
		//self.positionB[0].y = pos.clientY;		
	};

	var yourQueueLine = new QueueLine(14, "#d91828", 7);
	var particles = [];
	var mouseX, mouseY;
	for (var i = 0; i < window.innerWidth / 15 ; i++){
		particles[i] = [];
		for (var j = 0; j < window.innerHeight / 15 ; j++){
			var myParticle = new Particle();

			myParticle.setInitialCondition(i*15,j*15,0,0);

			particles[i].push(myParticle);
		}
	}

	function resizeCanvas() {
	    canvas.width = $( window ).width();
	    canvas.height = $( window ).height();
	    /**
	     * Your drawings need to be inside this function otherwise they will be reset when 
	     * you resize the browser window and the canvas goes will be cleared.
	     */
	     animate();
	}	
	resizeCanvas();
	function getPositionForTime(time){

		if (bIsRecording == true){
			return new THREE.Vector3(0,0,0);
		} else if (mouseMovePointList.length < 2){
			return new THREE.Vector3(0,0,0);
		}
		



	 	while (time > mouseMovePointList[mouseMovePointList.length-1].t){
	        time -= mouseMovePointList[mouseMovePointList.length-1].t;
	    }

	    if(time < mouseMovePointList[5].t) {
			for(var i = 0; i < particles.length-1; i++) {
			    var particlRow = particles[i];
			    for(var j = 0; j < particlRow.length-1; j++) {
					particles[i][j].pos.set(i*15,j*15);
			    }
			}
		}

		var pos = new THREE.Vector3();
		
		for (var i = 0; i < mouseMovePointList.length-1; i++){

	   //      if(i = 0) {
	   //      	//reset the particle field every time the animiaiton start from the beginning
	   //      	for (var i = 0; i < window.innerWidth / 10 ; i++){
				// 	for (var j = 0; j < window.innerHeight / 10 ; j++){
				// 		particles[i + j*Math.floor(window.innerWidth / 10)].pos.set(i*15 - window.innerWidth/4 ,j*15 - window.innerHeight/4);
				// 	}
				// }
	   //      }

			if (time >= mouseMovePointList[i].t && time < mouseMovePointList[i+1].t){
				
				var part = time - mouseMovePointList[i].t;
				var whole = mouseMovePointList[i+1].t - mouseMovePointList[i].t;
				var pct = part / whole;
				
				pos.x = (1-pct) * mouseMovePointList[i].x + (pct) * mouseMovePointList[i+1].x;
				pos.y = (1-pct) * mouseMovePointList[i].y + (pct) * mouseMovePointList[i+1].y;
			}
		}
		
	    // return our point which represents a position interpolated between two other points
		return pos;
	}

	function getClickPositionForTime(time, oldTime){
		if (bIsRecording == true){
			return new THREE.Vector3(0,0,0);
		}
		
	 	while (time > mouseMovePointList[mouseMovePointList.length-1].t){
	                time -= mouseMovePointList[mouseMovePointList.length-1].t;
	                oldTime -= mouseMovePointList[mouseMovePointList.length-1].t;
	    }

	    //console.log(mouseMovePointList[mouseMovePointList.length-1].t);

		//console.log(time + ' ' + oldTime);
		//console.log(mouseClickPointList);

		var pos = new THREE.Vector3();
		
		for (var i = 0; i < mouseClickPointList.length-1; i++){
			if (time >= mouseMovePointList[i].t && oldTime < mouseMovePointList[i].t){
				// pos.x = mouseClickPointList[i].x;
				// pos.y = mouseClickPointList[i].y;
				// console.log('yeah ' + i);
				return i;
			} 
		}
		return false;
	    // return our point which represents a position interpolated between two other points
		//return pos;
	}

	function animate() {	
		// update
		for(var i = 0; i < particles.length; i++) {
		    var particlRow = particles[i];
		    for(var j = 0; j < particlRow.length; j++) {
		        //display("cube[" + i + "][" + j + "] = " + cube[j]);
		        particlRow[j].resetForce();
			
			
				//particles[i].addAttractionForce(mouseX, mouseY, 1000, 0.1);
				particlRow[j].addRepulsionForce(mouseX, mouseY, 300, 0.3);
				
				
				// particles[i].addCounterClockwiseForce(mouseX, mouseY, 1000, 0.1);
				// particles[i].addClockwiseForce(mouseX, mouseY, 200, 1);
				
				//particles[i].addForce(0,0.04);  // gravity
				particlRow[j].addDampingForce();
				particlRow[j].update();
		    }
		}
		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		// draw stuff
		// -------------------------- draw the line
		//context.fillStyle="yellow";
		context.strokeStyle="#038c8c";
		context.lineWidth=1;

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
		// if(clock.getElapsedTime() - playbackStartTime <= mouseMovePointList[mouseMovePointList.length-1].t){
			// for (var i = 0; i < particles.length; i++){
			// 	particles[i].draw();
			// }
		// }

		context.strokeStyle="#d91828";

		context.lineWidth=1;
		// if(mouseMovePointList.length > 1&&drawFirstTime){
		// 	context.beginPath();
		// 	for (var i = 0; i < mouseMovePointList.length; i++){
		// 		context.lineTo(mouseMovePointList[i].x, mouseMovePointList[i].y);
		// 	}
		// 	context.stroke();
		// }

		// if(mouseMovePointList.length > 2){
		// 	context.beginPath();
		// 	for (var i = 1; i < mouseMovePointList.length; i++){
		// 		context.lineTo(mouseMovePointList[i].x, mouseMovePointList[i].y);
		// 	}		
		// 	context.stroke();
		// }

	    // context.fillStyle="red";
		// if(mouseClickPointList.length > 0){
		// 	for (var i = 1; i < mouseClickPointList.length; i++){
		// 		context.beginPath();
		// 		context.arc(mouseClickPointList[i].x, mouseClickPointList[i].y,14,0,2*Math.PI);
		// 		context.fill();
		// 	}		
		// }

		// -------------------------- draw the point at the current time
		var pos = new THREE.Vector3();
		pos = getPositionForTime(clock.getElapsedTime() - playbackStartTime);
		
		context.fillStyle="#d91828";
		//context.fillStyle="#ffffff";
		context.beginPath();
		context.arc(pos.x,pos.y,10,0,2*Math.PI);
		context.fill();	


		mouseX = pos.x;
		mouseY = pos.y;
		yourQueueLine.draw(pos.x,pos.y);

		// time = clock.getElapsedTime() - playbackStartTime;
		// newClickNum = getClickPositionForTime(time, oldTime);
		// oldTime = time;
		// console.log(clickStatus);
		// if(newClickNum){
		// 	clickStatus += 1;
		// }

		// context.fillStyle="blue";
		// for (var i = 0; i < clickStatus; i++){
		// 	context.beginPath();
		// 	context.arc(mouseClickPointList[i].x,mouseClickPointList[i].y,13,0,2*Math.PI);
		// 	context.fill();	 
		// }
		// request new frame
		requestAnimFrame(function() {
		  animate();
		});
	}

	animate();
}
function TimePoint() {
	//ctor
	this.x = 0;
	this.y = 0;
	this.t = 0;
}

/****global function end*************/
var clock = new THREE.Clock(true);

var startTime = 0,
	playbackStartTime = 0,
	bIsRecording = false;

var time, oldTime, clickStatus = 0;

var drawFirstTime = false;
var newThread = false;

var travelLength;

$( "body" ).append( '<div class = "defaultBtn"></a>' );
$('#startBtn').click(function(){
	if(!$(this).hasClass('stop')){
		bIsRecording = true;
		startTime = clock.getElapsedTime();
		$(this).text('stop').addClass('stop');
	} else {
		$(this).text('start').removeClass('stop');
		bIsRecording = false;
		playbackStartTime = clock.getElapsedTime();
		startDrag = false;
		drawFirstTime = false;

		$( "body" ).append( '<div id = "travelLength">'+ travelLength +'</div>' );
		startAnimation();
	}
})
$('.defaultBtn').live('click', function(){
	bIsRecording = true;
	startTime = clock.getElapsedTime();
	$(this).removeClass('defaultBtn').addClass('recordBtn');
	$( "body" ).append( '<div id = "travelLength">'+ travelLength +'</div>' );
})
$('.recordBtn').live('click', function(){
	$(this).removeClass('recordBtn').addClass('playBtn');
	bIsRecording = false;
	playbackStartTime = clock.getElapsedTime();
	startDrag = false;
	drawFirstTime = false;

	var travelLength = 0;
	for (var i = 1; i < mouseMovePointList.length-1; i++){
		var a = new THREE.Vector2( mouseMovePointList[i-1].x, mouseMovePointList[i-1].y );
		var b = new THREE.Vector2( mouseMovePointList[i].x, mouseMovePointList[i].y );

		var d = a.distanceTo( b );
		travelLength += d;
	}

	startAnimation();
})
$('.playBtn').live('click', function(){
	bIsRecording = true;
	startTime = clock.getElapsedTime();
	$(this).removeClass('playBtn').addClass('recordBtn');
})
var mouseClickPointList = [];
document.onclick = function(e)
{
	if(bIsRecording){
		var tempPoint = new TimePoint();
		tempPoint.x = e.clientX;
		tempPoint.y = e.clientY;
		tempPoint.t = clock.getElapsedTime() - startTime;
		mouseClickPointList.push(tempPoint);
		mouseMovePointList.push(tempPoint);
	}
};
var mouseMovePointList = [];
document.onmousemove = function(e)
{
	if(bIsRecording){
		var tempPoint = new TimePoint();
		tempPoint.x = e.clientX;
		tempPoint.y = e.clientY;
		tempPoint.t = clock.getElapsedTime() - startTime;
		mouseMovePointList.push(tempPoint);

		travelLength = 0;
		for (var i = 1; i < mouseMovePointList.length-1; i++){
			var a = new THREE.Vector2( mouseMovePointList[i-1].x, mouseMovePointList[i-1].y );
			var b = new THREE.Vector2( mouseMovePointList[i].x, mouseMovePointList[i].y );

			var d = a.distanceTo( b );
			travelLength += d;
		}
		$('#travelLength').text(Math.floor(travelLength));
	}

		
};


//debugger;