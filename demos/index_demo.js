//This Script has
//Example Functions for the index.html hui demo
var HistoryDiz,nextName,titleName;
var counter = 0;     
var demo1 = 0;
var demo2 = 0;
var demo3 = 0;

var colorArrLight = ["#F10000","#57DB23","#49C5FF","#C14DF7","#DD6B00"];
var colorArr = ["#C51111","#44B915","#109CDD","#8F00D1","#E65614"];

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

function callbackGirl(){
 var htmlitem = jQuery(".speakEasy li.active").text();
 notefy("Clicked!",htmlitem);
}

function randomColors(single){
 var shuffleArr = jQuery.shuffle(colorArr);
 //console.debug(shuffleArr);
 jQuery(".el_arco_iris, #el_arco_iris li.active a").animate({color: colorArr[0]},4979);
 
 if(jQuery(document).width() <= 460){
  jQuery(".navList").hide();
 }
 if(single==null){
	setTimeout("randomColors()",5013);
 }
 
}

function brightnessToggle(newStyle){
 if(newStyle=="dark"){
 
  var darkStylecss = "http://dev.huement.com/hui/dist/hui-dark.css";
  //var darkFinal = '<link rel="stylesheet" type="text/css" href="'+darkStylecss+'" >';
  //jQuery(darkFinal).appendTo("head");
  $("#theme_sheet").attr("href", darkStylecss);
  jQuery(".brightToggleTxt").toggleClass("dark");
  //jQuery("p, h1, h2, h3, h4").css("color","#f7f7f7");
 }
 if(newStyle=="light"){
  var darkStylecss = "http://dev.huement.com/hui/dist/hui-light.css";
  //var darkFinal = '<link rel="stylesheet" type="text/css" href="'+darkStylecss+'" >';
  //jQuery(darkFinal).appendTo("head");
  $("#theme_sheet").attr("href", darkStylecss);
  jQuery(".brightToggleTxt").toggleClass("dark");
  //jQuery("p, h1, h2, h3, h4").css("color","#1b1b1b");
 }
}

//Notefy Demo Function
var iconarray = ["heart","star","gear","maps","mumford","jackolantern","jack","x","plus","twitter"];

function runfulltests(){
 /* jGrowl Full Tests */
 // This value can be true, false or a function to be used as a callback when the closer is clciked
 jQuery.jGrowl.defaults.closer = function() {
  console.log("Closing everything!", this);
 };
 
 // A callback for logging notifications.
 jQuery.jGrowl.defaults.log = function(e,m,o) {
  $('#logs').append("<div><strong>#" + $(e).attr('id') + "</strong> <em>" + (new Date()).getTime() + "</em>: " + m + " (" + o.theme + ")</div>")
 }    
 jQuery.shuffle(iconarray);
 jQuery.jGrowl("Hello world!");
 jQuery.jGrowl("This notification will live a little longer.", { life: 1000 });
 jQuery.jGrowl("Sticky notification with a header", { header: 'A Header', sticky: true });
 jQuery.jGrowl("Custom theme, and a whole bunch of callbacks...", { 
  icon_theme:  iconarray[1],
  speed:  'slow',
  beforeOpen: function(e,m,o) {
   console.log("I am going to be opened!", this);
  },
  open: function(e,m,o) {
   console.log("I have been opened!", this);
  },
  beforeClose: function(e,m,o) {
   console.log("I am going to be closed!", this);
  },
  close: function(e,m,o) {
   console.log("I have been closed!", this);
  }
 });
 
 jQuery.jGrowl("Custom animation test...", { 
  icon_theme:  iconarray[2],
  speed: 'slow',
  animateOpen: { 
   height: "show"
  },
  animateClose: { 
   height: "hide"
  }
 });
 
 jQuery.jGrowl("Mobile Ready!", { 
  sticky: true,
  header: 'iPhone',
  icon_theme: "ape",
 });
 

 jQuery.jGrowl("This message will not open because we have a callback that returns false.", {
  beforeOpen: function() {
   console.log("Going to open a notification, but not really...");
  },
  open: function() {
   return false;
  }
 });
 
 jQuery.jGrowl("This message will not close because we have a callback that returns false.", {
  icon_theme:  "alert",
  beforeClose: function() {
   return false;
  }
 });
 
 jQuery.jGrowl.defaults.closerTemplate = '<div>hide all notifications</div>';
 
 $('#test1').jGrowl("Testing a custom container (this one is sticky, and will also be prepended).", {
  icon_theme:  iconarray[3],
  closer: false,
  sticky: true, 
  glue: 'before',
  speed: 2000,
  animateOpen: { 
   height: "show",
   width: "show"
  },
  animateClose: { 
   height: "hide",
   width: "show"
  }
 });

 $('#test1').jGrowl("Another custom container test.", { 
  glue: 'before',
  speed: 2000,
  animateOpen: { 
   height: "show",
   width: "show"
  },
  animateClose: { 
   height: "hide",
   width: "show"
  }
 });
 
 $('#test2').jGrowl("earth bottom left", { 
  header:      "party on",
  icon_theme:  "earth",
  location: "bottom-left",
  closer: false
 });
}

