function Classname(param) {
	//ctor
	this.param = param;
	
	//add event listener
	var self = this;
	window.addEventListener('mousemove',  function(pos) { 
		self.mouseMove(self, pos) 
	}, false);
}

Classname.prototype.draw = function(){
};

Classname.prototype.update = function(){
};

Classname.prototype.mouseMove = function(self, pos){
	//self.positionB[0].x = pos.clientX;
	//self.positionB[0].y = pos.clientY;		
};