function Particle() {
	//ctor

	this.pos = new THREE.Vector2(0,0);
    this.vel = new THREE.Vector2(0,0);
    this.frc = new THREE.Vector2(0,0);
	
	this.setInitialCondition(0,0,0,0);
	this.damping = 0.09;

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
	
	// context.beginPath();
	// context.moveTo(this.pos.x-5, this.pos.y);
	// context.lineTo(this.pos.x+5, this.pos.y);
	// context.moveTo(this.pos.x, this.pos.y-5);
	// context.lineTo(this.pos.x, this.pos.y+5);
	// context.stroke();
};

Particle.prototype.mouseMove = function(self, pos){
	//self.positionB[0].x = pos.clientX;
	//self.positionB[0].y = pos.clientY;		
};