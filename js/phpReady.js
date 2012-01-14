/* DOC READY 
* Huement-UI Demo------
* These Functions make the demo work. Adapt to your own needs
* author: @johnnyfortune ------*/

$(document).ready(function() {

	//This function preloads any images referenced in your style sheets.
	$.preloadCssImages();   
	
	// MAIN Tabs Widget
	$('#tabs').tabs({
	 });
	
	setUp();
	
	$('#shout_btn').button({icons: {big: "ui-icon-comment-big"}});
	$('#star_btn').button({icons: {big: "ui-icon-star-big"}});
	//$('#mainPageBtn').button({icons: {big: "ui-icon-star-big"}});
	//$('#mainPageBtn').button(icons: {big: "ui-icon-comment-big"}); 
	$('#avToggle').button({icons: {big: "ui-icon-arrow-1-n-big"}}).click(function() {	
	if($('#xmlExample').is(':visible')){
	$('#xmlVideoExample').show();
	$('#xmlExample').hide();
	} else {
	$('#xmlVideoExample').hide();
	$('#xmlExample').show();
	}
	return false;
	});
					 
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
	
	//Gives dialog functionality for the theme_switcher div
	//also gives confirm and cancel buttons
	$('#theme_switcher').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Close This": function() { 
				$(this).dialog("close"); 
			} 
		},
		modal: true
	});
		
	// brings up style sheet swapping dialog box.
	// TODO: Make this Work.
	$('#themeBtn').click(function(){
		$('#theme_switcher').dialog('open');
		return false;
	});
				
});

