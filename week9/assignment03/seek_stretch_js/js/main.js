var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


var car1 = new Particle();
var car2 = new Particle();

var dest1 = new THREE.Vector2( Math.random()*canvas.width, Math.random()*canvas.height );
var dest2 = new THREE.Vector2( Math.random()*canvas.width, Math.random()*canvas.height );

car1.setParams( 
    new THREE.Vector2( canvas.width/2, canvas.height/2 ), 
    new THREE.Vector2(10, -5) 
);
car2.setParams( 
    new THREE.Vector2( canvas.width/2, canvas.height/2 ), 
    new THREE.Vector2(10, 5) 
);

car1.color = new THREE.Color("rgb(0,255,0)");
car2.color = new THREE.Color("rgb(0,0,255)");


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

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();
	
function animate() {	
	// update
	// apply steering force
    car1.seek( dest1 );
    car2.seek( dest2 );
    
    // apply repelling force
    if( car1.pos.distanceTo( car2.pos ) < 200 ){
        car1.color = new THREE.Color("rgb(255,0,0)");
        car2.color = new THREE.Color("rgb(255,0,0)");
        
        car1.addRepulsionForce( car2.pos );
        car2.addRepulsionForce( car1.pos );
    }else{
        car1.color = new THREE.Color("rgb(0,255,0)");
        car2.color = new THREE.Color("rgb(0,0,255)");
    }
    
    // update physics
    car1.update();
    car2.update();
    
    if( car1.pos.distanceTo(dest1) < 5){
        dest1 = new THREE.Vector2( Math.random()*canvas.width, Math.random()*canvas.height );
    }
    
    if( car2.pos.distanceTo(dest2) < 5){
        dest2 = new THREE.Vector2( Math.random()*canvas.width, Math.random()*canvas.height );
    }
	
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw stuff
	context.fillStyle = '#'+car1.color.getHexString();
	context.beginPath();
	context.arc(dest1.x,dest1.y,4,0,2*Math.PI);
	context.fill();
    car1.draw();
    
	context.fillStyle = '#'+car2.color.getHexString();
	context.beginPath();
	context.arc(dest2.x,dest2.y,4,0,2*Math.PI);
	context.fill();
    car2.draw();
	
	// request new frame
	requestAnimFrame(function() {
	  animate();
	});
}
animate();

resizeCanvas();