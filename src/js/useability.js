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
 * @example  jQuery("#myselect").addOption("Value", "Text"); // add single value (will be selected)
 *           jQuery("#myselect").addOption("Value 2", "Text 2", false); // add single value (won't be selected)
 *           jQuery("#myselect").addOption({"foo":"bar","bar":"baz"}, false); // add multiple values, but don't select
 *
 */
jQuery.fn.addOption = function()
{
 if(arguments.length === 0){
 return this;
 } 
 // select option when added? default is true
 var selectOption = true;
 // multiple items
 var multiple = false;
 if(typeof arguments[0] === "object"){
  multiple = true;
  var items = arguments[0];
 }
 if(arguments.length >= 2){
  if(typeof arguments[1] === "boolean"){ selectOption = arguments[1]; }
  else if(typeof arguments[2] === "boolean"){ selectOption = arguments[2]; }
  if(!multiple){
   var value = arguments[0];
   var text = arguments[1];
  }
 }
 this.each(
  function(){
   if(this.nodeName.toLowerCase() !== "select"){return;}
   if(multiple){
    for(var v in items)
    {
     jQuery(this).addOption(v, items[v], selectOption);
    }
   } else {
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    this.options.add(option);
   }
   if(selectOption){
    this.options[this.options.length-1].selected = true;
   }
  }
 );
 return this;
};

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
 if(arguments.length === 0){ return this; }
 if(typeof arguments[0] === "string"){ var value = arguments[0]; }
 else if(typeof arguments[0] === "number"){ var index = arguments[0]; }
 else{ return this; }
 this.each(
  function()
  {
   if(this.nodeName.toLowerCase() !== "select"){ return; }
   if(value){
    var optionsLength = this.options.length;
    for(var i=optionsLength-1; i>=0; i--){
     if(this.options[i].value === value){
      this.options[i] = null;
     }
    }
   }
   else{
    this.remove(index);
   }
  }
 );
 return this;
};

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
  function(){
   if(this.nodeName.toLowerCase() !== "select"){ return; }
   // default sort is ascending if parameter is undefined
   ascending = typeof ascending === "undefined" ? true : ascending;
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
     
     var option1text = option1.text.toLowerCase();
     var option2text = option2.text.toLowerCase();
     // if options are the same, no sorting is needed
     if(option1text === option2text){ return 0; }
     if(ascending){
      return option1text < option2text ? -1 : 1;
     }
     else {
      return option1text > option2text ? -1 : 1;
     }
    }
   );
   // change the options to match the sort array
   for(var ix = 0; ix<optionsLength; ix++){
    this.options[i].text = sortArray[ix].text;
    this.options[i].value = sortArray[ix].value;
   }
  }
 );
 return this;
};

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
  function(){
   if(this.nodeName.toLowerCase() !== "select") {
    return;
   }
   // get number of options
   var optionsLength = this.options.length;
   
   
   for(var i = 0; i<optionsLength; i++) {
    if (this.options[i].value === value) {
     this.options[i].selected = true;
    }
   }
  }
 );
 return this;
};
/*!
 * jqPagination, a jQuery pagination plugin (obviously)
 *
 * Copyright (C) 2011 Ben Everard
 *
 * http://beneverard.github.com/jqPagination
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *     
 */

