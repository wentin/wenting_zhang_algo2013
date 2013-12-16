var canvas=document.getElementById("myCanvas");
var context=canvas.getContext("2d");

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
/****global function end*************/

var clock = new THREE.Clock(true);

context.fillStyle="#ccc";
context.fillRect(0,0,canvas.width,canvas.height);

var pointList = new Array(),
	startTime = 0,
	playbackStartTime = 0,
	bIsRecording = false,
	circleList = new Array();

function getPositionForTime(time){

	if (bIsRecording == true){
		return new THREE.Vector3(0,0,0);
	} else if (pointList.length < 2){
		return new THREE.Vector3(0,0,0);
	}
	
 	while (time > pointList[pointList.length-1].t){
                time -= pointList[pointList.length-1].t;
    }

	var pos = new THREE.Vector3();
	
	for (var i = 0; i < pointList.length-1; i++){
        
		if (time >= pointList[i].t && time < pointList[i+1].t){
			
			var part = time - pointList[i].t;
			var whole = pointList[i+1].t - pointList[i].t;
			var pct = part / whole;
			
			pos.x = (1-pct) * pointList[i].x + (pct) * pointList[i+1].x;
			pos.y = (1-pct) * pointList[i].y + (pct) * pointList[i+1].y;
		}
	}
	
    // return our point which represents a position interpolated between two other points
	return pos;
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
	// -------------------------- draw the line
	
	context.strokeStyle="yellow";

	context.lineWidth=2;
	if(pointList.length > 1&&drawFirstTime){
		context.beginPath();
		for (var i = 0; i < pointList.length; i++){
			context.lineTo(pointList[i].x, pointList[i].y);
		}
		context.stroke();
	}

	if(circleList.length > 2){
		context.beginPath();
		for (var i = 1; i < circleList.length; i++){
			context.lineTo(circleList[i].x, circleList[i].y);
		}		
		context.stroke();
	}
    
	
	// -------------------------- draw the point at the current time
	var pos = new THREE.Vector3();
	pos = getPositionForTime(clock.getElapsedTime() - playbackStartTime);
	
	context.fillStyle="yellow";
	context.beginPath();
	context.arc(pos.x,pos.y,10,0,2*Math.PI);
	context.fill();	

	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();

/*window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
}
resizeCanvas();*/

canvas.addEventListener("mousemove",mouseMoveHandler,false);

canvas.addEventListener("mousedown",mouseDownHandler,false);

canvas.addEventListener("mouseup",mouseUpHandler,false);
//canvas.addEventListener("mouseout",mouseUpHandler,false);


canvas.addEventListener("touchmove", mouseMoveHandler, false);
canvas.addEventListener("touchstart", mouseDownHandler, false);
canvas.addEventListener("touchend", mouseUpHandler, false);
//canvas.addEventListener("touchcancel", handleCancel, false);
//canvas.addEventListener("touchleave", handleEnd, false);

var startDrag = false;
var drawFirstTime = false;
var newThread = false;
function mouseMoveHandler(e) {
	if(startDrag){
	    var temp = new TimePoint();
		temp.x = e.clientX;
		temp.y = e.clientY;
		temp.t = clock.getElapsedTime() - startTime;
		pointList.push(temp);

		var tmp = new THREE.Vector2(e.clientX, e.clientY);
		circleList.push(tmp);
	}
}


function mouseDownHandler(e) {
	bIsRecording = true;
	pointList = [];
	circleList = [];
	startTime = clock.getElapsedTime();
	var temp = new TimePoint();

	temp.x = e.clientX;
	temp.y = e.clientY;
	temp.t = 0;
	pointList.push(temp);

	startDrag = true;
	drawFirstTime = true;

	var tmp = new THREE.Vector2(e.clientX, e.clientY);
	circleList.push(tmp);
}


function mouseUpHandler(e) {
	bIsRecording = false;
	playbackStartTime = clock.getElapsedTime();
	startDrag = false;
	drawFirstTime = false;
}

resizeCanvas();
