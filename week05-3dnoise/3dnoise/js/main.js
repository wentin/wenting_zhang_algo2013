var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
camera.position.z = window.innerHeight*0.4;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls( camera );

var clock = new THREE.Clock(true);
/*var light = new THREE.DirectionalLight( 0xCCCCCC, 1.5); 
light.position.set(0.6, 0.2, 0.7);         
scene.add( light );

var light2 = new THREE.DirectionalLight( 0xffffff, 1.5);
light2.position.set(-0.2, -0.04, -0.7);         
//scene.add( light2 );

var light3 = new THREE.AmbientLight( 0x333333 ); // soft white light
scene.add( light3 );*/

/***** setup ******/
var xTOTAL = 10;
var yTOTAL = 10;
var zTOTAL = 10;
var myBalls = [];
var simplex = new SimplexNoise();
    		
var mouseStart = false;

window.addEventListener('click',  function(pos) { 
	mouseStart = true;
}, false);

for(k=0; k < zTOTAL; k++){
	for(j=0; j < yTOTAL; j++){
		for(i=0; i < xTOTAL; i++){
        	var h = simplex.noise3D(i/10 , j/10 , k/10);
    		var color = new THREE.Color().setHSL( h, 0.95, 0.5 );
			myBalls.push( new Ball(10*i - 50, 10*j - 50, 10*k - 50, color) );
		}
	}
}

var render = function () {
	requestAnimationFrame(render);

	if(mouseStart){
		/***** update ******/
		for(i=0; i < myBalls.length; i++){
			myBalls[i].update();
		}

		/***** draw ******/
		for(i=0; i < myBalls.length; i++){
			myBalls[i].draw();
		}		
	}

	renderer.render(scene, camera);
};

render();
