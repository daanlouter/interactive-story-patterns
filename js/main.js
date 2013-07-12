//Declare Variables
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
var relatedPatterns = "";
var patternDuplicates = [];
var patternArrayDuplicates = [];
var data_array = [];
var toolsArray;






$(window).ready(function(){
  
  ///////////////////////////////////////////////////////
  // Fill all overview pages

  //Fill examples pages
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

  //Fill patterns page
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

  //Fill tools page
  var toolUrl = "https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/od5/public/basic?alt=json";
  $.getJSON(toolUrl, function(json) {
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




  ///////////////////////////////////////////////////////
  // Fixed FilterContainer on left-handside
  
	$(window).scroll(function (event) {
		var y = $(this).scrollTop();
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
    	$('.navInteractives').addClass('active');
  		$('.navPatterns').removeClass('active');
  		$('.navTools').removeClass('active');
   	}
	});
});


$(".filterContainer input").click(function(){
  var state;
  var answerDataName = $(this).attr('data-name');
  
  if($(this).is(':checked')){
    state = "active";
  } else{
    state = "inactive";
  }

  $.getJSON("https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/od6/public/basic?alt=json", function(json) {
    $.each(json.feed.entry, function(i, item) {
      //If item in list is same as selected, then store corresponding patternDataNames in relatedPatterns
      if(item.content.$t.split(", ")[1].split(": ")[1] == answerDataName){
        if (relatedPatterns != ""){
        relatedPatterns = item.content.$t.split(", ")[3].split(": ")[1];
        } else{
          relatedPatterns = item.content.$t.split(", ")[3].split(": ")[1];
        } 
      }
    });
    
    if(state=="active"){
    fillPatterns(relatedPatterns, "enable");
    } if(state=="inactive"){
    fillPatterns(relatedPatterns, "disable");
    } 
  });
});

///////////////////////////////////////////////////////
// Fill frontpage with content, based on answers
$(".answer").click(function(){
  var state;
  var className = $(this).attr('class').split(' ')[1];
  var answerDataName = $(this).attr('data-name');
  if($(this).hasClass("active")){
    state = "inactive";
    $(this).removeClass("active");
    $('.filterContainer .'+className).prop('checked', false);
  } else{
      state = "active";
      $(this).addClass("active");
      $(".overview").removeClass("hidden");
      $(".scrolldown").fadeIn();
      checkNavHeight();
      $('.filterContainer .'+className).prop('checked', true);
    }

  $.getJSON("https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/od6/public/basic?alt=json", function(json) {
    $.each(json.feed.entry, function(i, item) {
      //If item in list is same as selected, then store corresponding patternDataNames in relatedPatterns
      if(item.content.$t.split(", ")[1].split(": ")[1] == answerDataName){
        if (relatedPatterns != ""){
        relatedPatterns = item.content.$t.split(", ")[3].split(": ")[1];
        } else{
          relatedPatterns = item.content.$t.split(", ")[3].split(": ")[1];
        } 
      }
    });
    
    if(state=="active"){
    fillPatterns(relatedPatterns, "enable");
    } if(state=="inactive"){
    fillPatterns(relatedPatterns, "disable");
    } 
  });
});




///////////////////////////////////////////////////////
// Automated scrolls
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



///////////////////////////////////////////////////////
// Custom functions
var checkNavHeight = function(){
  navTop = $('.containerFixed').offset().top - 10;
  patternsTop = $('.patterns').offset().top;
  interactivesTop = $('.interactives').offset().top;
  toolsTop = $('.tools').offset().top;
}



var fillPatterns = function(thePatternList, state){
  $(".resultsContainer .patterns .cardContainer").html("");
  
  var laatstetoevoeging = thePatternList;
  if(state=="enable"){  
    if(patternDuplicates!= ""){
      patternDuplicates = patternDuplicates + "; " + laatstetoevoeging;
    } else{
      patternDuplicates = laatstetoevoeging;
    }

  } else if(state=="disable"){

    patternDuplicates = patternDuplicates.replace(laatstetoevoeging, '')

  }
  
  patternArrayDuplicates = patternDuplicates.split("; ");

  

    var patternArray = [];
    $.each(patternArrayDuplicates, function(i, e) {
      if ($.inArray(e, patternArray) == -1) patternArray.push(e);
    });
    
    $.each(patternArray, function(i, item1) {

      $.getJSON("https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/od4/public/basic?alt=json", function(json) {  
        $.each(json.feed.entry, function(j, item) {
         
          if(item.content.$t.split(', ')[5].split(": ")[1] == item1){
            patternTitle = item.title.$t;
            var array = item.content.$t.split(", ");
            toolsArray = toolsArray + "; " + array[3].split(": ")[1];

            $.each(array,function (j, jottum){      
              patternScreenshot = "img/" + array[2].split(": ")[1];
              patternDescription = array[1].split(": ")[1];
              patternAmount = array[4].split(": ")[1];
            });
            $(".resultsContainer .patterns .cardContainer").append('<a href="patterns/pattern.html" class="result patternResult"><img src="' + patternScreenshot + '" /><h5>' + patternTitle + '</h5><p class="description">' + patternDescription + '</p><p class="amountInteractives"><span>' +  patternAmount + ' interactives</span> use this pattern</p></a>');
            
          }
        }); 
      });
    });
  
fillExamples(patternArray, state);



fillTools(toolsArray); 

};

var fillExamples = function(thePatternList, state){
  $(".interactives .cardContainer").html('');
var exampleLijst = [];
    $.getJSON("https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/oda/public/basic?alt=json", function(json) {  
      $.each(json.feed.entry, function(j, jitem) {
        var input = jitem.content.$t.split(', ')[5].split(": ")[1];
        

        if (input.indexOf("; ") >= 0){
          input = input.split("; ");
          $.each(input, function(e, eitem){
            $.each(thePatternList, function(i, item){  
              if(item==eitem){
                exampleLijst.push(jitem)
              }
            });
          });
        } else{
            $.each(thePatternList, function(i, item){  
              if(item==input){
                exampleLijst.push(jitem)
              }
            });
        }

      });
     
      var newExampleList=[];
      for(i = 0; i<exampleLijst.length; i++){
        var currentExample = exampleLijst[i];
        if($.inArray(currentExample.title.$t, newExampleList) == 0){
         
        } else if ($.inArray(currentExample, newExampleList) == -1){
          newExampleList.push(currentExample);
          
        }
      }
      

      $.each(newExampleList, function(j, item){
        var patternList = "";
        exampleTitle = item.title.$t;
        var array = item.content.$t.split(", ");
        $.each(array,function (j, jottum){
          screenshotExample = "img/" + array[3].split(": ")[1];
          exampleCredit = array[0].split(": ")[1];
          exampleDescription = array[1].split(": ")[1];
          patternsUsed = array[4].split(": ")[1];
        });
        $.each(patternsUsed.split("; "),function (k, kottum){
          patternList = patternList + "<div>" + kottum + "</div>";
        });
        $(".interactives .cardContainer").append('<a href="examples/example.html" class="result exampleResult"><img src="' + screenshotExample + '" /><h5>'+exampleTitle+'</h5><div class="clearboth"></div><p class="credit">' + exampleCredit + '</p><p class="description">' + exampleDescription + '</p><h6>PATTERNS USED</h6><div class="patternsUsed">' + patternList + '</div></a>');

      });

    });

}

var fillTools = function(thePatternList, state){
$(".tools .cardContainer").html('');

  toolsList = thePatternList.split("; ");
  newToolList = [];
  for(i = 0; i<toolsList.length; i++){
      var currentExample = toolsList[i];
      if($.inArray(currentExample, newToolList) == 0){
        
      } else if ($.inArray(currentExample, newToolList) == -1){
        newToolList.push(currentExample);
      }
    }
  
  $.each(newToolList, function(i, tool){
    
    if(tool != "undefined" && tool != "none"){
      
      $.getJSON("https://spreadsheets.google.com/feeds/list/0ApWF_l9bN5GcdHhCalkwZmx0SERrX01SU1RBdzJEZWc/od5/public/basic?alt=json", function(json) {  
        $.each(json.feed.entry, function(j, item) {
          if(item.title.$t == tool){
            toolTitle = item.title.$t;
            var array = item.content.$t.split(", ");
            $.each(array,function (j, jottum){
              toolDescription = array[2].split(": ")[1];
              toolLink = array[0].split(": ")[1];
              toolLevel = array[1].split(": ")[1];
            });
            $(".tools .cardContainer").append('<a href="' + toolLink + '" class="result"><h5>' + toolTitle + '</h5><p class="credit">'+ toolLink +'</p><p class="description">' +toolDescription+ '</p><div class="skill">' +toolLevel+ '</div></a>');
          }
        });
      });
    }
  });
  
}


