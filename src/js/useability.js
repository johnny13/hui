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


/* iOS Style Checkbox */
(function() {
  var iOSCheckbox;
  var __slice = Array.prototype.slice;
  iOSCheckbox = (function() {
    function iOSCheckbox(elem, options) {
      var key, opts, value;
      this.elem = jQuery(elem);
      opts = jQuery.extend({}, iOSCheckbox.defaults, options);
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
      this.offLabel = jQuery("<label class='" + this.labelOffClass + "'>\n  <span>" + this.uncheckedLabel + "</span>\n</label>").appendTo(this.container);
      this.offSpan = this.offLabel.children('span');
      this.onLabel = jQuery("<label class='" + this.labelOnClass + "'>\n  <span>" + this.checkedLabel + "</span>\n</label>").appendTo(this.container);
      this.onSpan = this.onLabel.children('span');
      return this.handle = jQuery("<div class='" + this.handleClass + "'>\n  <div class='" + this.handleRightClass + "'>\n    <div class='" + this.handleCenterClass + "' />\n  </div>\n</div>").appendTo(this.container);
    };
    iOSCheckbox.prototype.disableTextSelection = function() {
      //if (jQuery.browser.msie) {
			if(jQuery(document).width() <= 800){
        return jQuery([this.handle, this.offLabel, this.onLabel, this.container]).attr("unselectable", "on");
      }
    };
    iOSCheckbox.prototype._getDimension = function(elem, dimension) {
      if (jQuery.fn.actual != null) {
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
        jQuery(document).unbind('mousemove touchmove', localMouseMove);
        return jQuery(document).unbind('mouseup touchend', localMouseUp);
      };
      this.elem.change(function() {
        return self.refresh();
      });
      return this.container.bind('mousedown touchstart', function(event) {
        self.onMouseDown.apply(self, arguments);
        jQuery(document).bind('mousemove touchmove', localMouseMove);
        return jQuery(document).bind('mouseup touchend', localMouseUp);
      });
    };
    iOSCheckbox.prototype.initialPosition = function() {
      var containerWidth, offset;
      containerWidth = this._getDimension(this.container, "width");
      this.offLabel.css({
        width: containerWidth - this.containerRadius
      });
      offset = this.containerRadius + 1;
      if (jQuery(document).width() <= 800) {
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
      resizeHandle: true,
      resizeContainer: true,
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
  jQuery.iphoneStyle = this.iOSCheckbox = iOSCheckbox;
  jQuery.fn.iphoneStyle = function() {
    var args, checkbox, dataName, existingControl, method, params, _i, _len, _ref, _ref2, _ref3, _ref4;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    dataName = (_ref = (_ref2 = args[0]) != null ? _ref2.dataName : void 0) != null ? _ref : iOSCheckbox.defaults.dataName;
    _ref3 = this.filter(':checkbox');
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      checkbox = _ref3[_i];
      existingControl = jQuery(checkbox).data(dataName);
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
  jQuery.fn.iOSCheckbox = function(options) {
    var opts;
    if (options == null) {
      options = {};
    }
    opts = jQuery.extend({}, options, {
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
 * Scroll Pane plugin
 *
 * @name     jScrollPane()
 * @author   kelvin luck (http://jscrollpane.kelvinluck.com/basic.html)
 * @param    converts a browser scrollbars (on overflow only) into skinned CSS.
 * @example  $('.scroll-pane').jScrollPane();
 *
 */
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------

/*! 
 * Fork of Brandon Aaron (http://brandonaaron.net)
 *  Mouse Wheel Ver 3.0.6
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if (jQuery.event.fixHooks) {
    for ( var i=types.length; i; ) {
        jQuery.event.fixHooks[ types[--i] ] = jQuery.event.mouseHooks;
    }
}

jQuery.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

jQuery.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = jQuery.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return (jQuery.event.dispatch || jQuery.event.handle).apply(this, args);
}

})(jQuery);

/**
 * mouse wheel plugin
 *
 */
(function($){

var mwheelI = {
   pos: [-260, -260]
  },
 minDif  = 3,
 doc  = document,
 root  = doc.documentElement,
 body  = doc.body,
 longDelay, shortDelay
;

function unsetPos(){
 if(this === mwheelI.elem){
  mwheelI.pos = [-260, -260];
  mwheelI.elem = false;
  minDif = 3;
 }
}

jQuery.event.special.mwheelIntent = {
 setup: function(){
  var jElm = $(this).bind('mousewheel', jQuery.event.special.mwheelIntent.handler);
  if( this !== doc && this !== root && this !== body ){
   jElm.bind('mouseleave', unsetPos);
  }
  jElm = null;
        return true;
    },
 teardown: function(){
        $(this)
   .unbind('mousewheel', jQuery.event.special.mwheelIntent.handler)
   .unbind('mouseleave', unsetPos)
  ;
        return true;
    },
    handler: function(e, d){
  var pos = [e.clientX, e.clientY];
  if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
            mwheelI.elem = this;
   mwheelI.pos = pos;
   minDif = 250;
   
   clearTimeout(shortDelay);
   shortDelay = setTimeout(function(){
    minDif = 10;
   }, 200);
   clearTimeout(longDelay);
   longDelay = setTimeout(function(){
    minDif = 3;
   }, 1500);
   e = jQuery.extend({}, e, {type: 'mwheelIntent'});
            return jQuery.event.handle.apply(this, arguments);
  }
    }
};
jQuery.fn.extend({
 mwheelIntent: function(fn) {
  return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
 },
 
 unmwheelIntent: function(fn) {
  return this.unbind("mwheelIntent", fn);
 }
});

$(function(){
 body = doc.body;
 //assume that document is always scrollable, doesn't hurt if not
 $(doc).bind('mwheelIntent.mwheelIntentDefault', jQuery.noop);
});
})(jQuery);

/*!
 * jScrollPane - v2.0.0beta12 - 2012-09-27
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */

// Script: jScrollPane - cross browser customisable scrollbars
//
// *Version: 2.0.0beta12, Last updated: 2012-09-27*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// Source       - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.js
// (Minified)   - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.min.js
//
// About: License
//
// Copyright (c) 2012 Kelvin Luck
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue. 
//
// jQuery Versions - tested in 1.4.2+ - reported to work in 1.3.x
// Browsers Tested - Firefox 3.6.8, Safari 5, Opera 10.6, Chrome 5.0, IE 6, 7, 8
//
// About: Release History
//
// 2.0.0beta12 - (2012-09-27) fix for jQuery 1.8+
// 2.0.0beta11 - (2012-05-14)
// 2.0.0beta10 - (2011-04-17) cleaner required size calculation, improved keyboard support, stickToBottom/Left, other small fixes
// 2.0.0beta9 - (2011-01-31) new API methods, bug fixes and correct keyboard support for FF/OSX
// 2.0.0beta8 - (2011-01-29) touchscreen support, improved keyboard support
// 2.0.0beta7 - (2011-01-23) scroll speed consistent (thanks Aivo Paas)
// 2.0.0beta6 - (2010-12-07) scrollToElement horizontal support
// 2.0.0beta5 - (2010-10-18) jQuery 1.4.3 support, various bug fixes
// 2.0.0beta4 - (2010-09-17) clickOnTrack support, bug fixes
// 2.0.0beta3 - (2010-08-27) Horizontal mousewheel, mwheelIntent, keyboard support, bug fixes
// 2.0.0beta2 - (2010-08-21) Bug fixes
// 2.0.0beta1 - (2010-08-17) Rewrite to follow modern best practices and enable horizontal scrolling, initially hidden
//        elements and dynamically sized elements.
// 1.x - (2006-12-31 - 2010-07-31) Initial version, hosted at googlecode, deprecated

(function($,window,undefined){

 jQuery.fn.jScrollPane = function(settings)
 {
  // JScrollPane "class" - public methods are available through $('selector').data('jsp')
  function JScrollPane(elem, s)
  {
   var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
    percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY,
    verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition,
    verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
    horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight,
    reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth,
    wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
    originalElement = elem.clone(false, false).empty(),
    mwEvent = jQuery.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';

   originalPadding = elem.css('paddingTop') + ' ' +
        elem.css('paddingRight') + ' ' +
        elem.css('paddingBottom') + ' ' +
        elem.css('paddingLeft');
   originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
          (parseInt(elem.css('paddingRight'), 10) || 0);

   function initialise(s)
   {

    var /*firstChild, lastChild, */isMaintainingPositon, lastContentX, lastContentY,
      hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
      maintainAtBottom = false, maintainAtRight = false;

    settings = s;

    if (pane === undefined) {
     originalScrollTop = elem.scrollTop();
     originalScrollLeft = elem.scrollLeft();

     elem.css(
      {
       overflow: 'hidden',
       padding: 0
      }
     );
     // TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
     // come back to it later and check once it is unhidden...
     paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
     paneHeight = elem.innerHeight();

     elem.width(paneWidth);
     
     pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
     container = $('<div class="jspContainer" />')
      .css({
       'width': paneWidth + 'px',
       'height': paneHeight + 'px'
      }
     ).append(pane).appendTo(elem);

     /*
     // Move any margins from the first and last children up to the container so they can still
     // collapse with neighbouring elements as they would before jScrollPane 
     firstChild = pane.find(':first-child');
     lastChild = pane.find(':last-child');
     elem.css(
      {
       'margin-top': firstChild.css('margin-top'),
       'margin-bottom': lastChild.css('margin-bottom')
      }
     );
     firstChild.css('margin-top', 0);
     lastChild.css('margin-bottom', 0);
     */
    } else {
     elem.css('width', '');

     maintainAtBottom = settings.stickToBottom && isCloseToBottom();
     maintainAtRight  = settings.stickToRight  && isCloseToRight();

     hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth !== paneWidth || elem.outerHeight() !== paneHeight;

     if (hasContainingSpaceChanged) {
      paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
      paneHeight = elem.innerHeight();
      container.css({
       width: paneWidth + 'px',
       height: paneHeight + 'px'
      });
     }

     // If nothing changed since last check...
     if (!hasContainingSpaceChanged && previousContentWidth === contentWidth && pane.outerHeight() === contentHeight) {
      elem.width(paneWidth);
      return;
     }
     previousContentWidth = contentWidth;
     
     pane.css('width', '');
     elem.width(paneWidth);

     container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
    }

    pane.css('overflow', 'auto');
    if (s.contentWidth) {
     contentWidth = s.contentWidth;
    } else {
     contentWidth = pane[0].scrollWidth;
    }
    contentHeight = pane[0].scrollHeight;
    pane.css('overflow', '');

    percentInViewH = contentWidth / paneWidth;
    percentInViewV = contentHeight / paneHeight;
    isScrollableV = percentInViewV > 1;

    isScrollableH = percentInViewH > 1;

    //console.log(paneWidth, paneHeight, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableH, isScrollableV);

    if (!(isScrollableH || isScrollableV)) {
     elem.removeClass('jspScrollable');
     pane.css({
      top: 0,
      width: container.width() - originalPaddingTotalWidth
     });
     removeMousewheel();
     removeFocusHandler();
     removeKeyboardNav();
     removeClickOnTrack();
    } else {
     elem.addClass('jspScrollable');

     isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
     if (isMaintainingPositon) {
      lastContentX = contentPositionX();
      lastContentY = contentPositionY();
     }

     initialiseVerticalScroll();
     initialiseHorizontalScroll();
     resizeScrollbars();

     if (isMaintainingPositon) {
      scrollToX(maintainAtRight  ? (contentWidth  - paneWidth ) : lastContentX, false);
      scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
     }

     initFocusHandler();
     initMousewheel();
     initTouch();
     
     if (settings.enableKeyboardNavigation) {
      initKeyboardNav();
     }
     if (settings.clickOnTrack) {
      initClickOnTrack();
     }
     
     observeHash();
     if (settings.hijackInternalLinks) {
      hijackInternalLinks();
     }
    }

    if (settings.autoReinitialise && !reinitialiseInterval) {
     reinitialiseInterval = setInterval(
      function()
      {
       initialise(settings);
      },
      settings.autoReinitialiseDelay
     );
    } else if (!settings.autoReinitialise && reinitialiseInterval) {
     clearInterval(reinitialiseInterval);
    }

    originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);
    originalScrollLeft && elem.scrollLeft(0) && scrollToX(originalScrollLeft, false);

    elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
   }

   function initialiseVerticalScroll()
   {
    if (isScrollableV) {

     container.append(
      $('<div class="jspVerticalBar" />').append(
       $('<div class="jspCap jspCapTop" />'),
       $('<div class="jspTrack" />').append(
        $('<div class="jspDrag" />').append(
         $('<div class="jspDragTop" />'),
         $('<div class="jspDragBottom" />')
        )
       ),
       $('<div class="jspCap jspCapBottom" />')
      )
     );

     verticalBar = container.find('>.jspVerticalBar');
     verticalTrack = verticalBar.find('>.jspTrack');
     verticalDrag = verticalTrack.find('>.jspDrag');

     if (settings.showArrows) {
      arrowUp = $('<a class="jspArrow jspArrowUp" />').bind(
       'mousedown.jsp', getArrowScroll(0, -1)
      ).bind('click.jsp', nil);
      arrowDown = $('<a class="jspArrow jspArrowDown" />').bind(
       'mousedown.jsp', getArrowScroll(0, 1)
      ).bind('click.jsp', nil);
      if (settings.arrowScrollOnHover) {
       arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
       arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
      }

      appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
     }

     verticalTrackHeight = paneHeight;
     container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
      function()
      {
       verticalTrackHeight -= $(this).outerHeight();
      }
     );


     verticalDrag.hover(
      function()
      {
       verticalDrag.addClass('jspHover');
      },
      function()
      {
       verticalDrag.removeClass('jspHover');
      }
     ).bind(
      'mousedown.jsp',
      function(e)
      {
       // Stop IE from allowing text selection
       $('html').bind('dragstart.jsp selectstart.jsp', nil);

       verticalDrag.addClass('jspActive');

       var startY = e.pageY - verticalDrag.position().top;

       $('html').bind(
        'mousemove.jsp',
        function(e)
        {
         positionDragY(e.pageY - startY, false);
        }
       ).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
       return false;
      }
     );
     sizeVerticalScrollbar();
    }
   }

   function sizeVerticalScrollbar()
   {
    verticalTrack.height(verticalTrackHeight + 'px');
    verticalDragPosition = 0;
    scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

    // Make the pane thinner to allow for the vertical scrollbar
    pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

    // Add margin to the left of the pane if scrollbars are on that side (to position
    // the scrollbar on the left or right set it's left or right property in CSS)
    try {
     if (verticalBar.position().left === 0) {
      pane.css('margin-left', scrollbarWidth + 'px');
     }
    } catch (err) {
    }
   }

   function initialiseHorizontalScroll()
   {
    if (isScrollableH) {

     container.append(
      $('<div class="jspHorizontalBar" />').append(
       $('<div class="jspCap jspCapLeft" />'),
       $('<div class="jspTrack" />').append(
        $('<div class="jspDrag" />').append(
         $('<div class="jspDragLeft" />'),
         $('<div class="jspDragRight" />')
        )
       ),
       $('<div class="jspCap jspCapRight" />')
      )
     );

     horizontalBar = container.find('>.jspHorizontalBar');
     horizontalTrack = horizontalBar.find('>.jspTrack');
     horizontalDrag = horizontalTrack.find('>.jspDrag');

     if (settings.showArrows) {
      arrowLeft = $('<a class="jspArrow jspArrowLeft" />').bind(
       'mousedown.jsp', getArrowScroll(-1, 0)
      ).bind('click.jsp', nil);
      arrowRight = $('<a class="jspArrow jspArrowRight" />').bind(
       'mousedown.jsp', getArrowScroll(1, 0)
      ).bind('click.jsp', nil);
      if (settings.arrowScrollOnHover) {
       arrowLeft.bind('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
       arrowRight.bind('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
      }
      appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
     }

     horizontalDrag.hover(
      function()
      {
       horizontalDrag.addClass('jspHover');
      },
      function()
      {
       horizontalDrag.removeClass('jspHover');
      }
     ).bind(
      'mousedown.jsp',
      function(e)
      {
       // Stop IE from allowing text selection
       $('html').bind('dragstart.jsp selectstart.jsp', nil);

       horizontalDrag.addClass('jspActive');

       var startX = e.pageX - horizontalDrag.position().left;

       $('html').bind(
        'mousemove.jsp',
        function(e)
        {
         positionDragX(e.pageX - startX, false);
        }
       ).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
       return false;
      }
     );
     horizontalTrackWidth = container.innerWidth();
     sizeHorizontalScrollbar();
    }
   }

   function sizeHorizontalScrollbar()
   {
    container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(
     function()
     {
      horizontalTrackWidth -= $(this).outerWidth();
     }
    );

    horizontalTrack.width(horizontalTrackWidth + 'px');
    horizontalDragPosition = 0;
   }

   function resizeScrollbars()
   {
    if (isScrollableH && isScrollableV) {
     var horizontalTrackHeight = horizontalTrack.outerHeight(),
      verticalTrackWidth = verticalTrack.outerWidth();
     verticalTrackHeight -= horizontalTrackHeight;
     $(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(
      function()
      {
       horizontalTrackWidth += $(this).outerWidth();
      }
     );
     horizontalTrackWidth -= verticalTrackWidth;
     paneHeight -= verticalTrackWidth;
     paneWidth -= horizontalTrackHeight;
     horizontalTrack.parent().append(
      $('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px')
     );
     sizeVerticalScrollbar();
     sizeHorizontalScrollbar();
    }
    // reflow content
    if (isScrollableH) {
     pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
    }
    contentHeight = pane.outerHeight();
    percentInViewV = contentHeight / paneHeight;

    if (isScrollableH) {
     horizontalDragWidth = Math.ceil(1 / percentInViewH * horizontalTrackWidth);
     if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
      horizontalDragWidth = settings.horizontalDragMaxWidth;
     } else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
      horizontalDragWidth = settings.horizontalDragMinWidth;
     }
     horizontalDrag.width(horizontalDragWidth + 'px');
     dragMaxX = horizontalTrackWidth - horizontalDragWidth;
     _positionDragX(horizontalDragPosition); // To update the state for the arrow buttons
    }
    if (isScrollableV) {
     verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
     if (verticalDragHeight > settings.verticalDragMaxHeight) {
      verticalDragHeight = settings.verticalDragMaxHeight;
     } else if (verticalDragHeight < settings.verticalDragMinHeight) {
      verticalDragHeight = settings.verticalDragMinHeight;
     }
     verticalDrag.height(verticalDragHeight + 'px');
     dragMaxY = verticalTrackHeight - verticalDragHeight;
     _positionDragY(verticalDragPosition); // To update the state for the arrow buttons
    }
   }

   function appendArrows(ele, p, a1, a2)
   {
    var p1 = "before", p2 = "after", aTemp;
    
    // Sniff for mac... Is there a better way to determine whether the arrows would naturally appear
    // at the top or the bottom of the bar?
    if (p === "os") {
     p = /Mac/.test(navigator.platform) ? "after" : "split";
    }
    if (p === p1) {
     p2 = p;
    } else if (p === p2) {
     p1 = p;
     aTemp = a1;
     a1 = a2;
     a2 = aTemp;
    }

    ele[p1](a1)[p2](a2);
   }

   function getArrowScroll(dirX, dirY, ele)
   {
    return function()
    {
     arrowScroll(dirX, dirY, this, ele);
     this.blur();
     return false;
    };
   }

   function arrowScroll(dirX, dirY, arrow, ele)
   {
    arrow = $(arrow).addClass('jspActive');

    var eve,
     scrollTimeout,
     isFirst = true,
     doScroll = function()
     {
      if (dirX !== 0) {
       jsp.scrollByX(dirX * settings.arrowButtonSpeed);
      }
      if (dirY !== 0) {
       jsp.scrollByY(dirY * settings.arrowButtonSpeed);
      }
      scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
      isFirst = false;
     };

    doScroll();

    eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
    ele = ele || $('html');
    ele.bind(
     eve,
     function()
     {
      arrow.removeClass('jspActive');
      scrollTimeout && clearTimeout(scrollTimeout);
      scrollTimeout = null;
      ele.unbind(eve);
     }
    );
   }

   function initClickOnTrack()
   {
    removeClickOnTrack();
    if (isScrollableV) {
     verticalTrack.bind(
      'mousedown.jsp',
      function(e)
      {
       if (e.originalTarget === undefined || e.originalTarget === e.currentTarget) {
        var clickedTrack = $(this),
         offset = clickedTrack.offset(),
         direction = e.pageY - offset.top - verticalDragPosition,
         scrollTimeout,
         isFirst = true,
         doScroll = function()
         {
          var offset = clickedTrack.offset(),
           pos = e.pageY - offset.top - verticalDragHeight / 2,
           contentDragY = paneHeight * settings.scrollPagePercent,
           dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
          if (direction < 0) {
           if (verticalDragPosition - dragY > pos) {
            jsp.scrollByY(-contentDragY);
           } else {
            positionDragY(pos);
           }
          } else if (direction > 0) {
           if (verticalDragPosition + dragY < pos) {
            jsp.scrollByY(contentDragY);
           } else {
            positionDragY(pos);
           }
          } else {
           cancelClick();
           return;
          }
          scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
          isFirst = false;
         },
         cancelClick = function()
         {
          scrollTimeout && clearTimeout(scrollTimeout);
          scrollTimeout = null;
          $(document).unbind('mouseup.jsp', cancelClick);
         };
        doScroll();
        $(document).bind('mouseup.jsp', cancelClick);
        return false;
       }
      }
     );
    }
    
    if (isScrollableH) {
     horizontalTrack.bind(
      'mousedown.jsp',
      function(e)
      {
       if (e.originalTarget === undefined || e.originalTarget === e.currentTarget) {
        var clickedTrack = $(this),
         offset = clickedTrack.offset(),
         direction = e.pageX - offset.left - horizontalDragPosition,
         scrollTimeout,
         isFirst = true,
         doScroll = function()
         {
          var offset = clickedTrack.offset(),
           pos = e.pageX - offset.left - horizontalDragWidth / 2,
           contentDragX = paneWidth * settings.scrollPagePercent,
           dragX = dragMaxX * contentDragX / (contentWidth - paneWidth);
          if (direction < 0) {
           if (horizontalDragPosition - dragX > pos) {
            jsp.scrollByX(-contentDragX);
           } else {
            positionDragX(pos);
           }
          } else if (direction > 0) {
           if (horizontalDragPosition + dragX < pos) {
            jsp.scrollByX(contentDragX);
           } else {
            positionDragX(pos);
           }
          } else {
           cancelClick();
           return;
          }
          scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
          isFirst = false;
         },
         cancelClick = function()
         {
          scrollTimeout && clearTimeout(scrollTimeout);
          scrollTimeout = null;
          $(document).unbind('mouseup.jsp', cancelClick);
         };
        doScroll();
        $(document).bind('mouseup.jsp', cancelClick);
        return false;
       }
      }
     );
    }
   }

   function removeClickOnTrack()
   {
    if (horizontalTrack) {
     horizontalTrack.unbind('mousedown.jsp');
    }
    if (verticalTrack) {
     verticalTrack.unbind('mousedown.jsp');
    }
   }

   function cancelDrag()
   {
    $('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

    if (verticalDrag) {
     verticalDrag.removeClass('jspActive');
    }
    if (horizontalDrag) {
     horizontalDrag.removeClass('jspActive');
    }
   }

   function positionDragY(destY, animate)
   {
    if (!isScrollableV) {
     return;
    }
    if (destY < 0) {
     destY = 0;
    } else if (destY > dragMaxY) {
     destY = dragMaxY;
    }

    // can't just check if(animate) because false is a valid value that could be passed in...
    if (animate === undefined) {
     animate = settings.animateScroll;
    }
    if (animate) {
     jsp.animate(verticalDrag, 'top', destY, _positionDragY);
    } else {
     verticalDrag.css('top', destY);
     _positionDragY(destY);
    }

   }

   function _positionDragY(destY)
   {
    if (destY === undefined) {
     destY = verticalDrag.position().top;
    }

    container.scrollTop(0);
    verticalDragPosition = destY;

    var isAtTop = verticalDragPosition === 0,
     isAtBottom = verticalDragPosition === dragMaxY,
     percentScrolled = destY/ dragMaxY,
     destTop = -percentScrolled * (contentHeight - paneHeight);

    if (wasAtTop !== isAtTop || wasAtBottom !== isAtBottom) {
     wasAtTop = isAtTop;
     wasAtBottom = isAtBottom;
     elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
    }
    
    updateVerticalArrows(isAtTop, isAtBottom);
    pane.css('top', destTop);
    elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
   }

   function positionDragX(destX, animate)
   {
    if (!isScrollableH) {
     return;
    }
    if (destX < 0) {
     destX = 0;
    } else if (destX > dragMaxX) {
     destX = dragMaxX;
    }

    if (animate === undefined) {
     animate = settings.animateScroll;
    }
    if (animate) {
     jsp.animate(horizontalDrag, 'left', destX, _positionDragX);
    } else {
     horizontalDrag.css('left', destX);
     _positionDragX(destX);
    }
   }

   function _positionDragX(destX)
   {
    if (destX === undefined) {
     destX = horizontalDrag.position().left;
    }

    container.scrollTop(0);
    horizontalDragPosition = destX;

    var isAtLeft = horizontalDragPosition === 0,
     isAtRight = horizontalDragPosition === dragMaxX,
     percentScrolled = destX / dragMaxX,
     destLeft = -percentScrolled * (contentWidth - paneWidth);

    if (wasAtLeft !== isAtLeft || wasAtRight !== isAtRight) {
     wasAtLeft = isAtLeft;
     wasAtRight = isAtRight;
     elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
    }
    
    updateHorizontalArrows(isAtLeft, isAtRight);
    pane.css('left', destLeft);
    elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
   }

   function updateVerticalArrows(isAtTop, isAtBottom)
   {
    if (settings.showArrows) {
     arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
     arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
    }
   }

   function updateHorizontalArrows(isAtLeft, isAtRight)
   {
    if (settings.showArrows) {
     arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
     arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
    }
   }

   function scrollToY(destY, animate)
   {
    var percentScrolled = destY / (contentHeight - paneHeight);
    positionDragY(percentScrolled * dragMaxY, animate);
   }

   function scrollToX(destX, animate)
   {
    var percentScrolled = destX / (contentWidth - paneWidth);
    positionDragX(percentScrolled * dragMaxX, animate);
   }

   function scrollToElement(ele, stickToTop, animate)
   {
    var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;

    // Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
    // errors from the lookup...
    try {
     e = $(ele);
    } catch (err) {
     return;
    }
    eleHeight = e.outerHeight();
    eleWidth= e.outerWidth();

    container.scrollTop(0);
    container.scrollLeft(0);
    
    // loop through parents adding the offset top of any elements that are relatively positioned between
    // the focused element and the jspPane so we can get the true distance from the top
    // of the focused element to the top of the scrollpane...
    while (!e.is('.jspPane')) {
     eleTop += e.position().top;
     eleLeft += e.position().left;
     e = e.offsetParent();
     if (/^body|html$/i.test(e[0].nodeName)) {
      // we ended up too high in the document structure. Quit!
      return;
     }
    }

    viewportTop = contentPositionY();
    maxVisibleEleTop = viewportTop + paneHeight;
    if (eleTop < viewportTop || stickToTop) { // element is above viewport
     destY = eleTop - settings.verticalGutter;
    } else if (eleTop + eleHeight > maxVisibleEleTop) { // element is below viewport
     destY = eleTop - paneHeight + eleHeight + settings.verticalGutter;
    }
    if (destY) {
     scrollToY(destY, animate);
    }
    
    viewportLeft = contentPositionX();
             maxVisibleEleLeft = viewportLeft + paneWidth;
             if (eleLeft < viewportLeft || stickToTop) { // element is to the left of viewport
                 destX = eleLeft - settings.horizontalGutter;
             } else if (eleLeft + eleWidth > maxVisibleEleLeft) { // element is to the right viewport
                 destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
             }
             if (destX) {
                 scrollToX(destX, animate);
             }

   }

   function contentPositionX()
   {
    return -pane.position().left;
   }

   function contentPositionY()
   {
    return -pane.position().top;
   }

   function isCloseToBottom()
   {
    var scrollableHeight = contentHeight - paneHeight;
    return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
   }

   function isCloseToRight()
   {
    var scrollableWidth = contentWidth - paneWidth;
    return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
   }

   function initMousewheel()
   {
    container.unbind(mwEvent).bind(
     mwEvent,
     function (event, delta, deltaX, deltaY) {
      var dX = horizontalDragPosition, dY = verticalDragPosition;
      jsp.scrollBy(deltaX * settings.mouseWheelSpeed, -deltaY * settings.mouseWheelSpeed, false);
      // return true if there was no movement so rest of screen can scroll
      return dX === horizontalDragPosition && dY === verticalDragPosition;
     }
    );
   }

   function removeMousewheel()
   {
    container.unbind(mwEvent);
   }

   function nil()
   {
    return false;
   }

   function initFocusHandler()
   {
    pane.find(':input,a').unbind('focus.jsp').bind(
     'focus.jsp',
     function(e)
     {
      scrollToElement(e.target, false);
     }
    );
   }

   function removeFocusHandler()
   {
    pane.find(':input,a').unbind('focus.jsp');
   }
   
   function initKeyboardNav()
   {
    var keyDown, elementHasScrolled, validParents = [];
    isScrollableH && validParents.push(horizontalBar[0]);
    isScrollableV && validParents.push(verticalBar[0]);
    
    // IE also focuses elements that don't have tabindex set.
    pane.focus(
     function()
     {
      elem.focus();
     }
    );
    
    elem.attr('tabindex', 0)
     .unbind('keydown.jsp keypress.jsp')
     .bind(
      'keydown.jsp',
      function(e)
      {
       if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
        return;
       }
       var dX = horizontalDragPosition, dY = verticalDragPosition;
       switch(e.keyCode) {
        case 40: // down
        case 38: // up
        case 34: // page down
        case 32: // space
        case 33: // page up
        case 39: // right
        case 37: // left
         keyDown = e.keyCode;
         keyDownHandler();
         break;
        case 35: // end
         scrollToY(contentHeight - paneHeight);
         keyDown = null;
         break;
        case 36: // home
         scrollToY(0);
         keyDown = null;
         break;
       }

       elementHasScrolled = e.keyCode === keyDown && dX !== horizontalDragPosition || dY !== verticalDragPosition;
       return !elementHasScrolled;
      }
     ).bind(
      'keypress.jsp', // For FF/ OSX so that we can cancel the repeat key presses if the JSP scrolls...
      function(e)
      {
       if (e.keyCode === keyDown) {
        keyDownHandler();
       }
       return !elementHasScrolled;
      }
     );
    
    if (settings.hideFocus) {
     elem.css('outline', 'none');
     if ('hideFocus' in container[0]){
      elem.attr('hideFocus', true);
     }
    } else {
     elem.css('outline', '');
     if ('hideFocus' in container[0]){
      elem.attr('hideFocus', false);
     }
    }
    
    function keyDownHandler()
    {
     var dX = horizontalDragPosition, dY = verticalDragPosition;
     switch(keyDown) {
      case 40: // down
       jsp.scrollByY(settings.keyboardSpeed, false);
       break;
      case 38: // up
       jsp.scrollByY(-settings.keyboardSpeed, false);
       break;
      case 34: // page down
      case 32: // space
       jsp.scrollByY(paneHeight * settings.scrollPagePercent, false);
       break;
      case 33: // page up
       jsp.scrollByY(-paneHeight * settings.scrollPagePercent, false);
       break;
      case 39: // right
       jsp.scrollByX(settings.keyboardSpeed, false);
       break;
      case 37: // left
       jsp.scrollByX(-settings.keyboardSpeed, false);
       break;
     }

     elementHasScrolled = dX !== horizontalDragPosition || dY !== verticalDragPosition;
     return elementHasScrolled;
    }
   }
   
   function removeKeyboardNav()
   {
    elem.attr('tabindex', '-1')
     .removeAttr('tabindex')
     .unbind('keydown.jsp keypress.jsp');
   }

   function observeHash()
   {
    if (location.hash && location.hash.length > 1) {
     var e,
      retryInt,
      hash = escape(location.hash.substr(1)) // hash must be escaped to prevent XSS
      ;
     try {
      e = $('#' + hash + ', a[name="' + hash + '"]');
     } catch (err) {
      return;
     }

     if (e.length && pane.find(hash)) {
      // nasty workaround but it appears to take a little while before the hash has done its thing
      // to the rendered page so we just wait until the container's scrollTop has been messed up.
      if (container.scrollTop() === 0) {
       retryInt = setInterval(
        function()
        {
         if (container.scrollTop() > 0) {
          scrollToElement(e, true);
          $(document).scrollTop(container.position().top);
          clearInterval(retryInt);
         }
        },
        50
       );
      } else {
       scrollToElement(e, true);
       $(document).scrollTop(container.position().top);
      }
     }
    }
   }

   function hijackInternalLinks()
   {
    // only register the link handler once
    if ($(document.body).data('jspHijack')) {
     return;
    }

    // remember that the handler was bound
    $(document.body).data('jspHijack', true);

    // use live handler to also capture newly created links
    $(document.body).delegate('a[href*=#]', 'click', function(event) {
     // does the link point to the same page?
     // this also takes care of cases with a <base>-Tag or Links not starting with the hash #
     // e.g. <a href="index.html#test"> when the current url already is index.html
     var href = this.href.substr(0, this.href.indexOf('#')),
      locationHref = location.href,
      hash,
      element,
      container,
      jsp,
      scrollTop,
      elementTop;
     if (location.href.indexOf('#') !== -1) {
      locationHref = location.href.substr(0, location.href.indexOf('#'));
     }
     if (href !== locationHref) {
      // the link points to another page
      return;
     }

     // check if jScrollPane should handle this click event
     hash = escape(this.href.substr(this.href.indexOf('#') + 1));

     // find the element on the page
     element;
     try {
      element = $('#' + hash + ', a[name="' + hash + '"]');
     } catch (e) {
      // hash is not a valid jQuery identifier
      return;
     }

     if (!element.length) {
      // this link does not point to an element on this page
      return;
     }

     container = element.closest('.jspScrollable');
     jsp = container.data('jsp');

     // jsp might be another jsp instance than the one, that bound this event
     // remember: this event is only bound once for all instances.
     jsp.scrollToElement(element, true);

     if (container[0].scrollIntoView) {
      // also scroll to the top of the container (if it is not visible)
      scrollTop = $(window).scrollTop();
      elementTop = element.offset().top;
      if (elementTop < scrollTop || elementTop > scrollTop + $(window).height()) {
       container[0].scrollIntoView();
      }
     }

     // jsp handled this event, prevent the browser default (scrolling :P)
     event.preventDefault();
    });
   }
   
   // Init touch on iPad, iPhone, iPod, Android
   function initTouch()
   {
    var startX,
     startY,
     touchStartX,
     touchStartY,
     moved,
     moving = false;
  
    container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind(
     'touchstart.jsp',
     function(e)
     {
      var touch = e.originalEvent.touches[0];
      startX = contentPositionX();
      startY = contentPositionY();
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      moved = false;
      moving = true;
     }
    ).bind(
     'touchmove.jsp',
     function(ev)
     {
      if(!moving) {
       return;
      }
      
      var touchPos = ev.originalEvent.touches[0],
       dX = horizontalDragPosition, dY = verticalDragPosition;
      
      jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);
      
      moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
      
      // return true if there was no movement so rest of screen can scroll
      return dX === horizontalDragPosition && dY === verticalDragPosition;
     }
    ).bind(
     'touchend.jsp',
     function(e)
     {
      moving = false;
      /*if(moved) {
       return false;
      }*/
     }
    ).bind(
     'click.jsp-touchclick',
     function(e)
     {
      if(moved) {
       moved = false;
       return false;
      }
     }
    );
   }
   
   function destroy(){
    var currentY = contentPositionY(),
     currentX = contentPositionX();
    elem.removeClass('jspScrollable').unbind('.jsp');
    elem.replaceWith(originalElement.append(pane.children()));
    originalElement.scrollTop(currentY);
    originalElement.scrollLeft(currentX);

    // clear reinitialize timer if active
    if (reinitialiseInterval) {
     clearInterval(reinitialiseInterval);
    }
   }

   // Public API
   jQuery.extend(
    jsp,
    {
     // Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
     // was initialised). The settings object which is passed in will override any settings from the
     // previous time it was initialised - if you don't pass any settings then the ones from the previous
     // initialisation will be used.
     reinitialise: function(s)
     {
      s = jQuery.extend({}, settings, s);
      initialise(s);
     },
     // Scrolls the specified element (a jQuery object, DOM node or jQuery selector string) into view so
     // that it can be seen within the viewport. If stickToTop is true then the element will appear at
     // the top of the viewport, if it is false then the viewport will scroll as little as possible to
     // show the element. You can also specify if you want animation to occur. If you don't provide this
     // argument then the animateScroll value from the settings object is used instead.
     scrollToElement: function(ele, stickToTop, animate)
     {
      scrollToElement(ele, stickToTop, animate);
     },
     // Scrolls the pane so that the specified co-ordinates within the content are at the top left
     // of the viewport. animate is optional and if not passed then the value of animateScroll from
     // the settings object this jScrollPane was initialised with is used.
     scrollTo: function(destX, destY, animate)
     {
      scrollToX(destX, animate);
      scrollToY(destY, animate);
     },
     // Scrolls the pane so that the specified co-ordinate within the content is at the left of the
     // viewport. animate is optional and if not passed then the value of animateScroll from the settings
     // object this jScrollPane was initialised with is used.
     scrollToX: function(destX, animate)
     {
      scrollToX(destX, animate);
     },
     // Scrolls the pane so that the specified co-ordinate within the content is at the top of the
     // viewport. animate is optional and if not passed then the value of animateScroll from the settings
     // object this jScrollPane was initialised with is used.
     scrollToY: function(destY, animate)
     {
      scrollToY(destY, animate);
     },
     // Scrolls the pane to the specified percentage of its maximum horizontal scroll position. animate
     // is optional and if not passed then the value of animateScroll from the settings object this
     // jScrollPane was initialised with is used.
     scrollToPercentX: function(destPercentX, animate)
     {
      scrollToX(destPercentX * (contentWidth - paneWidth), animate);
     },
     // Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
     // is optional and if not passed then the value of animateScroll from the settings object this
     // jScrollPane was initialised with is used.
     scrollToPercentY: function(destPercentY, animate)
     {
      scrollToY(destPercentY * (contentHeight - paneHeight), animate);
     },
     // Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
     // the value of animateScroll from the settings object this jScrollPane was initialised with is used.
     scrollBy: function(deltaX, deltaY, animate)
     {
      jsp.scrollByX(deltaX, animate);
      jsp.scrollByY(deltaY, animate);
     },
     // Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
     // the value of animateScroll from the settings object this jScrollPane was initialised with is used.
     scrollByX: function(deltaX, animate)
     {
      var destX = contentPositionX() + Math[deltaX<0 ? 'floor' : 'ceil'](deltaX),
       percentScrolled = destX / (contentWidth - paneWidth);
      positionDragX(percentScrolled * dragMaxX, animate);
     },
     // Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
     // the value of animateScroll from the settings object this jScrollPane was initialised with is used.
     scrollByY: function(deltaY, animate)
     {
      var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
       percentScrolled = destY / (contentHeight - paneHeight);
      positionDragY(percentScrolled * dragMaxY, animate);
     },
     // Positions the horizontal drag at the specified x position (and updates the viewport to reflect
     // this). animate is optional and if not passed then the value of animateScroll from the settings
     // object this jScrollPane was initialised with is used.
     positionDragX: function(x, animate)
     {
      positionDragX(x, animate);
     },
     // Positions the vertical drag at the specified y position (and updates the viewport to reflect
     // this). animate is optional and if not passed then the value of animateScroll from the settings
     // object this jScrollPane was initialised with is used.
     positionDragY: function(y, animate)
     {
      positionDragY(y, animate);
     },
     // This method is called when jScrollPane is trying to animate to a new position. You can override
     // it if you want to provide advanced animation functionality. It is passed the following arguments:
     //  * ele          - the element whose position is being animated
     //  * prop         - the property that is being animated
     //  * value        - the value it's being animated to
     //  * stepCallback - a function that you must execute each time you update the value of the property
     // You can use the default implementation (below) as a starting point for your own implementation.
     animate: function(ele, prop, value, stepCallback)
     {
      var params = {};
      params[prop] = value;
      ele.animate(
       params,
       {
        'duration' : settings.animateDuration,
        'easing' : settings.animateEase,
        'queue'  : false,
        'step'  : stepCallback
       }
      );
     },
     // Returns the current x position of the viewport with regards to the content pane.
     getContentPositionX: function()
     {
      return contentPositionX();
     },
     // Returns the current y position of the viewport with regards to the content pane.
     getContentPositionY: function()
     {
      return contentPositionY();
     },
     // Returns the width of the content within the scroll pane.
     getContentWidth: function()
     {
      return contentWidth;
     },
     // Returns the height of the content within the scroll pane.
     getContentHeight: function()
     {
      return contentHeight;
     },
     // Returns the horizontal position of the viewport within the pane content.
     getPercentScrolledX: function()
     {
      return contentPositionX() / (contentWidth - paneWidth);
     },
     // Returns the vertical position of the viewport within the pane content.
     getPercentScrolledY: function()
     {
      return contentPositionY() / (contentHeight - paneHeight);
     },
     // Returns whether or not this scrollpane has a horizontal scrollbar.
     getIsScrollableH: function()
     {
      return isScrollableH;
     },
     // Returns whether or not this scrollpane has a vertical scrollbar.
     getIsScrollableV: function()
     {
      return isScrollableV;
     },
     // Gets a reference to the content pane. It is important that you use this method if you want to
     // edit the content of your jScrollPane as if you access the element directly then you may have some
     // problems (as your original element has had additional elements for the scrollbars etc added into
     // it).
     getContentPane: function()
     {
      return pane;
     },
     // Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
     // animateScroll value from settings is used instead.
     scrollToBottom: function(animate)
     {
      positionDragY(dragMaxY, animate);
     },
     // Hijacks the links on the page which link to content inside the scrollpane. If you have changed
     // the content of your page (e.g. via AJAX) and want to make sure any new anchor links to the
     // contents of your scroll pane will work then call this function.
     hijackInternalLinks: jQuery.noop,
     // Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
     // initialised.
     destroy: function()
     {
       destroy();
     }
    }
   );
   
   initialise(s);
  }

  // Pluginifying code...
  settings = jQuery.extend({}, jQuery.fn.jScrollPane.defaults, settings);
  
  // Apply default speed
  jQuery.each(['mouseWheelSpeed', 'arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
   settings[this] = settings[this] || settings.speed;
  });

  return this.each(
   function()
   {
    var elem = $(this), jspApi = elem.data('jsp');
    if (jspApi) {
     jspApi.reinitialise(settings);
    } else {
     $("script",elem).filter('[type="text/javascript"],:not([type])').remove();
     jspApi = new JScrollPane(elem, settings);
     elem.data('jsp', jspApi);
    }
   }
  );
 };

 jQuery.fn.jScrollPane.defaults = {
  showArrows     : false,
  maintainPosition   : true,
  stickToBottom    : false,
  stickToRight    : false,
  clickOnTrack    : true,
  autoReinitialise   : true,
  autoReinitialiseDelay  : 777,
  verticalDragMinHeight  : 0,
  verticalDragMaxHeight  : 99999,
  horizontalDragMinWidth  : 0,
  horizontalDragMaxWidth  : 99999,
  contentWidth    : undefined,
  animateScroll    : false,
  animateDuration    : 300,
  animateEase     : 'jswing',
  hijackInternalLinks   : false,
  verticalGutter    : 4,
  horizontalGutter   : 4,
  mouseWheelSpeed    : 0,
  arrowButtonSpeed   : 0,
  arrowRepeatFreq    : 50,
  arrowScrollOnHover   : false,
  trackClickSpeed    : 0,
  trackClickRepeatFreq  : 70,
  verticalArrowPositions  : 'split',
  horizontalArrowPositions : 'split',
  enableKeyboardNavigation : true,
  hideFocus     : false,
  keyboardSpeed    : 0,
  initialDelay                : 300,        // Delay before starting repeating
  speed      : 30,  // Default speed when others falsey
  scrollPagePercent   : .8  // Percent of visible area scrolled when pageUp/Down or track area pressed
 };

})(jQuery,this);

//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------
//------------ ---------- ---------- ------- Scroll Pane plugin---------- ---------- ---------- ----------