/**
* huement-ui 0.2
*
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Author: JohnnyFortune <@johnnyfortune>
* Last updated: 2011.10.02
*
* huement-ui is a friendly user interface. It integrates popular jquery plugins 
* to completly adapt the user experience to a modern easy to use design
* More info (http://spectyle.huement.com).
*
*  CONTENTS of huement-ui
*
* see each section for more information and each plugin's homepage and documentation.
*
*  S01. Action Functions ( shuffle, preload, command, extras)
*  S02. jGrowl 1.2.5
*  S03. Form Manipulation (jqTransform, jQuery.labelify, iPhone-style Checkboxes)
*  S04. 
*  S05. 
*  S06. 
*
*/

/************************************************ [S01] Actions */
 
/* shuffle things */
/* example| $.shuffle(colorArray); */
(function($){
  $.fn.shuffle = function() {
    return this.each(function(){
      var items = $(this).children();
      return (items.length)
        ? $(this).html($.shuffle(items))
        : this;
    });
  }
 
  $.shuffle = function(arr) {
    for(
      var j, x, i = arr.length; i;
      j = parseInt(Math.random() * i),
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }
})(jQuery);

//Load a Style Sheet function. 
//example suitUp("css/style.css");
// use <style>@import url("file.css");</style> for any stylesheets you dont want swapped
// great for loading small theme/color changes on the fly.
function suitUp(styleSheetURL){
	$("link[rel=stylesheet]").attr({href : styleSheetURL});
}


/* Adapted jgrowl function. Call it with two parameters */
/* The first is the Header. The second is the message. */
/* example: jgrowl('title','message'); */

var icon = 'ui-icon-discordial-big'; //default icon

function jgrowl(headerMsg,msg,icon,sticky){
	//icon = 'ui-icon-huement-big';
	if(sticky == 'undefined'){
	var stickyop = false;
	} else if (sticky == true){
	var stickyop = true;
	}
	$.jGrowl(msg, {
	header: headerMsg,
	position: 'top-right',
	afterOpen:function() {$('.ui-icon-jgrowl').addClass(icon);},
	sticky: stickyop
	});
}

/**
 * jQuery-Plugin "preloadCssImages"
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * preloads any images it finds in your css files.
 * --------------------------------------------------------------------
 */

;jQuery.preloadCssImages = function(settings){
	settings = jQuery.extend({
		statusTextEl: null,
		statusBarEl: null,
		errorDelay: 999, // handles 404-Errors in IE
		simultaneousCacheLoading: 2
	}, settings);
	var allImgs = [],
		loaded = 0,
		imgUrls = [],
		thisSheetRules,	
		errorTimer;
	
	function onImgComplete(){
		clearTimeout(errorTimer);
		if (imgUrls && imgUrls.length && imgUrls[loaded]) {
			loaded++;
			if (settings.statusTextEl) {
				var nowloading = (imgUrls[loaded]) ? 
					'Now Loading: <span>' + imgUrls[loaded].split('/')[imgUrls[loaded].split('/').length - 1] : 
					'Loading complete'; // wrong status-text bug fixed
				jQuery(settings.statusTextEl).html('<span class="numLoaded">' + loaded + '</span> of <span class="numTotal">' + imgUrls.length + '</span> loaded (<span class="percentLoaded">' + (loaded / imgUrls.length * 100).toFixed(0) + '%</span>) <span class="currentImg">' + nowloading + '</span></span>');
			}
			if (settings.statusBarEl) {
				var barWidth = jQuery(settings.statusBarEl).width();
				jQuery(settings.statusBarEl).css('background-position', -(barWidth - (barWidth * loaded / imgUrls.length).toFixed(0)) + 'px 50%');
			}
			loadImgs();
		}
	}
	
	function loadImgs(){
		//only load 1 image at the same time / most browsers can only handle 2 http requests, 1 should remain for user-interaction (Ajax, other images, normal page requests...)
		// otherwise set simultaneousCacheLoading to a higher number for simultaneous downloads
		if(imgUrls && imgUrls.length && imgUrls[loaded]){
			var img = new Image(); //new img obj
			img.src = imgUrls[loaded];	//set src either absolute or rel to css dir
			if(!img.complete){
				jQuery(img).bind('error load onreadystatechange', onImgComplete);
			} else {
				onImgComplete();
			}
			errorTimer = setTimeout(onImgComplete, settings.errorDelay); // handles 404-Errors in IE
		}
	}
	
	function parseCSS(sheets, urls) {
		var w3cImport = false,
			imported = [],
			importedSrc = [],
			baseURL;
		var sheetIndex = sheets.length;
		while(sheetIndex--){//loop through each stylesheet
			
			var cssPile = '';//create large string of all css rules in sheet
			
			if(urls && urls[sheetIndex]){
				baseURL = urls[sheetIndex];
			} else {
				var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
				var baseURLarr = csshref.split('/');//split href at / to make array
				baseURLarr.pop();//remove file path from baseURL array
				baseURL = baseURLarr.join('/');//create base url for the images in this sheet (css file's dir)
				if (baseURL) {
					baseURL += '/'; //tack on a / if needed
				}
			}
			if(sheets[sheetIndex].cssRules || sheets[sheetIndex].rules){
				thisSheetRules = (sheets[sheetIndex].cssRules) ? //->>> http://www.quirksmode.org/dom/w3c_css.html
					sheets[sheetIndex].cssRules : //w3
					sheets[sheetIndex].rules; //ie 
				var ruleIndex = thisSheetRules.length;
				while(ruleIndex--){
					if(thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText){
						var text = thisSheetRules[ruleIndex].style.cssText;
						if(text.toLowerCase().indexOf('url') != -1){ // only add rules to the string if you can assume, to find an image, speed improvement
							cssPile += text; // thisSheetRules[ruleIndex].style.cssText instead of thisSheetRules[ruleIndex].cssText is a huge speed improvement
						}
					} else if(thisSheetRules[ruleIndex].styleSheet) {
						imported.push(thisSheetRules[ruleIndex].styleSheet);
						w3cImport = true;
					}
					
				}
			}
			//parse cssPile for image urls
			var tmpImage = cssPile.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);//reg ex to get a string of between a "(" and a ".filename" / '"' for opera-bugfix
			if(tmpImage){
				var i = tmpImage.length;
				while(i--){ // handle baseUrl here for multiple stylesheets in different folders bug
					var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? // protocol-bug fixed
						tmpImage[i] : 
						baseURL + tmpImage[i];
					
					if(jQuery.inArray(imgSrc, imgUrls) == -1){
						imgUrls.push(imgSrc);
					}
				}
			}
			
			if(!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
				for(var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++){
					var iHref = sheets[sheetIndex].imports[iImport].href;
					iHref = iHref.split('/');
					iHref.pop();
					iHref = iHref.join('/');
					if (iHref) {
						iHref += '/'; //tack on a / if needed
					}
					var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? // protocol-bug fixed
						iHref : 
						baseURL + iHref;
					
					importedSrc.push(iSrc);
					imported.push(sheets[sheetIndex].imports[iImport]);
				}
				
				
			}
		}//loop
		if(imported.length){
			parseCSS(imported, importedSrc);
			return false;
		}
		var downloads = settings.simultaneousCacheLoading;
		while( downloads--){
			setTimeout(loadImgs, downloads);
		}
	}
	parseCSS(document.styleSheets);
	return imgUrls;
};

