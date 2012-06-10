/* 
* hui | huement user interface
* javascript functions and plugins
* version: 0.05
*
* Copyright (c) 2011 huement
* Dual licensed under the MIT and GPL licenses.
*  - http://www.opensource.org/licenses/mit-license.php
*  - http://www.gnu.org/copyleft/gpl.html
*
* Author: @johnnyfortune
* Date: 6/15th/2012
* Full Docs and Downloads at http://huement.com/hui
*
*  [S01]. Action Functions ( shuffle, preload images, notefy command, color change animations[bitstorm.org])
*  [S02]. Notefy (based on jGrowl 1.2.5)
*  [S03]. Form Manipulation (iPhone-style Checkboxes)
*  [S04]. FaceBox Modal Window
*  [S05]. TipTip v 1.3
*  [S06]. jWindow
*  [S07]. jquery.easing 1.3
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

/* notefy v0.01
* HUI User friendly notifications and alerts 
* Adapted from jgrowl function.
*
* Call it with two parameters The first is the Header. The Second is the message. 
* example: notefy('title','message'); 
*
* optional options: icon class, click to close (sticky), position.
* full list of options dev.huement.com/hui/notefy
*
*/

function notefy(headerMsg, msg, user_icon, sticky, user_position){
	
	//default options are top-right and not sticky.
	//with hui-icon-notefy as the class.
	
	
	if(user_icon != false){
		var icon = user_icon;
	} else {
		var icon = 'notefy';
	}
	if(sticky != "stick"){
		$.jGrowl(msg, {
		header: headerMsg,
		icon_theme: icon,
		//afterOpen:function() {$('.notefyIcon').addClass(icon);},
		sticky: false
		});
	} else {
		$.jGrowl(msg, {
		header: headerMsg,
		icon_theme: icon,
		//afterOpen:function() {$('.notefyIcon').addClass(icon);},
		sticky: true
		});
	}
	
}

