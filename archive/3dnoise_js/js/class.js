function Ball(x, y, z, color) {
	//ctor
	this.x = x;
	this.y = y;
	this.z = z;
	this.color = color;

	this.pos = new THREE.Vector3( this.x, this.y, this.z);

	this.speed = new THREE.Vector3( Math.random()*10-5, Math.random()*10-5, Math.random()*10-5 );
	console.log(this.speed);
	//this.accl = new THREE.Vector3( 0, -1, 0);
	this.f = new THREE.Vector3(0.99, 0.99, 0.99);
	
	this.age = 0;
	this.lifespan = Math.random()*100000 + 50000;
	this.agePct = 1;

	this.isDead = false;

	this.ball = new THREE.Mesh(
		new THREE.SphereGeometry(0.4, 6, 6), 
		//new THREE.MeshBasicMaterial({color: 'white', wireframe: true}),
		//new THREE.MeshPhongMaterial({color: this.color}) );
		new THREE.MeshBasicMaterial({color: this.color}) );
	this.ball.position = this.pos;
	scene.add(this.ball);

	//add mouse event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Ball.prototype.update = function(){
	var noise = simplex.noise4D( this.pos.x *0.005 , this.pos.y*0.005 , this.pos.z*0.005 , clock.getElapsedTime()*0.1 );
	
	this.agePct = 1 - this.age/this.lifespan;

	this.pos.add(this.speed);
	this.pos.add(  new THREE.Vector3( Math.cos(noise), Math.sin(noise), Math.sin(noise) )  );

	this.speed.multiply(this.f);

	this.age++;

	if(this.age > this.lifespan){
		this.isDead = true;

	}
};

Ball.prototype.draw = function(){
	//this.ball.position.copy(this.pos);
	if(this.isDead) {
		return;
	}

	this.agePct = 1 - this.age/this.lifespan;

	this.ball.position.copy(this.pos);

	//this.ball.scale.x *= (1 - this.agePct);
	//this.ball.scale.y *= (1 - this.agePct);
	//this.ball.scale.z *= (1 - this.agePct);

};

Ball.prototype.mouseMove = function(self, pos){
	//self.x = pos.clientX;
	//self.y = pos.clientY;		
};