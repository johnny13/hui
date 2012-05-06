/* 
* ajaxDemo DOC READY 
* Huement-UI Demo------
* This Functions applies the logic to what is loaded into the tabs. 
* this can't be done at the doc ready because the objects are not present.
* 
*/

function setUp(){
	//button example for jGrowl Plugin
	//////////////////////////////////////////////////////////////	
	//FORM EXAMPLE FUNCTIONS
	//////////////////////////////////////////////////////////////
	//iphone style checkbox toggles
	$('#Default').iphoneStyle({ 
		resizeContainer: true, 
		resizeHandle: true
	});
	
	$('#DefaultOn').iphoneStyle({ 
		resizeContainer: true, 
		resizeHandle: true, 
		onChange: function() {
	            notefy('checkbox','Doing Work');
	        } 
	});
	
	$('.disabled :checkbox').iphoneStyle({ 
		resizeContainer: true, 
		resizeHandle: true,
	});
	  
	var onchange_checkbox = $('#on_off_on:checked').iphoneStyle({ 
		resizeContainer: true, 
		resizeHandle: true
	});
	
	setInterval(function toggleCheckbox() {
	onchange_checkbox.attr('checked', !onchange_checkbox.is(':checked')).change();
	$('span#status').html(onchange_checkbox.is(':checked').toString());
	}, 2500);
	

//////////////////////////////////////////////////////////////		
	//ACTIONS EXAMPLE FUNCTIONS
//////////////////////////////////////////////////////////////	

	//button example for notefy / jGrowl Plugin
	$("#jGrowlMsgBtn").click(function() {
	//call jgrowl as below. Params are ('header','message','icon','sticky[optionally true]')
	notefy('Alert','call this with notefy()');
	//this one will be sticky.
	notefy('Sticky Alert','click to close',true,true);
	return false;	
	});

	// Dialog Link
	$('#dialog_link').button().click(function(){
		$('#dialog').dialog('open');
		return false;
	});
	
	
//////////////////////////////////////////////////////////////	
	//WIDGETS EXAMPLE FUNCTIONS
//////////////////////////////////////////////////////////////	
		
	// Horizontal Slider
	$('#horizSlider').slider({
		range: true,
		values: [30, 75]
	}).width(500);
	
	// Vertical Slider				
	$("#eq > span").each(function() {
		var value = parseInt($(this).text());
		$(this).empty().slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "vertical"
		});
	});
		
	//hover states on the static widgets
	$('#dialog_link, ul#icons li, ul#icons-big li, ul#icons-social li, ul#icons-social-small li').hover(
		function() { $(this).addClass('ui-state-active'); }, 
		function() { $(this).removeClass('ui-state-active'); }
	);
	
	// Buttons
	$("#divButton, #linkButton, input[type=file]").button();
	
	// Icon Buttons
	$("#leftIconButton").button({
		icons: {
			primary: 'ui-icon-wrench'
		}
	});
	
	// Icon Buttons
	$(".ui-bigBtn").button();
	
	$("#bothIconButton").button({
		icons: {
			primary: 'ui-icon-wrench',
			secondary: 'ui-icon-triangle-1-s'
		}
	});					
	
	// Button Set
	$("#radio1").buttonset();
	
	// Progressbar
	$("#progressbar").progressbar({
		value: 37
	}).width(500);
	// Progressbar
	$("#progressbar_thick").progressbar({
		value: 67
	}).width(500);
	
	$("#animateProgress").click(function(event) {
		var randNum = Math.random() * 90;
		var randomNum = Math.random() * 90;
		$("#progressbar div").animate( { width: randNum+"%" } );
		$("#progressbar_thick div").animate( { width: randomNum+"%" } );
		event.preventDefault();
	});
	
	// Combinations
	$('#tabs2').tabs();
	
	$("#buttonInModal").button({
		icons: {primary: 'ui-icon-wrench'}
	});
	
	// Nested button tests
	$("#nestedButtonTest_1, #nestedButtonTest_2, #buttonInModal").button().click(function(e) {
		e.preventDefault();
	});
}
