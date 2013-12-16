function Point(x,y){
	this.x=x;
	this.y=y;
}

function QueueLine(n, color, radius) {
	this.n = n;
	this.color = color;
	this.radius = radius;
	this.position = [];
	for (var i = 0; i < n; i++)
		this.position.push(new Point(0, 0));
		
	this.positionB = [];
	for (var i = 0; i < n; i++)
		this.positionB.push(new Point(0, 0));
	//http://stackoverflow.com/questions/1338599/addeventlistener-this
}

QueueLine.prototype.draw = function(x, y){
	this.positionB[0].x = x;
	this.positionB[0].y = y;		

	context.fillStyle=this.color;
	context.beginPath();
	context.arc(this.position[0].x + 0.5*(this.positionB[0].x - this.position[0].x), this.position[0].y + 0.5*(this.positionB[0].y - this.position[0].y),this.radius,0,2*Math.PI);
	this.position[0].x = this.position[0].x + 0.5*(this.positionB[0].x - this.position[0].x);
	this.position[0].y = this.position[0].y + 0.5*(this.positionB[0].y - this.position[0].y);
	for (var i = 1; i < this.n; i++) {
		this.positionB[i].x = this.position[i-1].x;
		this.positionB[i].y = this.position[i-1].y;
		context.arc(this.position[i].x + 0.5*(this.positionB[i].x - this.position[i].x), this.position[i].y + 0.5*(this.positionB[i].y - this.position[i].y),this.radius-0.4*i,0,2*Math.PI);
		this.position[i].x = this.position[i].x + 0.5*(this.positionB[i].x - this.position[i].x);
		this.position[i].y = this.position[i].y + 0.5*(this.positionB[i].y - this.position[i].y);
		context.fill();
	}
};
