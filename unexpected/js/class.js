function Point(x,y){
	this.x=x;
	this.y=y;
}

function Creature() {
	//ctor
	this.x = 0;
	this.y = 0;
	this.t = 0;
	this.r = 40;

	this.angle = 0;
	//add event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
	
	context.beginPath();
	context.moveTo(0,0);
}

Creature.prototype.draw = function(){
	//context.strokeStyle="rgba(0,200,200,1)";
	var simplex = new SimplexNoise(),
    value2d = simplex.noise2D(this.t, 0);
	this.r = value2d * 40 + 100;
	var color = new THREE.Color().setHSL( 0.001*(this.t%1000), 0.95, 0.5 );
	this.t++;
	color = color.getHexString();
	context.strokeStyle="#"+color;
	//context.beginPath();
	context.lineTo(this.x, this.y);
	context.moveTo(this.x, this.y);
	
	//context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	context.stroke();
};

Creature.prototype.update = function(){
	this.angle = Math.atan2(this.y, this.x);
	this.t++;
	//this.r = Math.random()*100 + 50 ;

	var simplex = new SimplexNoise(),
    value2d = simplex.noise2D(this.x, this.y);
    this.r = value2d * 100;
	//this.r = Math.random()* 100 + 50;
	this.x = Math.sin(this.t)*360 + canvas.width/2;
	this.y = Math.cos(this.t)*360 + canvas.height/2;
};

Creature.prototype.mouseMove = function(self, pos){
	self.x = pos.clientX;
	self.y = pos.clientY;	
};