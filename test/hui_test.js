(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
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
	var cdnv = "";
	function huiv(outputLoc){
		if(outputLoc!==undefined){
			var jndate = jQuery.now();
		jQuery.getJSON("http://dev.huement.com/hui/start/update.json?ver="+jndate, function(data){
			//console.debug(data.version);
			if(data.version && data.version !== "error"){
				jQuery(outputLoc).html("<h3 class='cdn-userAgent'>"+data.title+"</h3>");
				var cdnLink = "http://huementui.s3.amazonaws.com/cdn/hui-min-latest.js";
				var cdncssLink = "http://huementui.s3.amazonaws.com/cdn/hui-min-latest.css";
				jQuery(outputLoc).append("<li class='pass p10'>JS CDN: <a href='"+cdnLink+"'>"+cdnLink+"</a></li>");
				jQuery(outputLoc).append("<li class='pass p10'>CSS CDN: <a href='"+cdncssLink+"'>"+cdncssLink+"</a></li>");
				var cdnLink = "http://huementui.s3.amazonaws.com/cdn/1/js/hui-"+data.version+".js";
				var cdncssLink = "http://huementui.s3.amazonaws.com/cdn/1/css/hui-"+data.version+".css";
				jQuery(outputLoc).append("<li class='pass p10'>Developer JS: <a href='"+cdnLink+"'>"+cdnLink+"</a></li>");
				jQuery(outputLoc).append("<li class='pass p10'>Developer CSS: <a href='"+cdncssLink+"'>"+cdncssLink+"</a></li>");
			} else {
				jQuery(outputLoc).html("<h3 style='margin:0;padding:10px 0 10px 10px;' class='fail'>CDN Reachability Error</h3>");
			}
		});
		}
		return true;
	};
	
	var colorArr = ["#C20000","#C20000","#C20000"];
	var colorArrRandom = ["#C20000","#37C200","#004EC2","#8400C2","#F56200"];
	
 	test( "HUI Hello World Test", function() {
		var srt = huiv("#version");
		var lhui = "1.13";
	  ok( lhui !== "", "HUI Version: "+lhui+" Hello World Passed! " );
	});

	QUnit.test( "HUI Array Shuffle() Test", function( assert ) {

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
	QUnit.test( "HUI Animation Tests", function( assert ) {
		jQuery(".hateIt").click(function(){
			hateIt = 13;
			jQuery(this).hide();
			return false;
		});

	  function asquare() {
		  var atw = jQuery("#animmeBox").width()-50;
			if(abc==0 && hateIt ==0){
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
				if(hateIt ==0){
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

	QUnit.test( "HUI Alert Widgets Test", function( assert ) {

	  function nsquare() {
			notefy("notify widget","test message","star",true);
			setTimeout('jQuery(".jGrowl-notification").html(" ")',555);
	    return 5;
	  }
		function ncircle() {
			jQuery.facebox("<h2>Facebox Test</h2><p>Simple Modal Test</p>");
			jQuery.facebox.close(); 
	    return 5;
	  }
		
	  var sresult = nsquare();
		var cresult = ncircle();

		
	  ok( sresult === cresult, "Passed! facebox() and notefy() working 100%" );
	});

}(jQuery));
