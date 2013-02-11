//This Script has
//Example Functions for the index.html hui demo

var counter = 0;     
var demo1 = 0;
var demo2 = 0;
var demo3 = 0;
var colorArr = ["#C20000","#37C200","#004EC2","#8400C2","#F56200"];
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
 jQuery(".el_arco_iris, h3, #el_arco_iris li a").animate({color: colorArr[0]},4979);
 
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

jQuery(document).ready(function() { 
 /* Sample Animations */
 jQuery(".el_arco_iris, h3, #el_arco_iris li a").css("color","#333");
 randomColors();
 
 jQuery(".brightToggle").on("click",function(){
  if(jQuery(".brightToggleTxt").text()=="dark"){
   brightnessToggle("light");
  }else{
   brightnessToggle("dark");
  }
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

 //Reactive Navigation Menu
 var navobj = {"pull":".navpuller"};
 jQuery("nav#flex1 ul").reactiveNav(navobj);

 //Accordion Nav Menu
 jQuery(".accordion").accordionNav();
 
 //Flapper Girl Menu
 var ladyParts = {"title":".title_bar","loader":".pageloader","stage":".speakEasy"};
 jQuery("<div></div>").flapperGirl(ladyParts, callbackGirl);
}); 