//Make a manual call to preload an image not listed in your stylesheets.
// example| jQuery.preLoadImages("image.gif", "/path/to/image_two.png");
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery);

/************************************************ [S02] jGrowl */
/**
 * jGrowl 1.2.5
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by Stan Lemon <stosh1985@gmail.com>
 * Last updated: 2009.12.15
 *
 * jGrowl is a jQuery plugin implementing unobtrusive userland notifications.  These 
 * notifications function similarly to the Growl Framework available for
 * Mac OS X (http://growl.info).
 */
(function($) {

	/** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
	$.jGrowl = function( m , o ) {
		// To maintain compatibility with older version that only supported one instance we'll create the base container.
		if ( $('#jGrowl').size() == 0 ) 
			$('<div id="jGrowl"></div>').addClass( (o && o.position) ? o.position : $.jGrowl.defaults.position ).appendTo('body');

		// Create a notification on the container.
		$('#jGrowl').jGrowl(m,o);
	};


	/** Raise jGrowl Notification on a jGrowl Container **/
	$.fn.jGrowl = function( m , o ) {
		if ( $.isFunction(this.each) ) {
			var args = arguments;

			return this.each(function() {
				var self = this;

				/** Create a jGrowl Instance on the Container if it does not exist **/
				if ( $(this).data('jGrowl.instance') == undefined ) {
					$(this).data('jGrowl.instance', $.extend( new $.fn.jGrowl(), { notifications: [], element: null, interval: null } ));
					$(this).data('jGrowl.instance').startup( this );
				}

				/** Optionally call jGrowl instance methods, or just raise a normal notification **/
				if ( $.isFunction($(this).data('jGrowl.instance')[m]) ) {
					$(this).data('jGrowl.instance')[m].apply( $(this).data('jGrowl.instance') , $.makeArray(args).slice(1) );
				} else {
					$(this).data('jGrowl.instance').create( m , o );
				}
			});
		};
	};

	$.extend( $.fn.jGrowl.prototype , {

		/** Default JGrowl Settings **/
		defaults: {
			pool: 			0,
			header: 		'',
			group: 			'',
			sticky: 		false,
			position: 		'top-right',
			glue: 			'after',
			theme: 			'default',
			themeState: 	'highlight',
			corners: 		'3px',
			check: 			250,
			life: 			3000,
			closeDuration:  'normal',
			openDuration:   'normal',
			easing: 		'swing',
			closer: 		true,
			closeTemplate: '&times;',
			closerTemplate: '<div>[ close all ]</div>',
			log: 			function(e,m,o) {},
			beforeOpen: 	function(e,m,o) {},
			afterOpen: 		function(e,m,o) {},
			open: 			function(e,m,o) {},
			beforeClose: 	function(e,m,o) {},
			close: 			function(e,m,o) {},
			animateOpen: 	{
				opacity: 	'show'
			},
			animateClose: 	{
				opacity: 	'hide'
			}
		},
		
		notifications: [],
		
		/** jGrowl Container Node **/
		element: 	null,
	
		/** Interval Function **/
		interval:   null,
		
		/** Create a Notification **/
		create: 	function( message , o ) {
			var o = $.extend({}, this.defaults, o);

			/* To keep backward compatibility with 1.24 and earlier, honor 'speed' if the user has set it */
			if (typeof o.speed !== 'undefined') {
				o.openDuration = o.speed;
				o.closeDuration = o.speed;
			}

			this.notifications.push({ message: message , options: o });
			
			o.log.apply( this.element , [this.element,message,o] );
		},
		
		render: 		function( notification ) {
			var self = this;
			var message = notification.message;
			var o = notification.options;

			var notification = $(
				'<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
				((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '"><div class="ui-icon-jgrowl"></div>' +
				'<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
				'<div class="jGrowl-header">' + o.header + '</div>' +
				'<div class="jGrowl-message">' + message + '</div></div>'
			).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
				$(this).parent().trigger('jGrowl.close');
			}).parent();


			/** Notification Actions **/
			$(notification).bind("mouseover.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", true);
			}).bind("mouseout.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", false);
			}).bind('jGrowl.beforeOpen', function() {
				if ( o.beforeOpen.apply( notification , [notification,message,o,self.element] ) != false ) {
					$(this).trigger('jGrowl.open');
				}
			}).bind('jGrowl.open', function() {
				if ( o.open.apply( notification , [notification,message,o,self.element] ) != false ) {
					if ( o.glue == 'after' ) {
						$('div.jGrowl-notification:last', self.element).after(notification);
					} else {
						$('div.jGrowl-notification:first', self.element).before(notification);
					}
					
					$(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
						// Fixes some anti-aliasing issues with IE filters.
						if ($.browser.msie && (parseInt($(this).css('opacity'), 10) === 1 || parseInt($(this).css('opacity'), 10) === 0))
							this.style.removeAttribute('filter');

						$(this).data("jGrowl").created = new Date();
						
						$(this).trigger('jGrowl.afterOpen');
					});
				}
			}).bind('jGrowl.afterOpen', function() {
				o.afterOpen.apply( notification , [notification,message,o,self.element] );
			}).bind('jGrowl.beforeClose', function() {
				if ( o.beforeClose.apply( notification , [notification,message,o,self.element] ) != false )
					$(this).trigger('jGrowl.close');
			}).bind('jGrowl.close', function() {
				// Pause the notification, lest during the course of animation another close event gets called.
				$(this).data('jGrowl.pause', true);
				$(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
					$(this).remove();
					var close = o.close.apply( notification , [notification,message,o,self.element] );

					if ( $.isFunction(close) )
						close.apply( notification , [notification,message,o,self.element] );
				});
			}).trigger('jGrowl.beforeOpen');
		
			/** Optional Corners Plugin **/
			if ( o.corners != '' && $.fn.corner != undefined ) $(notification).corner( o.corners );

			/** Add a Global Closer if more than one notification exists **/
			if ( $('div.jGrowl-notification:parent', self.element).size() > 1 && 
				 $('div.jGrowl-closer', self.element).size() == 0 && this.defaults.closer != false ) {
				$(this.defaults.closerTemplate).addClass('jGrowl-closer ui-state-highlight ui-corner-all').addClass(this.defaults.theme)
					.appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing)
					.bind("click.jGrowl", function() {
						$(this).siblings().trigger("jGrowl.beforeClose");

						if ( $.isFunction( self.defaults.closer ) ) {
							self.defaults.closer.apply( $(this).parent()[0] , [$(this).parent()[0]] );
						}
					});
			};
		},

		/** Update the jGrowl Container, removing old jGrowl notifications **/
		update:	 function() {
			$(this.element).find('div.jGrowl-notification:parent').each( function() {
				if ( $(this).data("jGrowl") != undefined && $(this).data("jGrowl").created != undefined && 
					 ($(this).data("jGrowl").created.getTime() + parseInt($(this).data("jGrowl").life))  < (new Date()).getTime() && 
					 $(this).data("jGrowl").sticky != true && 
					 ($(this).data("jGrowl.pause") == undefined || $(this).data("jGrowl.pause") != true) ) {

					// Pause the notification, lest during the course of animation another close event gets called.
					$(this).trigger('jGrowl.beforeClose');
				}
			});

			if ( this.notifications.length > 0 && 
				 (this.defaults.pool == 0 || $(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool) )
				this.render( this.notifications.shift() );

			if ( $(this.element).find('div.jGrowl-notification:parent').size() < 2 ) {
				$(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
					$(this).remove();
				});
			}
		},

		/** Setup the jGrowl Notification Container **/
		startup:	function(e) {
			this.element = $(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
			this.interval = setInterval( function() { 
				$(e).data('jGrowl.instance').update(); 
			}, parseInt(this.defaults.check));
			
			if ($.browser.msie && parseInt($.browser.version) < 7 && !window["XMLHttpRequest"]) {
				$(this.element).addClass('ie6');
			}
		},

		/** Shutdown jGrowl, removing it and clearing the interval **/
		shutdown:   function() {
			$(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();
			clearInterval( this.interval );
		},
		
		close: 	function() {
			$(this.element).find('div.jGrowl-notification').each(function(){
				$(this).trigger('jGrowl.beforeClose');
			});
		}
	});
	
	/** Reference the Defaults Object for compatibility with older versions of jGrowl **/
	$.jGrowl.defaults = $.fn.jGrowl.prototype.defaults;

})(jQuery);