/*
 Color animation jQuery-plugin
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function i(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function g(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function f(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:i()}});var h=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(h,function(b,a){d.fx.step[a]=function(c){if(!c.init){c.a=f(d(c.elem).css(a));c.end=f(c.end);c.init=true}c.elem.style[a]=g(c.a,c.end,c.pos)}});d.fx.step.borderColor=function(b){if(!b.init)b.end=f(b.end);var a=h.slice(2,6);d.each(a,function(c,e){b.init||(b[e]={a:f(d(b.elem).css(e))});b.elem.style[e]=g(b[e].a,b.end,b.pos)});b.init=true}})(jQuery);


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
;(function($) {

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
			position: 		'top-left',
			glue: 			'after',
			theme: 			'default',
			icon_theme: 'notefy',
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
				((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '"><div class="hui-icon-'+ o.icon_theme +'"></div>' +
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

/*!
// iPhone-style Checkboxes jQuery plugin
// Copyright Thomas Reynolds, licensed GPL & MIT
*/
;(function() {
  var iOSCheckbox;
  var __slice = Array.prototype.slice;
  iOSCheckbox = (function() {
    function iOSCheckbox(elem, options) {
      var key, opts, value;
      this.elem = $(elem);
      opts = $.extend({}, iOSCheckbox.defaults, options);
      for (key in opts) {
        value = opts[key];
        this[key] = value;
      }
      this.elem.data(this.dataName, this);
      this.wrapCheckboxWithDivs();
      this.attachEvents();
      this.disableTextSelection();
      if (this.resizeHandle) {
        this.optionallyResize('handle');
      }
      if (this.resizeContainer) {
        this.optionallyResize('container');
      }
      this.initialPosition();
    }
    iOSCheckbox.prototype.isDisabled = function() {
      return this.elem.is(':disabled');
    };
    iOSCheckbox.prototype.wrapCheckboxWithDivs = function() {
      this.elem.wrap("<div class='" + this.containerClass + "' />");
      this.container = this.elem.parent();
      this.offLabel = $("<label class='" + this.labelOffClass + "'>\n  <span>" + this.uncheckedLabel + "</span>\n</label>").appendTo(this.container);
      this.offSpan = this.offLabel.children('span');
      this.onLabel = $("<label class='" + this.labelOnClass + "'>\n  <span>" + this.checkedLabel + "</span>\n</label>").appendTo(this.container);
      this.onSpan = this.onLabel.children('span');
      return this.handle = $("<div class='" + this.handleClass + "'>\n  <div class='" + this.handleRightClass + "'>\n    <div class='" + this.handleCenterClass + "' />\n  </div>\n</div>").appendTo(this.container);
    };
    iOSCheckbox.prototype.disableTextSelection = function() {
      if ($.browser.msie) {
        return $([this.handle, this.offLabel, this.onLabel, this.container]).attr("unselectable", "on");
      }
    };
    iOSCheckbox.prototype._getDimension = function(elem, dimension) {
      if ($.fn.actual != null) {
        return elem.actual(dimension);
      } else {
        return elem[dimension]();
      }
    };
    iOSCheckbox.prototype.optionallyResize = function(mode) {
      var newWidth, offLabelWidth, onLabelWidth;
      onLabelWidth = this._getDimension(this.onLabel, "width");
      offLabelWidth = this._getDimension(this.offLabel, "width");
      if (mode === "container") {
        newWidth = onLabelWidth > offLabelWidth ? onLabelWidth : offLabelWidth;
        newWidth += this._getDimension(this.handle, "width") + this.handleMargin;
        return this.container.css({
          width: newWidth
        });
      } else {
        newWidth = onLabelWidth > offLabelWidth ? onLabelWidth : offLabelWidth;
        return this.handle.css({
          width: newWidth
        });
      }
    };
    iOSCheckbox.prototype.onMouseDown = function(event) {
      var x;
      event.preventDefault();
      if (this.isDisabled()) {
        return;
      }
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      iOSCheckbox.currentlyClicking = this.handle;
      iOSCheckbox.dragStartPosition = x;
      return iOSCheckbox.handleLeftOffset = parseInt(this.handle.css('left'), 10) || 0;
    };
    iOSCheckbox.prototype.onDragMove = function(event, x) {
      var newWidth, p;
      if (iOSCheckbox.currentlyClicking !== this.handle) {
        return;
      }
      p = (x + iOSCheckbox.handleLeftOffset - iOSCheckbox.dragStartPosition) / this.rightSide;
      if (p < 0) {
        p = 0;
      }
      if (p > 1) {
        p = 1;
      }
      newWidth = p * this.rightSide;
      this.handle.css({
        left: newWidth
      });
      this.onLabel.css({
        width: newWidth + this.handleRadius
      });
      this.offSpan.css({
        marginRight: -newWidth
      });
      return this.onSpan.css({
        marginLeft: -(1 - p) * this.rightSide
      });
    };
    iOSCheckbox.prototype.onDragEnd = function(event, x) {
      var p;
      if (iOSCheckbox.currentlyClicking !== this.handle) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (iOSCheckbox.dragging) {
        p = (x - iOSCheckbox.dragStartPosition) / this.rightSide;
        this.elem.prop('checked', p >= 0.5);
      } else {
        this.elem.prop('checked', !this.elem.prop('checked'));
      }
      iOSCheckbox.currentlyClicking = null;
      iOSCheckbox.dragging = null;
      return this.didChange();
    };
    iOSCheckbox.prototype.refresh = function() {
      return this.didChange();
    };
    iOSCheckbox.prototype.didChange = function() {
      var new_left;
      if (typeof this.onChange === "function") {
        this.onChange(this.elem, this.elem.prop('checked'));
      }
      if (this.isDisabled()) {
        this.container.addClass(this.disabledClass);
        return false;
      } else {
        this.container.removeClass(this.disabledClass);
      }
      new_left = this.elem.prop('checked') ? this.rightSide : 0;
      this.handle.animate({
        left: new_left
      }, this.duration);
      this.onLabel.animate({
        width: new_left + this.handleRadius
      }, this.duration);
      this.offSpan.animate({
        marginRight: -new_left
      }, this.duration);
      return this.onSpan.animate({
        marginLeft: new_left - this.rightSide
      }, this.duration);
    };
    iOSCheckbox.prototype.attachEvents = function() {
      var localMouseMove, localMouseUp, self;
      self = this;
      localMouseMove = function(event) {
        return self.onGlobalMove.apply(self, arguments);
      };
      localMouseUp = function(event) {
        self.onGlobalUp.apply(self, arguments);
        $(document).unbind('mousemove touchmove', localMouseMove);
        return $(document).unbind('mouseup touchend', localMouseUp);
      };
      this.elem.change(function() {
        return self.refresh();
      });
      return this.container.bind('mousedown touchstart', function(event) {
        self.onMouseDown.apply(self, arguments);
        $(document).bind('mousemove touchmove', localMouseMove);
        return $(document).bind('mouseup touchend', localMouseUp);
      });
    };
    iOSCheckbox.prototype.initialPosition = function() {
      var containerWidth, offset;
      containerWidth = this._getDimension(this.container, "width");
      this.offLabel.css({
        width: containerWidth - this.containerRadius
      });
      offset = this.containerRadius + 1;
      if ($.browser.msie && $.browser.version < 7) {
        offset -= 3;
      }
      this.rightSide = containerWidth - this._getDimension(this.handle, "width") - offset;
      if (this.elem.is(':checked')) {
        this.handle.css({
          left: this.rightSide
        });
        this.onLabel.css({
          width: this.rightSide + this.handleRadius
        });
        this.offSpan.css({
          marginRight: -this.rightSide
        });
      } else {
        this.onLabel.css({
          width: 0
        });
        this.onSpan.css({
          marginLeft: -this.rightSide
        });
      }
      if (this.isDisabled()) {
        return this.container.addClass(this.disabledClass);
      }
    };
    iOSCheckbox.prototype.onGlobalMove = function(event) {
      var x;
      if (!(!this.isDisabled() && iOSCheckbox.currentlyClicking)) {
        return;
      }
      event.preventDefault();
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      if (!iOSCheckbox.dragging && (Math.abs(iOSCheckbox.dragStartPosition - x) > this.dragThreshold)) {
        iOSCheckbox.dragging = true;
      }
      return this.onDragMove(event, x);
    };
    iOSCheckbox.prototype.onGlobalUp = function(event) {
      var x;
      if (!iOSCheckbox.currentlyClicking) {
        return;
      }
      event.preventDefault();
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      this.onDragEnd(event, x);
      return false;
    };
    iOSCheckbox.defaults = {
      duration: 200,
      checkedLabel: 'ON',
      uncheckedLabel: 'OFF',
      resizeHandle: false,
      resizeContainer: false,
      disabledClass: 'iPhoneCheckDisabled',
      containerClass: 'iPhoneCheckContainer',
      labelOnClass: 'iPhoneCheckLabelOn',
      labelOffClass: 'iPhoneCheckLabelOff',
      handleClass: 'iPhoneCheckHandle',
      handleCenterClass: 'iPhoneCheckHandleCenter',
      handleRightClass: 'iPhoneCheckHandleRight',
      dragThreshold: 5,
      handleMargin: 15,
      handleRadius: 4,
      containerRadius: 5,
      dataName: "iphoneStyle",
      onChange: function() {}
    };
    return iOSCheckbox;
  })();
  $.iphoneStyle = this.iOSCheckbox = iOSCheckbox;
  $.fn.iphoneStyle = function() {
    var args, checkbox, dataName, existingControl, method, params, _i, _len, _ref, _ref2, _ref3, _ref4;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    dataName = (_ref = (_ref2 = args[0]) != null ? _ref2.dataName : void 0) != null ? _ref : iOSCheckbox.defaults.dataName;
    _ref3 = this.filter(':checkbox');
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      checkbox = _ref3[_i];
      existingControl = $(checkbox).data(dataName);
      if (existingControl != null) {
        method = args[0], params = 2 <= args.length ? __slice.call(args, 1) : [];
        if ((_ref4 = existingControl[method]) != null) {
          _ref4.apply(existingControl, params);
        }
      } else {
        new iOSCheckbox(checkbox, args[0]);
      }
    }
    return this;
  };
  $.fn.iOSCheckbox = function(options) {
    var opts;
    if (options == null) {
      options = {};
    }
    opts = $.extend({}, options, {
      resizeHandle: false,
      disabledClass: 'iOSCheckDisabled',
      containerClass: 'iOSCheckContainer',
      labelOnClass: 'iOSCheckLabelOn',
      labelOffClass: 'iOSCheckLabelOff',
      handleClass: 'iOSCheckHandle',
      handleCenterClass: 'iOSCheckHandleCenter',
      handleRightClass: 'iOSCheckHandleRight',
      dataName: 'iOSCheckbox'
    });
    return this.iphoneStyle(opts);
  };
}).call(this);