(function ($) {
	"use strict";
	
	$.jqPagination = function (el, options) {
	
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
	
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("jqPagination", base);

		base.init = function () {

			base.options = $.extend({}, $.jqPagination.defaultOptions, options);
			
			// if the user hasn't provided a max page number in the options try and find
			// the data attribute for it, if that cannot be found, use one as a max page number
			
			if (base.options.max_page === null) {
			
				if (base.$input.data('max-page') !== undefined) {
					base.options.max_page = base.$input.data('max-page');
				} else {
					base.options.max_page = 1;
				}
				
			}
			
			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number
			
			if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
				base.options.current_page = base.$input.data('current-page');
			}
			
			// remove the readonly attribute as JavaScript must be working by now ;-)
			base.$input.removeAttr('readonly');
			
			// set the initial input value
			// pass true to prevent paged callback form being fired
			
			base.updateInput(true);

			
			 //***************
			// BIND EVENTS
			
			base.$input.on('focus.jqPagination mouseup.jqPagination', function (event) {

				// if event === focus, select all text...
				if (event.type === 'focus') {

					var current_page	= parseInt(base.options.current_page, 10);

					$(this).val(current_page).select();

				}
			
				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}
				
			});
			
			base.$input.on('blur.jqPagination keydown.jqPagination', function (event) {
				
				var $self			= $(this),
					current_page	= parseInt(base.options.current_page, 10);
				
				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(current_page);
					$self.blur();
				}
				
				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					base.setPage($self.val());
				}
				
			});
			
			base.$el.on('click.jqPagination', 'a', function (event) {
			
				var $self = $(this);

				// we don't want to do anything if we've clicked a disabled link
				// return false so we stop normal link action btu also drop out of this event
				
				if ($self.hasClass('disabled')) {
					return false;
				}

				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($self.data('action'));
				}
				
			});
			
		};
		
		base.setPage = function (page) {
			
			// return current_page value if getting instead of setting
			if (page === undefined) {
				return base.options.current_page;
			}
		
			var current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
							
			if (isNaN(parseInt(page, 10))) {
				
				switch (page) {
				
					case 'first':
						page = 1;
						break;
						
					case 'prev':
					case 'previous':
						page = current_page - 1;
						break;
						
					case 'next':
						page = current_page + 1;
						break;
						
					case 'last':
						page = max_page;
						break;
						
				}
				
			}
			
			page = parseInt(page, 10);
			
			// reject any invalid page requests
			if (isNaN(page) || page < 1 || page > max_page || page === current_page) {
			
				// update the input element
				base.setInputValue(current_page);
				
				return false;
				
			}
			
			// update current page options
			base.options.current_page = page;
			base.$input.data('current-page', page);
			
			// update the input element
			base.updateInput();
			
		};
		
		base.setMaxPage = function (max_page) {
			
			// return the max_page value if getting instead of setting
			if (max_page === undefined) {
				return base.options.max_page;
			}

			// ignore if max_page is not a number
			if (!base.isNumber(max_page)) {
				console.error('jqPagination: max_page is not a number');
				return false;
			}
			
			// ignore if max_page is less than the current_page
			if (max_page < base.options.current_page) {
				console.error('jqPagination: max_page lower than current_page');
				return false;
			}
			
			// set max_page options
			base.options.max_page = max_page;
			base.$input.data('max-page', max_page);
				
			// update the input element
			base.updateInput();
			
		};
		
		// ATTN this isn't really the correct name is it?
		base.updateInput = function (prevent_paged) {
			
			var current_page = parseInt(base.options.current_page, 10);
							
			// set the input value
			base.setInputValue(current_page);
			
			// set the link href attributes
			base.setLinks(current_page);
			
			// we may want to prevent the paged callback from being fired
			if (prevent_paged !== true) {

				// fire the callback function with the current page
				base.options.paged(current_page);
			
			}
			
		};
		
		base.setInputValue = function (page) {
		
			var page_string	= base.options.page_string,
				max_page	= base.options.max_page;
	
			// this looks horrible :-(
			page_string = page_string
				.replace("{current_page}", page)
				.replace("{max_page}", max_page);
			
			base.$input.val(page_string);
		
		};
		
		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		
		base.setLinks = function (page) {
			
			var link_string		= base.options.link_string,
				current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
			
			if (link_string !== '') {
				
				// set initial page numbers + make sure the page numbers aren't out of range
					
				var previous = current_page - 1;
				if (previous < 1) {
					previous = 1;
				}
				
				var next = current_page + 1;
				if (next > max_page) {
					next = max_page;
				}
				
				// apply each page number to the link string, set it back to the element href attribute
				base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
				base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
				base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
				base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));
				
			}

			// set disable class on appropriate links
			base.$el.find('a').removeClass('disabled');

			if (current_page === max_page) {
				base.$el.find('.next, .last').addClass('disabled');
			}

			if (current_page === 1) {
				base.$el.find('.previous, .first').addClass('disabled');
			}

		};
		
		base.callMethod = function (method, key, value) {

			switch (method.toLowerCase()) {

				case 'option':

					// call the appropriate function for the desired key (read: option)
					switch (key.toLowerCase()) {
					
						case 'current_page':
							return base.setPage(value);
							
						case 'max_page':
							return base.setMaxPage(value);
						
					}

					// if we haven't already returned yet we must not be able to access the desired option
					console.error('jqPagination: cannot get / set option ' + key);
					return false;

					break;

				case 'destroy':

					base.$el
						.off('.jqPagination')
						.find('*')
							.off('.jqPagination');

					break;

				default:

					// the function name must not exist
					console.error('jqPagination: method "' + method + '" does not exist');
					return false;

			}

		};

		// Run initializer
		base.init();
		
	};

	$.jqPagination.defaultOptions = {
		current_page	: 1,
		link_string		: '',
		max_page		: null,
		page_string		: 'Page {current_page} of {max_page}',
		paged			: function () {}
	};

	$.fn.jqPagination = function () {

		// get any function parameters
		var self = this,
			args = Array.prototype.slice.call(arguments);

		// if the first argument is a string call the desired function
		// note: we can only do this to a single element, and not a collection of elements

		if (typeof args[0] === 'string') {
			
			// if we're dealing with multiple elements, set this to the first element
			if (self.length > 1) {
				self = self.eq(0);
			}

			var $plugin = $(self).data('jqPagination');

			return $plugin.callMethod(args[0], args[1], args[2]);

		}

		// if we're not dealing with a method, initialise plugin
		self.each(function () {
			(new $.jqPagination(this, args[0]));
		});
		
	};

})(jQuery);

