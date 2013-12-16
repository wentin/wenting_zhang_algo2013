var image = new Image();
html2canvas($('body'),{
	onrendered: function(cvs) {
			img = cvs.toDataURL('image/png');
			image.src = img;
		},
		width: 320,
		height: 548
	}
);

var canvas=document.getElementById("appMask");
var context=canvas.getContext("2d");
image.onload = function() {
    context.drawImage(image, 0, 0);
	stackBlurCanvasRGB('appMask', 0, 0, $("#appMask").width(), $("#appMask").height(), 30);
};


/****global function *************/
function clearCircle( x , y , r ){
    for( var i = 0 ; i < Math.round( Math.PI * r ) ; i++ ){
        var angle = ( i / Math.round( Math.PI * r )) * 360;
        context.clearRect( x , y , Math.sin( angle * ( Math.PI / 180 )) * r , Math.cos( angle * ( Math.PI / 180 )) * r );
    }
}
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
//context.fillRect(0,0,canvas.width,canvas.height);

//clearCircle(canvas.width/2, canvas.height/2, 40);

var pointList = new Array(),
	startTime = 0,
	playbackStartTime = 0,
	bIsRecording = false,
	circleList = new Array();

function getPositionForTime(time){
// are we recording or do we have less than 2 points? If so return a blank placeholder point.
	if (bIsRecording == true){
		return new THREE.Vector3(0,0,0);
	} else if (pointList.length < 2){
		return new THREE.Vector3(0,0,0);
	}
	
	// Now we figure out where we are time-wise in the drawing
	
    // The variable "time" we are passing in is relative to how long the program has been running, not relative to
    // our timeframe.  We essentially need a modulus operator (%).  Instead we'll mimic is.
    
    // This function acts like a big modulus. The last element in our list (pointList.size()-1) is how long the whole drawing took.
    // We'll keep subtracting it from time until it's smaller than "time".  Now we can work with it on the right time scale. This also
    // allows it to loop!
    
	// while (time > pointList[pointList.length-1].t){
	// 	time -= pointList[pointList.length-1].t;
	// }
	
	
    // Create our point we'll return
	var pos = new THREE.Vector3();
	
	for (var i = 0; i < pointList.length-1; i++){
        
        // find out which two points we're between
		if (time >= pointList[i].t && time < pointList[i+1].t){
			
			// Since we want a smooth playback, we'll interpolate between these two points
			var part = time - pointList[i].t;
			var whole = pointList[i+1].t - pointList[i].t;
			var pct = part / whole;
			
			// Figure out where we are between a and b
            // We've done this before with our linear interpolation where we take a percentage of both, where both
            // percentages add up to 100.  We do this by taking "pct" from one of them and "1-pct" from the other.
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
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// context.fillStyle="#f0f0f0";
	// context.fillRect(0,0,canvas.width,canvas.height);
	
	// draw stuff
	// -------------------------- draw the line
	
	context.strokeStyle="#000000";
	/*if(pointList.length > 1&&drawFirstTime){
		context.beginPath();
		context.moveTo(canvas.width/2, pointList[0].y);
		for (var i = 0; i < pointList.length; i++){
			context.lineTo(canvas.width/2, pointList[i].y);
		}
		context.closePath();
		context.stroke();
	}*/

	if(circleList.length > 2){
		context.globalCompositeOperation = 'destination-out';
		context.beginPath();
		context.lineWidth =  1;
		for (var i = 1; i < circleList.length; i++){
			var drawSpeed = distance([circleList[i-1].x, circleList[i-1].y], [circleList[i].x, circleList[i].y])
			context.lineWidth =  drawSpeed;
			context.lineTo(circleList[i].x, circleList[i].y);
		}		
		context.stroke();
		context.globalCompositeOperation = 'source-over';
	}
    
	
	// -------------------------- draw the point at the current time
	var pos = new THREE.Vector3();
	pos = getPositionForTime(clock.getElapsedTime() - playbackStartTime);
	
	// context.fillStyle="#000000";
	// context.beginPath();
	// context.arc(canvas.width/2,pos.y,10,0,2*Math.PI);
	// context.fill();	
	//context.clearRect(canvas.width/2-1, pos.y, 2, pos.y);

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
	startTime = clock.getElapsedTime();
	var temp = new TimePoint();
	temp.x = e.clientX;
	temp.y = e.clientY;
	temp.t = 0;
	pointList.push(temp);

	startDrag = true;
	drawFirstTime = true;

	//context.fillStyle="#ccc";
	//context.fillRect(0,0,canvas.width,canvas.height);

	var tmp = new THREE.Vector2(e.clientX, e.clientY);
	//circleList.push(tmp);
}


function mouseUpHandler(e) {
	bIsRecording = false;
	playbackStartTime = clock.getElapsedTime();
	startDrag = false;
	drawFirstTime = false;
}