/************************************************ [S03] Form Manipulation */


/* Select box manipulation Plugin [http://www.texotela.co.uk/code/jquery/select]
 *
 * Copyright (c) 2006 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Addepted to select an option by Mathias Bank (http://www.mathias-bank.de)
 */
 
/*
 * Adds (single/multiple) options to a select box (or series of select boxes)
 *
 * @name     addOption
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#myselect").addOption("Value", "Text"); // add single value (will be selected)
 *           $("#myselect").addOption("Value 2", "Text 2", false); // add single value (won't be selected)
 *           $("#myselect").addOption({"foo":"bar","bar":"baz"}, false); // add multiple values, but don't select
 *
 */
jQuery.fn.addOption = function()
{
	if(arguments.length == 0) return this;
	// select option when added? default is true
	var selectOption = true;
	// multiple items
	var multiple = false;
	if(typeof arguments[0] == "object")
	{
		multiple = true;
		var items = arguments[0];
	}
	if(arguments.length >= 2)
	{
		if(typeof arguments[1] == "boolean") selectOption = arguments[1];
		else if(typeof arguments[2] == "boolean") selectOption = arguments[2];
		if(!multiple)
		{
			var value = arguments[0];
			var text = arguments[1];
		}
	}
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			if(multiple)
			{
				for(var v in items)
				{
					jQuery(this).addOption(v, items[v], selectOption);
				}
			}
			else
			{
				var option = document.createElement("option");
				option.value = value;
				option.text = text;
				this.options.add(option);
			}
			if(selectOption)
			{
				this.options[this.options.length-1].selected = true;
			}
		}
	)
	return this;
}

/*
* Removes an option (by value or index) from a select box (or series of select boxes)
*
* @name     removeOption
* @author   Sam Collett (http://www.texotela.co.uk)
* @example  jQuery("#myselect").removeOption("Value"); // remove by value
*           jQuery("#myselect").removeOption(0); // remove by index
*
*/
jQuery.fn.removeOption = function()
{
	if(arguments.length == 0) return this;
	if(typeof arguments[0] == "string") var value = arguments[0];
	else if(typeof arguments[0] == "number") var index = arguments[0];
	else return this;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			if(value)
			{
				var optionsLength = this.options.length;
				for(var i=optionsLength-1; i>=0; i--)
				{
					if(this.options[i].value == value)
					{
						this.options[i] = null;
					}
				}
			}
			else
			{
				this.remove(index);
			}
		}
	)
	return this;
}

