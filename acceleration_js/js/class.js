function Point(x,y){
	this.x=x;
	this.y=y;
}

function Mover() {
	//ctor
	this.pos = new Point(canvas.width/2, canvas.height/2);
	
	this.velocityX = (Math.random()*10)-5;
	this.velocityY = (Math.random()*10)-5;
	
	this.mousePos = new Point(0, 0);
	this.accel = new Point(0,0);
	//add event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Mover.prototype.draw = function(){
	context.fillStyle="yellow";
	context.beginPath();
	context.arc(this.pos.x, this.pos.y, 10, 0, 2*Math.PI);
	context.fill();
	
	
	context.strokeStyle="yellow";
	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(this.pos.x,this.pos.y);
	context.lineTo(this.mousePos.x,this.mousePos.y);
	context.stroke();
};

Mover.prototype.update = function(){
	this.accel.x = (this.mousePos.x - this.pos.x)*0.01;
	this.accel.y = (this.mousePos.y - this.pos.y)*0.01;
	
	this.velocityX += this.accel.x;
	this.velocityY += this.accel.y;
	
	this.pos.x += this.velocityX;
	this.pos.y += this.velocityY;
	
	this.velocityX *= 0.97;
	this.velocityY *= 0.97;
};

Mover.prototype.mouseMove = function(self, pos){
	self.mousePos.x = pos.clientX;
	self.mousePos.y = pos.clientY;		
};