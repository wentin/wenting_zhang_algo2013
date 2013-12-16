function Point(x,y){
	this.x=x;
	this.y=y;
}

function Audiotrail() {
	//ctor
	this.x = 0;
	this.y = 300;

	this.i = 0;
	this.yHeight = 0;
	//add event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);


	context.strokeStyle="yellow";
	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(this.x,this.y);
}


Audiotrail.prototype.update = function(){
	this.x += 2.4;
	this.y = canvas.height/2 + Math.sin(this.x/100)*Math.sin(this.x*5)*canvas.height/6;

	if(this.x > canvas.width) {
		x = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
};


Audiotrail.prototype.draw = function(){
	context.lineTo(this.x,this.y);
	context.stroke();
};

Audiotrail.prototype.mouseMove = function(self, pos){
	//self.positionB[0].x = pos.clientX;
	//self.positionB[0].y = pos.clientY;		
};