/*
* Sort options (ascending or descending) in a select box (or series of select boxes)
*
* @name     sortOptions
* @author   Sam Collett (http://www.texotela.co.uk)
* @param    ascending   Sort ascending (true/undefined), or descending (false)
* @example  // ascending
*           jQuery("#myselect").sortOptions(); // or jQuery("#myselect").sortOptions(true);
*           // descending
*           jQuery("#myselect").sortOptions(false);
*
*/
jQuery.fn.sortOptions = function(ascending)
{
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			// default sort is ascending if parameter is undefined
			ascending = typeof ascending == "undefined" ? true : ascending;
			// get number of options
			var optionsLength = this.options.length;
			// create an array for sorting
			var sortArray = [];
			// loop through options, adding to sort array
			for(var i = 0; i<optionsLength; i++)
			{
				sortArray[i] =
				{
					value: this.options[i].value,
					text: this.options[i].text
				};
			}
			// sort items in array
			sortArray.sort(
				function(option1, option2)
				{
					// option text is made lowercase for case insensitive sorting
					option1text = option1.text.toLowerCase();
					option2text = option2.text.toLowerCase();
					// if options are the same, no sorting is needed
					if(option1text == option2text) return 0;
					if(ascending)
					{
						return option1text < option2text ? -1 : 1;
					}
					else
					{
						return option1text > option2text ? -1 : 1;
					}
				}
			);
			// change the options to match the sort array
			for(var i = 0; i<optionsLength; i++)
			{
				this.options[i].text = sortArray[i].text;
				this.options[i].value = sortArray[i].value;
			}
		}
	)
	return this;
}

/*
 * Selects an option by value
 *
 * @name     selectOptions
 * @author   Mathias Bank (http://www.mathias-bank.de)
 * @param    value specifies, which options should be selected
 * @example  jQuery("#myselect").selectOptions("val1");
 *
 */
jQuery.fn.selectOptions = function(value) {
	this.each(
		function()	{
			if(this.nodeName.toLowerCase() != "select") return;
			
			// get number of options
			var optionsLength = this.options.length;
			
			
			for(var i = 0; i<optionsLength; i++) {
				if (this.options[i].value == value) {
					this.options[i].selected = true;
				};
			}
		}
	)
	return this;
};


/*
 *
 * jqTransForm
 * by mathieu vilaplana mvilaplana@dfc-e.com
 * Designer ghyslain armand garmand@dfc-e.com
 *
 *
 * Version 1.0 25.09.08
 * Version 1.1 06.08.09
 * Add event click on Checkbox and Radio
 * Auto calculate the size of a select element
 * Can now, disabled the elements
 * Correct bug in ff if click on select (overflow=hidden)
 * 
 *
 * huement-ui only uses the select box parts of jqTransform
 * 
 ******************************************** */
 