/* controls page animations. newTitle is optional*/
function PanelSwap(ShowTarget,newTitle){
	var FixedTarget = ShowTarget.replace(".", "");
	var subTarget = FixedTarget.split('_');
	$("div.category").each(function(){
		if($(this).is(":visible")==true&& $(this).hasClass(FixedTarget) != true){
			//$(this).fadeOut();
			$(this).stop(true).animate({ 'height': 'toggle'}, { queue: false, duration: 888, easing:"easeOutCubic" },function(){
				if($(this).hasClass("none")==false){
					$(this).addClass("none");
				}
			});
		}
	});
	if($(ShowTarget).is(":visible")!=true){
		jQuery(ShowTarget).removeClass("none");
		//$(ShowTarget).slideDown();
		$(ShowTarget).stop(true).animate({ 'height': 'show'}, { queue: false, duration: 999, easing:"easeInCubic" });
	}
	if(newTitle!=undefined||newTitle.length>=3){
		titleName = 'hui'+' '+newTitle;
	} else {
		titleName = 'hui'+' '+subTarget[0];
	}
	setTimeout("windowRename()",567.8);
}
function windowRename(){
	if(titleName.length<=3){
		$(document).attr('title', "White Blank Page");
	} else {
		$(document).attr('title', titleName);
	}
}

