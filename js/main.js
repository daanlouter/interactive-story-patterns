var navTop; 
var patternsTop; 
var interactivesTop; 
var toolsTop;
var screenshotExample;
var exampleCredit;
var exampleDescription;
var exampleTitle;

$(window).load(function(){
	
});

$(window).ready(function(){
var jsonUrl = "https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/oda/public/basic?alt=json";
$.getJSON(jsonUrl, function(json) {
  $.each(json.feed.entry, function(i, item) {
    exampleTitle = item.title.$t;
    var array = item.content.$t.split(", ");
    $.each(array,function (j, jottum){
      screenshotExample = "../img/" + array[3].split(": ")[1];
      exampleCredit = array[0].split(": ")[1];
      exampleDescription = array[1].split(": ")[1];
      patternsUsed = array[4].split(": ")[1];
    });
   interactiveVullen(); 
  });
  
});

var interactiveVullen = function() {
  console.log(exampleDescription);
$(".interactivesOverview .cardContainer").append('<a href="example.html" class="result exampleResult"><img src="' + screenshotExample + '" /><h5>'+exampleTitle+'</h5><div class="clearboth"></div><p class="credit">' + exampleCredit + '</p><p class="description">' + exampleDescription + '</p><h6>PATTERNS USED</h6><div class="patternsUsed"><div>Magazine-like article</div><div>Reconstruction</div><div>Big images inside page</div></div></a>');
}









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

$('.patternResult').click(function() {
   window.location = "patterns/pattern.html";
});
$('.exampleResult').click(function() {
   window.location = "examples/example.html";
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