/*
 * Facebox (for jQuery)
 * version: 1.3
 * @requires jQuery v1.2 or later
 * @homepage https://github.com/defunkt/facebox
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright Forever Chris Wanstrath, Kyle Neath
 *
 * Usage:
 *
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox()
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 *
 *    jQuery.facebox('some html')
 *    jQuery.facebox('some html', 'my-groovy-style')
 *
 *  The above will open a facebox with "some html" as the content.
 *
 *    jQuery.facebox(function($) {
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page, an image, or the contents of a div:
 *
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ ajax: 'remote.html' }, 'my-groovy-style')
 *    jQuery.facebox({ image: 'stairs.jpg' })
 *    jQuery.facebox({ image: 'stairs.jpg' }, 'my-groovy-style')
 *    jQuery.facebox({ div: '#box' })
 *    jQuery.facebox({ div: '#box' }, 'my-groovy-style')
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *    afterClose.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */
;(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading(data.settings || [])

    if (data.ajax) fillFaceboxFromAjax(data.ajax, klass)
    else if (data.image) fillFaceboxFromImage(data.image, klass)
    else if (data.div) fillFaceboxFromHref(data.div, klass)
    else if ($.isFunction(data)) data.call($)
    else $.facebox.reveal(data, klass)
  }

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.2,
      overlay      : true,
      loadingImage : 'http://cloud.ndrigs.com/img/loading.gif',
      closeImage   : 'http://cloud.ndrigs.com/img/closelabel.png',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <div class="content"> \
        </div> \
        <a href="#" class="close"></a> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if ($('#facebox .loading').length == 1) return true
      showOverlay()

      $('#facebox .content').empty().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')

      $('#facebox').show().css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	$(window).width() / 2 - ($('#facebox .popup').outerWidth() / 2)
      })

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close()
        return true
      })
      $(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox')
      if (klass) $('#facebox .content').addClass(klass)
      $('#facebox .content').empty().append(data)
      $('#facebox .popup').children().fadeIn('normal')
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox .popup').outerWidth() / 2))
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
    },

    close: function() {
      $(document).trigger('close.facebox')
      return false
    }
  })

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    if ($(this).length == 0) return

    init(settings)

    function clickHandler() {
      $.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.bind('click.facebox', clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true
    else $.facebox.settings.inited = true

    $(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = $.facebox.settings.imageTypes.join('|')
    $.facebox.settings.imageTypesRegexp = new RegExp('\\.(' + imageTypes + ')(\\?.*)?$', 'i')

    if (settings) $.extend($.facebox.settings, settings)
    $('body').append($.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image() ]
    preload[0].src = $.facebox.settings.closeImage
    preload[1].src = $.facebox.settings.loadingImage

    $('#facebox').find('.b:first, .bl').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })

    $('#facebox .close')
      .click($.facebox.close)
      .append('<img src="'
              + $.facebox.settings.closeImage
              + '" class="close_image" title="close">')
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings

    $s.loadingImage = $s.loading_image || $s.loadingImage
    $s.closeImage = $s.close_image || $s.closeImage
    $s.imageTypes = $s.image_types || $s.imageTypes
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      if (target == '#') return
      $.facebox.reveal($(target).html(), klass)

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass)
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass)
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image()
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass)
    }
    image.src = href
  }

  function fillFaceboxFromAjax(href, klass) {
    $.facebox.jqxhr = $.get(href, function(data) { $.facebox.reveal(data, klass) })
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null
  }

  function showOverlay() {
    if (skipOverlay()) return

    if ($('#facebox_overlay').length == 0)
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { $(document).trigger('close.facebox') })
      .fadeIn(200)
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    $('#facebox_overlay').fadeOut(200, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG")
      $("#facebox_overlay").addClass("facebox_hide")
      $("#facebox_overlay").remove()
    })

    return false
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    if ($.facebox.jqxhr) {
      $.facebox.jqxhr.abort()
      $.facebox.jqxhr = null
    }
    $(document).unbind('keydown.facebox')
    $('#facebox').fadeOut(function() {
      $('#facebox .content').removeClass().addClass('content')
      $('#facebox .loading').remove()
      $(document).trigger('afterClose.facebox')
    })
    hideOverlay()
  })

})(jQuery);


/************************************************ [S05] TipTip */

 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);

