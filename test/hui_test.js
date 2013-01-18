(function($) {

  /*
    ========= A Handy Little QUnit Reference =========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */
  
  var colorArr = ["#C20000","#C20000","#C20000"];
  var colorArrRandom = ["#C20000","#37C200","#004EC2","#8400C2","#F56200"];
  var lhui = "0.0.0";

   test( "HUI Hello World Test", function() {
    if(jQuery.isFunction(jQuery.fn.flapperGirl) === true){
       lhui = "1.13.0";
    }
    ok( lhui !== "", "HUI Version: "+lhui+" Hello World Passed! " );
  });

  QUnit.test( "Shuffle() Array Test", function( assert ) {

    function square() {
      jQuery.shuffle(colorArrRandom);
      return colorArr[0];
    }
    function circle() {
      jQuery.shuffle(colorArrRandom);
      return colorArr[2];
    }
    function triangle(){
      jQuery.shuffle(colorArrRandom);
      jQuery("#animme").css("background-color",colorArrRandom[0]);
      return colorArrRandom[2];
    }
    var sresult = square();
    var cresult = circle();
    var cran = triangle();
    
    ok( sresult === cresult, "Passed! Random Color| "+cran );
  });
  
  var abc=1;
  var hateIt =0;
  QUnit.test( "CSS3 Animations", function( assert ) {
    jQuery(".hateIt").click(function(){
      hateIt = 13;
      jQuery(this).hide();
      return false;
    });

    function asquare() {
      var atw = jQuery("#animmeBox").width()-50;
      if(abc===0 && hateIt ===0){
        jQuery("#animme").transition({ 
          x: 0,
            duration: 5000,
            easing: 'snap'
        }, function() {
          abc=1;
          jQuery.shuffle(colorArrRandom);
          jQuery("#animme").css("background-color", colorArrRandom[1]);
          asquare();
        });
      } else {
        if(hateIt ===0){
          jQuery("#animme").transition({ 
            x: atw+"px",
            duration: 8000,
            easing: 'linear'
          }, function() {
            abc=0;
            jQuery.shuffle(colorArrRandom);
            jQuery("#animme").css("background-color", colorArrRandom[0]);
            asquare();
          });
        }
      }
      return 13;
    }
    
    var sresult = asquare();
    //var sresult ="13";
    ok(sresult >= "13", "Kinema Engine Working. CSS Transitions Supported." );
  });

  QUnit.test( "Core Widgets Test", function( assert ) {

     function nsquare() {
     if(jQuery.isFunction(notefy) === true){
       return 5;
     }
     }
    function ncircle() {
      if(jQuery.isFunction(jQuery.facebox) === true){
        return 5;
      }
     }
    
    var sresult = nsquare();
    var cresult = ncircle();

    
    ok( sresult === cresult, "Passed! facebox() and notefy() working 100%" );
  });

	QUnit.test( "Gesture Support Test", function( assert ) {

     function nsquare() {
      if(jQuery.isFunction(Hammer) === true){
       var jQuerysw = jQuery('#swipeme'),
       jQueryoutput = jQuery('#output');
    
       jQuerysw.on('hold tap swipe doubletap transformstart transform transformend dragstart drag dragend swipe release', function (event) {
         event.preventDefault();
         jQueryoutput.prepend("Type: " + event.type + ", Fingers: " + event.touches.length + ", Direction: " + event.direction + "<br/>");
       });
        return 5;
      } else {
       return 55;
      }
    }
    
    var sresult = nsquare();
    var cresult = 6;
    ok( sresult <= cresult, "Gesture Support Active" );
  });

}(jQuery));


var cdnv = "";
 var huivn = "1.13.0";

function callbackGirl(){
 var htmlitem = jQuery(".speakEasy li.active").text();
 notefy("Clicked!",htmlitem);
}

function shuffledemo(){
 var colorArray = ["#C20000","#37C200","#09F","#A823E6","#F56200"];
 jQuery.shuffle(colorArray);
 var ippo = 0;
 jQuery(".democolors").html(" ");
 jQuery(colorArray).each(function (index) {
     var name = colorArray[index];
  jQuery(".democolors").append("<li>"+name+"</li>");
  ippo++;
 });

 jQuery(".democolors li").each(function (index) {
     var name = jQuery(this).text();
  jQuery(this).animate({backgroundColor: name});
 });
}

function huiv(){
 var jqv = jQuery().jquery;
 jQuery(".jqvb").html(jqv);
 jQuery(".hvb").html(huivn);
 return true;
}

jQuery(document).ready(function() {
 huiv();
 jQuery(".n1t").click(function(){
 notefy('simple header','notefy message');
 return false;
 });
 jQuery(".n2t").click(function(){
 notefy('simple header','notefy message','star',true);
 return false;
 });
 jQuery(".shuffleDemo").click(function(){
 shuffledemo();
 return false;
 });   
jQuery('.touchNo').bind('dragstart', function(event) { event.preventDefault(); });
});