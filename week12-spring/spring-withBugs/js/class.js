function Spring(theFromNode, theToNode, theLength, theStiffness, theDamping) {
	//ctor
	//this.param = param;
	this.romNode = theFromNode;
    this.toNode = theToNode;
 
    this.length = theLength;
    this.stiffness = theStiffness;
    this.damping = theDamping;
	
	//add event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Spring.prototype.update = function(){
	
};

Spring.prototype.draw = function(){
};

Spring.prototype.mouseMove = function(self, pos){
	//self.positionB[0].x = pos.clientX;
	//self.positionB[0].y = pos.clientY;		
};