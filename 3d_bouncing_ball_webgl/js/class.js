function Ball() {
	//ctor
	this.pos = new THREE.Vector3( 0, 0, 0);

	this.speed = new THREE.Vector3( Math.random()*20-10, Math.random()*20-10, Math.random()*20-10 );

	this.accl = new THREE.Vector3( 0, -1, 0);
	this.f = new THREE.Vector3(0.99, 0.99, 0.99);
	var color = new THREE.Color().setHSL( Math.random(), 0.95, 0.5 );
	

	this.ball = new THREE.Mesh(
		new THREE.SphereGeometry(20,36,36), 
		//new THREE.MeshBasicMaterial({color: 'white', wireframe: true}),
		new THREE.MeshPhongMaterial({color: color}) );
	this.ball.position = this.pos;
	scene.add(this.ball);

	//add mouse event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Ball.prototype.update = function(){
	//this.speed.add(this.accl);
	
	
	if( this.ball.position.x -10 < -window.innerWidth/2 || this.ball.position.x + 10 > window.innerWidth/2 ) {
		this.speed.x = 0-this.speed.x;
	}
	if( this.ball.position.y - 10 < -window.innerHeight/2 || this.ball.position.y + 10 > window.innerHeight/2 ) {
		this.speed.y = 0-this.speed.y;
	}else{
		this.speed.add(this.accl);
	}
	if( this.ball.position.z - 10 < -window.innerHeight/2 || this.ball.position.z + 10 > window.innerHeight/2 ) {
		this.speed.z = 0-this.speed.z;
	}
	this.speed.multiply(this.f);
	this.pos.add(this.speed);
};

Ball.prototype.draw = function(){
	this.ball.position.copy(this.pos);
};

Ball.prototype.mouseMove = function(self, pos){
	//self.x = pos.clientX;
	//self.y = pos.clientY;		
};