jQuery(document).ready(function() { 
 /* Sample Animations */
 //jQuery(".el_arco_iris, h3, #el_arco_iris li a").css("color","#333");
 randomColors();

 jQuery(".reload").on("click",function(){
	PanelSwap(".home_category","home page");
	jQuery(".navList li").removeClass("active");
	if(!History.enabled){
		//No History Mode Available.
		window.location = newURL+"?history="+newURL;
		return false;
	} else{
		var pageval = "?history="+"home";
		History.pushState(null, null,pageval);
	}
	return false;
 }); 

 jQuery(".brightToggle").on("click",function(){
	if(jQuery(".brightToggleTxt").hasClass("dark")==true){
		brightnessToggle("light");
	}else{
		brightnessToggle("dark");
	}
	return false;
 });

 // Toggle the dropdown menu's
 jQuery(".dropdown .button, .dropdown button").click(function () {
	if (!$(this).find('span.toggle').hasClass('active')) {
		$('.dropdown-slider').slideUp();
		$('span.toggle').removeClass('active');
	}

	// open selected dropown
	$(this).parent().find('.dropdown-slider').slideToggle('fast');
	$(this).find('span.toggle').toggleClass('active');
	
	return false;
 });
	
 //Facebox
 $('a[rel*=facebox]').facebox();
 $(".fbdemobtn").on("click",function(){
	var theText = $("#fbdemo").val();
	if(theText.length>=3){
		var demoHTML = "<h2 style='margin:10px 0 0 0;padding:0;' class='tC'>facebox demo</h2><div class='push'></div><p class='p10'>"+theText+"</p><div class='push'></div>";
		jQuery.facebox(demoHTML);
	}
	return false;
 });
 //ToolTips
 jQuery(".tipTip").tipTip();
 jQuery(".tipTipR").tipTip({
  defaultPosition:"right"
 });

 jQuery('.navList li a').on("click",function(){
  
  var thehref = $(this).attr("href");
  var substr = thehref.split('#');
  var thetarget = "."+substr[1]+"_category";
  PanelSwap(thetarget,substr[1]);

  jQuery(".navList li").removeClass("active");
  jQuery(this).parent().addClass("active");

  jQuery("html, body").animate({ scrollTop: 0 }, "slow");
  var newURL = encodeURIComponent(jQuery(this).attr("title"));

	/* History or Regular Click 
	(support for PHP $_GET in this example) if Not */
	if(!History.enabled){
		//No History Mode Available.
	} else{
		var pageval = "?history="+newURL;
		History.pushState(null, null, pageval);
	}

  jQuery(this).css("color","#f7f7f7");
  randomColors("true");
  return false;
 });

 //Reactive Navigation Menu
 var navobj = {"pull":".navpuller"};
 jQuery("nav#flex1 ul").reactiveNav(navobj);

 //Accordion Nav Menu
 jQuery(".accordion").accordionNav();
 
 //Flapper Girl Menu
 var ladyParts = {"title":".title_bar","loader":".pageloader","stage":".speakEasy"};
 jQuery("<div></div>").flapperGirl(ladyParts, callbackGirl);

 // Default pageslide, moves to the right
 $(".pageslide_first").pageslide();
 //Slide to the left, and make it model 
 //(you'll have to call $.pageslide.close() to close) 
 $(".pageslide_second").pageslide({ direction: "left", modal: true });

 //Notefy Demo
 jQuery(".notefytest").click(function(){
  var varone = $(".notefytm").val();
  var vartwo = $(".notefyfm").val();
  jQuery.shuffle(iconarray);
  notefy(varone, vartwo, iconarray[0], true);
  return false;
 });

 jQuery(".notefytestfull").click(function(){
  runfulltests();
  return false;
 });

 jQuery("#notefyIconList li").each(function(){
  var name = $(this).find('img').attr("title");
  jQuery(this).append("<p class='iconlabel'><em>"+name+"</em></p>")
 });

 jQuery('.paginatebox').jqPagination({
   paged: function(page) {
   // do something with the page variable
	notefy("paginate demo","page: "+page);
  }
 });

 //Scroll Panel
 //$('.scroll-pane').jScrollPane();

 jQuery("#hbbh").removeClass("none");

	$("table").stupidtable();
	
	/* fixed Fluid Horizontal Navbar header */
	/* 
	* nav menu used in the demo. build navbar from basic ul li list.
	* toggles a top:0 left:0 fixed class in your css.
	*/
	jQuery('.navList').horizontalNav({
	     prependTo : '#navbar'
	});
	var thetest = jQuery(window).width();
	if (thetest >= 777) {
		var top = jQuery('#el_arco_iris').offset().top;
		jQuery(window).scroll(function (event) {
			var y = jQuery(this).scrollTop();
			if (y >= top) { 
				jQuery('#el_arco_iris').addClass('superFix'); 
			} else { 
				jQuery('#el_arco_iris').removeClass('superFix'); 
			}
		});
	}
	
	/* intial page loader */
	if(History.enabled){
		var theHash = History.getState().hash;
		var substr = theHash.split('=');
		if(substr[1]!=""||substr[1]!=" "){
			//console.debug(substr[1]);
			HistoryDiz = "."+substr[1]+"_category";
			if(substr[1]==undefined){
				setTimeout("PanelSwap('.home_category','home page')",500);
			}else{
				jQuery('a[href$="'+substr[1]+'"]').parent("li").addClass("active");
				nextName = substr[1];
				setTimeout("PanelSwap(HistoryDiz,nextName)",500);
			}
		} else {
			setTimeout("PanelSwap('.home_category','home page')",500);
		}
	}
}); 

/* History.js Setup */
(function(window,undefined){

    // Prepare
    var History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !History.enabled ) {
		notefy("History.js","is disabled for this browser");
         // History.js is disabled for this browser.
         // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log(State.data, State.title, State.url);
    });
		
})(window);