var navTop; 
var patternsTop; 
var interactivesTop; 
var toolsTop;

$(window).load(function(){
	
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
    	if(y>=patternsTop -10){
    		$('.navPatterns').addClass('active');
    		$('.navInteractives').removeClass('active');
    		$('.navTools').removeClass('active');
    	} if(y>=interactivesTop -10){
    		console.log('hoi');
    		$('.navInteractives').addClass('active');
    		$('.navPatterns').removeClass('active');
    		$('.navTools').removeClass('active');
    	}
	});
});

$(".answer").click(function(){
  var className = $(this).attr('class').split(' ')[1];
  if($(this).hasClass("active")){
    $(this).removeClass("active");
    $('.filterContainer .'+className).prop('checked', false);
  } else{
    	$(this).addClass("active");
      $(".overview").removeClass("hidden");
      $(".scrolldown").fadeIn();
      checkNavHeight();
      console.log(className);
      $('.filterContainer .'+className).prop('checked', true);
    }
});

// $(".wizardAn= .active").click(function(){
//   console.log('hoi');
//   $(this).removeClass("active");
// });

$('.result').click(function() {
   window.location = "pattern.html";
});



$(".filterNav").click(function(){
	$(".interactives .cardContainer .result1").fadeOut();
});


//Automated scrolls
$(".scrolldown").click(function(){
  $("html, body").animate({ scrollTop: patternsTop - 10 }, 500);
});
$(".backToTop").click(function(){
  $("html, body").animate({ scrollTop: "0"}, 500);
});
$(".navPatterns").click(function(){
  $("html, body").animate({ scrollTop: patternsTop - 10 }, 500);
});
$(".navInteractives").click(function(){
  $("html, body").animate({ scrollTop: interactivesTop - 10 }, 500);
});
$(".navTools").click(function(){
  $("html, body").animate({ scrollTop: toolsTop - 10 }, 500);
});






var checkNavHeight = function(){
  navTop = $('.containerFixed').offset().top - 10;
  patternsTop = $('.patterns').offset().top;
  interactivesTop = $('.interactives').offset().top;
  toolsTop = $('.tools').offset().top;
  console.log(navTop);
}