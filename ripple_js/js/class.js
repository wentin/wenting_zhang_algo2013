function Point(x,y){
	this.x=x;
	this.y=y;
}

function Ripple() {
	//ctor
	this.radiusSet = [];
	this.radiusTargetSet = [];
	this.number = 8;
	this.radius = 0;
	this.pos = new Point(0, 0);
	this.catchupSpeed = 0.1;

	context.strokeStyle="rgba(0,200,200,0.4)";

	for(i=0; i<this.number; i++){
		this.radiusSet.push(0);
		this.radiusTargetSet.push(0);
	}
	
	//add event listener
	var self = this;
	window.addEventListener('click',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Ripple.prototype.draw = function(){
	for(i=0; i<this.number; i++){
		context.beginPath();
	context.lineWidth="20";
		context.arc(this.pos.x, this.pos.y, this.radiusSet[i], 0, 2*Math.PI);
		context.stroke();
	}
};

Ripple.prototype.update = function(){
	this.radiusSet[0] = this.catchupSpeed*this.radiusTargetSet[0] + (1 - this.catchupSpeed)*this.radiusSet[0];
	for(i=1; i<this.number; i++){
		this.radiusTargetSet[i] = this.radiusSet[i-1];
		this.radiusSet[i] = this.catchupSpeed*this.radiusTargetSet[i] + (1 - this.catchupSpeed)*this.radiusSet[i];
	}
};

Ripple.prototype.mouseMove = function(self, pos){
	self.pos.x = pos.clientX;
	self.pos.y = pos.clientY;	
	for(i=0; i<self.number; i++){
		self.radiusSet[i] = 0;
		self.radiusTargetSet[i] = 0;
	}
	self.radius = Math.random()*150+50;
	self.radiusTargetSet[0] = self.radius;
};