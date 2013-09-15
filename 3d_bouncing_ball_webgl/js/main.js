var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
camera.position.z = window.innerHeight*1.8;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls( camera );

var light = new THREE.DirectionalLight( 0xCCCCCC, 1.5); 
light.position.set(0.6, 0.2, 0.7);         
scene.add( light );

var light2 = new THREE.DirectionalLight( 0xffffff, 1.5);
light2.position.set(-0.2, -0.04, -0.7);         
//scene.add( light2 );

var light3 = new THREE.AmbientLight( 0x333333 ); // soft white light
scene.add( light3 );

var stage = new THREE.Mesh(
	new THREE.CubeGeometry(window.innerWidth, window.innerHeight, window.innerHeight), 
	new THREE.MeshBasicMaterial({ wireframe: true, color: 'grey'})
	//new THREE.MeshPhongMaterial({ color: 0xffffff })
	//new THREE.MeshPhongMaterial({color: 'black', opacity: 0.8})
);

//stage.rotation.x = Math.PI * 0.1;
scene.add(stage);

/***** setup ******/
var TOTAL = 10;
var myBalls = [];
for(i=0; i < TOTAL; i++){
	myBalls.push( new Ball() );
}
//var myBall = new Ball();

var render = function () {
	requestAnimationFrame(render);

	/***** update ******/
	for(i=0; i < TOTAL; i++){
		myBalls[i].update();
	}

	/***** draw ******/
	for(i=0; i < TOTAL; i++){
		myBalls[i].draw();
	}
	//myBall.draw();
	//myBall.update();

	renderer.render(scene, camera);
};

render();
