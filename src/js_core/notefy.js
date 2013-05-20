/************************************************ [S02] Notefy */
/* notefy ver 0.2.0
 * 
 * Adapted from jGrowl 1.2.9. Written by Stan Lemon <stosh1985@gmail.com>
 *
 * Changes to jGrowl are designated with a " hui tweak " tag.
 * Improvements include Touch Interactions and Icon Support.
 *
 * A Shortcut Function: notefy() is included.
 * example: notefy('title','app message'); 
 *
 * An HTML5 Notification system is also included.
 *
 *
 *
 * full list of options http://hui.huement.com/docs/?history=Javascript/02%20notefy
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */

/* jGrowl Shortcut Function */
function notefy(headerMsg, sentmessage, user_icon, sticky, user_position){
 //default options are top-right and not sticky.
 //with jGrowl-icon-notefy as the class.

 var icon = 'notefy';
 var stickyo = false;
 var noteloc = 'top-right';

 if(user_icon != undefined){
  icon = user_icon;
 }
 if(sticky !== undefined){
  stickyo = true;
 } 
 if(user_position !== undefined){
  var noteloc = user_position;
 }

 jQuery.jGrowl(sentmessage, {
  header: headerMsg,
  icon_theme: icon,
  sticky: stickyo,
  closer: false,
  location: noteloc
 });

}

