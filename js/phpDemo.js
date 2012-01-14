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
		
	$('input[type=text]').labelify({
	  text: "label"
	});
	
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
	
	// Autocomplete List
	// Used on autocomplete example input box
	var countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
	
	// Add auto complete functionality.
	$("#countries").autocomplete({
		source: countryList
	});

//////////////////////////////////////////////////////////////		
	//ACTIONS EXAMPLE FUNCTIONS
//////////////////////////////////////////////////////////////	

	//button example for jGrowl Plugin
	$("#jGrowlMsgBtn").click(function() {
	//call jgrowl as below. Params are ('header','message','icon','sticky[optionally true]')
	jgrowl('jGrowl Alert','This Uses the jGrowl Plugin','ui-icon-huement-big');
	//this one will be sticky.
	jgrowl('jGrowl Sticky','I Wont go away until clicked','ui-icon-huement-big',true);
	return false;	
	});
	
	//highlight modal example
	//must add class='highlight' to original div also.
	//and button if you want that themed
	$('#modalHighlight_dialog').dialog({
		autoOpen: false,
		width: 400,
		draggable: true,
		dialogClass: 'highlight'
	});
	
	$('#modalHighlight').click(function(){
		$('#modalHighlight_dialog').dialog("option", "dialogClass", 'highlight');
		$('#modalHighlight_dialog').dialog('open');
		return false;
	});
	
	$('#modalHighlightClose').click(function(){
		$('#modalHighlight_dialog').dialog("close");
		return false;
	});
	
	//error modal example
	//must add class='error' to original div also.
	//and button if you want that themed
	$('#modalError_dialog').dialog({
		autoOpen: false,
		draggable: true,
		width: 500,
		dialogClass: 'highlight'
	});
	
	$('#modalError').click(function(){
		$('#modalError_dialog').dialog("option", "dialogClass", 'error');
		$('#modalError_dialog').dialog('open');
		return false;
	});
	
	$('#modalErrorClose').click(function(){
		$('#modalError_dialog').dialog("close");
		return false;
	});
	
	// Dialog Example		
	$('#dialog').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			}, 
			"Cancel": function() { 
				$(this).dialog("close"); 
			} 
		},
		modal: true
	});
	
	// Dialog Link
	$('#dialog_link').button().click(function(){
		$('#dialog').dialog('open');
		return false;
	});
	
	
//////////////////////////////////////////////////////////////	
	//WIDGETS EXAMPLE FUNCTIONS
//////////////////////////////////////////////////////////////	
	
	// Accordion Widgets
	$("#accordion").accordion();
	//$(".accordionTwo").accordion("option", "icons", false);
	
	// Datepicker Widget
	$('#datepicker').datepicker().children().show();
	
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