/************************************************ [S06] jWindow */
/**
 * jWindow: jQuery Windows Engine 2
 * Copyright (c) 2011 Dominik Marczuk
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * The name of Dominik Marczuk may not be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY DOMINIK MARCZUK "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DOMINIK MARCZUK BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 *  based on jQuery Windows Engine Plugin
 *
 *  Copyright(c)  Hernan Amiune (hernan.amiune.com)
 *  Licensed under MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	/**
	 * The zIndex value for window arranging
	 */
	var zIndex = 100;
	
	/**
	 * The array containing all of the defined windows
	 */
	var jWindows = [];

	var focusList = [];

	/**
	 * A counter for tabs IDs
	 */
	var tabCounter = 0;
	
	/**
	 * The jWindow object is what controls the entire widget.
	 * @param params options an object containing the options values.
	 */
	function jWindow (params) {
		// this, for faster reference :)
		var $jWindow = this;
		
		// user-assignable options
		var options = {
			id:             "",
			title:          "",
			parentElement:  'body',
			width:          300,
			height:         200,
			posx:           50,
			posy:           50,
			fixed:          true,
			marginTop:      10,
			marginRight:    10,
			marginBottom:   10,
			marginLeft:     10,
			onDragStart:    null,
			onDragEnd:      null,
			onResizeStart:  null,
			onResizeEnd:    null,
			onUpdate:       null,
			onClose:        null,
			onMaximise:     null,
			onRestore:      null,
			onMinimise:     null,
			statusBar:      true,
			refreshButton:  false,
			minimiseButton: true,
			maximiseButton: true,
			closeButton:    true,
			draggable:      true,
			resizeable:     true,
			type:           "iframe",
			url:            "",
			modal:          false,
			tabs:           false
		};
		$.extend(options,params);
		
		/**
		 * Retrieve an option value
		 * @param param property's name to retrieve
		 * @return the value of the selected option or undefined if ther is no such option
		 */
		this.get = function (param) {
			return options[param];
		};
		
		// different states of the window
		var state = {
			minimised: false,
			maximised: false,
			hidden: true,
			focus: false
		};
		
		// create the DOM structure for the jWindow
		var domNodes = {
			parentElement:   $(options.parentElement),
			modalBackground: $('<div class="jWindow-modalBackground"></div>').css({zIndex: 10000, position: 'fixed', top: '0', left: '0', width: '100%', height: '100%'}),
			container:       $('<div id="' + options.id + '" class="jWindow"></div>').css({position: (options.fixed) ? "fixed" : "absolute", width: options.width+'px', top: options.posy+'px', left: options.posx+'px', overflow: 'hidden'}),
			titleBar:        $('<div class="jWindow-titleBar"></div>').css({position: 'relative', overflow: 'hidden'}),
			title:           $('<div class="jWindow-title"></div>').text(options.title),
			refreshButton:   $('<div class="jWindow-button jWindow-refreshButton"></div>'),
			minimiseButton:  $('<div class="jWindow-button jWindow-minimiseButton"></div>'),
			maximiseButton:  $('<div class="jWindow-button jWindow-maximiseButton"></div>'),
			closeButton:     $('<div class="jWindow-button jWindow-closeButton"></div>'),
			tabsBar:         $('<div class="jWindow-tabsBar"></div>').css({position: 'relative', overflow: 'hidden'}),
			tabs:            $('<ul class="jWindow-tabs"></ul>'),
			wrapper:         $('<div class="jWindow-wrapper"></div>').css({overflow: 'hidden'}),
			content:         $('<div class="jWindow-content"></div>').css({height: options.height + 'px'}),
			statusBar:       $('<div class="jWindow-statusBar"></div>').css({position: 'relative'}),
			resizeIcon:      $('<div class="jWindow-resizeIcon"></div>').css({position: 'absolute', bottom: '0', right: '0'}),
			iframeCover:     $('<div class="jWindow-iframeCover"></div>').css({position: 'absolute', width: '100%', height: '100%', zIndex: 10002}),
			output:          null
		};
		
		domNodes.container.appendTo(domNodes.modalBackground);
		domNodes.titleBar.appendTo(domNodes.container);
		domNodes.tabs.appendTo(domNodes.tabsBar);
		if (options.tabs) domNodes.tabsBar.appendTo(domNodes.wrapper);
		domNodes.content.appendTo(domNodes.wrapper);
		if (options.statusBar) domNodes.statusBar.appendTo(domNodes.wrapper);
		domNodes.wrapper.appendTo(domNodes.container);
		domNodes.title.appendTo(domNodes.titleBar);
		if (options.refreshButton) domNodes.refreshButton.appendTo(domNodes.titleBar);
		if (options.minimiseButton) domNodes.minimiseButton.appendTo(domNodes.titleBar);
		if (options.maximiseButton) domNodes.maximiseButton.appendTo(domNodes.titleBar);
		if (options.closeButton) domNodes.closeButton.appendTo(domNodes.titleBar);
		
		if (options.modal) {
			domNodes.output = domNodes.modalBackground;
			domNodes.container.css('zIndex',10001);
		} else {
			domNodes.output = domNodes.container.css('zIndex',++zIndex);
		}
		domNodes.output.css({opacity: '0'});
		
		// ----------------------------------
		// BIND EVENTS TO DIFFERENT DOM NODES
		// ----------------------------------
		
		// click on anything
		$.each(domNodes,function () {
			$(this).on({
				mousedown: function () {
					$jWindow.focus();
				}
			});
		});
		
		// click on the close button
		domNodes.closeButton.on({
			click: function () {
				$jWindow.hide(options.onClose);
			}
		});
		
		// click on the minimise button
		domNodes.minimiseButton.on({
			click: function () {
				if (domNodes.container.hasClass('minimised')) {
					$jWindow.restore({
						type: 'min',
						complete: options.onRestore
					});
				} else {
					$jWindow.minimise(options.onMinimise);
				}
			}
		});
		
		// click on the maximise button
		domNodes.maximiseButton.on({
			click: function (event) {
				if (domNodes.container.hasClass('maximised')) {
					$jWindow.restore({
						type: 'max',
						complete: options.onRestore
					});
				} else {
					$jWindow.maximise(options.onMaximise);
				}
			}
		});
		
		// click on the refresh button
		domNodes.refreshButton.on({
			click: function () {
				if (options.type != 'custom') {
					$jWindow.refresh();
				}
			}
		});
		
		// double click on the title bar to maximise, mousedown for dragging
		domNodes.titleBar.on({
			dblclick: function () {
				if (domNodes.container.hasClass('maximised')) {
					$jWindow.restore({
						type: 'max',
						complete: options.onRestore
					});
				} else {
					$jWindow.maximise(options.onMaximise);
				}
			}
		});
		
		// --------------
		// SPECIAl EVENTS
		// --------------

		// set focus on mouse down:
		domNodes.content.on({
			jWindowCover: function () {
				domNodes.iframeCover.prependTo(domNodes.content);
			},
			jWindowUncover: function () {
				domNodes.iframeCover.detach();
			}
		});
		
		// resize the window (using a custom event) -> adjust the windows:
		$(window).resize(function () {
			if(this.resizeTO) clearTimeout(this.resizeTO);
			this.resizeTO = setTimeout(function () {
				$(this).trigger('resizeEnd');
			}, 1000);
		}).on({
			resizeEnd: function () {
				for (var i = 0; i < jWindows.length; ++i) {
					jWindows[i].set({}); // will trigger fitting in viewport
				}
			}
		});
		
		// -----------------------
		// JWINDOW PRIVATE METHODS
		// -----------------------
		
		/**
		 * Perform a cleanup after dragging or resizing a window or the viewport - adjust the position and size of the window to fit the viewport.
		 * @return jWindow Provides a fluent interface
		 */
		var fitInViewport = function () {
			// calculate margins
			var marginX = domNodes.container.outerWidth() - options.width;
			var marginY = domNodes.container.outerHeight() - options.height;
			
			// step 1: check if the size isn't larger than the viewport:
			if (domNodes.container.outerWidth() > $(window).width() - options.marginLeft - options.marginRight) {
				options.width = $(window).width() - options.marginLeft - options.marginRight - marginX;
			}
			if (domNodes.container.outerHeight() > $(window).height() - options.marginTop - options.marginBottom) {
				options.height = $(window).height() - options.marginTop - options.marginBottom - marginY;
			}
			
			// step 2: check if the size isn't too small:
			if (options.width < 50) {
				options.width = 50;
			}
			if (options.height < 0) {
				options.height = 0;
			}
			
			// step 3: check if the window doesn't go outside the right/bottom edge of the viewport:
			if (options.posx + domNodes.container.outerWidth() > $(window).width() - options.marginRight) {
				options.posx = $(window).width() - options.marginRight - options.width - marginX;
			}
			if (options.posy + domNodes.container.outerHeight() > $(window).height() - options.marginBottom) {
				options.posy = $(window).height() - options.marginBottom - options.height - marginY;
			}
			
			// step 4: make sure the window doesn't go outside the left/top edge of the viewport:
			if (options.posx < options.marginLeft) {
				options.posx = options.marginLeft;
			}
			if (options.posy < options.marginTop) {
				options.posy = options.marginTop;
			}
			
			// adjust the window:
			domNodes.container.animate({top: options.posy + 'px', left: options.posx + 'px', width: options.width + 'px'}, 350, 'swing');
			domNodes.content.animate({height: options.height + 'px'}, 350, 'swing');
		};
		
		/**
		 * Sets the draggable option on a window, and attaches or detaches a onmousedown event associated with it.
		 * @param draggable whether to make the window draggable or not draggable (optional parametre; defaults to true)
		 * @return jWindow Provides a fluent interface 
		 */
		var setDraggable = function (draggable) {
			if (typeof draggable == 'undefined' || draggable == undefined) draggable = true;
			options.draggable = !!draggable; // double negation to ensure the parametre is a boolean
			
			var startX = 0, startY = 0;
			var startPosX = 0, startPosY = 0;

			if (options.draggable && !state.maximised) {
				domNodes.titleBar.css('cursor','move').on({
					mousedown: function (event) {
						// get initial mouse position
						startX = event.screenX;
						startY = event.screenY;
						startPosX = options.posx;
						startPosY = options.posy;
						
						domNodes.content.trigger('jWindowCover');

						$(document).on({
							mousemove: function (event) {
								if (options.draggable) {
									options.posx = startPosX + event.screenX - startX;
									options.posy = startPosY + event.screenY - startY;

									domNodes.container.css({
										'top': options.posy + 'px',
										'left': options.posx + 'px'
									});
								}
							},
							mouseup: function () {
								// unbind the events
								$(document).off('mousemove mouseup');
								domNodes.content.trigger('jWindowUncover');

								fitInViewport();

								// launch the callback
								if (typeof options.onDragEnd == 'function') {
									options.onDragEnd();
								}
							}
						});

						// drag start callback
						if (typeof options.onDragStart == 'function') {
							options.onDragStart();
						}

						// disable selection, so that no text is selected while dragging
						domNodes.titleBar[0].onselectstart = function () {return false;}; //IE
						return false; //other browsers
					}
				});
			} else {
				domNodes.titleBar.css('cursor','auto').off('mousedown');
				// re-enable selection in IE
				domNodes.titleBar[0].onselectstart = null;
			}

			return $jWindow;
		};

		// make the window draggable (or not)
		setDraggable(options.draggable);
		
		/**
		 * Sets the resizeable option on a window, and attaches or detaches the events associated with it.
		 * @param resizeable whether to make the window resizeable or static-sized (optional parametre; defaults to true)
		 * @return jWindow Provides a fluent interface
		 */
		var setResizeable = function (resizeable) {
			if (typeof resizeable == 'undefined' || resizeable == undefined) resizeable = true;
			options.resizeable = !!resizeable; // double negation to ensure the parametre is a boolean
			
			var startX = 0, startY = 0;
			var startW = 0, startH = 0;

			if (options.resizeable && !state.maximised && !state.minimised) {
				domNodes.resizeIcon.appendTo(domNodes.statusBar);
				domNodes.resizeIcon.css('cursor','se-resize').on({
					mousedown: function (event) {
						// get initial mouse position and sizes
						startX = event.screenX;
						startY = event.screenY;
						startW = domNodes.container.width();
						startH = domNodes.content.height();
						
						domNodes.content.trigger('jWindowCover');
						
						$(document).on({
							mousemove: function (event) {
								if (options.resizeable) {
									options.width = startW + event.screenX - startX;
									options.height = startH + event.screenY - startY;

									domNodes.container.css({
										width: options.width + 'px'
									});
									domNodes.content.css({
										height: options.height + 'px'
									});
								}
							},
							mouseup: function (event) {
								// unbind the events
								$(document).off('mousemove mouseup');
								domNodes.content.trigger('jWindowUncover');

								fitInViewport();

								// launch the callback
								if (typeof options.onResizeEnd == 'function') {
									options.onResizeEnd();
								}
							}
						});

						// drag start callback
						if (typeof options.onResizeStart == 'function') {
							options.onResizeStart();
						}

						// disable selection, so that no text is selected while resizing
						domNodes.resizeIcon[0].onselectstart = function () {return false;}; //IE
						return false; //other browsers
					}
				});
			} else {
				domNodes.resizeIcon.detach();
				domNodes.resizeIcon.css('cursor','auto').off('mousedown');
				// re-enable selection in IE
				domNodes.resizeIcon[0].onselectstart = null;
			}

			return $jWindow;
		};
		
		// make the window resizeable (or not)
		setResizeable(options.resizeable);

		/**
		 * Bring the last focused window back to focus. Used after hiding a window.
		 * @return jWindow Provides a fluent interface
		 */
		var restoreFocus = function () {
			var done = false;
			do {
				var i = focusList.pop();
				console.log("popped: "+i);
				console.log(focusList);
				if (!jWindows[i].isHidden()) {
					jWindows[i].focus();
					done = true;
				}
			} while (!done && focusList.length > 0);
			return $jWindow;
		};
		
		// ----------------------
		// JWINDOW PUBLIC METHODS
		// ----------------------
		
		/**
		 * Add the window widget to the DOM tree and fade it in
		 * @param params can be one of several things:<br>
		 *        a number - denotes the animation's duration (in milliseconds)<br>
		 *        a string - denotes the animation's easing<br>
		 *        a function - a complete callback to the animation<br>
		 *        an object - duration, easing and complete properties will be used
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.show = function (params) {
			if (!state.hidden) return $jWindow;

			var _options = {
				duration: 350,
				easing: 'linear',
				complete: function () {}
			};

			switch (typeof params) {
				case 'number':_options.duration = params;break;
				case 'string':_options.easing = params;break;
				case 'function':_options.complete = params;break;
				case 'object':$.extend(_options, params);break;
			}

			domNodes.parentElement.append(domNodes.output.css({top: '+=15px'}));
			domNodes.output.animate({opacity: '1', top: '-=15px'}, _options.duration, _options.easing, _options.complete);
			state.hidden = false;
			$jWindow.focus();

			return $jWindow;
		};
		
		/**
		 * Fade the window widget out and detach it from the DOM tree
		 * @param params can be one of several things:<br>
		 *        a number - denotes the animation's duration (in milliseconds)<br>
		 *        a string - denotes the animation's easing<br>
		 *        a function - a complete callback to the animation<br>
		 *        an object - duration, easing and complete properties will be used
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.hide = function (params) {
			if (state.hidden) return $jWindow;

			var _options = {
				duration: 350,
				easing: 'linear',
				complete: function () {}
			};

			switch (typeof params) {
				case 'number':_options.duration = params;break;
				case 'string':_options.easing = params;break;
				case 'function':_options.complete = params;break;
				case 'object':$.extend(_options, params);break;
			}

			domNodes.output.animate({top: '-=15px', opacity: '0'}, _options.duration, _options.easing, function () {
				domNodes.output = domNodes.output.css({top: '+=15px'}).detach();
				_options.complete();
			});
			state.hidden = true;
			$jWindow.focus(false);
			restoreFocus();

			return $jWindow;
		};

		/**
		 * Check whether a window is hidden or not
		 * @return boolean
		 */
		$jWindow.isHidden = function () {
			return state.hidden;
		};
		
		/**
		 * Minimise the window
		 * @param params can be one of several things:<br>
		 *        a number - denotes the animation's duration (in milliseconds)<br>
		 *        a string - denotes the animation's easing<br>
		 *        a function - a complete callback to the animation<br>
		 *        an object - duration, easing and complete properties will be used
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.minimise = function (params) {
			if (state.minimised) return $jWindow;

			var _options = {
				duration: 350,
				easing: 'linear',
				complete: function () {}
			};

			switch (typeof params) {
				case 'number':_options.duration = params;break;
				case 'string':_options.easing = params;break;
				case 'function':_options.complete = params;break;
				case 'object':$.extend(_options, params);break;
			}

			domNodes.wrapper.slideUp(_options.duration, _options.easing, _options.complete);
			domNodes.container.addClass('minimised');
			state.minimised = true;
			
			setResizeable(options.resizeable);

			return $jWindow;
		};
		
		/**
		 * Maximise the window
		 * @param params can be one of several things:<br>
		 *        a number - denotes the animation's duration (in milliseconds)<br>
		 *        a string - denotes the animation's easing<br>
		 *        a function - a complete callback to the animation<br>
		 *        an object - duration, easing and complete properties will be used
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.maximise = function (params) {
			if (state.maximised) return $jWindow;

			var _options = {
				duration: 350,
				easing: 'linear',
				complete: function () {}
			};

			switch (typeof params) {
				case 'number':_options.duration = params;break;
				case 'string':_options.easing = params;break;
				case 'function':_options.complete = params;break;
				case 'object':$.extend(_options, params);break;
			}

			var w = $(window).width() - options.marginLeft - options.marginRight;
			var h = $(window).height() - options.marginTop - options.marginBottom - (domNodes.container.outerHeight() - domNodes.content.height());

			domNodes.container.animate({width: w + 'px', top: options.marginTop + 'px', left: options.marginLeft + 'px'}, _options.duration, _options.easing, _options.complete);
			domNodes.content.animate({height: h + 'px'}, _options.duration, _options.easing);
			domNodes.container.addClass('maximised');
			state.maximised = true;
			
			setResizeable(options.resizeable);
			setDraggable(options.draggable);

			return $jWindow;
		};
		
		/**
		 * Restore the window from the minimised or maximised state
		 * @param params can be one of several things:<br>
		 *        a number - denotes the animation's duration (in milliseconds)<br>
		 *        a string - denotes the animation's easing<br>
		 *        a function - a complete callback to the animation<br>
		 *        an object - duration, easing, complete and type ('min', 'max' or 'both') properties will be used
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.restore = function (params) {
			if (!state.minimised && !state.maximised) return $jWindow;

			var _options = {
				duration: 350,
				easing: 'linear',
				complete: function () {},
				type: 'both'
			};

			switch (typeof params) {
				case 'number':_options.duration = params;break;
				case 'string':_options.easing = params;break;
				case 'function':_options.complete = params;break;
				case 'object':$.extend(_options, params);break;
			}

			if (domNodes.container.hasClass('minimised') && $.inArray(_options.type, ['min', 'both']) != -1) {
				domNodes.wrapper.slideDown(_options.duration, _options.easing, _options.complete);
				domNodes.container.removeClass('minimised');
				state.minimised = false;
			}
			if (domNodes.container.hasClass('maximised') && $.inArray(_options.type, ['max', 'both']) != -1) {
				domNodes.container.animate({width: options.width+'px', top: options.posy+'px', left: options.posx+'px'}, _options.duration, _options.easing, _options.complete);
				domNodes.content.animate({height: options.height+'px'}, _options.duration, _options.easing);
				domNodes.container.removeClass('maximised');
				state.maximised = false;
			}
			
			setResizeable(options.resizeable);
			setDraggable(options.draggable);

			return $jWindow;
		};
		
		/**
		 * Set focus on the window. Remove focus from all other windows.
		 * @param focus whether to add or remove focus from the window
		 * @return jWindow Provides a fluent interface 
		 */
		$jWindow.focus = function (focus) {
			if (typeof focus == 'undefined' || focus == undefined) focus = true;
			focus = !!focus; //make sure focus is a boolean
			
			// if the window's focus is already set correctly, do nothing
			if (state.focus == focus) return $jWindow;
			
			if (focus) {
				// blur all windows
				for (var i = 0; i < jWindows.length; ++i) {
					if (jWindows[i].hasFocus()) {
						jWindows[i].focus(false);
						focusList.push(i);
						console.log(focusList);
					}
				}
				// focus the current window
				domNodes.container.removeClass('blur').addClass('focus');
				domNodes.content.trigger('jWindowUncover');
				state.focus = true;
				if (options.modal) {
					domNodes.container.css('zIndex','10001');
				} else {
					domNodes.container.css('zIndex',++zIndex);
				}
			} else {
				if (!options.modal) {
					domNodes.container.removeClass('focus').addClass('blur');
					domNodes.content.trigger('jWindowCover');
					
					state.focus = false;
				}
			}
			return $jWindow;
		};

		/**
		 * Check the window's focus.
		 * @return boolean
		 */
		$jWindow.hasFocus = function () {
			return state.focus;	
		};
		
		/**
		 * Update the content of a window.
		 * @param param In case of an iframe window, this parametre is optional. If specified, it will be treated as an URL that will be loaded in the iframe. If left empty, the iframe's content will just be loaded (if the URL option has been passed to the jWindow's constructor) or reloaded (if the iframe has been loaded previously).<br>
		 *              In an AJAX window, the parametre is optional. If specified, it will be used as the URL to load via AJAX. If not specified, the URL set in the jWindow's constructor will be used. If that is not present either, nothing will happen.<br>
		 *              In a custom content window, the parametre is the custom HTML that will be placed inside the window. The parametre is mandatory.<br>
		 *              In either case, passing a NULL value will clear the jWindow's content.
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.update = function (param) {
			if (param === null) {
				options.url = null;
				domNodes.content.empty();
			} else if (options.type == 'iframe') {
				if (typeof param == 'string') {
					options.url = param;
					domNodes.content.html('<iframe src="' + options.url + '" />').find('iframe').css({border: '0', width: '100%', height: '100%'});
				} else {
					var frame = domNodes.content.find('iframe');
					if (frame.length > 0) {
						if (options.url.length == 0) options.url = frame[0].src;
						else frame[0].src = options.url;
					} else {
						if (options.url.length > 0) {
							domNodes.content.html('<iframe src="' + options.url + '" />').find('iframe').css({border: '0', width: '100%', height: '100%'});
						}
					}
				}
			} else if (options.type == 'ajax') {
				if (typeof param == 'string') {
					options.url = param;
				}
				$.ajax({
					url: options.url,
					dataType: 'html',
					success: function (data) {
						domNodes.content.html('<div style="padding: 1px; margin: -1px;">'+data+'</div>');
					}
				});
			} else {
				domNodes.content.html('<div style="padding: 1px; margin: -1px;">'+param+'</div>');
			}
			return $jWindow;
		};
		
		/**
		 * Refresh the content of the iframe
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.refresh = function () {
			if (options.type == 'iframe') domNodes.content.find('iframe').get(0).contentWindow.location.reload();
			return $jWindow;
		};
		
		/**
		 * A universal setter for jWindow options
		 * @param param Either the name of the value to change or an object with name-value pairs.
		 * @param value The new value of the property (use only if the first parametre is a string)
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.set = function (param, value) {
			if (typeof param == 'string') {
				var tmp = {};
				tmp[param] = value;
				param = tmp;
			}
			if (typeof param != 'object') {
				param = {};
			}
			
			$.each(param, function (prop, val) {
				switch (prop) {
					case 'title':
						options.title = val;
						domNodes.title.text(options.title);
						break;
					case 'posx':
						options.posx = val;
						domNodes.container.css({left: options.posx + 'px'});
						break;
					case 'posy':
						options.posy = val;
						domNodes.container.css({top: options.posy + 'px'});
						break;
					case 'width':
						options.width = val;
						domNodes.container.css({width: options.width + 'px'});
						break;
					case 'height':
						options.height = val;
						domNodes.content.css({height: options.height + 'px'});
						break;
					case 'resizeable':
						options.resizeable = val;
						setResizeable(options.resizeable);
						break;
					case 'draggable':
						options.draggable = val;
						setDraggable(options.draggable);
						break;
					case 'onDragStart':
					case 'onDragEnd':
					case 'onResizeStart':
					case 'onResizeEnd':
					case 'onUpdate':
					case 'onClose':
					case 'onMaximise':
					case 'onRestore':
					case 'onMinimise':
					case 'url':
						options[prop] = val;
						break;
					case 'tabs':
						var initial = options.tabs;
						options.tabs = !!val;
						if (options.tabs != initial) {
							if (options.tabs) {
								$.each(_tabs,function(idx, value) {
									if (options.url == value.href) value.active(true,false);
								});
								domNodes.tabsBar.prependTo(domNodes.wrapper);
							}
							else domNodes.tabsBar.detach();
						}
						break;
					default:
						console.log('Cannot set "'+prop+'".');
						break;
				}
			});
			fitInViewport();
			return $jWindow;
		};

		// ------------
		// JWINDOW TABS
		// ------------

		/**
		 * Array of tabs
		 */
		var _tabs = [];
		
		// ----------------------------
		// JWINDOW TABS PRIVATE METHODS
		// ----------------------------

		/**
		 * The tab
		 * @param params An object containing two properties: href (the iframe's src attribute) and title (the text of the tab's anchor)
		 */
		function jWindowTab (params) {
			if (typeof params.href == 'undefined' || typeof params.title == 'undefined') throw "Missing parametres!";

			var $tab = this;
			$tab.href = params.href;
			$tab.title = params.title;
			var isActive = false;
			var id = tabCounter++;
			
			$tab.name = (typeof params.name != 'undefined') ? params.name : null;

			/**
			 * Retrieve the tab's ID
			 * @return the tab's ID
			 */
			$tab.getId = function () {
				return id;
			};
			
			/**
			 * Get or set the active status. Without a parametre, the function acts as a getter. Otherwise, it is a setter.
			 * @param active whether the tab is to be activated or deactivated.
			 * @param update whether to update the window contents or not. Defaults to false.
			 * @return a boolean indicating whether the tab is active or not
			 */
			$tab.active = function(active, update) {
				if (typeof active != 'undefined') {
					active = !!active;
					
					update = (typeof update != 'undefined') ? !!update : false;
					
					// remove the window content if a currently active tab is being deactivated
					if (isActive && !active && update) {
						$jWindow.update(null);
					}
					
					// update the window contents if an inactive tab is being activated
					if (!isActive && active && update) {
						$jWindow.update($tab.href);
					}
					
					isActive = active;
					
					// add/remove classes as needed
					if (active) $tab.domNode.addClass('active');
					else $tab.domNode.removeClass('active');
				}
				return isActive;
			};

			$tab.domNode = $('<li class="jWindow-tab">'+$tab.title+'</li>').css({display: 'inline-block', cursor: 'pointer'}).on({
				click: function (event) {
					event.preventDefault();
					$tab.domNode.trigger('jWindowOpenTab');
				},
				jWindowOpenTab: function () {
					$.each(_tabs, function (idx, value) {
						value.active(false);
					});
					$tab.active(true, true);
				},
				jWindowCloseTab: function () {
					$tab.domNode.detach();
					$tab.active(false, true);
					var toRemove = 0;
					$.each(_tabs, function (idx, value) {
						console.log(value.getId());
						if (value.getId() == id) {
							toRemove = idx;
						}
					});
					_tabs.splice(toRemove, 1);
				}
			});
		};
		
		/**
		 * Check whether the tab name is already taken.
		 * @param params The parametres, as passed to the appendTab/prependTab methods
		 * @return boolean <code>true</code> if the name is free, <code>false</code> otherwise
		 */
		var checkTabNameAvailability = function (params) {
			var ret = true;
			if (typeof params.name != 'undefined' && params !== null) {
				$.each(_tabs, function (idx, value) {
					if (value.name == params.name) {
						console.log('Tab name must be unique.');
						ret = false;
					}
				});
			}
			return ret;
		}
		
		// ---------------------------
		// JWINDOW TABS PUBLIC METHODS
		// ---------------------------

		/**
		 * Append a new tab to the tabs list
		 * @param params an object of parametres:<br>
		 *               href - the URL of the content the tab will link to (mandatory)<br>
		 *               title - the text displayed on the tab (mandatory)<br>
		 *               name - a custom unique name for tab referencing (optional)
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.appendTab = function (params) {
			if (checkTabNameAvailability(params)) {
				var t = new jWindowTab(params);
				_tabs.push(t);
				t.domNode.appendTo(domNodes.tabs);
			}
			return $jWindow;
		};

		/**
		 * Prepend a new tab to the tabs list
		 * @param params an object of parametres:<br>
		 *               href - the URL of the content the tab will link to (mandatory)<br>
		 *               title - the text displayed on the tab (mandatory)<br>
		 *               name - a custom unique name for tab referencing (optional)
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.prependTab = function (params) {
			if (checkTabNameAvailability(params)) {
				var tmp = _tabs;
				var t = new jWindowTab(params);

				$.each(_tabs, function (idx, value) {
					value.domNode.detach();
				});

				_tabs = [t];
				$.each(tmp, function (idx, value) {
					_tabs.push(value);
				});
				$.each(_tabs,function (idx, value) {
					value.domNode.appendTo(domNodes.tabs);
				});
			}
			return $jWindow;
		};
		
		/**
		 * Activate a tab and load the contents its href points to
		 * @param name The name of the tab to open
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.openTab = function (name) {
			if (name === null) return $jWindow;
			$.each(_tabs, function (idx, value) {
				if (value.name == name) {
					value.domNode.trigger('jWindowOpenTab');
				}
			});
			return $jWindow;
		};
		
		/**
		 * Deactivate and remove a tab
		 * @param name The name of the tab to close
		 * @return jWindow Provides a fluent interface
		 */
		$jWindow.closeTab = function (name) {
			if (name === null) return $jWindow;
			$.each(_tabs, function (idx, value) {
				if (value.name == name) {
					value.domNode.trigger('jWindowCloseTab');
				}
			});
			return $jWindow;
		};
	}
	
	// Extend the jQuery object with the jWindow function
	$.extend({
		jWindow: function (param) {
			switch(typeof param) {
				case 'string':
					for (var i = 0; i < jWindows.length; ++i) {
						if (jWindows[i].get('id') == param) return jWindows[i];
					}
					return null;
					break;
				case 'object':
					if (typeof param.id != 'string' || param.id.length == 0) console.log("An ID is required.");
					else {
						var tmp = new jWindow(param);
						var cmp = $.jWindow(param.id);
						if (cmp === null) {
							jWindows.push(tmp);
							return tmp;
						} else {
							console.log('jWindow id ' + param.id + ' already exists.');
							return cmp;
						}
					}
					break;
				default:
					console.log("Bad or no parametre!");
					break;
			}
		}
	});
})(jQuery);

/************************************************ [S07] jQuery Easing */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