// polyfill, provide a fallback if the console doesn't exist
if (!console) {

	var console	= {},
		func	= function () { return false; };

	console.log		= func;
	console.info	= func;
	console.warn	= func;
	console.error	= func;

}

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

(function($){
 jQuery.fn.tipTip = function(options) {
  var defaults = { 
   activation: "hover",
   keepAlive: false,
   maxWidth: "200px",
   edgeOffset: 3,
   defaultPosition: "bottom",
   delay: 400,
   fadeIn: 200,
   fadeOut: 200,
   attribute: "title",
   content: false, // HTML or String to fill TipTIp with
     enter: function(){},
     exit: function(){}
    };
   var opts = jQuery.extend(defaults, options);
   
   var tiptip_holder = "";
   var tiptip_content = "";
   var tiptip_arrow = "";

   // Setup tip tip elements and render them to the DOM
   if(jQuery("#tiptip_holder").length <= 0){
   tiptip_holder = jQuery('<div id="tiptip_holder" style="max-width:'+ opts.maxWidth +';"></div>');
   tiptip_content = jQuery('<div id="tiptip_content"></div>');
   tiptip_arrow = jQuery('<div id="tiptip_arrow"></div>');
   jQuery("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')));
  } else {
   tiptip_holder = jQuery("#tiptip_holder");
   tiptip_content = jQuery("#tiptip_content");
   tiptip_arrow = jQuery("#tiptip_arrow");
  }
  
  return this.each(function(){
   var org_elem = jQuery(this);
   var org_title = "";
   if(opts.content){
    org_title = opts.content;
   } else {
    org_title = org_elem.attr(opts.attribute);
   }
   if(org_title !== ""){
    if(!opts.content){
     org_elem.removeAttr(opts.attribute); //remove original Attribute
    }
    var timeout = false;
    
    if(opts.activation === "hover"){
     org_elem.hover(function(){
      active_tiptip();
     }, function(){
      if(!opts.keepAlive){
       deactive_tiptip();
      }
     });
     if(opts.keepAlive){
      tiptip_holder.hover(function(){}, function(){
       deactive_tiptip();
      });
     }
    } else if(opts.activation === "focus"){
     org_elem.focus(function(){
      active_tiptip();
     }).blur(function(){
      deactive_tiptip();
     });
    } else if(opts.activation === "click"){
     org_elem.click(function(){
      active_tiptip();
      return false;
     }).hover(function(){},function(){
      if(!opts.keepAlive){
       deactive_tiptip();
      }
     });
     if(opts.keepAlive){
      tiptip_holder.hover(function(){}, function(){
       deactive_tiptip();
      });
     }
    }
   
    function active_tiptip(){
     opts.enter.call(this);
     tiptip_content.html(org_title);
     tiptip_holder.hide().removeAttr("class").css("margin","0");
     tiptip_arrow.removeAttr("style");
     //parseInt(string, radix)
     var radix = 0;
     var top = parseInt(org_elem.offset()['top'],radix);
     var left = parseInt(org_elem.offset()['left'],radix);
     var org_width = parseInt(org_elem.outerWidth(),radix);
     var org_height = parseInt(org_elem.outerHeight(),radix);
     var tip_w = tiptip_holder.outerWidth();
     var tip_h = tiptip_holder.outerHeight();
     var w_compare = Math.round((org_width - tip_w) / 2);
     var h_compare = Math.round((org_height - tip_h) / 2);
     var marg_left = Math.round(left + w_compare);
     var marg_top = Math.round(top + org_height + opts.edgeOffset);
     var t_class = "";
     var arrow_top = "";
     var arrow_left = Math.round(tip_w - 12) / 2;

                    if(opts.defaultPosition === "bottom"){
                     t_class = "_bottom";
                    } else if(opts.defaultPosition === "top"){ 
                     t_class = "_top";
                    } else if(opts.defaultPosition === "left"){
                     t_class = "_left";
                    } else if(opts.defaultPosition === "right"){
                     t_class = "_right";
                    }
     
     var right_compare = (w_compare + left) < parseInt(jQuery(window).scrollLeft(),radix);
     var left_compare = (tip_w + left) > parseInt(jQuery(window).width(),radix);
     
     if((right_compare && w_compare < 0) || (t_class === "_right" && !left_compare) || (t_class === "_left" && left < (tip_w + opts.edgeOffset + 5))){
      t_class = "_right";
      arrow_top = Math.round(tip_h - 13) / 2;
      arrow_left = -12;
      marg_left = Math.round(left + org_width + opts.edgeOffset);
      marg_top = Math.round(top + h_compare);
     } else if((left_compare && w_compare < 0) || (t_class === "_left" && !right_compare)){
      t_class = "_left";
      arrow_top = Math.round(tip_h - 13) / 2;
      arrow_left =  Math.round(tip_w);
      marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
      marg_top = Math.round(top + h_compare);
     }

     var top_compare = (top + org_height + opts.edgeOffset + tip_h + 8) > parseInt(jQuery(window).height() + jQuery(window).scrollTop(),radix);
     var bottom_compare = ((top + org_height) - (opts.edgeOffset + tip_h + 8)) < 0;
     
     if(top_compare || (t_class === "_bottom" && top_compare) || (t_class === "_top" && !bottom_compare)){
      if(t_class === "_top" || t_class === "_bottom"){
       t_class = "_top";
      } else {
       t_class = t_class+"_top";
      }
      arrow_top = tip_h;
      marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset));
     } else if(bottom_compare | (t_class === "_top" && bottom_compare) || (t_class === "_bottom" && !top_compare)){
      if(t_class === "_top" || t_class === "_bottom"){
       t_class = "_bottom";
      } else {
       t_class = t_class+"_bottom";
      }
      arrow_top = -12;      
      marg_top = Math.round(top + org_height + opts.edgeOffset);
     }
    
     if(t_class === "_right_top" || t_class === "_left_top"){
      marg_top = marg_top + 5;
     } else if(t_class === "_right_bottom" || t_class === "_left_bottom"){  
      marg_top = marg_top - 5;
     }
     if(t_class === "_left_top" || t_class === "_left_bottom"){ 
      marg_left = marg_left + 5;
     }
     tiptip_arrow.css({"margin-left": arrow_left+"px", "margin-top": arrow_top+"px"});
     tiptip_holder.css({"margin-left": marg_left+"px", "margin-top": marg_top+"px"}).attr("class","tip"+t_class);
     
     if (timeout){ clearTimeout(timeout); }
     timeout = setTimeout(function(){ tiptip_holder.stop(true,true).fadeIn(opts.fadeIn); }, opts.delay); 
    }
    
    function deactive_tiptip(){
     opts.exit.call(this);
     if (timeout){ clearTimeout(timeout); }
     tiptip_holder.fadeOut(opts.fadeOut);
    }
   }    
  });
 };
})(jQuery);