(function($){
	var defaultOptions = {preloadImg:true};
	var jqTransformImgPreloaded = false;

	var jqTransformPreloadHoverFocusImg = function(strImgUrl) {
		//guillemets to remove for ie
		strImgUrl = strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1');
		var imgHover = new Image();
		imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1');
		var imgFocus = new Image();
		imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1');				
	};

	
	/***************************
	  Select Box Labels
	***************************/
	var jqTransformGetLabel = function(objfield){
		var selfForm = $(objfield.get(0).form);
		var oLabel = objfield.next();
		if(!oLabel.is('label')) {
			oLabel = objfield.prev();
			if(oLabel.is('label')){
				var inputname = objfield.attr('id');
				if(inputname){
					oLabel = selfForm.find('label[for="'+inputname+'"]');
				} 
			}
		}
		if(oLabel.is('label')){return oLabel.css('cursor','pointer');}
		return false;
	};
	
	/* Hide all open selects */
	var jqTransformHideSelect = function(oTarget){
		var ulVisible = $('.jqTransformSelectWrapper ul:visible');
		ulVisible.each(function(){
			var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
			//do not hide if click on the label object associated to the select
			if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
		});
	};
	/* Check for an external click */
	var jqTransformCheckExternalClick = function(event) {
		if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
	};

	/* Apply document listener */
	var jqTransformAddDocumentListener = function (){
		$(document).mousedown(jqTransformCheckExternalClick);
	};	
			
	/* Add a new handler for the reset action */
	var jqTransformReset = function(f){
		var sel;
		$('.jqTransformSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
	};
	
	
	
	/***************************
	  Select 
	 ***************************/	
	$.fn.jqTransSelect = function(){
		return this.each(function(index){
			var $select = $(this);

			if($select.hasClass('jqTransformHidden')) {return;}
			if($select.attr('multiple')) {return;}

			var oLabel  =  jqTransformGetLabel($select);
			/* First thing we do is Wrap it */
			var $wrapper = $select
				.addClass('jqTransformHidden')
				.wrap('<div class="jqTransformSelectWrapper"></div>')
				.parent()
				.css({zIndex: 10-index})
			;
			
			/* Now add the html for the select */
			$wrapper.prepend('<div><span></span><a href="#" class="jqTransformSelectOpen"></a></div><ul></ul>');
			var $ul = $('ul', $wrapper).css('width',$select.width()).hide();
			/* Now we add the options */
			$('option', this).each(function(i){
				var oLi = $('<li><a href="#" index="'+ i +'">'+ $(this).html() +'</a></li>');
				$ul.append(oLi);
			});
			
			/* Add click handler to the a */
			$ul.find('a').click(function(){
					$('a.selected', $wrapper).removeClass('selected');
					$(this).addClass('selected');	
					/* Fire the onchange event */
					if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
					$select[0].selectedIndex = $(this).attr('index');
					$('span:eq(0)', $wrapper).html($(this).html());
					$ul.hide();
					return false;
			});
			/* Set the default */
			$('a:eq('+ this.selectedIndex +')', $ul).click();
			$('span:first', $wrapper).click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
			oLabel && oLabel.click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
			this.oLabel = oLabel;
			
			/* Apply the click handler to the Open */
			var oLinkOpen = $('a.jqTransformSelectOpen', $wrapper)
				.click(function(){
					//Check if box is already open to still allow toggle, but close all other selects
					if( $ul.css('display') == 'none' ) {jqTransformHideSelect();} 
					if($select.attr('disabled')){return false;}

					$ul.slideToggle('fast', function(){					
						var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
						$ul.animate({scrollTop: offSet});
					});
					return false;
				})
			;

			// Set the new width
			var iSelectWidth = $select.outerWidth();
			var oSpan = $('span:first',$wrapper);
			var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
			$wrapper.css('width',newWidth);
			$ul.css('width',newWidth-2);
			oSpan.css({width:iSelectWidth});
		
			// Calculate the height if necessary, less elements that the default height
			//show the ul to calculate the block, if ul is not displayed li height value is 0
			$ul.css({display:'block',visibility:'hidden'});
			var iSelectHeight = ($('li',$ul).length)*($('li:first',$ul).height());//+1 else bug ff
			(iSelectHeight < $ul.height()) && $ul.css({height:iSelectHeight,'overflow':'hidden'});//hidden else bug with ff
			$ul.css({display:'none',visibility:'visible'});
			
		});
	};
	$.fn.jqTransform = function(options){
		var opt = $.extend({},defaultOptions,options);
		
		/* each form */
		 return this.each(function(){
			var selfForm = $(this);
			if(selfForm.hasClass('jqtransformdone')) {return;}
			selfForm.addClass('jqtransformdone');
						
			if( $('select', this).jqTransSelect().length > 0 ){jqTransformAddDocumentListener();}
			selfForm.bind('reset',function(){var action = function(){jqTransformReset(this);}; window.setTimeout(action, 10);});

		}); /* End Form each */
				
	};/* End the Plugin */

})(jQuery);
	
/**
 * jQuery.labelify - Display in-textbox hints
 * Stuart Langridge, http://www.kryogenix.org/
 * Released into the public domain
 * Date: 25th June 2008
 * @author Stuart Langridge
 * @version 1.3
 *
 *
 * Basic calling syntax: $("input").labelify();
 * Defaults to taking the in-field label from the field's title attribute
 *
 * You can also pass an options object with the following keys:
 *   text
 *     "title" to get the in-field label from the field's title attribute 
 *      (this is the default)
 *     "label" to get the in-field label from the inner text of the field's label
 *      (note that the label must be attached to the field with for="fieldid")
 *     a function which takes one parameter, the input field, and returns
 *      whatever text it likes
 *
 *   labelledClass
 *     a class that will be applied to the input field when it contains the
 *      label and removed when it contains user input. Defaults to blank.
 *  
 */
jQuery.fn.labelify = function(settings) {
  settings = jQuery.extend({
    text: "title",
    labelledClass: ""
  }, settings);
  var lookups = {
    title: function(input) {
      return $(input).attr("title");
    },
    label: function(input) {
      return $("label[for=" + input.id +"]").text();
    }
  };
  var lookup;
  var jQuery_labellified_elements = $(this);
  return $(this).each(function() {
    if (typeof settings.text === "string") {
      lookup = lookups[settings.text]; // what if not there?
    } else {
      lookup = settings.text; // what if not a fn?
    };
    // bail if lookup isn't a function or if it returns undefined
    if (typeof lookup !== "function") { return; }
    var lookupval = lookup(this);
    if (!lookupval) { return; }

    // need to strip newlines because the browser strips them
    // if you set textbox.value to a string containing them    
    $(this).data("label",lookup(this).replace(/\n/g,''));
    $(this).focus(function() {
      if (this.value === $(this).data("label")) {
        this.value = this.defaultValue;
        $(this).removeClass(settings.labelledClass);
      }
    }).blur(function(){
      if (this.value === this.defaultValue) {
        this.value = $(this).data("label");
        $(this).addClass(settings.labelledClass);
      }
    });
    
    var removeValuesOnExit = function() {
      jQuery_labellified_elements.each(function(){
        if (this.value === $(this).data("label")) {
          this.value = this.defaultValue;
          $(this).removeClass(settings.labelledClass);
        }
      })
    };
    
    $(this).parents("form").submit(removeValuesOnExit);
    $(window).unload(removeValuesOnExit);
    
    if (this.value !== this.defaultValue) {
      // user already started typing; don't overwrite their work!
      return;
    }
    // actually set the value
    this.value = $(this).data("label");
    $(this).addClass(settings.labelledClass);

  });
};

/*!
// iPhone-style Checkboxes jQuery plugin
// Copyright Thomas Reynolds, licensed GPL & MIT
*/
;(function($, iphoneStyle) {

// Constructor
$[iphoneStyle] = function(elem, options) {
  this.$elem = $(elem);
  
  // Import options into instance variables
  var obj = this;
  $.each(options, function(key, value) {
    obj[key] = value;
  });
  
  // Initialize the control
  this.wrapCheckboxWithDivs();
  this.attachEvents();
  this.disableTextSelection();
  
  if (this.resizeHandle)    { this.optionallyResize('handle'); }
  if (this.resizeContainer) { this.optionallyResize('container'); }
  
  this.initialPosition();
};

$.extend($[iphoneStyle].prototype, {
  // Wrap the existing input[type=checkbox] with divs for styling and grab DOM references to the created nodes
  wrapCheckboxWithDivs: function() {
    this.$elem.wrap('<div class="' + this.containerClass + '" />');
    this.container = this.$elem.parent();
    
    this.offLabel  = $('<label class="'+ this.labelOffClass +'">' +
                         '<span>'+ this.uncheckedLabel +'</span>' +
                       '</label>').appendTo(this.container);
    this.offSpan   = this.offLabel.children('span');
    
    this.onLabel   = $('<label class="'+ this.labelOnClass +'">' +
                         '<span>'+ this.checkedLabel +'</span>' +
                       '</label>').appendTo(this.container);
    this.onSpan    = this.onLabel.children('span');
    
    this.handle    = $('<div class="' + this.handleClass + '">' +
                        
                       '</div>').appendTo(this.container);
  },
  
  // Disable IE text selection, other browsers are handled in CSS
  disableTextSelection: function() {
    if (!$.browser.msie) { return; }

    // Elements containing text should be unselectable
    $.each([this.handle, this.offLabel, this.onLabel, this.container], function() {
      $(this).attr("unselectable", "on");
    });
  },
  
  // Automatically resize the handle or container
  optionallyResize: function(mode) {
    var onLabelWidth  = this.onLabel.width(),
        offLabelWidth = this.offLabel.width();
        
    if (mode == 'container') {
      var newWidth = (onLabelWidth > offLabelWidth) ? onLabelWidth : offLabelWidth;
      newWidth += this.handle.width() + 50; 
    } else { 
      var newWidth = (onLabelWidth < offLabelWidth) ? onLabelWidth : offLabelWidth;
    }
    
    this[mode].css({ width: newWidth });
  },
  
  attachEvents: function() {
    var obj = this;
    
    // A mousedown anywhere in the control will start tracking for dragging
    this.container
      .bind('mousedown touchstart', function(event) {          
        event.preventDefault();
        
        if (obj.$elem.is(':disabled')) { return; }
          
        var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
        $[iphoneStyle].currentlyClicking = obj.handle;
        $[iphoneStyle].dragStartPosition = x;
        $[iphoneStyle].handleLeftOffset  = parseInt(obj.handle.css('left'), 10) || 0;
        $[iphoneStyle].dragStartedOn     = obj.$elem;
      })
    
      // Utilize event bubbling to handle drag on any element beneath the container
      .bind('iPhoneDrag', function(event, x) {
        event.preventDefault();
        
        if (obj.$elem.is(':disabled')) { return; }
        if (obj.$elem != $[iphoneStyle].dragStartedOn) { return; }
        
        var p = (x + $[iphoneStyle].handleLeftOffset - $[iphoneStyle].dragStartPosition) / obj.rightSide;
        if (p < 0) { p = 0; }
        if (p > 1) { p = 1; }
        obj.handle.css({ left: p * obj.rightSide });
        obj.onLabel.css({ width: p * obj.rightSide + 4 });
        obj.offSpan.css({ marginRight: -p * obj.rightSide });
        obj.onSpan.css({ marginLeft: -(1 - p) * obj.rightSide });
      })
    
        // Utilize event bubbling to handle drag end on any element beneath the container
      .bind('iPhoneDragEnd', function(event, x) {
        if (obj.$elem.is(':disabled')) { return; }
        
        var checked;
        if ($[iphoneStyle].dragging) {
          var p = (x - $[iphoneStyle].dragStartPosition) / obj.rightSide;
          checked = (p < 0) ? Math.abs(p) < 0.5 : p >= 0.5;
        } else {
          checked = !obj.$elem.attr('checked');
        }
        
        obj.$elem.attr('checked', checked);

        $[iphoneStyle].currentlyClicking = null;
        $[iphoneStyle].dragging = null;
        obj.$elem.change();
      });
  
    // Animate when we get a change event
    this.$elem.change(function() {
      if (obj.$elem.is(':disabled')) {
        obj.container.addClass(obj.disabledClass);
        return false;
      } else {
        obj.container.removeClass(obj.disabledClass);
      }
      
      var new_left = obj.$elem.attr('checked') ? obj.rightSide : 0;

      obj.handle.animate({         left: new_left },                 obj.duration);
      obj.onLabel.animate({       width: new_left + 4 },             obj.duration);
      obj.offSpan.animate({ marginRight: -new_left },                obj.duration);
      obj.onSpan.animate({   marginLeft: new_left - obj.rightSide }, obj.duration);
    });
  },
  
  // Setup the control's inital position
  initialPosition: function() {
    this.offLabel.css({ width: this.container.width() - 5 });

    var offset = ($.browser.msie && $.browser.version < 7) ? 3 : 6;
    this.rightSide = this.container.width() - this.handle.width() - offset;

    if (this.$elem.is(':checked')) {
      this.handle.css({ left: this.rightSide });
      this.onLabel.css({ width: this.rightSide + 4 });
      this.offSpan.css({ marginRight: -this.rightSide });
    } else {
      this.onLabel.css({ width: 0 });
      this.onSpan.css({ marginLeft: -this.rightSide });
    }
    
    if (this.$elem.is(':disabled')) {
      this.container.addClass(this.disabledClass);
    }
  }
});

// jQuery-specific code
$.fn[iphoneStyle] = function(options) {
  var checkboxes = this.filter(':checkbox');
  
  // Fail early if we don't have any checkboxes passed in
  if (!checkboxes.length) { return this; }
  
  // Merge options passed in with global defaults
  var opt = $.extend({}, $[iphoneStyle].defaults, options);
  
  checkboxes.each(function() {
    $(this).data(iphoneStyle, new $[iphoneStyle](this, opt));
  });

  if (!$[iphoneStyle].initComplete) {
    // As the mouse moves on the page, animate if we are in a drag state
    $(document)
      .bind('mousemove touchmove', function(event) {
        if (!$[iphoneStyle].currentlyClicking) { return; }
        event.preventDefault();
        
        var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
        if (!$[iphoneStyle].dragging &&
            (Math.abs($[iphoneStyle].dragStartPosition - x) > opt.dragThreshold)) { 
          $[iphoneStyle].dragging = true; 
        }
    
        $(event.target).trigger('iPhoneDrag', [x]);
      })

      // When the mouse comes up, leave drag state
      .bind('mouseup touchend', function(event) {        
        if (!$[iphoneStyle].currentlyClicking) { return; }
        event.preventDefault();
    
        var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
        $($[iphoneStyle].currentlyClicking).trigger('iPhoneDragEnd', [x]);
      });
      
    $[iphoneStyle].initComplete = true;
  }
  
  return this;
}; // End of $.fn[iphoneStyle]

$[iphoneStyle].defaults = {
  duration:          200,                       // Time spent during slide animation
  checkedLabel:      'ON',                      // Text content of "on" state
  uncheckedLabel:    'OFF',                     // Text content of "off" state
  resizeHandle:      true,                      // Automatically resize the handle to cover either label
  resizeContainer:   true,                      // Automatically resize the widget to contain the labels
  disabledClass:     'iPhoneCheckDisabled',
  containerClass:    'iPhoneCheckContainer',
  labelOnClass:      'iPhoneCheckLabelOn',
  labelOffClass:     'iPhoneCheckLabelOff',
  handleClass:       'iPhoneCheckHandle',
  handleCenterClass: 'iPhoneCheckHandleCenter',
  handleRightClass:  'iPhoneCheckHandleRight',
  dragThreshold:     5                          // Pixels that must be dragged for a click to be ignored
};

})(jQuery, 'iphoneStyle');

/*
 * jQuery UI Checkbox 0.1
 *
 * Copyright (c) 2009 Jeremy Lea <reg@openpave.org>
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://docs.jquery.com/Licensing
 *
 * Based loosely on plugin by alexander.farkas.
 * http://www.protofunc.com/scripts/jquery/checkbox-radiobutton/
 */

(function($){

// Set up IE for VML if we have not done so already...
if ($.browser.msie) {
	// IE6 background flicker fix
	try	{
		document.execCommand('BackgroundImageCache', false, true);
	} catch (e) {}

	if (!document.namespaces["v"]) {
		$("head").prepend("<xml:namespace ns='urn:schemas-microsoft-com:vml' prefix='v' />");
		$("head").prepend("<?import namespace='v' implementation='#default#VML' ?>");
	}
}

$.widget("ui.checkbox", {
	_init: function() {
		// XXX: UI widget will not actually fail...
		if (!this.element.is(":radio,:checkbox")) {
			return false;
		}
		// _radio stores the members of the radio group (if there is one).
		if (this.element.is(":radio")) {
			this._radio = $(this.element[0].form).find("input:radio")
				.filter('[name="'+this.element[0].name+'"]');
		} else {
			this._radio = false;
		}

		var self = this, o = this.options; // closures for callbacks.
		// Set the ARIA properties on the native input
		this.element
			.attr({
				role: (this._radio ? "radio" : "checkbox"),
				"aria-checked": !!this.element[0].checked
			});
		// Create the main wrapper element (which gives the background box)
		this._wrapper = this.element.wrap($("<span />")).parent()
			.addClass((this._radio ? "ui-radio" : "ui-checkbox") +
				" ui-state-default");
		// Create the icon element
		this._wrapper.prepend($("<span/>")
			.addClass("ui-icon " + this._icon(false))
			.click(function(event) {
				// The icon covers the entire box, but is not in a bubbling
				// path, so use it to trigger the native event, and let it
				// take care of the rest.  Gobble up this fake event.
				self.element[0].click();
				event.preventDefault();
				event.stopImmediatePropagation();
				return false;
			}));
		if ($.browser.msie) {
			// IE does not support rounded corners...  We should check
			// something to see if it does.   But anyway, we make another
			// element which is a VML roundrect, and hide the normal wrapper.
			//
			// XXX: Check if we can use this in place of the span.
			// XXX: Implement background images.
			// XXX: Tidy this up to be more jQuery'ish
			//
			// Play tricks to get around arcsize bugs...
			this._wrapper[0].insertAdjacentHTML("afterBegin",
				"<v:roundrect arcsize='" + (this._radio ? "1" : "0.1") +
				"'><v:stroke /><v:fill /></v:roundrect>");
			this._vml = this._wrapper[0].childNodes[0];
			var ss = this._wrapper[0].currentStyle;
			this._vml.style.top = "-1px";
			this._vml.style.left = "-1px";
			this._vml.style.width = parseInt(ss.width)+1+"px";
			this._vml.style.height = parseInt(ss.height)+1+"px";
			this._doVML();
			this._vml.style.visibility = "visible";
			this._wrapper.css('visibility','hidden');
			// Listen for class or other changes to recreate the elements.
			this._wrapper[0].onpropertychange = function() {
				switch (event.propertyName) {
				case 'className':
				case 'style.borderTopWidth':
				case 'style.borderTopColor':
				case 'style.backgroundColor':
				case 'style.filter':
					self._doVML();
					break;
				}
			}
			// Listen for the custom event from the theme switcher.
			$().bind('ui-theme-switch', function() {
				setTimeout(function() {
					self._doVML();
				}, 500);
				return false;
			});
		}
		if ($.browser.opera) {
			// Opera also does not support rounded corners...  Use an SVG
			// element instead.  Same as above, but a little simpler.
			//
			// XXX: Check if we can use this in place of the span.
			// XXX: Implement background images.
			// XXX: Tidy this up to be more jQuery'ish
			var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
			var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
			var ss = this._wrapper[0].currentStyle;
			rect.setAttributeNS(null, "x", "1px");
			rect.setAttributeNS(null, "y", "1px");
			rect.setAttributeNS(null, "width", ss.width);
			rect.setAttributeNS(null, "height", ss.height);
			rect.setAttributeNS(null, "rx", (this._radio ? "6px" : "2px"));
			svg.appendChild(rect);
			this._wrapper.prepend(svg);
			this._svg = this._wrapper[0].firstChild;
			this._svg.style.width = parseInt(ss.width)+2+"px";
			this._svg.style.height = parseInt(ss.height)+2+"px";
			this._doSVG();
			this._svg.style.visibility = "visible";
			this._wrapper.css('visibility','hidden');
			// Listen for class changes.
			this._wrapper.bind("DOMAttrModified", function(event) {
				if (event.attrName === 'class') {
					self._doSVG();
				}
			});
			// Listen for the custom event from the theme switcher.
			$().bind("ui-theme-switch", function() {
				self._doSVG();
				return false;
			});
		}

		// Set up events...
		this._wrapper
			.hover(function(event) {
				if (!o.disabled) {
					$(this).addClass("ui-state-hover");
				}
			}, function(event) {
				if (!o.disabled) {
					$(this).removeClass("ui-state-hover");
				}
			})
			.bind("mousedown", function(event) {
				if (!o.disabled) {
					$(this).addClass("ui-state-active");
				}
			})
			.bind("mouseup", function(event) {
				if (!o.disabled) {
					$(this).removeClass("ui-state-active");
				}
			})
			.bind(this.widgetEventPrefix + "focus", function(event) {
				if (!o.disabled) {
					if (self._radio) {
						self._radio.not(self.element)
							.removeClass("ui-state-focus");
					}
					$(this).addClass("ui-state-focus");
				}
			})
			.bind(this.widgetEventPrefix + "blur", function(event) {
				if (!o.disabled) {
					$(this).removeClass("ui-state-focus");
				}
			})
			.bind(this.widgetEventPrefix + "click", function(event) {
				if (!o.disabled) {
					if (self._radio) {
						self._radio.not(self.element).checkbox("uncheck");
						self.check();
					} else {
						self.toggle();
					}
				}
			});
		this.element
			.bind("focus." + this.widgetName, function(event) {
				self._trigger("focus", event); // Actually checkboxfocus
			})
			.bind("blur." + this.widgetName, function(event) {
				self._trigger("blur", event); // Actually checkboxblur
			})
			.bind("click." + this.widgetName, function(event) {
				self._trigger("click", event); // Actually checkboxclick
			});

		// Capture the initial value
		this._setData("checked", !!this.element[0].checked);
	},
	destroy: function() {
		this._wrapper.replaceWith(this.element);
		this.element.removeAttr("role")
			.removeAttr("aria-checked")
			.unbind("."+this.widgetName);

		$.widget.prototype.destroy.apply(this, arguments);
	},

	// Most of the work is done here.
	_setData: function(key, value) {
		$.widget.prototype._setData.apply(this, arguments);

		if (key == "disabled") {
			if (value) {
				this.element.attr("disabled","disabled");
				this._wrapper.removeClass("ui-state-focus ui-state-hover ui-state-active");
			} else {
				this.element.removeAttr("disabled");
			}
			this._wrapper
				[value ? "addClass" : "removeClass"](
					this.widgetName + "-disabled " +
					this.namespace + "-state-disabled");
		} else if (key == "checked") {
			this.element[0].checked = !!value;
			this.element.attr("aria-checked", !!value);
			this._wrapper.find(".ui-icon")
				.addClass(this._icon(!!value))
				.removeClass(this._icon(!value));
		}
	},

	check: function() {
		this._setData("checked", true);
	},
	uncheck: function() {
		this._setData("checked", false);
	},
	toggle: function() {
		this._setData("checked", !this._getData("checked"));
	},

	_icon: function(state) {
		if (this._radio) {
			return "ui-icon-"
				+ this.options[state?"radioChecked":"radioUnchecked"];
		} else {
			return "ui-icon-"
				+ this.options[state?"checkboxChecked":"checkboxUnchecked"];
		}
	},

	_opacityFixed: false,
	_inFixup: false,
	_fixStyle: function(jq, re) {
		var s = jq.attr("style").replace(re,"");
		if (s !== "") {
			jq.attr("style",s);
		} else {
			jq.removeAttr("style");
		}
	},
	// Only called for IE
	_doVML: function() {
		if (!this._vml || this._inFixup) {
			return;
		}
		this._inFixup = true;
		var ss, op;
		if (this._opacityFixed) {
			this._vml.childNodes[0].opacity = '1';
			this._vml.childNodes[1].opacity = '1';
			this._fixStyle(this._wrapper.find(".ui-icon"),/filter[^;]*\;?/i);
			this._fixStyle(this._wrapper,/filter[^;]*\;?/i);
			this._opacityFixed = false;
		}
		ss = this._wrapper[0].currentStyle;
		// IE6 needs both of these...
		this._vml.strokecolor = ss.borderTopColor;
		this._vml.strokeweight = ss.borderTopWidth;
		this._vml.fillcolor = ss.backgroundColor;
		this._vml.childNodes[0].color = ss.borderTopColor;
		this._vml.childNodes[0].weight = ss.borderTopWidth;
		this._vml.childNodes[1].color = ss.backgroundColor;
		if (ss.filter && ss.filter.search(/Alpha/i) !== -1) {
			op = /(\d+)/.exec(ss.filter);
			this._wrapper.find(".ui-icon").css("filter",ss.filter);
			this._vml.childNodes[0].opacity = op[1]/100;
			this._vml.childNodes[1].opacity = op[1]/100;
			this._wrapper.css("filter","");
			this._opacityFixed = true;
		}
		this._inFixup = false;
	},
	// Only called for Opera
	_doSVG: function() {
		if (!this._svg || this._inFixup) {
			return;
		}
		this._inFixup = true;
		var ss, op;
		// Opera doesn't carry over opacity from the hidden container...
		if (this._opacityFixed) {
			this._fixStyle(this._wrapper.find(".ui-icon"),/opacity[^;]*\;?/i);
			this._fixStyle(this._wrapper.find("rect"),/opacity[^;]*\;?/i);
			this._fixStyle(this._wrapper,/opacity[^;]*\;?/i);
			this._opacityFixed = false;
		}
		ss = this._wrapper[0].currentStyle;
		this._svg.firstChild.style.stroke = ss.borderTopColor;
		this._svg.firstChild.style.strokeWidth = ss.borderTopWidth;
		this._svg.firstChild.style.fill = ss.backgroundColor;
		if (ss.opacity && ss.opacity !== 1) {
			op = ss.opacity;
			this._wrapper.find(".ui-icon").css("opacity",op);
			this._wrapper.find("rect").css("opacity",op);
			this._wrapper[0].style.opacity = "1";
			this._opacityFixed = true;
		}
		this._inFixup = false;
	}

});
$.ui.checkbox.defaults = {
	checkboxChecked: "check",
	checkboxUnchecked: "empty",
	radioChecked: "bullet",
	radioUnchecked: "empty"
};

})(jQuery);
