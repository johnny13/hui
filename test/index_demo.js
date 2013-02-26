//This Script has
//Example Functions for the index.html hui demo

var counter = 0;     
var demo1 = 0;
var demo2 = 0;
var demo3 = 0;
var colorArr = ["#F10000","#57DB23","#49C5FF","#C14DF7","#FF993A"];
function checkboxes(){
 jQuery('.on_off :checkbox').iphoneStyle();
 jQuery('.disabled :checkbox').iphoneStyle();
 
 jQuery('.ios :checkbox').iphoneStyle();
 
 jQuery('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });

 var onchange_checkbox = (jQuery('.onchange :checkbox')).iphoneStyle({
  onChange: function(elem, value) { 
   jQuery('span#status').html(value.toString());
  }
 });

 setInterval(function() {
 onchange_checkbox.prop('checked', !onchange_checkbox.is(':checked')).iphoneStyle("refresh");
 return
 }, 2500);
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

function callbackGirl(){
 var htmlitem = jQuery(".speakEasy li.active").text();
 notefy("Clicked!",htmlitem);
}

function randomColors(){
 var shuffleArr = jQuery.shuffle(colorArr);
 //console.debug(shuffleArr);
 jQuery(".el_arco_iris, h3, #el_arco_iris li.active a").animate({color: colorArr[0]},4979);
 
 if(jQuery(document).width() <= 460){
  jQuery(".fhead").hide();
 }
 setTimeout("randomColors()",5013);
}

function brightnessToggle(newStyle){
 if(newStyle=="dark"){
  var darkStylecss = "src/themes/dark/dev-theme.css";
  //var darkFinal = '<link rel="stylesheet" type="text/css" href="'+darkStylecss+'" >';
  //jQuery(darkFinal).appendTo("head");
  $("#theme_sheet").attr("href", darkStylecss);
  jQuery(".brightToggleTxt").text("dark");
  jQuery("p, h1, h2, h3, h4").css("color","#f7f7f7");
 }
 if(newStyle=="light"){
  var darkStylecss = "src/themes/li3/dev-theme.css";
  //var darkFinal = '<link rel="stylesheet" type="text/css" href="'+darkStylecss+'" >';
  //jQuery(darkFinal).appendTo("head");
  $("#theme_sheet").attr("href", darkStylecss);
  jQuery(".brightToggleTxt").text("li3");
  jQuery("p, h1, h2, h3, h4").css("color","#1b1b1b");
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

jQuery(document).ready(function() { 
 /* Sample Animations */
 //jQuery(".el_arco_iris, h3, #el_arco_iris li a").css("color","#333");
 randomColors();
 
 jQuery(".brightToggle").on("click",function(){
  if(jQuery(".brightToggleTxt").text()=="dark"){
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
	
 //ToolTips
 jQuery(".tipTip").tipTip();
 jQuery(".tipTip").tipTip();
 jQuery(".tipTipR").tipTip({
  defaultPosition:"right"
  });

 //iOS Inspired Checkboxes
 checkboxes();

 //Kinema Demo
 jQuery(".rdx").click(function(){
  //Rotate
  if(demo1 === 0){
   jQuery('.box_x').transition({ 
   x: "100px",
      duration: 1000,
      easing: 'ease'
       }); 
        demo1 = 1;
  } else {
   jQuery('.box_x').transition({ 
    x: 0,
       duration: 1000,
       easing: 'ease'
   });
   demo1 = 0;
  }
 });
 
 jQuery(".rdy").click(function(){
  //Rotate
  if(demo2 === 0){
   jQuery('.box_y').transition({ 
    y: "100px",
       duration: 1000,
       easing: 'linear'
   });
        demo2 = 1;
  } else {
   jQuery('.box_y').transition({ 
    y: 0,
       duration: 1000,
       easing: 'linear'
   });
   demo2 = 0;
  }
 });
 
 //Fluid Horizontal Navbar
 jQuery('.fhead').horizontalNav({
     prependTo : 'body'
 });
 jQuery(".row.category").addClass("none");
 jQuery(".action_category").removeClass("none");
 jQuery('.fhead li a').on("click",function(){
  jQuery(".row.category").addClass("none");
  var thehref = $(this).attr("href");
  var substr = thehref.split('#');
  var thetarget = "."+substr[1]+"_category";
  jQuery(thetarget).removeClass("none");
  jQuery(".fhead li").removeClass("active");
  jQuery(this).parent().addClass("active");
  jQuery("html, body").animate({ scrollTop: 0 }, "slow");
  jQuery("#el_arco_iris li a").css("color","#f7f7f7");
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

 jQuery("#hbbh").removeClass("none");
}); 
