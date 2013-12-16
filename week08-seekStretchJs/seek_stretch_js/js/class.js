function Particle(param) {

	//ctor

    

    this.acc = new THREE.Vector2(0,0);

    this.pos = new THREE.Vector2(0,0);

    this.vel = new THREE.Vector2(0,0);

    

    this.damping = 0.01;

    this.lastPos = new THREE.Vector2(0,0);



    this.maxSpeed = 10.0;

    this.maxForce = 0.4;

    this.slowDownRadius = 200.0;

	

	this.color = new THREE.Color();



	this.setParams( new THREE.Vector2(0,0), new THREE.Vector2(0,0));

	//add event listener

	var self = this;

	window.addEventListener('mousemove',  function(pos) { 

		self.mouseMove(self, pos) 

	}, false);

}



Particle.prototype.setParams = function( _pos,  _vel){

	this.pos.copy(_pos) ;

    this.vel.copy(_vel) ;

    this.lastPos.copy(this.pos);

};



Particle.prototype.addForce = function(  force ){

	this.acc.add(force);       // F = MA

    

    //acc.limit( 5.0 );

    if(this.acc.length()>5){

    	this.acc.normalize().multiplyScalar(5);

    }

};



Particle.prototype.addRepulsionForce = function( fromPos ){

	var diff = new THREE.Vector2(0,0);

    diff.copy(this.pos);

    diff.sub(fromPos);

    

    var strength = 1- (diff.length() / 10.0);

    

    this.addForce( diff.normalize().multiplyScalar(strength) );

};



Particle.prototype.seek = function( dest ){

    var dest00 = new THREE.Vector2(0,0);

    dest00.copy(dest);

	var desired = dest00.sub(this.pos);

    

    if( desired.length() < this.slowDownRadius ){        

        //var newMag = (desired.length()/slowDownRadius)*maxSpeed;

 		var newMag = THREE.Math.mapLinear( desired.length(), 0, this.slowDownRadius, 0, this.maxSpeed);

        desired.normalize();

        desired.multiplyScalar(newMag);

    }else{

        desired.normalize();

        desired.multiplyScalar(this.maxSpeed);

    }



    var steer = new THREE.Vector2(0,0);

    steer.copy(desired).sub(this.vel);



    if(steer.length()>this.maxForce){

    	steer.normalize().multiplyScalar(this.maxForce);

    }

    

    this.addForce( steer );

};



Particle.prototype.update = function(){

	this.vel.add(this.acc);

    this.pos.add(this.vel);

    

    this.vel.multiplyScalar(0.97);

    

    this.acc.multiplyScalar(0);

    

    this.lastPos.copy( this.pos );

};



Particle.prototype.draw = function(){

    

    //ofPushMatrix();

    //ofTranslate( pos );

    context.save();

    context.translate( this.pos.x, this.pos.y );



        var rotAmt = Math.atan2( this.vel.y, this.vel.x );



        //context.rotate(0);

        context.rotate( rotAmt + Math.PI/2 );

        //ofRect( 0,0, 20, 20*vel.length());

        context.fillStyle = 'blue';

      	context.fillRect(0, 0, 20, 20*this.vel.length() );



    

    context.restore();

    //ofPopMatrix();

};



Particle.prototype.mouseMove = function(self, pos){

	//self.positionB[0].x = pos.clientX;

	//self.positionB[0].y = pos.clientY;		

};