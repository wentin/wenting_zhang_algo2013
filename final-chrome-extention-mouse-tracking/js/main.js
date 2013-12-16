function TimePoint() {
	//ctor
	this.x = 0;
	this.y = 0;
	this.t = 0;
}

$(function(){
	var currentUrl = window.location.pathname;
	
	$('.content').jScrollPane();
	
	$('.prev').click(function(e){
		e.preventDefault();
		if($('.he.active').prev('.he').length > 0) {
			$('.he.active').removeClass('active').prev().addClass('active');	
		}
		heChange();
	})	
	$('.next').click(function(e){
		e.preventDefault();
		if($('.he.active').next('.he').length > 0) {
			$('.he.active').removeClass('active').next().addClass('active');	
		}
		heChange();
		
		chrome.tabs.captureVisibleTab(null, {format: 'png'}, function (img) {
		   document.getElementById('image').append("img", img);
		   
		});
	})	
	$('.recordBtn').click(function(e){
		startDrag = true;
		$(this).html('start00');
	})

})

function heChange() {
	if(!$('.he.active').prev('.he').length) {
		$('.prev').addClass('disable');	
	} else {
		$('.prev').removeClass('disable');	
	}
	if(!$('.he.active').next('.he').length) {
		$('.next').addClass('disable');	
	} else {
		$('.next').removeClass('disable');			
	}
}

chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('urlLink').innerHTML = tab.url;
});

function startRecord(){
	
	
}