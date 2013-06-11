var navTop; 
var patternsTop; 
var interactivesTop; 
var toolsTop;
var screenshotExample;
var exampleCredit;
var exampleDescription;
var exampleTitle;
var patternTitle;
var patternScreenshot;
var patternDescription;
var patternsUsed;
var patternAmount;
var toolTitle;
var toolDescription;
var toolLink;
var toolLevel;

$(window).ready(function(){

  //Fill examples
  var exampleUrl = "../data/examples.json";
  $.getJSON(exampleUrl, function(json) {
    $.each(json.feed.entry, function(i, item) {
      var patternList = "";
      exampleTitle = item.title.$t;
      var array = item.content.$t.split(", ");
      $.each(array,function (j, jottum){
        screenshotExample = "../img/" + array[3].split(": ")[1];
        exampleCredit = array[0].split(": ")[1];
        exampleDescription = array[1].split(": ")[1];
        patternsUsed = array[4].split(": ")[1];
      });
      $.each(patternsUsed.split("; "),function (k, kottum){
        patternList = patternList + "<div>" + kottum + "</div>";
      });
     $(".interactivesOverview .cardContainer").append('<a href="example.html" class="result exampleResult"><img src="' + screenshotExample + '" /><h5>'+exampleTitle+'</h5><div class="clearboth"></div><p class="credit">' + exampleCredit + '</p><p class="description">' + exampleDescription + '</p><h6>PATTERNS USED</h6><div class="patternsUsed">' + patternList + '</div></a>');

    });
  });

  //Fill patterns
  var patternUrl = "../data/patterns.json";
  $.getJSON(patternUrl, function(json) {
    $.each(json.feed.entry, function(i, item) {
      patternTitle = item.title.$t;
      var array = item.content.$t.split(", ");
      $.each(array,function (j, jottum){
        patternScreenshot = "../img/" + array[2].split(": ")[1];
        patternDescription = array[1].split(": ")[1];
        patternAmount = array[4].split(": ")[1];
      });
      $(".patternsOverview").append('<a href="pattern.html" class="result patternResult"><img src="' + patternScreenshot + '" /><h5>' + patternTitle + '</h5><p class="description">' + patternDescription + '</p><p class="amountInteractives"><span>' +  patternAmount + ' interactives</span> use this pattern</p></a>');
    });
  });


  //Fill tools
  var patternUrl = "../data/tools.json";
  $.getJSON(patternUrl, function(json) {
    $.each(json.feed.entry, function(i, item) {
      toolTitle = item.title.$t;
      var array = item.content.$t.split(", ");
      $.each(array,function (j, jottum){
        toolDescription = array[2].split(": ")[1];
        toolLink = array[0].split(": ")[1];
        toolLevel = array[1].split(": ")[1];
      });
      $(".toolsOverview").append('<a href="' + toolLink + '" class="result"><h5>' + toolTitle + '</h5><p class="credit">'+ toolLink +'</p><p class="description">' +toolDescription+ '</p><div class="skill">' +toolLevel+ '</div></a>');
    });
  });


	$(window).scroll(function (event) {
		var y = $(this).scrollTop();
		console.log(y);
		if (y >= navTop) {
     	$('.containerFixed').addClass('fixed');
    } else {
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