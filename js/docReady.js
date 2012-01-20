/* DOC READY 
* Huement-UI Demo------
* These Functions make the demo work. Adapt to your own needs
* author: @johnnyfortune ------*/

$(document).ready(function() {

//This function preloads any images referenced in your style sheets.
$.preloadCssImages();   
 

//FORM EXAMPLE FUNCTIONS

//iphone style checkbox toggles
$('.on_off :checkbox').iphoneStyle();
$('.disabled :checkbox').iphoneStyle();
$('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
$('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
  
var onchange_checkbox = $('.onchange :checkbox').iphoneStyle();
setInterval(function toggleCheckbox() {
onchange_checkbox.attr('checked', !onchange_checkbox.is(':checked')).change();
$('span#status').html(onchange_checkbox.is(':checked').toString());
}, 2500);
    
//Themes Changing Demo Shit
$('.themeToggle').fadeTo('fast', 0.5);
$('.themeToggle').hover(
	function() { $(this).fadeTo('slow', 1.0); }, 
	function() { $(this).fadeTo('slow', 0.5); }
);

$('.themeToggle').click(function() {	
//array is ["red","orange","lucky","blue","purple"];
	var themeChoice = $(this).attr('title');

	if(themeChoice == 'lucky'){
	var styleSheetURL = "css/Spectyle/hue-ui.teaLeaf.css";
	suitUp(styleSheetURL);
	}
	
	if(themeChoice == 'red'){
	var styleSheetURL = "css/Spectyle/hue-ui.cherryTree.css";
	suitUp(styleSheetURL);
	}
	
	if(themeChoice == 'ubuntu'){
	var styleSheetURL = "css/Spectyle/hue-ui.hueman.css";
	suitUp(styleSheetURL);
	}
	
return false;
});

//button example for jGrowl Plugin
$("#jGrowlMsgBtn").click(function() {
//call jgrowl as below. Params are ('header','message','icon','sticky[optionally true]')
jgrowl('jGrowl Alert','This Uses the jGrowl Plugin','ui-icon-huement-big');
//this one will be sticky.
jgrowl('jGrowl Sticky','I Wont go away until clicked','ui-icon-huement-big',true);
return false;	
});

	
// brings up style sheet swapping dialog box.
// TODO: Make this Work.
$('#themeBtn').click(function(){
	$('#theme_switcher').dialog('open');
	return false;
});
				
});