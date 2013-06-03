var navTop; 
var patternsTop; 
var interactivesTop; 
var toolsTop;

$(window).load(function(){
	navTop = $('.containerFixed').offset().top - 10;
	patternsTop = $('.patterns').offset().top;
	interactivesTop = $('.interactives').offset().top;
	toolsTop = $('.tools').offset().top;
	console.log(navTop);
});

$(window).ready(function(){
	
	

	$(window).scroll(function (event) {
		var y = $(this).scrollTop();
		console.log(y);
		if (y >= navTop) {
      		// if so, ad the fixed class
     		 $('.containerFixed').addClass('fixed');
    	} else {
      		// otherwise remove it
      		$('.containerFixed').removeClass('fixed');
    	}
    	if(y>=patternsTop){
    		$('.navPatterns').addClass('active');
    		$('.navInteractives').removeClass('active');
    		$('.navTools').removeClass('active');
    	} if(y>=interactivesTop){
    		console.log('hoi');
    		$('.navInteractives').addClass('active');
    		$('.navPatterns').removeClass('active');
    		$('.navTools').removeClass('active');
    	}
	});
});

$(".answer").click(function(){
	$(this).toggleClass("active");
});

$(".filterNav").click(function(){
	$(".interactives .cardContainer .result1").fadeOut();
});