(function($) {
	
	/* hui tweak */
	/* instead of checking for ie6, now we check if the screen size is less than 800 pixels. 
	*  if true, then we add an optional "smallscreen" class to growl, instead of the ie6 class.
	*  the small screen class gives support for mobile phones and tablet views.
	*/
	//Compatibility holdover for 1.9 to check IE6
	//var $ie6 = (function(){
	//	return false === jQuery.support.boxModel && jQuery.support.objectAll && $support.leadingWhitespace;
	//})();

	/** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
	jQuery.jGrowl = function( m , o ) {
		// To maintain compatibility with older version that only supported one instance we'll create the base container.
		if ( $('#jGrowl').size() == 0 ) 
			$('<div id="jGrowl"></div>').addClass( (o && o.position) ? o.position : jQuery.jGrowl.defaults.position ).appendTo('body');

		// Create a notification on the container.
		$('#jGrowl').jGrowl(m,o);
	};


	/** Raise jGrowl Notification on a jGrowl Container **/
	jQuery.fn.jGrowl = function( m , o ) {
		if ( jQuery.isFunction(this.each) ) {
			var args = arguments;

			return this.each(function() {
				var self = this;

				/** Create a jGrowl Instance on the Container if it does not exist **/
				if ( $(this).data('jGrowl.instance') == undefined ) {
					$(this).data('jGrowl.instance', jQuery.extend( new jQuery.fn.jGrowl(), { notifications: [], element: null, interval: null } ));
					$(this).data('jGrowl.instance').startup( this );
				}

				/** Optionally call jGrowl instance methods, or just raise a normal notification **/
				if ( jQuery.isFunction($(this).data('jGrowl.instance')[m]) ) {
					$(this).data('jGrowl.instance')[m].apply( $(this).data('jGrowl.instance') , jQuery.makeArray(args).slice(1) );
				} else {
					$(this).data('jGrowl.instance').create( m , o );
				}
			});
		};
	};

	jQuery.extend( jQuery.fn.jGrowl.prototype , {

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
			icon_theme: 	'notefy',
			corners: 		'3px',
			check: 			250,
			life: 			3000,
			closeDuration:  'normal',
			openDuration:   'normal',
			easing: 		'easeOutCubic',
			closer: 		true,
			closeTemplate: '&times;',
			closerTemplate: '<div>[ clear all ]</div>',
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
			var o = jQuery.extend({}, this.defaults, o);

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

			// Support for jQuery theme-states, if this is not used it displays a widget header
			o.themeState = (o.themeState == '') ? '' : 'ui-state-' + o.themeState;

//			var notification = $(
//				'<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
//				((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '">' +
//				'<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
//				'<div class="jGrowl-header">' + o.header + '</div>' +
//				'<div class="jGrowl-message">' + message + '</div></div>'
//			).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
//				$(this).parent().trigger('jGrowl.close');
//			}).parent();

			/* hui tweak */
			var notification = jQuery(
				'<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
				((o.group !== undefined && o.group !== '') ? ' ' + o.group : '') + '"><div class="jGhuicon jGrowl-icon-'+ o.icon_theme +'"></div>' +
				'<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
				'<div class="jGrowl-header">' + o.header + '</div>' +
				'<div class="jGrowl-message">' + message + '</div></div>'
				).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
				jQuery(this).parent().trigger('jGrowl.close');
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
						if (jQuery.support.opacity === false) 
							this.style.removeAttribute('filter');

						if ( $(this).data("jGrowl") != null ) // Happens when a notification is closing before it's open.
							$(this).data("jGrowl").created = new Date();
						
						$(this).trigger('jGrowl.afterOpen');
					});
				}
			}).bind('jGrowl.afterOpen', function() {
			    o.afterOpen.apply( notification , [notification,message,o,self.element] );
					//swipe it closed
					var obj = notification;
					var hammer = new Hammer(obj.get(0));

					hammer.ondrag = function(ev) {
			        var left = 0;
			        // determine which direction we need to show the preview
			    		if(ev.direction === 'left') {
			    			left = ev.distance;
			    		}
			    	};
					hammer.ondragend = function(ev) {
			        // if we moved the slide 100px then navigate
			        if(Math.abs(ev.distance) > 100) {
			            if(ev.direction === 'left') {
										notification.trigger('jGrowl.close');
										notification.remove();
			            }
			        }
			    };
			}).bind('jGrowl.beforeClose', function() {
				if ( o.beforeClose.apply( notification , [notification,message,o,self.element] ) != false )
					$(this).trigger('jGrowl.close');
			}).bind('jGrowl.close', function() {
				// Pause the notification, lest during the course of animation another close event gets called.
				$(this).data('jGrowl.pause', true);
				$(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
					if ( jQuery.isFunction(o.close) ) {
						if ( o.close.apply( notification , [notification,message,o,self.element] ) !== false )
							$(this).remove();
					} else {
						$(this).remove();
					}
				});
			}).trigger('jGrowl.beforeOpen');
		
			/** Optional Corners Plugin **/
			if ( o.corners != '' && jQuery.fn.corner != undefined ) $(notification).corner( o.corners );

			/** Add a Global Closer if more than one notification exists **/
			if ( $('div.jGrowl-notification:parent', self.element).size() > 1 && 
				 $('div.jGrowl-closer', self.element).size() == 0 && this.defaults.closer != false ) {
				$(this.defaults.closerTemplate).addClass('jGrowl-closer ' + this.defaults.themeState + ' ui-corner-all').addClass(this.defaults.theme)
					.appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing)
					.bind("click.jGrowl", function() {
						$(this).siblings().trigger("jGrowl.beforeClose");

						if ( jQuery.isFunction( self.defaults.closer ) ) {
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
			
			/* hui tweak */
			//if ($ie6) {
			//	$(this.element).addClass('ie6');
			//}	
			if (jQuery(document).width() <= 800) {
				jQuery(this.element).addClass('smallscreen');
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
	jQuery.jGrowl.defaults = jQuery.fn.jGrowl.prototype.defaults;

})(jQuery);

/**
 * An implementation of the HTML5 desktop notification spec in HTML.
 * @see: http://www.w3.org/TR/notifications/
 *
 * Forked from https://github.com/DangerCove/html5-notifications | Steven Allen
 *
 */

window.HTMLNotification = (function(win, $) {
    "use strict";

    /**
    * EventTarget class (because browsers don't expose this for some odd reason).
    * *Slightly modified (by steven)*
    *
    * Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
    *
    * MIT License
    * @source: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
    **/
    var EventTarget = function(){
        this._listeners = {};
    };

    EventTarget.prototype = {

        constructor: EventTarget,

        addListener: function(type, listener){
            if (typeof this._listeners[type] == "undefined"){
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        },

        fire: function(event){
            if (typeof event == "string"){
                event = { type: event };
            }
            if (!event.target){
                event.target = this;
            }

            if (!event.type){  //falsy
                throw new Error("Event object missing 'type' property.");
            }

            if (this._listeners[event.type] instanceof Array){
                var listeners = this._listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(this, event);
                }
            }

            // Modification: call on* methods
            var attrhandler = this["on"+event.type];
            if (typeof attrhandler === "function") attrhandler.call(this, event);
        },

        removeListener: function(type, listener){
            if (this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                    if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    var container;
    $(win.document).ready(function() {
        container = $("<div>");
        container.attr("id", "notification-container");
        container.css({
            "width": "100px",
            "position": "fixed",
            "bottom": "10px",
            "right": "10px",
            "padding": "0px",
            "margin": "10px"
        });
        container.appendTo(win.document.body);
    });
            
        
    var Notification = function(title, options) {
        if (arguments.length < 1) {
            throw new TypeError("Natty enough arguments.");
        } else if (arguments.length > 1 && ! options instanceof Object) {
            throw new TypeError("Not an object.");
        }

        EventTarget.call(this);
        var that = this;
        
        options || (options = {});

        options.onclick && (this.onclick = options.onclick);
        options.onshow  && (this.onshow  = options.onshow);
        options.onclose && (this.onclose = options.onclose);
        options.onerror && (this.onerror = options.onerror);

        // Container
        var containerEl = this.el = $('<article>');
        // Set gradient (can't use css() due to overrides).'
        containerEl.get()[0].style.cssText = ";";

        containerEl.addClass("notification");

        if (options.tag) {
            containerEl.attr("id", "notification-"+options.tag);
        }

        // Title
        var titleEl = $("<h1>");
        titleEl.text(title);
        //titleEl.css({
        //    "font-size": "1em",
        //    "margin": "0",
        //   "padding": "2px"
        //});
        titleEl.addClass("notification-title");
        if (options.titleDir) titleEl.attr('dir', options.titleDir);
        titleEl.appendTo(containerEl);

        // Icon
        //if (options.iconUrl) {
        //    var iconEl = $("<img>");
        //    iconEl.attr('src', options.iconUrl);
        //    iconEl.addClass("notification-icon");
        //    iconEl.css({"float": "left"});
        //    iconEl.appendTo(containerEl);
        //}

        // Close button
        var closeEl = $('<a>');
        closeEl.text('x');
        closeEl.css({
            "float": "right",
            "position": "absolute",
            "top": "0px",
            "right": "0px",
            "padding": "2px",
            "text-decoration": "none",
            "color": "gray",
            "vertical-align": "middle",
            "font-family": "monospace"
        });
        closeEl.attr('href', 'javascript:void(0);');
        closeEl.addClass("notification-closebtn");
        closeEl.click(function() {
            that.close();
            return false;
        });
        closeEl.appendTo(containerEl);

        // Body
        if (options.body) {
            var bodyEl = $('<p>');
            //bodyEl.css({
            //   "padding": "2px",
            //    "border-top": "1px solid gray",
            //    "margin": "0",
            //    "color": "#444"
            //});
            bodyEl.text(options.body);
            bodyEl.addClass("notification-body");
            if (options.bodyDir) bodyEl.attr('dir', options.bodyDir);
            bodyEl.appendTo(containerEl);
        }
        this.el.click(this.fire.bind(this));
    };

    Notification.prototype = new EventTarget();
    Notification.prototype.constructor = Notification;
    Notification.prototype.close = function() {
        if (this.hidden) return;
        this.hidden = true;
        this.el.fadeOut(100, this.el.remove.bind(this.el));
        this.fire("close");
    };
    Notification.prototype.show = function() {
        if (this.shown) return;
        this.shown = true;
        var id = this.el.attr('id');
        if (id) {
            var existing = $("#"+id);
            if (existing.length)  {
                existing.replaceWith(this.el);
                this.fire("show");
                return;
            }
        }
        this.el.hide();
        container.prepend(this.el);
        this.el.fadeTo(100, .95);
        this.fire("show");
    };
    return Notification;
})(window, jQuery);

// Setup
window.Notification || (window.Notification = window.HTMLNotification);
