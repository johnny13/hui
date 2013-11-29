/*! huement user interface - v0.2.4 - 2013-11-29
* http://hui.huement.com
* Copyright (c) 2013 Derek Scott; Licensed MIT, GPLv3 */

/* example| jQuery.shuffle(colorArray); */
(function(jQuery){
  jQuery.fn.shuffle = function() {
    return this.each(function(){
      var items = jQuery(this).children();
      return (items.length) ? jQuery(this).html(jQuery.shuffle(items)) : this;
    });
  };
 
  jQuery.shuffle = function(arr) {
    for(
      var j, x, i = arr.length; i;
      j = parseInt(Math.random() * i),
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }
})(jQuery);

/**!
 * @preserve Color animation 20120928
 * http://www.bitstorm.org/jquery/color-animation/
 * Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 * Released under the MIT and GPL licenses.
 */

(function(jQuery) {
 /**
  * Check whether the browser supports RGBA color mode.
  *
  * Author Mehdi Kabab <http://pioupioum.fr>
  * @return {boolean} True if the browser support RGBA. False otherwise.
  */
 function isRGBACapable() {
  var jQueryscript = jQuery('script:first'),
    color = jQueryscript.css('color'),
    result = false;
  if (/^rgba/.test(color)) {
   result = true;
  } else {
   try {
    result = ( color !== jQueryscript.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
    jQueryscript.css('color', color);
   } catch (e) {
   }
  }

  return result;
 }

 jQuery.extend(true, jQuery, {
  support: {
   'rgba': isRGBACapable()
  }
 });

 var properties = ['color', 'backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'outlineColor'];
 jQuery.each(properties, function(i, property) {
  jQuery.Tween.propHooks[ property ] = {
   get: function(tween) {
    return jQuery(tween.elem).css(property);
   },
   set: function(tween) {
    var style = tween.elem.style;
    var p_begin = parseColor(jQuery(tween.elem).css(property));
    var p_end = parseColor(tween.end);
    tween.run = function(progress) {
     style[property] = calculateColor(p_begin, p_end, progress);
    };
   }
  };
 });

 // borderColor doesn't fit in standard fx.step above.
 jQuery.Tween.propHooks.borderColor = {
  set: function(tween) {
   var style = tween.elem.style;
   var p_begin = [];
   var borders = properties.slice(2, 6); // All four border properties
   jQuery.each(borders, function(i, property) {
    p_begin[property] = parseColor(jQuery(tween.elem).css(property));
   });
   var p_end = parseColor(tween.end);
   tween.run = function(progress) {
    jQuery.each(borders, function(i, property) {
     style[property] = calculateColor(p_begin[property], p_end, progress);
    });
   };
  }
 };

 // Calculate an in-between color. Returns "#aabbcc"-like string.
 function calculateColor(begin, end, pos) {
  var color = 'rgb' + (jQuery.support['rgba'] ? 'a' : '') + '('+ parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ','+ parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ',' + parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
  if (jQuery.support['rgba']) {
   color += ',' + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
  }
  color += ')';
  return color;
 }

 // Parse an CSS-syntax color. Outputs an array [r, g, b]
 function parseColor(color) {
  var match, triplet;

  // Match #aabbcc
  if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) {
   triplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

   // Match #abc
  } else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) {
   triplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

   // Match rgb(n, n, n)
  } else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
   triplet = [parseInt(match[1], 0), parseInt(match[2], 0), parseInt(match[3], 0), 1];

  } else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color)) {
   triplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10),parseFloat(match[4])];

   // No browser returns rgb(n%, n%, n%), so little reason to support this format.
  }
  return triplet;
 }
})(jQuery);

/* PRELOAD IMAGES */
/*
* USAGE:
* Plugin Version:
* jQuery(['img1.jpg','img2.jpg','img3.jpg']).preload();
* 
* Function Version:
* preload([
*     'img/imageName.jpg',
*     'img/anotherOne.jpg',
*     'img/blahblahblah.jpg'
* ]);
*/
jQuery.fn.preload = function() {
 this.each(function(){
  jQuery('<img />').attr('src',this).appendTo('body').hide();
 });
};
function preload(arrayOfImages) {
 jQuery(arrayOfImages).each(function () {
  jQuery('<img />').attr('src',this).appendTo('body').hide();
 });
}

/*
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * 
 */
(function (jQuery, document, undefined) {

 var pluses = /\+/g;

 function raw(s) {
  return s;
 }

 function decoded(s) {
  return decodeURIComponent(s.replace(pluses, ' '));
 }

 var config = jQuery.cookie = function (key, value, options) {

  // write
  if (value !== undefined) {
   options = jQuery.extend({}, config.defaults, options);

   if (value === null) {
    options.expires = -1;
   }

   if (typeof options.expires === 'number') {
    var days = options.expires, t = options.expires = new Date();
    t.setDate(t.getDate() + days);
   }

   value = config.json ? JSON.stringify(value) : String(value);

   return (document.cookie = [
    encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    options.path    ? '; path=' + options.path : '',
    options.domain  ? '; domain=' + options.domain : '',
    options.secure  ? '; secure' : ''
   ].join(''));
  }

  // read
  var decode = config.raw ? raw : decoded;
  var cookies = document.cookie.split('; ');
  for (var i = 0, l = cookies.length; i < l; i++) {
   var parts = cookies[i].split('=');
   if (decode(parts.shift()) === key) {
    var cookie = decode(parts.join('='));
    return config.json ? JSON.parse(cookie) : cookie;
   }
  }

  return null;
 };

 config.defaults = {};

 jQuery.removeCookie = function (key, options) {
  if (jQuery.cookie(key) !== null) {
   jQuery.cookie(key, null, options);
   return true;
  }
  return false;
 };

})(jQuery, document);

/*
 * Hammer.JS
 * version 0.6.4
 * author: Eight Media
 * https://github.com/EightMedia/hammer.js
 * Licensed under the MIT license.
 */
function Hammer(element, options, undefined)
{
    var self = this;

    var defaults = mergeObject({
        // prevent the default event or not... might be buggy when false
        prevent_default    : false,
        css_hacks          : true,

        swipe              : true,
        swipe_time         : 200,   // ms
        swipe_min_distance : 20,   // pixels

        drag               : true,
        drag_vertical      : true,
        drag_horizontal    : true,
        // minimum distance before the drag event starts
        drag_min_distance  : 20,    // pixels

        // pinch zoom and rotation
        transform          : true,
        scale_treshold     : 0.1,
        rotation_treshold  : 15,    // degrees

        tap                : true,
        tap_double         : true,
        tap_max_interval   : 300,
        tap_max_distance   : 10,
        tap_double_distance: 20,

        hold               : true,
        hold_timeout       : 500
    }, Hammer.defaults || {});
    options = mergeObject(defaults, options);

    // some css hacks
    (function() {
        if(!options.css_hacks) {
            return false;
        }

        var vendors = ['webkit','moz','ms','o',''];
        var css_props = {
            "userSelect": "none",
            "touchCallout": "none",
            "userDrag": "none",
            "tapHighlightColor": "rgba(0,0,0,0)"
        };

        var prop = '';
        for(var i = 0; i < vendors.length; i++) {
            for(var p in css_props) {
                prop = p;
                if(vendors[i]) {
                    prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                }
                element.style[ prop ] = css_props[p];
            }
        }
    })();

    // holds the distance that has been moved
    var _distance = 0;

    // holds the exact angle that has been moved
    var _angle = 0;

    // holds the direction that has been moved
    var _direction = 0;

    // holds position movement for sliding
    var _pos = { };

    // how many fingers are on the screen
    var _fingers = 0;

    var _first = false;

    var _gesture = null;
    var _prev_gesture = null;

    var _touch_start_time = null;
    var _prev_tap_pos = {x: 0, y: 0};
    var _prev_tap_end_time = null;

    var _hold_timer = null;

    var _offset = {};

    // keep track of the mouse status
    var _mousedown = false;

    var _event_start;
    var _event_move;
    var _event_end;

    var _has_touch = ('ontouchstart' in window);

    var _can_tap = false;


    /**
     * option setter/getter
     * @param   string  key
     * @param   mixed   value
     * @return  mixed   value
     */
    this.option = function(key, val) {
        if(val !== undefined) {
            options[key] = val;
        }

        return options[key];
    };


    /**
     * angle to direction define
     * @param  float    angle
     * @return string   direction
     */
    this.getDirectionFromAngle = function( angle ) {
        var directions = {
            down: angle >= 45 && angle < 135, //90
            left: angle >= 135 || angle <= -135, //180
            up: angle < -45 && angle > -135, //270
            right: angle >= -45 && angle <= 45 //0
        };

        var direction, key;
        for(key in directions){
            if(directions[key]){
                direction = key;
                break;
            }
        }
        return direction;
    };


    /**
     * destroy events
     * @return  void
     */
    this.destroy = function() {
        if(_has_touch) {
            removeEvent(element, "touchstart touchmove touchend touchcancel", handleEvents);
        }
        // for non-touch
        else {
            removeEvent(element, "mouseup mousedown mousemove", handleEvents);
            removeEvent(element, "mouseout", handleMouseOut);
        }
    };


    /**
     * count the number of fingers in the event
     * when no fingers are detected, one finger is returned (mouse pointer)
     * @param  event
     * @return int  fingers
     */
    function countFingers( event )
    {
        // there is a bug on android (until v4?) that touches is always 1,
        // so no multitouch is supported, e.g. no, zoom and rotation...
        return event.touches ? event.touches.length : 1;
    }


    /**
     * get the x and y positions from the event object
     * @param  event
     * @return array  [{ x: int, y: int }]
     */
    function getXYfromEvent( event )
    {
        event = event || window.event;

        // no touches, use the event pageX and pageY
        if(!_has_touch) {
            var doc = document,
                body = doc.body;

            return [{
                x: event.pageX || event.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && doc.clientLeft || 0 ),
                y: event.pageY || event.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && doc.clientTop || 0 )
            }];
        }
        // multitouch, return array with positions
        else {
            var pos = [], src;
            for(var t=0, len=event.touches.length; t<len; t++) {
                src = event.touches[t];
                pos.push({ x: src.pageX, y: src.pageY });
            }
            return pos;
        }
    }


    /**
     * calculate the angle between two points
     * @param   object  pos1 { x: int, y: int }
     * @param   object  pos2 { x: int, y: int }
     */
    function getAngle( pos1, pos2 )
    {
        return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
    }

    /**
     * calculate the distance between two points
     * @param   object  pos1 { x: int, y: int }
     * @param   object  pos2 { x: int, y: int }
     */
    function getDistance( pos1, pos2 )
    {
        var x = pos2.x - pos1.x, y = pos2.y - pos1.y;
        return Math.sqrt((x * x) + (y * y));
    }


    /**
     * calculate the scale size between two fingers
     * @param   object  pos_start
     * @param   object  pos_move
     * @return  float   scale
     */
    function calculateScale(pos_start, pos_move)
    {
        if(pos_start.length === 2 && pos_move.length === 2) {
            var start_distance = getDistance(pos_start[0], pos_start[1]);
            var end_distance = getDistance(pos_move[0], pos_move[1]);
            return end_distance / start_distance;
        }

        return 0;
    }


    /**
     * calculate the rotation degrees between two fingers
     * @param   object  pos_start
     * @param   object  pos_move
     * @return  float   rotation
     */
    function calculateRotation(pos_start, pos_move)
    {
        if(pos_start.length === 2 && pos_move.length === 2) {
            var start_rotation = getAngle(pos_start[1], pos_start[0]);
            var end_rotation = getAngle(pos_move[1], pos_move[0]);
            return end_rotation - start_rotation;
        }

        return 0;
    }


    /**
     * trigger an event/callback by name with params
     * @param string name
     * @param array  params
     */
    function triggerEvent( eventName, params )
    {
        // return touches object
        params.touches = getXYfromEvent(params.originalEvent);
        params.type = eventName;

        // trigger callback
        if(isFunction(self["on"+ eventName])) {
            self["on"+ eventName].call(self, params);
        }
    }


    /**
     * cancel event
     * @param   object  event
     * @return  void
     */

    function cancelEvent(event)
    {
        event = event || window.event;
        if(event.preventDefault){
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.returnValue = false;
            event.cancelBubble = true;
        }
    }


    /**
     * reset the internal vars to the start values
     */
    function reset()
    {
        _pos = {};
        _first = false;
        _fingers = 0;
        _distance = 0;
        _angle = 0;
        _gesture = null;
    }


    var gestures = {
        // hold gesture
        // fired on touchstart
        hold : function(event)
        {
            // only when one finger is on the screen
            if(options.hold) {
                _gesture = 'hold';
                clearTimeout(_hold_timer);

                _hold_timer = setTimeout(function() {
                    if(_gesture === 'hold') {
                        triggerEvent("hold", {
                            originalEvent   : event,
                            position        : _pos.start
                        });
                    }
                }, options.hold_timeout);
            }
        },

        // swipe gesture
        // fired on touchend
        swipe : function(event)
        {
            if (!_pos.move || _gesture === "transform") {
                return;
            }

            // get the distance we moved
            var _distance_x = _pos.move[0].x - _pos.start[0].x;
            var _distance_y = _pos.move[0].y - _pos.start[0].y;
            _distance = Math.sqrt(_distance_x*_distance_x + _distance_y*_distance_y);

            // compare the kind of gesture by time
            var now = new Date().getTime();
            var touch_time = now - _touch_start_time;

            if(options.swipe && (options.swipe_time > touch_time) && (_distance > options.swipe_min_distance)) {
                // calculate the angle
                _angle = getAngle(_pos.start[0], _pos.move[0]);
                _direction = self.getDirectionFromAngle(_angle);

                _gesture = 'swipe';

                var position = { x: _pos.move[0].x - _offset.left,
                    y: _pos.move[0].y - _offset.top };

                var event_obj = {
                    originalEvent   : event,
                    position        : position,
                    direction       : _direction,
                    distance        : _distance,
                    distanceX       : _distance_x,
                    distanceY       : _distance_y,
                    angle           : _angle
                };

                // normal slide event
                triggerEvent("swipe", event_obj);
            }
        },


        // drag gesture
        // fired on mousemove
        drag : function(event)
        {
            // get the distance we moved
            var _distance_x = _pos.move[0].x - _pos.start[0].x;
            var _distance_y = _pos.move[0].y - _pos.start[0].y;
            _distance = Math.sqrt(_distance_x * _distance_x + _distance_y * _distance_y);

            // drag
            // minimal movement required
            if(options.drag && (_distance > options.drag_min_distance) || _gesture === 'drag') {
                // calculate the angle
                _angle = getAngle(_pos.start[0], _pos.move[0]);
                _direction = self.getDirectionFromAngle(_angle);

                // check the movement and stop if we go in the wrong direction
                var is_vertical = (_direction === 'up' || _direction === 'down');

                if(((is_vertical && !options.drag_vertical) || (!is_vertical && !options.drag_horizontal)) && (_distance > options.drag_min_distance)) {
                    return;
                }

                _gesture = 'drag';

                var position = { x: _pos.move[0].x - _offset.left,
                    y: _pos.move[0].y - _offset.top };

                var event_obj = {
                    originalEvent   : event,
                    position        : position,
                    direction       : _direction,
                    distance        : _distance,
                    distanceX       : _distance_x,
                    distanceY       : _distance_y,
                    angle           : _angle
                };

                // on the first time trigger the start event
                if(_first) {
                    triggerEvent("dragstart", event_obj);

                    _first = false;
                }

                // normal slide event
                triggerEvent("drag", event_obj);

                cancelEvent(event);
            }
        },


        // transform gesture
        // fired on touchmove
        transform : function(event)
        {
            if(options.transform) {
                var count = countFingers(event);
                if (count !== 2) {
                    return false;
                }

                var rotation = calculateRotation(_pos.start, _pos.move);
                var scale = calculateScale(_pos.start, _pos.move);

                if (_gesture === 'transform' ||
                    Math.abs(1 - scale) > options.scale_treshold ||
                    Math.abs(rotation) > options.rotation_treshold) {

                    _gesture = 'transform';
                    _pos.center = {
                        x: ((_pos.move[0].x + _pos.move[1].x) / 2) - _offset.left,
                        y: ((_pos.move[0].y + _pos.move[1].y) / 2) - _offset.top
                    };

                    if(_first)
                        _pos.startCenter = _pos.center;

                    var _distance_x = _pos.center.x - _pos.startCenter.x;
                    var _distance_y = _pos.center.y - _pos.startCenter.y;
                    _distance = Math.sqrt(_distance_x*_distance_x + _distance_y*_distance_y);

                    var event_obj = {
                        originalEvent   : event,
                        position        : _pos.center,
                        scale           : scale,
                        rotation        : rotation,
                        distance        : _distance,
                        distanceX       : _distance_x,
                        distanceY       : _distance_y
                    };

                    // on the first time trigger the start event
                    if (_first) {
                        triggerEvent("transformstart", event_obj);
                        _first = false;
                    }

                    triggerEvent("transform", event_obj);

                    cancelEvent(event);

                    return true;
                }
            }

            return false;
        },


        // tap and double tap gesture
        // fired on touchend
        tap : function(event)
        {
            // compare the kind of gesture by time
            var now = new Date().getTime();
            var touch_time = now - _touch_start_time;

            // dont fire when hold is fired
            if(options.hold && !(options.hold && options.hold_timeout > touch_time)) {
                return;
            }

            // when previous event was tap and the tap was max_interval ms ago
            var is_double_tap = (function(){
                if (_prev_tap_pos &&
                    options.tap_double &&
                    _prev_gesture === 'tap' &&
                    _pos.start &&
                    (_touch_start_time - _prev_tap_end_time) < options.tap_max_interval)
                {
                    var x_distance = Math.abs(_prev_tap_pos[0].x - _pos.start[0].x);
                    var y_distance = Math.abs(_prev_tap_pos[0].y - _pos.start[0].y);
                    return (_prev_tap_pos && _pos.start && Math.max(x_distance, y_distance) < options.tap_double_distance);
                }
                return false;
            })();

            if(is_double_tap) {
                _gesture = 'double_tap';
                _prev_tap_end_time = null;

                triggerEvent("doubletap", {
                    originalEvent   : event,
                    position        : _pos.start
                });
                cancelEvent(event);
            }

            // single tap is single touch
            else {
                var x_distance = (_pos.move) ? Math.abs(_pos.move[0].x - _pos.start[0].x) : 0;
                var y_distance =  (_pos.move) ? Math.abs(_pos.move[0].y - _pos.start[0].y) : 0;
                _distance = Math.max(x_distance, y_distance);

                if(_distance < options.tap_max_distance) {
                    _gesture = 'tap';
                    _prev_tap_end_time = now;
                    _prev_tap_pos = _pos.start;

                    if(options.tap) {
                        triggerEvent("tap", {
                            originalEvent   : event,
                            position        : _pos.start
                        });
                        cancelEvent(event);
                    }
                }
            }
        }
    };


    function handleEvents(event)
    {
        var count;
        switch(event.type)
        {
            case 'mousedown':
            case 'touchstart':
                count = countFingers(event);
                _can_tap = count === 1;

                //We were dragging and now we are zooming.
                if (count === 2 && _gesture === "drag") {

                    //The user needs to have the dragend to be fired to ensure that
                    //there is proper cleanup from the drag and move onto transforming.
                    triggerEvent("dragend", {
                        originalEvent   : event,
                        direction       : _direction,
                        distance        : _distance,
                        angle           : _angle
                    });
                }
                _setup();

                if(options.prevent_default) {
                    cancelEvent(event);
                }
                break;

            case 'mousemove':
            case 'touchmove':
                count = countFingers(event);

                //The user has gone from transforming to dragging.  The
                //user needs to have the proper cleanup of the state and
                //setup with the new "start" points.
                if (!_mousedown && count === 1) {
                    return false;
                } else if (!_mousedown && count === 2) {
                    _can_tap = false;

                    reset();
                    _setup();
                }

                _event_move = event;
                _pos.move = getXYfromEvent(event);

                if(!gestures.transform(event)) {
                    gestures.drag(event);
                }
                break;

            case 'mouseup':
            case 'mouseout':
            case 'touchcancel':
            case 'touchend':
                var callReset = true;

                _mousedown = false;
                _event_end = event;

                // swipe gesture
                gestures.swipe(event);

                // drag gesture
                // dragstart is triggered, so dragend is possible
                if(_gesture === 'drag') {
                    triggerEvent("dragend", {
                        originalEvent   : event,
                        direction       : _direction,
                        distance        : _distance,
                        angle           : _angle
                    });
                }

                // transform
                // transformstart is triggered, so transformed is possible
                else if(_gesture === 'transform') {
                    // define the transform distance
                    var _distance_x = _pos.center.x - _pos.startCenter.x;
                    var _distance_y = _pos.center.y - _pos.startCenter.y;
                    
                    triggerEvent("transformend", {
                        originalEvent   : event,
                        position        : _pos.center,
                        scale           : calculateScale(_pos.start, _pos.move),
                        rotation        : calculateRotation(_pos.start, _pos.move),
                        distance        : _distance,
                        distanceX       : _distance_x,
                        distanceY       : _distance_y
                    });

                    //If the user goes from transformation to drag there needs to be a
                    //state reset so that way a dragstart/drag/dragend will be properly
                    //fired.
                    if (countFingers(event) === 1) {
                        reset();
                        _setup();
                        callReset = false;
                    }
                } else if (_can_tap) {
                    gestures.tap(_event_start);
                }

                _prev_gesture = _gesture;

                // trigger release event
                // "release" by default doesn't return the co-ords where your
                // finger was released. "position" will return "the last touched co-ords"

                triggerEvent("release", {
                    originalEvent   : event,
                    gesture         : _gesture,
                    position        : _pos.move || _pos.start
                });

                // reset vars if this was not a transform->drag touch end operation.
                if (callReset) {
                    reset();
                }
                break;
        } // end switch

        /**
         * Performs a blank setup.
         * @private
         */
        function _setup() {
            _pos.start = getXYfromEvent(event);
            _touch_start_time = new Date().getTime();
            _fingers = countFingers(event);
            _first = true;
            _event_start = event;

            // borrowed from jquery offset https://github.com/jquery/jquery/blob/master/src/offset.js
            var box = element.getBoundingClientRect();
            var clientTop  = element.clientTop  || document.body.clientTop  || 0;
            var clientLeft = element.clientLeft || document.body.clientLeft || 0;
            var scrollTop  = window.pageYOffset || element.scrollTop  || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

            _offset = {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };

            _mousedown = true;

            // hold gesture
            gestures.hold(event);
        }
    }


    function handleMouseOut(event) {
        if(!isInsideHammer(element, event.relatedTarget)) {
            handleEvents(event);
        }
    }


    // bind events for touch devices
    // except for windows phone 7.5, it doesnt support touch events..!
    if(_has_touch) {
        addEvent(element, "touchstart touchmove touchend touchcancel", handleEvents);
    }
    // for non-touch
    else {
        addEvent(element, "mouseup mousedown mousemove", handleEvents);
        addEvent(element, "mouseout", handleMouseOut);
    }


    /**
     * find if element is (inside) given parent element
     * @param   object  element
     * @param   object  parent
     * @return  bool    inside
     */
    function isInsideHammer(parent, child) {
        // get related target for IE
        if(!child && window.event && window.event.toElement){
            child = window.event.toElement;
        }

        if(parent === child){
            return true;
        }

        // loop over parentNodes of child until we find hammer element
        if(child){
            var node = child.parentNode;
            while(node !== null){
                if(node === parent){
                    return true;
                }
                node = node.parentNode;
            }
        }
        return false;
    }


    /**
     * merge 2 objects into a new object
     * @param   object  obj1
     * @param   object  obj2
     * @return  object  merged object
     */
    function mergeObject(obj1, obj2) {
        var output = {};

        if(!obj2) {
            return obj1;
        }

        for (var prop in obj1) {
            if (prop in obj2) {
                output[prop] = obj2[prop];
            } else {
                output[prop] = obj1[prop];
            }
        }
        return output;
    }


    /**
     * check if object is a function
     * @param   object  obj
     * @return  bool    is function
     */
    function isFunction( obj ){
        return Object.prototype.toString.call( obj ) === "[object Function]";
    }


    /**
     * attach event
     * @param   node    element
     * @param   string  types
     * @param   object  callback
     */
    function addEvent(element, types, callback) {
        types = types.split(" ");
        for(var t= 0,len=types.length; t<len; t++) {
            if(element.addEventListener){
                element.addEventListener(types[t], callback, false);
            }
            else if(document.attachEvent){
                element.attachEvent("on"+ types[t], callback);
            }
        }
    }


    /**
     * detach event
     * @param   node    element
     * @param   string  types
     * @param   object  callback
     */
    function removeEvent(element, types, callback) {
        types = types.split(" ");
        for(var t= 0,len=types.length; t<len; t++) {
            if(element.removeEventListener){
                element.removeEventListener(types[t], callback, false);
            }
            else if(document.detachEvent){
                element.detachEvent("on"+ types[t], callback);
            }
        }
    }
}


/*
 * special event API with Hammer.JS
 * version 0.9
 * author: Damien Antipa
 * https://github.com/dantipa/hammer.js
 */
(function (jQuery) {
    var hammerEvents = ['hold','tap','doubletap','transformstart','transform','transformend','dragstart','drag','dragend','swipe','release'];

    /*
     * HammerSEFunctions
     * maintains which function should be used to handle
     * events.
     * 
     * _fn : is the original function used to handle events.
     *  Faster than _delegateFn, but it does not support delegated
     *  or bubbled events through jQuery.
     *
     * _delegateFn : a function that supports delegated/bubbled events
     *  in jQuery, but it is slower than _fn as it doesn't use a cached
     *  jQuery call (jQuerytarget) to trigger from and must construct a new
     *  jQuery object based on the event target each time the event triggers.
     *
     * addDelegate : adds the handler guid created by jQuery to _delegateGuids.
     *
     * removeDelegate : removes the handler guid (if found) in _delegateGuids.
     *
     * getFn : returns either _fn or _delegateFn based on there being any handler
     *  guids saved in _delegateGuids. If there are no guids saved, then the faster
     *  function (_fn) is used. Otherwise, _delegateFn must be used and will be
     *  returned.
     *
     * destroy : destroys all dynamically generated properties in the object. This
     *  may be overkill, but it will help to reduce the chances of any sneaky
     *  memory leaks cropping up.
     */

    function HammerSEFunctions(/*event,jQuerytarget*/){
        var event = arguments[0],
            jQuerytarget = arguments[1];

        this._delegateGuids = [];

        this._fn = function(ev){
            
            jQuerytarget.trigger(jQuery.Event(event,ev));
        
        };

        this._delegateFn = function(ev){
            var jqevt = jQuery.Event(event,ev);
            
            jQuery(jqevt.originalEvent.target).trigger(jqevt);
        
        };
    }
    HammerSEFunctions.prototype = {

        addDelegate : function(guid){
            
            this._delegateGuids.push(guid);
            return this;
        
        },

        removeDelegate : function(guid){
            var index = this._delegateGuids.indexOf(guid);
            
            if(index >= 0){
                
                this._delegateGuids.splice(index);
            
            }
            
            return this;
        },

        getFn : function(){
            
            return this._delegateGuids.length > 0 ? this._delegateFn : this._fn;
        
        },

        destroy : function(){
            
            this._fn = null;
            this._delegateFn = null;
            this._delegateGuids = null;
            
            delete this._fn;
            delete this._delegateFn;
            delete this._delegateGuids;
        
        }

    };

    jQuery.each(hammerEvents, function(i, event) {

        jQuery.event.special[event] = {

            setup: function(data, namespaces, eventHandle) {
                var jQuerytarget = jQuery(this),
                    hammer = jQuerytarget.data('hammerjs');
                
                if (!hammer) {
                    hammer = new Hammer(this, data);
                    hammer.__Fns = {};
                    jQuerytarget.data('hammerjs', hammer);
                }

                hammer.__Fns[event] = new HammerSEFunctions(event,jQuerytarget);
            },
            add : function(handleObj) {
                var hammer = jQuery(this).data('hammerjs');

                if (!!handleObj.selector) {
                    hammer.__Fns[event].addDelegate(handleObj.guid);
                }

                hammer['on' + event] = hammer.__Fns[event].getFn();
            },
            remove : function(handleObj) {
                var hammer = jQuery(this).data('hammerjs');

                if (!!handleObj.selector) {
                    hammer.__Fns[event].removeDelegate(handleObj.guid);
                }

                hammer['on' + event] = hammer.__Fns[event].getFn();
            },
            teardown: function(namespaces) {
                var hammer = jQuery(this).data('hammerjs');

                hammer.__Fns[event].destroy();
                delete hammer.__Fns[event];
            }
        };
    });
}(jQuery));
/* 
https://raw.github.com/browserstate/history.js/master/README.md

Welcome to History.js (v1.7.1 - October 4 2011)
==================

This project is the successor of [jQuery History](http://balupton.com/projects/jquery-history), it aims to:

- Follow the [HTML5 History API](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history) as much as possible
- Provide a cross-compatible experience for all HTML5 Browsers (they all implement the HTML5 History API a little bit differently causing different behaviours and sometimes bugs - History.js fixes this ensuring the experience is as expected / the same / great throughout the HTML5 browsers)
- Provide a backwards-compatible experience for all HTML4 Browsers using a hash-fallback (including continued support for the HTML5 History API's `data`, `title`, `pushState` and `replaceState`) with the option to [remove HTML4 support if it is not right for your application](https://github.com/browserstate/history.js/wiki/Intelligent-State-Handling)
- Provide a forwards-compatible experience for HTML4 States to HTML5 States (so if a hash-fallbacked url is accessed by a HTML5 browser it is naturally transformed into its non-hashed url equivalent)
- Provide support for as many javascript frameworks as possible via adapters; especially [jQuery](http://jquery.com/), [MooTools](http://mootools.net/), [Prototype](http://www.prototypejs.org/) and [Zepto](http://zeptojs.com/)

## Usage

### Instant

To ajaxify your entire website with the HTML5 History API, History.js and jQuery the [Ajaxify Script](https://github.com/browserstate/ajaxify) is all you need. It's that easy.


### Working with History.js directly

``` javascript
(function(window,undefined){

	// Prepare
	var History = window.History; // Note: We are using a capital H instead of a lower h
	if ( !History.enabled ) {
		 // History.js is disabled for this browser.
		 // This is because we can optionally choose to support HTML4 browsers or not.
		return false;
	}

	// Bind to StateChange Event
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		History.log(State.data, State.title, State.url);
	});

	// Change our States
	History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
	History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
	History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
	History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
	History.back(); // logs {state:3}, "State 3", "?state=3"
	History.back(); // logs {state:1}, "State 1", "?state=1"
	History.back(); // logs {}, "Home Page", "?"
	History.go(2); // logs {state:3}, "State 3", "?state=3"

})(window);
```


### How would the above operations look in a HTML5 Browser?

1. www.mysite.com
1. www.mysite.com/?state=1
1. www.mysite.com/?state=2
1. www.mysite.com/?state=3
1. www.mysite.com/?state=4
1. www.mysite.com/?state=3
1. www.mysite.com/?state=1
1. www.mysite.com
1. www.mysite.com/?state=3

> Note: These urls also work in HTML4 browsers and Search Engines. So no need for the hashbang (`#!`) fragment-identifier that google ["recommends"](https://github.com/browserstate/history.js/wiki/Intelligent-State-Handling).

### How would they look in a HTML4 Browser?

1. www.mysite.com
1. www.mysite.com/#?state=1&_suid=1
1. www.mysite.com/#?state=2&_suid=2
1. www.mysite.com/#?state=3&_suid=3
1. www.mysite.com/#?state=4
1. www.mysite.com/#?state=3&_suid=3
1. www.mysite.com/#?state=1&_suid=1
1. www.mysite.com
1. www.mysite.com/#?state=3&_suid=3

> Note 1: These urls also work in HTML5 browsers - we use `replaceState` to transform these HTML4 states into their HTML5 equivalents so the user won't even notice :-)
>
> Note 2: These urls will be automatically url-encoded in IE6 to prevent certain browser-specific bugs.
>
> Note 3: Support for HTML4 browsers (this hash fallback) is optional [- why supporting HTML4 browsers could be either good or bad based on my app's use cases](https://github.com/browserstate/history.js/wiki/Intelligent-State-Handling)

### What's the deal with the SUIDs used in the HTML4 States?

- SUIDs (State Unique Identifiers) are used when we utilise a `title` and/or `data` in our state. Adding a SUID allows us to associate particular states with data and titles while keeping the urls as simple as possible (don't worry it's all tested, working and a lot smarter than I'm making it out to be).
- If you aren't utilising `title` or `data` then we don't even include a SUID (as there is no need for it) - as seen by State 4 above :-)
- We also shrink the urls to make sure that the smallest url will be used. For instance we will adjust `http://www.mysite.com/#http://www.mysite.com/projects/History.js` to become `http://www.mysite.com/#/projects/History.js` automatically. (again tested, working, and smarter).
- It works with domains, subdomains, subdirectories, whatever - doesn't matter where you put it. It's smart.
- Safari 5 will also have a SUID appended to the URL, it is entirely transparent but just a visible side-effect. It is required to fix a bug with Safari 5.

### Is there a working demo?

- Sure is, give it a download and navigate to the demo directory in your browser :-)
- If you are after something a bit more adventurous than a end-user demo, open up the tests directory in your browser and editor - it'll rock your world and show all the vast use cases that History.js supports.


## Download & Installation

- Download History.js and upload it to your webserver. Download links: [tar.gz](https://github.com/browserstate/history.js/tarball/master) or [zip](https://github.com/browserstate/history.js/zipball/master)

- Include History.js

	- For [jQuery](http://jquery.com/) v1.3+

		``` html
		<script src="http://www.yourwebsite.com/history.js/scripts/bundled/html4+html5/jquery.history.js"></script>
		```

	- For [Mootools](http://mootools.net/) v1.3+

		``` html
		<script src="http://www.yourwebsite.com/history.js/scripts/bundled/html4+html5/mootools.history.js"></script>
		```

	- For [Right.js](http://rightjs.org/) v2.2+

		``` html
		<script src="http://www.yourwebsite.com/history.js/scripts/bundled/html4+html5/right.history.js"></script>
		```

	- For [Zepto](http://zeptojs.com/) v0.5+

		``` html
		<script src="http://www.yourwebsite.com/history.js/scripts/bundled/html4+html5/zepto.history.js"></script>
		```

	- For everything else

		``` html
		<script src="http://www.yourwebsite.com/history.js/scripts/bundled/html4+html5/native.history.js"></script>
		```

> Note: If you want to only support HTML5 Browsers and not HTML4 Browsers (so no hash fallback support) then just change the `/html4+html5/` part in the urls to just `/html5/`. [Why supporting HTML4 browsers could be either good or bad based on my app's use cases](https://github.com/browserstate/history.js/wiki/Intelligent-State-Handling)


## Get Updates

- For Commit RSS/Atom Updates:
	- You can subscribe via the [GitHub Commit Atom Feed](http://feeds.feedburner.com/historyjs)
- For GitHub News Feed Updates:
	- You can click the "watch" button up the top right of History.js's [GitHub Project Page](https://github.com/browserstate/history.js)


## Get Support

- History.js is maintained by people like you. If you find a bug, report it to the [GitHub Issue Tracker](https://github.com/browserstate/history.js/issues). If you've fixed a bug submit a [Pull Request](https://github.com/browserstate/history.js/pulls) and add your fork to the [Network Wiki Page](https://github.com/browserstate/history.js/wiki/Network).

- If you would like paid support and trainings, or have job offers, then refer to the [Network Wiki Page](https://github.com/browserstate/history.js/wiki/Network). If you are qualified with History.js, then be sure to add your details to that page too.

- If your company uses History.js on your projects, and would like to see it grow and prosper (better documentation, bugfixes, upgrades, maintenance, etc.) and would love to become a corporate sponsor then do email sponsor@bevry.me

- If you would like free support for History.js, then [post your question](http://stackoverflow.com/questions/ask) on [Stackoverflow](http://stackoverflow.com/about) and be sure to use the `history.js` tag when asking your question.

- If you've created a website that uses History.js, or know of one. Then be sure to add it to the [Showcase Wiki Page](https://github.com/browserstate/history.js/wiki/Showcase).

- If you'd love to +1 or like this project, then be sure to tweet about it and click the "watch" button up the top of its [Project Page](https://github.com/browserstate/history.js).

- For anything else, refer to the [History.js GitHub Wiki Site](https://github.com/browserstate/history.js/wiki).

Thanks! every bit of help really does make a difference!


## Browsers: Tested and Working In

### HTML5 Browsers

- Firefox 4+
- Chrome 8+
- Opera 11.5
- Safari 5.0+
- Safari iOS 4.3+

### HTML4 Browsers

- IE 6, 7, 8, 9
- Firefox 3
- Opera 10, 11.0
- Safari 4
- Safari iOS 4.2, 4.1, 4.0, 3.2


## Exposed API

### Functions

- `History.pushState(data,title,url)` <br/> Pushes a new state to the browser; `data` can be null or an object, `title` can be null or a string, `url` must be a string
- `History.replaceState(data,title,url)` <br/> Replaces the existing state with a new state to the browser; `data` can be null or an object, `title` can be null or a string, `url` must be a string
- `History.getState()` <br/> Gets the current state of the browser, returns an object with `data`, `title` and `url`
- `History.getHash()` <br/> Gets the current hash of the browser
- `History.Adapter.bind(element,event,callback)` <br/> A framework independent event binder, you may either use this or your framework's native event binder.
- `History.Adapter.trigger(element,event)` <br/> A framework independent event trigger, you may either use this or your framework's native event trigger.
- `History.Adapter.onDomLoad(callback)` <br/> A framework independent onDomLoad binder, you may either use this or your framework's native onDomLoad binder.
- `History.back()` <br/> Go back once through the history (same as hitting the browser's back button)
- `History.forward()` <br/> Go forward once through the history (same as hitting the browser's forward button)
- `History.go(X)` <br/> If X is negative go back through history X times, if X is positive go forwards through history X times
- `History.log(...)` <br/> Logs messages to the console, the log element, and fallbacks to alert if neither of those two exist
- `History.debug(...)` <br/> Same as `History.log` but only runs if `History.debug.enable === true`

### Events

- `window.onstatechange` <br/> Fired when the state of the page changes (does not include hash changes)
- `window.onanchorchange` <br/> Fired when the anchor of the page changes (does not include state hashes)
*/
window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window)
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

 if(user_icon !== undefined){
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
  //  return false === jQuery.support.boxModel && jQuery.support.objectAll && $support.leadingWhitespace;
  //})();

  /** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
  jQuery.jGrowl = function( m , o ) {
    // To maintain compatibility with older version that only supported one instance we'll create the base container.
    if ( $('#jGrowl').size() === 0 ) 
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
        if ( $(this).data('jGrowl.instance') === undefined ) {
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
      pool:       0,
      header:     '',
      group:       '',
      sticky:     false,
      position:     'top-right',
      glue:       'after',
      theme:       'default',
      themeState:   'highlight',
      icon_theme:   'notefy',
      corners:     '3px',
      check:       250,
      life:       3000,
      closeDuration:  'normal',
      openDuration:   'normal',
      easing:     'easeOutCubic',
      closer:     true,
      closeTemplate: '&times;',
      closerTemplate: '<div>[ clear all ]</div>',
      log:       function(e,m,o) {},
      beforeOpen:   function(e,m,o) {},
      afterOpen:     function(e,m,o) {},
      open:       function(e,m,o) {},
      beforeClose:   function(e,m,o) {},
      close:       function(e,m,o) {},
      animateOpen:   {
        opacity:   'show'
      },
      animateClose:   {
        opacity:   'hide'
      }
    },
    
    notifications: [],
    
    /** jGrowl Container Node **/
    element:   null,
  
    /** Interval Function **/
    interval:   null,
    
    /** Create a Notification **/
    create:   function( message , o ) {
      var o = jQuery.extend({}, this.defaults, o);

      /* To keep backward compatibility with 1.24 and earlier, honor 'speed' if the user has set it */
      if (typeof o.speed !== 'undefined') {
        o.openDuration = o.speed;
        o.closeDuration = o.speed;
      }

      this.notifications.push({ message: message , options: o });
      
      o.log.apply( this.element , [this.element,message,o] );
    },
    
    render:     function( notification ) {
      var self = this;
      var message = notification.message;
      var o = notification.options;

      // Support for jQuery theme-states, if this is not used it displays a widget header
      o.themeState = (o.themeState === '') ? '' : 'ui-state-' + o.themeState;

//      var notification = $(
//        '<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
//        ((o.group !== undefined && o.group !== '') ? ' ' + o.group : '') + '">' +
//        '<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
//        '<div class="jGrowl-header">' + o.header + '</div>' +
//        '<div class="jGrowl-message">' + message + '</div></div>'
//      ).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
//        $(this).parent().trigger('jGrowl.close');
//      }).parent();

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
        if ( o.beforeOpen.apply( notification , [notification,message,o,self.element] ) !== false ) {
          $(this).trigger('jGrowl.open');
        }
      }).bind('jGrowl.open', function() {
        if ( o.open.apply( notification , [notification,message,o,self.element] ) !== false ) {
          if ( o.glue === 'after' ) {
            $('div.jGrowl-notification:last', self.element).after(notification);
          } else {
            $('div.jGrowl-notification:first', self.element).before(notification);
          }
          
          $(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
            // Fixes some anti-aliasing issues with IE filters.
            if (jQuery.support.opacity === false) 
              this.style.removeAttribute('filter');

            if ( $(this).data("jGrowl") !== null ) // Happens when a notification is closing before it's open.
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
        if ( o.beforeClose.apply( notification , [notification,message,o,self.element] ) !== false )
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
      if ( o.corners !== '' && jQuery.fn.corner !== undefined ) $(notification).corner( o.corners );

      /** Add a Global Closer if more than one notification exists **/
      if ( $('div.jGrowl-notification:parent', self.element).size() > 1 && 
         $('div.jGrowl-closer', self.element).size() === 0 && this.defaults.closer !== false ) {
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
    update:   function() {
      $(this.element).find('div.jGrowl-notification:parent').each( function() {
        if ( $(this).data("jGrowl") !== undefined && $(this).data("jGrowl").created !== undefined && 
           ($(this).data("jGrowl").created.getTime() + parseInt($(this).data("jGrowl").life))  < (new Date()).getTime() && 
           $(this).data("jGrowl").sticky !== true && 
           ($(this).data("jGrowl.pause") === undefined || $(this).data("jGrowl.pause") !== true) ) {

          // Pause the notification, lest during the course of animation another close event gets called.
          $(this).trigger('jGrowl.beforeClose');
        }
      });

      if ( this.notifications.length > 0 && 
         (this.defaults.pool === 0 || $(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool) )
        this.render( this.notifications.shift() );

      if ( $(this.element).find('div.jGrowl-notification:parent').size() < 2 ) {
        $(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
          $(this).remove();
        });
      }
    },

    /** Setup the jGrowl Notification Container **/
    startup:  function(e) {
      this.element = $(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
      this.interval = setInterval( function() { 
        $(e).data('jGrowl.instance').update(); 
      }, parseInt(this.defaults.check));
      
      /* hui tweak */
      //if ($ie6) {
      //  $(this.element).addClass('ie6');
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
    
    close:   function() {
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
            if (typeof this._listeners[type] === "undefined"){
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        },

        fire: function(event){
            if (typeof event === "string"){
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

/*
 *
 * Copyright (c) 2006-2010 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 2.2.6
 * Demo: http://www.texotela.co.uk/code/jquery/select/
 *
 *
 */
 
;(function($) {
 
/**
 * Adds (single/multiple) options to a select box (or series of select boxes)
 *
 * @name     addOption
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @example  $("#myselect").addOption("Value", "Text"); // add single value (will be selected)
 * @example  $("#myselect").addOption("Value 2", "Text 2", false); // add single value (won't be selected)
 * @example  $("#myselect").addOption({"foo":"bar","bar":"baz"}, false); // add multiple values, but don't select
 *
 */
$.fn.addOption = function()
{
	var add = function(el, v, t, sO, index)
	{
		var option = document.createElement("option");
		option.value = v, option.text = t;
		// get options
		var o = el.options;
		// get number of options
		var oL = o.length;
		if(!el.cache)
		{
			el.cache = {};
			// loop through existing options, adding to cache
			for(var i = 0; i < oL; i++)
			{
				el.cache[o[i].value] = i;
			}
		}
		if (index || index == 0)
		{
 			// we're going to insert these starting  at a specific index...
			// this has the side effect of el.cache[v] being the 
			// correct value for the typeof check below
			var ti = option;
			for(var ii =index; ii <= oL; ii++)
			{
				var tmp = el.options[ii];
				el.options[ii] = ti;
				o[ii] = ti;
				el.cache[o[ii].value] = ii;
				ti = tmp;
			}
		}
    
		// add to cache if it isn't already
		if(typeof el.cache[v] == "undefined") el.cache[v] = oL;
		el.options[el.cache[v]] = option;
		if(sO)
		{
			option.selected = true;
		}
	};
	
	var a = arguments;
	if(a.length == 0) return this;
	// select option when added? default is true
	var sO = true;
	// multiple items
	var m = false;
	// other variables
	var items, v, t, startindex = 0;
	if(typeof(a[0]) == "object")
	{
		m = true;
		items = a[0];
	}
	if(a.length >= 2)
	{
		if(typeof(a[1]) == "boolean")
		{
			sO = a[1];
			startindex = a[2];
		}
		else if(typeof(a[2]) == "boolean")
		{
			sO = a[2];
			startindex = a[1];
		}
		else
		{
			startindex = a[1];
		}
		if(!m)
		{
			v = a[0];
			t = a[1];
		}
	}
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			if(m)
			{
				var sel = this;
				jQuery.each(items, function(val, text){
					if(typeof(text) == "object"){
						jQuery.each(text, function(k,v){
							val = k;
							text = v;
						});
					}
					add(sel, val, text, sO, startindex);
					startindex += 1; 
				});
			}
			else
			{
				add(this, v, t, sO, startindex);
			}
		}
	);
	return this;
};

/**
 * Add options via ajax
 *
 * @name     ajaxAddOption
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @param    String url      Page to get options from (must be valid JSON)
 * @param    Object params   (optional) Any parameters to send with the request
 * @param    Boolean select  (optional) Select the added options, default true
 * @param    Function fn     (optional) Call this function with the select object as param after completion
 * @param    Array args      (optional) Array with params to pass to the function afterwards
 * @example  $("#myselect").ajaxAddOption("myoptions.php");
 * @example  $("#myselect").ajaxAddOption("myoptions.php", {"code" : "007"});
 * @example  $("#myselect").ajaxAddOption("myoptions.php", {"code" : "007"}, false, sortoptions, [{"dir": "desc"}]);
 *
 */
$.fn.ajaxAddOption = function(url, params, select, fn, args)
{
	if(typeof(url) != "string") return this;
	if(typeof(params) != "object") params = {};
	if(typeof(select) != "boolean") select = true;
	this.each(
		function()
		{
			var el = this;
			$.getJSON(url,
				params,
				function(r)
				{
					$(el).addOption(r, select);
					if(typeof fn == "function")
					{
						if(typeof args == "object")
						{
							fn.apply(el, args);
						} 
						else
						{
							fn.call(el);
						}
					}
				}
			);
		}
	);
	return this;
};

/**
 * Removes an option (by value or index) from a select box (or series of select boxes)
 *
 * @name     removeOption
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @param    String|RegExp|Number what  Option to remove
 * @param    Boolean selectedOnly       (optional) Remove only if it has been selected (default false)   
 * @example  $("#myselect").removeOption("Value"); // remove by value
 * @example  $("#myselect").removeOption(/^val/i); // remove options with a value starting with 'val'
 * @example  $("#myselect").removeOption(/./); // remove all options
 * @example  $("#myselect").removeOption(/./, true); // remove all options that have been selected
 * @example  $("#myselect").removeOption(0); // remove by index
 * @example  $("#myselect").removeOption(["myselect_1","myselect_2"]); // values contained in passed array
 *
 */
$.fn.removeOption = function()
{
	var a = arguments;
	if(a.length == 0) return this;
	var ta = typeof(a[0]);
	var v, index;
	// has to be a string or regular expression (object in IE, function in Firefox)
	if(ta == "string" || ta == "object" || ta == "function" )
	{
		v = a[0];
		// if an array, remove items
		if(v.constructor == Array)
		{
			var l = v.length;
			for(var i = 0; i<l; i++)
			{
				this.removeOption(v[i], a[1]); 
			}
			return this;
		}
	}
	else if(ta == "number") index = a[0];
	else return this;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			// clear cache
			if(this.cache) this.cache = null;
			// does the option need to be removed?
			var remove = false;
			// get options
			var o = this.options;
			if(!!v)
			{
				// get number of options
				var oL = o.length;
				for(var i=oL-1; i>=0; i--)
				{
					if(v.constructor == RegExp)
					{
						if(o[i].value.match(v))
						{
							remove = true;
						}
					}
					else if(o[i].value == v)
					{
						remove = true;
					}
					// if the option is only to be removed if selected
					if(remove && a[1] === true) remove = o[i].selected;
					if(remove)
					{
						o[i] = null;
					}
					remove = false;
				}
			}
			else
			{
				// only remove if selected?
				if(a[1] === true)
				{
					remove = o[index].selected;
				}
				else
				{
					remove = true;
				}
				if(remove)
				{
					this.remove(index);
				}
			}
		}
	);
	return this;
};

/**
 * Sort options (ascending or descending) in a select box (or series of select boxes)
 *
 * @name     sortOptions
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @param    Boolean ascending   (optional) Sort ascending (true/undefined), or descending (false)
 * @example  // ascending
 * $("#myselect").sortOptions(); // or $("#myselect").sortOptions(true);
 * @example  // descending
 * $("#myselect").sortOptions(false);
 *
 */
$.fn.sortOptions = function(ascending)
{
	// get selected values first
	var sel = $(this).selectedValues();
	var a = typeof(ascending) == "undefined" ? true : !!ascending;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return;
			// get options
			var o = this.options;
			// get number of options
			var oL = o.length;
			// create an array for sorting
			var sA = [];
			// loop through options, adding to sort array
			for(var i = 0; i<oL; i++)
			{
				sA[i] = {
					v: o[i].value,
					t: o[i].text
				}
			}
			// sort items in array
			sA.sort(
				function(o1, o2)
				{
					// option text is made lowercase for case insensitive sorting
					o1t = o1.t.toLowerCase(), o2t = o2.t.toLowerCase();
					// if options are the same, no sorting is needed
					if(o1t == o2t) return 0;
					if(a)
					{
						return o1t < o2t ? -1 : 1;
					}
					else
					{
						return o1t > o2t ? -1 : 1;
					}
				}
			);
			// change the options to match the sort array
			for(var i = 0; i<oL; i++)
			{
				o[i].text = sA[i].t;
				o[i].value = sA[i].v;
			}
		}
	).selectOptions(sel, true); // select values, clearing existing ones
	return this;
};
/**
 * Selects an option by value
 *
 * @name     selectOptions
 * @author   Mathias Bank (http://www.mathias-bank.de), original function
 * @author   Sam Collett (http://www.texotela.co.uk), addition of regular expression matching
 * @type     jQuery
 * @param    String|RegExp|Array value  Which options should be selected
 * can be a string or regular expression, or an array of strings / regular expressions
 * @param    Boolean clear  Clear existing selected options, default false
 * @example  $("#myselect").selectOptions("val1"); // with the value 'val1'
 * @example  $("#myselect").selectOptions(["val1","val2","val3"]); // with the values 'val1' 'val2' 'val3'
 * @example  $("#myselect").selectOptions(/^val/i); // with the value starting with 'val', case insensitive
 *
 */
$.fn.selectOptions = function(value, clear)
{
	var v = value;
	var vT = typeof(value);
	// handle arrays
	if(vT == "object" && v.constructor == Array)
	{
		var $this = this;
		$.each(v, function()
			{
      				$this.selectOptions(this, clear);
    			}
		);
	};
	var c = clear || false;
	// has to be a string or regular expression (object in IE, function in Firefox)
	if(vT != "string" && vT != "function" && vT != "object") return this;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return this;
			// get options
			var o = this.options;
			// get number of options
			var oL = o.length;
			for(var i = 0; i<oL; i++)
			{
				if(v.constructor == RegExp)
				{
					if(o[i].value.match(v))
					{
						o[i].selected = true;
					}
					else if(c)
					{
						o[i].selected = false;
					}
				}
				else
				{
					if(o[i].value == v)
					{
						o[i].selected = true;
					}
					else if(c)
					{
						o[i].selected = false;
					}
				}
			}
		}
	);
	return this;
};

/**
 * Copy options to another select
 *
 * @name     copyOptions
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @param    String to  Element to copy to
 * @param    String which  (optional) Specifies which options should be copied - 'all' or 'selected'. Default is 'selected'
 * @example  $("#myselect").copyOptions("#myselect2"); // copy selected options from 'myselect' to 'myselect2'
 * @example  $("#myselect").copyOptions("#myselect2","selected"); // same as above
 * @example  $("#myselect").copyOptions("#myselect2","all"); // copy all options from 'myselect' to 'myselect2'
 *
 */
$.fn.copyOptions = function(to, which)
{
	var w = which || "selected";
	if($(to).size() == 0) return this;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return this;
			// get options
			var o = this.options;
			// get number of options
			var oL = o.length;
			for(var i = 0; i<oL; i++)
			{
				if(w == "all" || (w == "selected" && o[i].selected))
				{
					$(to).addOption(o[i].value, o[i].text);
				}
			}
		}
	);
	return this;
};

/**
 * Checks if a select box has an option with the supplied value
 *
 * @name     containsOption
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     Boolean|jQuery
 * @param    String|RegExp value  Which value to check for. Can be a string or regular expression
 * @param    Function fn          (optional) Function to apply if an option with the given value is found.
 * Use this if you don't want to break the chaining
 * @example  if($("#myselect").containsOption("val1")) alert("Has an option with the value 'val1'");
 * @example  if($("#myselect").containsOption(/^val/i)) alert("Has an option with the value starting with 'val'");
 * @example  $("#myselect").containsOption("val1", copyoption).doSomethingElseWithSelect(); // calls copyoption (user defined function) for any options found, chain is continued
 *
 */
$.fn.containsOption = function(value, fn)
{
	var found = false;
	var v = value;
	var vT = typeof(v);
	var fT = typeof(fn);
	// has to be a string or regular expression (object in IE, function in Firefox)
	if(vT != "string" && vT != "function" && vT != "object") return fT == "function" ? this: found;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return this;
			// option already found
			if(found && fT != "function") return false;
			// get options
			var o = this.options;
			// get number of options
			var oL = o.length;
			for(var i = 0; i<oL; i++)
			{
				if(v.constructor == RegExp)
				{
					if (o[i].value.match(v))
					{
						found = true;
						if(fT == "function") fn.call(o[i], i);
					}
				}
				else
				{
					if (o[i].value == v)
					{
						found = true;
						if(fT == "function") fn.call(o[i], i);
					}
				}
			}
		}
	);
	return fT == "function" ? this : found;
};

/**
 * Returns values which have been selected
 *
 * @name     selectedValues
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     Array
 * @example  $("#myselect").selectedValues();
 *
 */
$.fn.selectedValues = function()
{
	var v = [];
	this.selectedOptions().each(
		function()
		{
			v[v.length] = this.value;
		}
	);
	return v;
};

/**
 * Returns text which has been selected
 *
 * @name     selectedTexts
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     Array
 * @example  $("#myselect").selectedTexts();
 *
 */
$.fn.selectedTexts = function()
{
	var t = [];
	this.selectedOptions().each(
		function()
		{
			t[t.length] = this.text;
		}
	);
	return t;
};

/**
 * Returns options which have been selected
 *
 * @name     selectedOptions
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @type     jQuery
 * @example  $("#myselect").selectedOptions();
 *
 */
$.fn.selectedOptions = function()
{
	return this.find("option:selected");
};

})(jQuery);

/*
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
 *    jQuery.facebox(function(jQuery) {
 *      jQuery.get('blah.html', function(data) { jQuery.facebox(data) })
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
 *   jQuery(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */
;(function(jQuery) {
  jQuery.facebox = function(data, klass) {
    jQuery.facebox.loading(data.settings || []);

    if (data.ajax) {
   fillFaceboxFromAjax(data.ajax, klass);
  }
    else if (data.image) {
    fillFaceboxFromImage(data.image, klass);
  }
    else if (data.div) {
   fillFaceboxFromHref(data.div, klass);
  }
    else if (jQuery.isFunction(data)) {
   data.call(jQuery);
  }
    else {
   jQuery.facebox.reveal(data, klass);
  }
  };

  /*
   * Public, jQuery.facebox methods
   */

  jQuery.extend(jQuery.facebox, {
    settings: {
      opacity      : 0.75,
      overlay      : true,
      loadingImage : 'https://huementui.s3.amazonaws.com/images/loading.gif',
      closeImage   : 'https://huementui.s3.amazonaws.com/images/closelabel.png',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '<div id="facebox" style="display:none;"><div class="popup"><div class="content"></div><a href="#" class="close"></a> </div></div>'
    },

    loading: function() {
      init();
      if (jQuery('#facebox .loading').length === 1) {
    return true;
   }
   
      showOverlay();

      jQuery('#facebox .content').empty().
        append('<div class="loading"><img src="'+jQuery.facebox.settings.loadingImage+'" style="width:32px;height:32px;margin-top:20px;max-width:32px;max-height:32px;" class="C" /></div>');

			jQuery('#facebox').show().css({
				//top: "100px"
				top: getPageScroll()[1] + (getPageHeight() / 10),
			});

      jQuery(document).bind('keydown.facebox', function(e) {
        if (e.keyCode === 27) {
				jQuery.facebox.close();
				}
				return true;
      });
      jQuery(document).trigger('loading.facebox');
    },

    reveal: function(data, klass) {
      jQuery(document).trigger('beforeReveal.facebox');
      if (klass){
				jQuery('#facebox .content').addClass(klass);
			}
			jQuery('#facebox .content').empty().append(data);
			//  jQuery('#facebox .popup').children().fadeIn('normal');
			
			if(jQuery(window).width() >= 767){
				var minusTotal = jQuery('#facebox .popup').outerWidth() / 2;
				jQuery('#facebox').css('left', '50%');
				jQuery('#facebox').css('margin-left', '-'+minusTotal+'px');
				jQuery(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
			}else{
			//	jQuery('#facebox').css('left', 0);
				jQuery(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
				///console.debug("vision");
				jQuery('#facebox').width(jQuery(window).width()-10);
				jQuery('#facebox .popup').width(jQuery(window).width()-5);
			}
			
			
    },
    close: function() {
      jQuery(document).trigger('close.facebox');
	  jQuery('#facebox').fadeOut();
      return false;
    }
  });

  /*
   * Public, jQuery.fn methods
   */

  jQuery.fn.facebox = function(settings) {
    if (this.length === 0) return;

    init(settings);

    function clickHandler() {
      jQuery.facebox.loading(true);

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/);
      if (klass) klass = klass[1];

      fillFaceboxFromHref(this.href, klass);
      return false;
    }

    return this.bind('click.facebox', clickHandler);
  };

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if (jQuery.facebox.settings.inited) {
   return true;
  }
    else {
   jQuery.facebox.settings.inited = true;
  }

    jQuery(document).trigger('init.facebox');
    makeCompatible();

    var imageTypes = jQuery.facebox.settings.imageTypes.join('|');
    jQuery.facebox.settings.imageTypesRegexp = new RegExp('\\.(' + imageTypes + ')(\\?.*)?jQuery', 'i');

    if (settings) jQuery.extend(jQuery.facebox.settings, settings);
    jQuery('body').append(jQuery.facebox.settings.faceboxHtml);

    var preload = [ new Image(), new Image() ];
    preload[0].src = jQuery.facebox.settings.closeImage;
    preload[1].src = jQuery.facebox.settings.loadingImage;

    jQuery('#facebox').find('.b:first, .bl').each(function() {
      preload.push(new Image());
      preload.slice(-1).src = this.css('background-image').replace(/url\((.+)\)/, 'jQuery1');
    });

    jQuery('#facebox .close').click(jQuery.facebox.close).append('<img src="'+ jQuery.facebox.settings.closeImage+ '" class="close_image" title="close">');
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
		var self = this;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {  // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll);
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight;
		var self = this;
    if (self.innerHeight) { // all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  // Backwards compatibility
  function makeCompatible() {
    var jQuerys = jQuery.facebox.settings;

    jQuerys.loadingImage = jQuerys.loading_image || jQuerys.loadingImage;
    jQuerys.closeImage = jQuerys.close_image || jQuerys.closeImage;
    jQuerys.imageTypes = jQuerys.image_types || jQuerys.imageTypes;
    jQuerys.faceboxHtml = jQuerys.facebox_html || jQuerys.faceboxHtml;
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0];
      var target = href.replace(url,'');
      if (target === '#') return;
      jQuery.facebox.reveal(jQuery(target).html(), klass);

    // image
    } else if (href.match(jQuery.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass);
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass);
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image();
    image.onload = function() {
      jQuery.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass);
    };
    image.src = href;
  }

  function fillFaceboxFromAjax(href, klass) {
    jQuery.facebox.jqxhr = jQuery.get(href, function(data) { jQuery.facebox.reveal(data, klass); });
  }

  function skipOverlay() {
    return jQuery.facebox.settings.overlay === false || jQuery.facebox.settings.opacity === null;
  }

  function showOverlay() {
	setTimeout("jQuery('#facebox').addClass('showbox')", 250);
	
    if (skipOverlay()) return;

    if (jQuery('#facebox_overlay').length === 0)
      jQuery("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');

    jQuery('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', jQuery.facebox.settings.opacity)
      .click(function() { jQuery(document).trigger('close.facebox'); })
      .fadeIn(200);
    return false;
  }

  function hideOverlay() {
	 jQuery(document).trigger('afterClose.facebox');
	
	if (skipOverlay()) {
		return;
	}

    jQuery('#facebox_overlay').fadeOut(200, function(){
      jQuery("#facebox_overlay").removeClass("facebox_overlayBG");
      jQuery("#facebox_overlay").addClass("facebox_hide");
      jQuery("#facebox_overlay").remove();
    });

    return false;
  }

  /*
   * Bindings
   */
  //jQuery(document).bind('reveal.facebox', function() { 
	//console.debug('showbox');
  //});

  jQuery(document).bind('close.facebox', function() {
    if (jQuery.facebox.jqxhr) {
      jQuery.facebox.jqxhr.abort();
      jQuery.facebox.jqxhr = null;
    }
    jQuery(document).unbind('keydown.facebox');
	jQuery('#facebox').removeClass("showbox");
	
    jQuery('#facebox .content').removeClass().addClass('content');
    jQuery('#facebox .loading').remove();

    hideOverlay();
  });

})(jQuery);
/*
 * TipTip
 * Based on code from:
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 * Build 1.3
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
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

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */

window.matchMedia = window.matchMedia || (function( doc, undefined ) {

  "use strict";

  var bool,
      docElem = doc.documentElement,
      refNode = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement( "body" ),
      div = doc.createElement( "div" );

  div.id = "mq-test-1";
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  return function(q){

    div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

    docElem.insertBefore( fakeBody, refNode );
    bool = div.offsetWidth === 42;
    docElem.removeChild( fakeBody );

    return {
      matches: bool,
      media: q
    };

  };

}( document ));



(function( win ){

	"use strict";

	//exposed namespace
	var respond = {};
	win.respond = respond;
	
	//define update even in native-mq-supporting browsers, to avoid errors
	respond.update = function(){};
	
	//expose media query support flag for external use
	respond.mediaQueriesSupported	= win.matchMedia && win.matchMedia( "only all" ).matches;
	
	//if media queries are supported, exit here
	if( respond.mediaQueriesSupported ){
		return;
	}
	
	//define vars
	var doc = win.document,
		docElem = doc.documentElement,
		mediastyles = [],
		rules = [],
		appendedEls = [],
		parsedSheets = {},
		resizeThrottle = 30,
		head = doc.getElementsByTagName( "head" )[0] || docElem,
		base = doc.getElementsByTagName( "base" )[0],
		links = head.getElementsByTagName( "link" ),
		requestQueue = [],
		
		//loop stylesheets, send text content to translate
		ripCSS = function(){

			for( var i = 0; i < links.length; i++ ){
				var sheet = links[ i ],
				href = sheet.href,
				media = sheet.media,
				isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

				//only links plz and prevent re-parsing
				if( !!href && isCSS && !parsedSheets[ href ] ){
					// selectivizr exposes css through the rawCssText expando
					if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
						translate( sheet.styleSheet.rawCssText, href, media );
						parsedSheets[ href ] = true;
					} else {
						if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
							href.replace( RegExp.$1, "" ).split( "/" )[0] === win.location.host ){
							requestQueue.push( {
								href: href,
								media: media
							} );
						}
					}
				}
			}
			makeRequests();
		},
		
		//recurse through request queue, get css text
		makeRequests	= function(){
			if( requestQueue.length ){
				var thisRequest = requestQueue.shift();
				
				ajax( thisRequest.href, function( styles ){
					translate( styles, thisRequest.href, thisRequest.media );
					parsedSheets[ thisRequest.href ] = true;

					// by wrapping recursive function call in setTimeout 
					// we prevent "Stack overflow" error in IE7
					setTimeout(function(){ makeRequests(); },0);
				} );
			}
		},
		
		//find media blocks in css text, convert to style blocks
		translate = function( styles, href, media ){
			var qs = styles.match(  /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi ),
				ql = qs && qs.length || 0;

			//try to get CSS path
			href = href.substring( 0, href.lastIndexOf( "/" ) );

			var repUrls	= function( css ){
					return css.replace( /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3" );
				},
				useMedia = !ql && media;

			//if path exists, tack on trailing slash
			if( href.length ){ href += "/"; }	
				
			//if no internal queries exist, but media attr does, use that	
			//note: this currently lacks support for situations where a media attr is specified on a link AND
				//its associated stylesheet has internal CSS media queries.
				//In those cases, the media attribute will currently be ignored.
			if( useMedia ){
				ql = 1;
			}

			for( var i = 0; i < ql; i++ ){
				var fullq, thisq, eachq, eql;

				//media attr
				if( useMedia ){
					fullq = media;
					rules.push( repUrls( styles ) );
				}
				//parse for styles
				else{
					fullq = qs[ i ].match( /@media *([^\{]+)\{([\S\s]+?)$/ ) && RegExp.$1;
					rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
				}
				
				eachq = fullq.split( "," );
				eql	= eachq.length;
					
				for( var j = 0; j < eql; j++ ){
					thisq = eachq[ j ];
					mediastyles.push( { 
						media : thisq.split( "(" )[ 0 ].match( /(only\s+)?([a-zA-Z]+)\s?/ ) && RegExp.$2 || "all",
						rules : rules.length - 1,
						hasquery : thisq.indexOf("(") > -1,
						minw : thisq.match( /\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ), 
						maxw : thisq.match( /\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
					} );
				}	
			}

			applyMedia();
		},
        
		lastCall,
		
		resizeDefer,
		
		// returns the value of 1em in pixels
		getEmValue = function() {
			var ret,
				div = doc.createElement('div'),
				body = doc.body,
				fakeUsed = false;
									
			div.style.cssText = "position:absolute;font-size:1em;width:1em";
					
			if( !body ){
				body = fakeUsed = doc.createElement( "body" );
				body.style.background = "none";
			}
					
			body.appendChild( div );
								
			docElem.insertBefore( body, docElem.firstChild );
								
			ret = div.offsetWidth;
								
			if( fakeUsed ){
				docElem.removeChild( body );
			}
			else {
				body.removeChild( div );
			}
			
			//also update eminpx before returning
			ret = eminpx = parseFloat(ret);
								
			return ret;
		},
		
		//cached container for 1em value, populated the first time it's needed 
		eminpx,
		
		//enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
				styleBlocks	= {},
				lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			//throttle resize calls	
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				clearTimeout( resizeDefer );
				resizeDefer = setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}
										
			for( var i in mediastyles ){
				if( mediastyles.hasOwnProperty( i ) ){
					var thisstyle = mediastyles[ i ],
						min = thisstyle.minw,
						max = thisstyle.maxw,
						minnull = min === null,
						maxnull = max === null,
						em = "em";
					
					if( !!min ){
						min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					if( !!max ){
						max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					
					// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
					if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
						if( !styleBlocks[ thisstyle.media ] ){
							styleBlocks[ thisstyle.media ] = [];
						}
						styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
					}
				}
			}
			
			//remove any existing respond style element(s)
			for( var j in appendedEls ){
				if( appendedEls.hasOwnProperty( j ) ){
					if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
						head.removeChild( appendedEls[ j ] );
					}
				}
			}
			
			//inject active styles, grouped by media type
			for( var k in styleBlocks ){
				if( styleBlocks.hasOwnProperty( k ) ){
					var ss = doc.createElement( "style" ),
						css = styleBlocks[ k ].join( "\n" );
					
					ss.type = "text/css";	
					ss.media = k;
					
					//originally, ss was appended to a documentFragment and sheets were appended in bulk.
					//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
					head.insertBefore( ss, lastLink.nextSibling );
					
					if ( ss.styleSheet ){ 
						ss.styleSheet.cssText = css;
					}
					else {
						ss.appendChild( doc.createTextNode( css ) );
					}

					//push to appendedEls to track for later removal
					appendedEls.push( ss );
				}
			}
		},
		//tweaked Ajax functions from Quirksmode
		ajax = function( url, callback ) {
			var req = xmlHttp();
			if (!req){
				return;
			}	
			req.open( "GET", url, true );
			req.onreadystatechange = function () {
				if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
					return;
				}
				callback( req.responseText );
			};
			if ( req.readyState === 4 ){
				return;
			}
			req.send( null );
		},
		//define ajax obj 
		xmlHttp = (function() {
			var xmlhttpmethod = false;	
			try {
				xmlhttpmethod = new win.XMLHttpRequest();
			}
			catch( e ){
				xmlhttpmethod = new win.ActiveXObject( "Microsoft.XMLHTTP" );
			}
			return function(){
				return xmlhttpmethod;
			};
		})();
	
	//translate CSS
	ripCSS();
	
	//expose update for re-running respond later on
	respond.update = ripCSS;
	
	//adjust on resize
	function callMedia(){
		applyMedia( true );
	}
	if( win.addEventListener ){
		win.addEventListener( "resize", callMedia, false );
	}
	else if( win.attachEvent ){
		win.attachEvent( "onresize", callMedia );
	}
})(this);

/* ------------------ Collapsible Panel Plugin ----------- 
 * created exclusively for hui
 * By Derek Scott - Copyright 2013 - All rights reserved
 * Author URL: http://huement.com
 *
 * forked from: John Snyder : snyderplace.com/collapsible
 * @version 1.2.1
*/
$.fn.slideFadeToggle = function(speed, easing, callback) {
  return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};

(function($) {
    $.fn.collapsible = function (cmd, arg) {

        //firewalling
        if (!this || this.length < 1) {
            return this;
        }

        //address command requests
        if (typeof cmd == 'string') {
            return $.fn.collapsible.dispatcher[cmd](this, arg);
        }
        
        //return the command dispatcher
        return $.fn.collapsible.dispatcher['_create'](this, cmd);
    };

    //create the command dispatcher
    $.fn.collapsible.dispatcher = {

        //initialized with options
        _create : function(obj, arg) {
            createCollapsible(obj, arg);
        },

        //toggle the element's display
        toggle: function(obj) {
            toggle(obj, loadOpts(obj));
            return obj;
        },

        //show the element
        open: function(obj) {
            open(obj, loadOpts(obj));
            return obj;
        },

        //hide the element
        close: function(obj) {
            close(obj, loadOpts(obj));
            return obj;
        },

        //check if the element is closed
        collapsed: function(obj) {
            return collapsed(obj, loadOpts(obj));
        },

        //open all closed containers
        openAll: function(obj) {
            return openAll(obj, loadOpts(obj));
        },

        //close all opened containers
        closeAll: function(obj) {
            return closeAll(obj, loadOpts(obj));
        }
    };

    //create the initial collapsible
    function createCollapsible(obj, options)
    {

        //build main options before element iteration
        var opts = $.extend({}, $.fn.collapsible.defaults, options);
        
        //store any opened default values to set cookie later
        var opened = [];
        
        //iterate each matched object, bind, and open/close
        obj.each(function() {

            var $this = $(this);
            saveOpts($this, opts);
            
            //bind it to the event
            if (opts.bind == 'mouseenter') {

                $this.bind('mouseenter', function(e) {
                    e.preventDefault(); 
                    toggle($this, opts);
                });
            }
            
            //bind it to the event
            if (opts.bind == 'mouseover') {

                $this.bind('mouseover',function(e) {
                    e.preventDefault(); 
                    toggle($this, opts); 
                });
            }
            
            //bind it to the event
            if (opts.bind == 'click') {

                $this.bind('click', function(e) {
                    e.preventDefault();
                    toggle($this, opts);
                });

            }
            
            //bind it to the event
            if (opts.bind == 'dblclick') {

                $this.bind('dblclick', function(e) {

                    e.preventDefault();
                    toggle($this, opts);
                });

            }
            
            //initialize the collapsibles
            //get the id for this element
            var id = $this.attr('id');
            
            //if not using cookies, open defaults
            if (!useCookies(opts)) {

                //is this collapsible in the default open array?
                var dOpenIndex = inDefaultOpen(id, opts);
                
                //close it if not defaulted to open
                if (dOpenIndex === false) {

                    $this.addClass(opts.cssClose);
                    opts.loadClose($this, opts);

                } else { //its a default open, open it

                    $this.addClass(opts.cssOpen);
                    opts.loadOpen($this, opts);
                    opened.push(id);
                }

            } else { //can use cookies, use them now

                //has a cookie been set, this overrides default open
                if (issetCookie(opts)) {

                    var cookieIndex = inCookie(id, opts);

                    if (cookieIndex === false) {

                        $this.addClass(opts.cssClose);
                        opts.loadClose($this, opts);

                    } else {

                        $this.addClass(opts.cssOpen);
                        opts.loadOpen($this, opts);
                        opened.push(id);
                    }

                } else { //a cookie hasn't been set open defaults, add them to opened array

                    dOpenIndex = inDefaultOpen(id, opts);

                    if (dOpenIndex === false) {

                        $this.addClass(opts.cssClose);
                        opts.loadClose($this, opts);

                    } else {

                        $this.addClass(opts.cssOpen);
                        opts.loadOpen($this, opts);
                        opened.push(id);
                    }
                }
            }
        });
        
        //now that the loop is done, set the cookie
        if (opened.length > 0 && useCookies(opts)) {

            setCookie(opened.toString(), opts);

        } else { //there are none open, set cookie

            setCookie('', opts);
        }
        
        return obj;
    }
    
    //load opts from object
    function loadOpts($this) {
        return $this.data('collapsible-opts');
    }
    
    //save opts into object
    function saveOpts($this, opts) {
        return $this.data('collapsible-opts', opts);
    }
    
    //returns true if object is opened
    function collapsed($this, opts) {
        return $this.hasClass(opts.cssClose);
    }
    
    //hides a collapsible
    function close($this, opts) {

        //give the proper class to the linked element
        $this.addClass(opts.cssClose).removeClass(opts.cssOpen);
        
        //close the element
        opts.animateClose($this, opts);
        
        //do cookies if plugin available
        if (useCookies(opts)) {
            // split the cookieOpen string by ","
            var id = $this.attr('id');
            unsetCookieId(id, opts);
        }
    }
    
    //opens a collapsible
    function open($this, opts) {

        //give the proper class to the linked element
        $this.removeClass(opts.cssClose).addClass(opts.cssOpen);
        
        //open the element
        opts.animateOpen($this, opts);
        
        //do cookies if plugin available
        if (useCookies(opts)) {

            // split the cookieOpen string by ","
            var id = $this.attr('id');
            appendCookie(id, opts);
        }
    }
    
    //toggle a collapsible on an event
    function toggle($this, opts) {

        if (collapsed($this, opts)) {

            //open a closed element
            open($this, opts);

        } else {

            //close an open element
            close($this, opts);
        }
        
        return false;
    }

    //open all closed containers
    function openAll($this, opts) {

        // loop through all container elements
        $.each($this, function(elem, value) {

            if (collapsed($(value), opts)) {

                //open a closed element
                open($(value), opts);
            }
        });
    }

    //close all open containers
    function closeAll($this, opts) {

        $.each($this, function(elem, value) {

            if (!collapsed($(value), opts)) {

                //close an opened element
                close($(value), opts);
            }
        });
    }
    
    //use cookies?
    function useCookies(opts) {

        //return false if cookie plugin not present or if a cookie name is not provided
        if (!$.cookie || opts.cookieName == '') {
            return false;
        }
        
        //we can use cookies
        return true;
    }
    
    //append a collapsible to the cookie
    function appendCookie(value, opts) {

        //check if cookie plugin available and cookiename is set
        if (!useCookies(opts)) {
            return false;
        }
        
        //does a cookie already exist
        if (!issetCookie(opts)) {

            //no lets set one
            setCookie(value, opts);
            return true;
        }
        
        //cookie already exists, is this collapsible already set?
        if (inCookie(value, opts)) { //yes, quit here
            return true;
        }
        
        //get the cookie
        var cookie = decodeURIComponent($.cookie(opts.cookieName));

        //turn it into an array
        var cookieArray = cookie.split(',');
        
        //add it to list
        cookieArray.push(value);
        
        //save it
        setCookie(cookieArray.toString(), opts);
        
        return true;    
    }
    
    //unset a collapsible from the cookie
    function unsetCookieId(value, opts)
    {
        //check if cookie plugin available and cookiename is set
        if (!useCookies(opts)) {
            return false;
        }
        
        //if its not there we don't need to remove from it
        if (!issetCookie(opts)) { //quit here, don't have a cookie 
            return true;
        }
        
        //we have a cookie, is this collapsible in it
        var cookieIndex = inCookie(value, opts);
        if (cookieIndex === false) { //not in the cookie quit here
            return true;
        }
        
        //still here get the cookie
        var cookie = decodeURIComponent($.cookie(opts.cookieName));
        
        //turn it into an array
        var cookieArray = cookie.split(',');
        
        //lets pop it out of the array
        cookieArray.splice(cookieIndex, 1);

        //overwrite
        setCookie(cookieArray.toString(), opts);

        return true
    }
    
    //set a cookie
    function setCookie(value, opts)
    {
        //can use the cookie plugin
        if (!useCookies(opts)) { //no, quit here
            return false;
        }
        
        //cookie plugin is available, lets set the cookie
        $.cookie(opts.cookieName, value, opts.cookieOptions);

        return true;
    }
    
    //check if a collapsible is in the cookie
    function inCookie(value, opts)
    {
        //can use the cookie plugin
        if (!useCookies(opts)) {
            return false;
        }
        
        //if its not there we don't need to remove from it
        if (!issetCookie(opts)) { //quit here, don't have a cookie 
            return false;
        }

        //get the cookie value
        var cookie = decodeURIComponent($.cookie(opts.cookieName));
        
        //turn it into an array
        var cookieArray = cookie.split(',');
        
        //get the index of the collapsible if in the cookie array
        var cookieIndex = $.inArray(value, cookieArray);
        
        //is this value in the cookie array
        if (cookieIndex == -1) { //no, quit here
            return false;
        }
        
        return cookieIndex;
    }
    
    //check if a cookie is set
    function issetCookie(opts)
    {
        //can we use the cookie plugin
        if (!useCookies(opts)) { //no, quit here
            return false;
        }
        
        //is the cookie set
        if ($.cookie(opts.cookieName) === null) { //no, quit here
            return false;
        }
        
        return true;
    }
    
    //check if a collapsible is in the list of collapsibles to be opened by default
    function inDefaultOpen(id, opts)
    {
        //get the array of open collapsibles
        var defaultOpen = getDefaultOpen(opts);
        
        //is it in the default open array
        var index = $.inArray(id, defaultOpen);
        if (index == -1) { //nope, quit here
            return false;
        }
        
        return index;
    }
    
    //get the default open collapsibles and return array
    function getDefaultOpen(opts)
    {
        //initialize an empty array
        var defaultOpen = [];
        
        //if there is a list, lets split it into an array
        if (opts.defaultOpen != '') {
            defaultOpen = opts.defaultOpen.split(',');
        }
        
        return defaultOpen;
    }
    
    // settings
    $.fn.collapsible.defaults = {
        cssClose: 'collapse-close', //class you want to assign to a closed collapsible header
        cssOpen: 'collapse-open', //class you want to assign an opened collapsible header
        cookieName: 'collapsible', //name of the cookie you want to set for this collapsible
        cookieOptions: { //cookie options, see cookie plugin for details
            path: '/',
            expires: 7,
            domain: '',
            secure: ''
        },
        defaultOpen: '', //comma separated list of header ids that you want opened by default
        speed: 'slow', //speed of the slide effect
        bind: 'click', //event to bind to, supports click, dblclick, mouseover and mouseenter
        animateOpen: function (elem, opts) { //replace the standard slideUp with custom function
            elem.next().stop(true, true).slideDown(opts.speed);
        },
        animateClose: function (elem, opts) { //replace the standard slideDown with custom function
            elem.next().stop(true, true).slideUp(opts.speed);
        },
        loadOpen: function (elem, opts) { //replace the default open state with custom function
            elem.next().show();
        },
        loadClose: function (elem, opts) { //replace the default close state with custom function
            elem.next().hide();
        }
    };

})(jQuery);

/* ------------------ accordionNav MENU PLUGIN ----------- 
 * created exclusively for hui
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com
 *
 * inspired from: designmodo.com/jquery-accordion-menu/
 *
*/
(function(jQuery) {
 
 jQuery.fn.accordionNav = function(options) {
  var atarget = this.selector;
  var atargethref = atarget + ' > li > a';
  var atargetsub = atarget + ' li > .sub-menu';
  
  var accordion_head = jQuery(atargethref),
  accordion_body = jQuery(atargetsub);

  // Open the first tab on load
  accordion_head.first().addClass('active').next().slideDown('normal');

  // Click function
  accordion_head.on('click', function(event) {
   // Disable header links

   event.preventDefault();

   // Show and hide the tabs on click

   if (jQuery(this).attr('class') !== 'active'){
     accordion_body.slideUp('normal');
     jQuery(this).next().stop(true,true).slideToggle('normal');
     accordion_head.removeClass('active');
     jQuery(this).addClass('active');
   }
  });
  return this.each(function() {
  //nothing
  });
 };

})(jQuery);

/* ------------------ flapperGirl plugin ----------- 
 * created exclusively for hui
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com
 *
*/
(function(jQuery) {
 jQuery.fn.flapperGirl = function(options, callbackGirl) {
   //var atarget = this.selector;
   var title_bar = options["title"];
   var flapper = options["loader"];
   var speakStage = options["stage"];
   
     jQuery(title_bar+" "+"li.basic:first").first().addClass("active");
     

	jQuery("li.docked").each(function(){
		var theid = jQuery(this).attr("id");
		var targets = jQuery("."+theid);
		
		targets.each(function(){
			//$(this).css("height","0px");
			jQuery(this).css("max-height","0px");
			jQuery(this).css("padding-top","0px");
			jQuery(this).css("padding-bottom","0px");
			jQuery(this).css("border-width","0px");
			jQuery(this).addClass("contrary");
		});
		
	});

     //<li id='category_example' class="title_bar"
     jQuery(title_bar).click(function(){
       var theid=jQuery(this).attr("id");
       jQuery(this).toggleClass("docked");
       var targets = jQuery("."+theid);
       targets.each(function(){
			if(jQuery(this).hasClass("contrary")!=true){
				jQuery(this).addClass("contrary");
				//$(this).css("height","0px");
				jQuery(this).css("max-height","0px");
				jQuery(this).css("padding-top","0px");
				jQuery(this).css("padding-bottom","0px");
				jQuery(this).css("border-width","0px");
			} else {
				jQuery(this).removeClass("contrary");
				//$(this).css("height","0px");
				jQuery(this).css("max-height","30px");
				jQuery(this).css("padding-top","5px");
				jQuery(this).css("padding-bottom","5px");
				jQuery(this).css("border-width","1px");
			}
       });
	   
       //jQuery("."+theid).slideToggle();
     });
     
     //<li class="basic category_example"><a href="#" class="pageloader">Download</a></li>
     //jQuery(".sideBar ul li").removeClass("active");
     jQuery(flapper).click(function(){
       jQuery(speakStage+" ul li").removeClass("active");
       jQuery(this).parent().addClass("active");

       if (typeof callbackGirl === 'function') { // make sure the callback is a function
            callbackGirl();
       }
       return false;
      });
   return true;
  };
})(jQuery);
/* ------------------ Horizontal Switcheroo -----------
 *
 * created exclusively for hui
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com
 *
 * adapted from both:
 *
 * jQuery Horizontal Navigation 1.0
 * By Sebastian Nitu - Copyright 2012 - All rights reserved
 * https://github.com/sebnitu/horizontalNav
 *
 * jQuery Responsive Menu Plugin
 * https://github.com/mattkersley/Responsive-Menu
 *
 * 
 */
(function($) {

    jQuery.fn.horizontalNav = function(options) {

        // Extend our default options with those provided.
        var opts = jQuery.extend({}, jQuery.fn.horizontalNav.defaults, options);

        return this.each(function () {
            
            // Save our object
            var $this = jQuery(this);

            // Build element specific options
            // This lets me access options with this syntax: o.optionName
            var o = jQuery.meta ? jQuery.extend({}, opts, $this.data()) : opts;

            // Save the wrapper. The wrapper is the element that
            // we figure out what the full width should be
      var ul_wrap = "";
            if ($this.is('ul')) {
                ul_wrap = $this.parent();
            } else {
                ul_wrap = $this;
            }

            // Grab elements we'll need and add some default styles
            var ul = $this.is('ul') ? $this : ul_wrap.find('> ul'), // The unordered list element
                li = ul.find('> li'), // All list items
                li_last = li.last(), // Last list item
                li_count = li.size(), // The number of navigation elements
                li_a = li.find('> a'); // Remove padding from the links

            if (o.minimumItems && o.minimumItems > li_count) {
                $this.addClass("horizontalNav-notprocessed");
                return false;
            }

            // Call funcion on browser resize
            function resizeTrigger(callback, delay) {
                // Delay before function is called
                delay = delay || 100;
                // Call function on resize
                var resizeTimer;
                jQuery(window).resize(function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        callback();
                    }, delay);
                });
            }

            // The heavy lifting of this plugin. This is where we
            // find and set the appropriate widths for list items
            function _construct() {

                if ( (o.tableDisplay !== true) || (!$.support.leadingWhitespace) ) {

                    // IE7 doesn't support the "display: table" method
                    // so we need to do it the hard way.
          
          
                    // Add some styles
                    ul.css({ 'float' : 'left' });
                    li.css({ 'float' : 'left', 'width' : 'auto' });
                    li_a.css({ 'padding-left' : 0, 'padding-right' : 0 });

                    // Grabbing widths and doing some math
                    var ul_width = trueInnerWidth(ul),
                        ul_width_outer = ul.outerWidth(true),
                        ul_width_extra = ul_width_outer - ul_width,

                        full_width = trueInnerWidth(ul_wrap),
                        extra_width = (full_width - ul_width_extra) - ul_width,
                        li_padding = Math.floor( extra_width / li_count );

                    // Cycle through the list items and give them widths
                    li.each(function(index) {
                        var li_width = trueInnerWidth( jQuery(this) );
                        jQuery(this).css({ 'width' : (li_width + li_padding) + 'px' });
                    });

                    // Get the leftover pixels after we set every itms width
                    var li_last_width = trueInnerWidth(li_last) + ( (full_width - ul_width_extra) - trueInnerWidth(ul) );
                    // I hate to do this but for some reason Firefox (v13.0) and IE are always
                    // one pixel off when rendering. So this is a quick fix for that.
                    li_last_width = li_last_width - 1;
                    // Add the leftovers to the last navigation item
                    li_last.css({ 'width' : li_last_width + 'px' });

          
                } else {
                    // Every modern browser supports the "display: table" method
                    // so this is the best way to do it for them.
                    ul.css({ 'display' : 'table', 'float' : 'none', 'width' : '100%' });
                    li.css({ 'display' : 'table-cell', 'float' : 'none' });
                }
                $this.addClass("horizontalNav-processed").removeClass("horizontalNav-notprocessed");
            }
			if(o.responsive==undefined||o.responsive==""){
				o.responsive=true;
			}
			if(o.responsiveDelay==undefined||o.responsiveDelay==""){
				o.responsiveDelay = 500;
			}
            // If set to responsive, re-construct after every browser resize
            if ( o.responsive === true ) {
                resizeTrigger( _construct, o.responsiveDelay );

			  /* minify down to select box on small screens */
              if ( options != null && typeof options["prependTo"] !== "undefined" && options["prependTo"]) {
               var prepre = options["prependTo"];
               jQuery(ul).mobileMenu({
               prependTo: prepre
               });
              } else {
               jQuery(ul).mobileMenu();
              }
              if(jQuery(document).width() <= 480){
                jQuery(".horizontalNav-processed").hide();
              }

            }

            if (jQuery('.clearHorizontalNav').length ) {
                ul_wrap.css({ 'zoom' : '1' });
            } else {
                ul_wrap.css({ 'zoom' : '1' }).append('<div class="clearHorizontalNav">');
                // let's append a clearfixing element to the ul wrapper
                jQuery('.clearHorizontalNav').css({
                'display' : 'block',
                'overflow' : 'hidden',
                'visibility' : 'hidden',
                'width' : 0,
                'height' : 0,
                'clear' : 'both'
                });
            }

            // Initiate the plugin
            _construct();

            // Returns the true inner width of an element
            // Essentially it's the inner width without padding.
            function trueInnerWidth(element) {
                return element.innerWidth() - (
                    parseInt(element.css('padding-left'), 0) + parseInt(element.css('padding-right'), 0)
                );
            }
        }); // @end of return this.each()

    };

    jQuery.fn.horizontalNav.defaults = {
        responsive : true,
        responsiveDelay : 100,
        tableDisplay : true,
        minimumItems : 0
    };

})(jQuery);


(function($){
 
 //plugin's default options
 var settings = {
  combine: true,     //combine multiple menus into a single select
  groupPageText: 'Main',   //optgroup's aren't selectable, make an option for it
  nested: true,     //create optgroups by default
  prependTo: 'body',    //insert at top of page by default
  switchWidth: 480,    //width at which to switch to select, and back again
  topOptionText: 'Select a page' //default "unselected" state
 },
 
 //used to store original matched menus
 $menus,
 
 //used as a unique index for each menu if no ID exists
 menuCount = 0,
 
 //used to store unique list items for combining lists
 uniqueLinks = [];


 //go to page
 function goTo(url){
  document.location.href = url;
 }
 
 //does menu exist?
 function menuExists(){
  return (jQuery('.mnav').length) ? true : false;
 }

 //validate selector's matched list(s)
 function isList($this){
  var pass = true;
  $this.each(function(){
   if(!jQuery(this).is('ul') && !jQuery(this).is('ol')){
    pass=false;
   }
  });
  return pass;
 }//isList()


 //function to decide if mobile or not
 function isMobile(){
  return (jQuery(window).width() < settings.switchWidth);
 }
 
 
 //function to get text value of element, but not it's children
 function getText($item){
  return jQuery.trim($item.clone().children('ul, ol').remove().end().text());
 }
 
 //function to check if URL is unique
 function isUrlUnique(url){
  return (jQuery.inArray(url, uniqueLinks) === -1) ? true : false;
 }
 
 
 //function to do duplicate checking for combined list
 function checkForDuplicates($menu){
  
  $menu.find(' > li').each(function(){
  
   var $li = jQuery(this),
    link = $li.find('a').attr('href'),
    parentLink = function(){
     if($li.parent().parent().is('li')){
      return $li.parent().parent().find('a').attr('href');
     } else {
      return null;
     }
    };
      
   //check nested <li>s before checking current one
   if($li.find(' ul, ol').length){
    checkForDuplicates($li.find('> ul, > ol'));
   }
  
   //remove empty UL's if any are left by LI removals
   if(!$li.find(' > ul li, > ol li').length){
    $li.find('ul, ol').remove();
   }
  
   //if parent <li> has a link, and it's not unique, append current <li> to the "unique parent" detected earlier
   if(!isUrlUnique(parentLink(), uniqueLinks) && isUrlUnique(link, uniqueLinks)){
    $li.appendTo(
     $menu.closest('ul#mmnav').find('li:has(a[href='+parentLink()+']):first ul')
    );
   }
   
   //otherwise, check if the current <li> is unique, if it is, add it to the unique list
   else if(isUrlUnique(link)){
    uniqueLinks.push(link);
   }
   
   //if it isn't, remove it. Simples.
   else{
    $li.remove();
   }
  
  });
 }
 
 
 //function to combine lists into one
 function combineLists(){
  
  //create a new list
  var $menu = jQuery('<ul id="mmnav" />');
  
  //loop through each menu and extract the list's child items
  //then append them to the new list
  $menus.each(function(){
   jQuery(this).children().clone().appendTo($menu);
  });
  
  //de-duplicate any repeated items
  checkForDuplicates($menu);
    
  //return new combined list
  return $menu;
  
 }//combineLists()
 
 
 
 //function to create options in the select menu
 function createOption($item, $container, text){
  
  //if no text param is passed, use list item's text, otherwise use settings.groupPageText
  if(!text){
   jQuery('<option value="'+$item.find('a:first').attr('href')+'">'+jQuery.trim(getText($item))+'</option>').appendTo($container);
  } else {
   jQuery('<option value="'+$item.find('a:first').attr('href')+'">'+text+'</option>').appendTo($container);
  }
 
 }//createOption()
 
 
 
 //function to create option groups
 function createOptionGroup($group, $container){
  
  //create <optgroup> for sub-nav items
  var $optgroup = jQuery('<optgroup label="'+jQuery.trim(getText($group))+'" />');
  
  //append top option to it (current list item's text)
  createOption($group,$optgroup, settings.groupPageText);
 
  //loop through each sub-nav list
  $group.children('ul, ol').each(function(){
  
   //loop through each list item and create an <option> for it
   jQuery(this).children('li').each(function(){
    createOption(jQuery(this), $optgroup);
   });
  });
  
  //append to select element
  $optgroup.appendTo($container);
  
 }//createOptionGroup()

 
 
 //function to create <select> menu
 function createSelect($menu){
 
  //create <select> to insert into the page
  var $select = jQuery('<select id="mm'+menuCount+'" class="mnav" />');
  menuCount++;
  
  //create default option if the text is set (set to null for no option)
  if(settings.topOptionText){
   createOption(jQuery('<li>'+settings.topOptionText+'</li>'), $select);
  }
  
  //loop through first list items
  $menu.children('li').each(function(){
  
   var $li = jQuery(this);

   //if nested select is wanted, and has sub-nav, add optgroup element with child options
   if($li.children('ul, ol').length && settings.nested){
    createOptionGroup($li, $select);
   }
   
   //otherwise it's a single level select menu, so build option
   else {
    createOption($li, $select);   
   }
      
  });
  
  //add change event and prepend menu to set element
  $select
   .change(function(){goTo(jQuery(this).val());})
   .prependTo(settings.prependTo);
 
 }//createSelect()

 
 //function to run plugin functionality
 function runPlugin(){
 
  //menu doesn't exist
  if(isMobile() && !menuExists()){
   
   //if user wants to combine menus, create a single <select>
   if(settings.combine){
    var $menu = combineLists();
    createSelect($menu);
   }
   
   //otherwise, create a select for each matched list
   else{
    $menus.each(function(){
     createSelect(jQuery(this));
    });
   }
  }
  
  //menu exists, and browser is mobile width
  if(isMobile() && menuExists()){
   jQuery('.mnav').show();
   $menus.hide();
  }
   
  //otherwise, hide the mobile menu
  if(!isMobile() && menuExists()){
   jQuery('.mnav').hide();
   $menus.show();
  }
  
 }//runPlugin()

 
 
 //plugin definition
 jQuery.fn.mobileMenu = function(options){

  //override the default settings if user provides some
  if(options){jQuery.extend(settings, options);}
  
  //check if user has run the plugin against list element(s)
  if(isList(jQuery(this))){
   $menus = jQuery(this);
   runPlugin();
   jQuery(window).resize(function(){runPlugin();});
  } else {
   //alert('mobileMenu only works with <ul>/<ol>');
  }
    
 };//mobileMenu()
 
})(jQuery);

/* ------------------ REACTIVE MENU PLUGIN ----------- 
 * created exclusively for hui 
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com 
*/
//jQuery.fn.watermark = function(options) { /* ... */ }   
//Shortcut for jQuery.prototype.watermark = function(options) { /* ... */ }
(function($) {
 
 jQuery.fn.reactiveNav = function(options) {
  //console.debug(this.selector);
  //console.debug(options["menu"]);
  var easing;
  if(options["easing"]!=null && options["easing"] != undefined && options["easing"] != ""){
    easing = options["easing"];
  } else {
    easing = "jswing";
  }
  var timeout;
  if(options["timeout"]!=null && options["timeout"] != undefined && options["timeout"] != ""){
    timeout = options["timeout"];
  } else {
    timeout = 600;
  }
  var pull   = jQuery(options["pull"]);
  var menu   = jQuery(this.selector);
  var menuHeight = menu.height();

  jQuery(pull).on('click', function(ev) {
   ev.preventDefault();
   //menu.slideToggle();
   //menu.animate({
   //    "height": "toggle"
   //}, timeout, easing);
   var display = menu.css("display");
   if(display=="none"){
    menu.css("display", "block");
   } else {
    menu.css("display", "none");
   }
   return false;
  });

  jQuery(window).resize(function(){
   var w = jQuery(window).width();
   if(w > 320 && menu.is(':hidden')) {
    menu.removeAttr('style');
   }
  });
 
    return this.each(function() {
  //nothing
    });
 };
 
})(jQuery);


// Stupid jQuery table plugin.

// Call on a table
// sortFns: Sort functions for your datatypes.
(function($){

  $.fn.stupidtable = function(sortFns){
    return this.each(function () {
      var $table = $(this);
      sortFns = sortFns || {};

      // ==================================================== //
      //                  Utility functions                   //
      // ==================================================== //

      // Merge sort functions with some default sort functions.
      sortFns = $.extend({}, {
        "int":function(a,b){ return parseInt(a, 10) - parseInt(b,10); },
        "float":function(a,b){ return parseFloat(a) - parseFloat(b); },
        "string":function(a,b){ if (a<b) return -1; if (a>b) return +1; return 0;}
      }, sortFns);

      // Array comparison. See http://stackoverflow.com/a/8618383
      var arrays_equal = function(a,b) { return !!a && !!b && !(a<b || b<a);};

      // Return the resulting indexes of a sort so we can apply
      // this result elsewhere. This returns an array of index numbers.
      // return[0] = x means "arr's 0th element is now at x"
      var sort_map =  function(arr, sort_function, reverse_column){
        var map = [];
        var index = 0;
        if (reverse_column) {
            for (var i = arr.length-1; i >= 0; i--) {
                      map.push(i);
            }
        }
        else{
            var sorted = arr.slice(0).sort(sort_function);
            for(var i=0; i<arr.length; i++){
              index = $.inArray(arr[i], sorted);

              // If this index is already in the map, look for the next index.
              // This handles the case of duplicate entries.
              while($.inArray(index, map) != -1){
                index++;
              }
              map.push(index);
            }
        }
        return map;
      };

      // Apply a sort map to the array.
      var apply_sort_map = function(arr, map){
        var clone = arr.slice(0),
            newIndex = 0;
        for(var i=0; i<map.length; i++){
          newIndex = map[i];
          clone[newIndex] = arr[i];
        }
        return clone;
      };

      // ==================================================== //
      //                  Begin execution!                    //
      // ==================================================== //

      //Add a Default Header Class To all affected TH elements.
      var heads = $table.find('th');
      $.each(heads,function(index,value){
		$(value).addClass("sorting-box");
      });
      
      // Do sorting when THs are clicked
      $table.on("click", "th", function(){
        var trs = $table.children("tbody").children("tr");
        var $this = $(this);
        var th_index = 0;
        var dir = $.fn.stupidtable.dir;

        $table.find('th').slice(0, $this.index()).each(function () {
          var cols = $(this).attr('colspan') || 1;
          th_index += parseInt(cols,10);
        });

        // Determine (and/or reverse) sorting direction, default `asc`
        var sort_dir = $this.data("sort-dir") === dir.ASC ? dir.DESC : dir.ASC;

        // Choose appropriate sorting function. If we're sorting descending, check
        // for a `data-sort-desc` attribute.
        if ( sort_dir == dir.DESC )
          var type = $this.data("sort-desc") || $this.data("sort") || null;
        else
          var type = $this.data("sort") || null;

        // Uncomment out return and remove type setting to prevent sorting if no type defined
		// Default is if no data-sort attr is given to the th, assume string.
        if (type === null) {
		  type = "string";
          //return;
        }

        // Trigger `beforetablesort` event that calling scripts can hook into;
        // pass parameters for sorted column index and sorting direction
        $table.trigger("beforetablesort", {column: th_index, direction: sort_dir});
        // More reliable method of forcing a redraw
        $table.css("display");

        // Run sorting asynchronously on a timout to force browser redraw after
        // `beforetablesort` callback. Also avoids locking up the browser too much.
        setTimeout(function() {
          // Gather the elements for this column
          var column = [];
          var sortMethod = sortFns[type];

          // Push either the value of the `data-order-by` attribute if specified
          // or just the text() value in this column to column[] for comparison.
          trs.each(function(index,tr){
            var $e = $(tr).children().eq(th_index);
            var sort_val = $e.data("sort-value");
            var order_by = typeof(sort_val) !== "undefined" ? sort_val : $e.text();
            column.push(order_by);
          });

          // Create the sort map. This column having a sort-dir implies it was
          // the last column sorted. As long as no data-sort-desc is specified, 
          // we're free to just reverse the column.
          var reverse_column = !!$this.data("sort-dir") && !$this.data("sort-desc");
          var theMap = sort_map(column, sortMethod, reverse_column);

          // Reset siblings
          $table.find("th").data("sort-dir", null).removeClass("sorting-desc sorting-asc");
          $this.data("sort-dir", sort_dir).addClass("sorting-"+sort_dir);

          // Replace the content of tbody with the sortedTRs. Strangely (and
          // conveniently!) enough, .append accomplishes this for us.
          var sortedTRs = $(apply_sort_map(trs, theMap));
          $table.children("tbody").append(sortedTRs);

          // Trigger `aftertablesort` event. Similar to `beforetablesort`
          $table.trigger("aftertablesort", {column: th_index, direction: sort_dir});
          // More reliable method of forcing a redraw
          $table.css("display");
        }, 10);
      });
    });
  };

  // Enum containing sorting directions
  $.fn.stupidtable.dir = { ASC: "asc", DESC: "desc" };

})(jQuery);
;(function($){
    // Convenience vars for accessing elements
    var $body = $('body'),
        $pageslide = $('#pageslide');
    
    var _sliding = false,   // Mutex to assist closing only once
        _lastCaller;        // Used to keep track of last element to trigger pageslide
    
	// If the pageslide element doesn't exist, create it
    if( $pageslide.length == 0 ) {
         $pageslide = $('<div />').attr( 'id', 'pageslide' )
                                  .css( 'display', 'none' )
                                  .appendTo( $('body') );
    }
    
    /*
     * Private methods 
     */
    function _load( url, useIframe ) {
        // Are we loading an element from the page or a URL?
        if ( url.indexOf("#") === 0 ) {                
            // Load a page element                
            $(url).clone(true).appendTo( $pageslide.empty() ).show();
        } else {
            // Load a URL. Into an iframe?
            if( useIframe ) {
                var iframe = $("<iframe />").attr({
                                                src: url,
                                                frameborder: 0,
                                                hspace: 0
                                            })
                                            .css({
                                                width: "100%",
                                                height: "100%"
                                            });
                
                $pageslide.html( iframe );
            } else {
                $pageslide.load( url );
            }
            
            $pageslide.data( 'localEl', false );
            
        }
    }
    
    // Function that controls opening of the pageslide
    function _start( direction, speed ) {
        var slideWidth = $pageslide.outerWidth( true ),
            bodyAnimateIn = {},
            slideAnimateIn = {};
        
        // If the slide is open or opening, just ignore the call
        if( $pageslide.is(':visible') || _sliding ) return;	        
        _sliding = true;
                                                                    
        switch( direction ) {
            case 'left':
                $pageslide.css({ left: 'auto', right: '-' + slideWidth + 'px' });
                bodyAnimateIn['margin-left'] = '-=' + slideWidth;
                slideAnimateIn['right'] = '+=' + slideWidth;
                break;
            default:
                $pageslide.css({ left: '-' + slideWidth + 'px', right: 'auto' });
                bodyAnimateIn['margin-left'] = '+=' + slideWidth;
                slideAnimateIn['left'] = '+=' + slideWidth;
                break;
        }
                    
        // Animate the slide, and attach this slide's settings to the element
        $body.animate(bodyAnimateIn, speed);
        $pageslide.show()
                  .animate(slideAnimateIn, speed, function() {
                      _sliding = false;
                  });
    }
      
    /*
     * Declaration 
     */
    $.fn.pageslide = function(options) {
        var $elements = this;
        
        // On click
        $elements.click( function(e) {
            var $self = $(this),
                settings = $.extend({ href: $self.attr('href') }, options);
            
            // Prevent the default behavior and stop propagation
            e.preventDefault();
            e.stopPropagation();
            
            if ( $pageslide.is(':visible') && $self[0] == _lastCaller ) {
                // If we clicked the same element twice, toggle closed
                $.pageslide.close();
            } else {                 
                // Open
                $.pageslide( settings );

                // Record the last element to trigger pageslide
                _lastCaller = $self[0];
            }       
        });                   
	};
	
	/*
     * Default settings 
     */
    $.fn.pageslide.defaults = {
        speed:      200,        // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
        direction:  'right',    // Accepts 'left' or 'right'
        modal:      false,      // If set to true, you must explicitly close pageslide using $.pageslide.close();
        iframe:     true,       // By default, linked pages are loaded into an iframe. Set this to false if you don't want an iframe.
        href:       null        // Override the source of the content. Optional in most cases, but required when opening pageslide programmatically.
    };
	
	/*
     * Public methods 
     */
	
	// Open the pageslide
	$.pageslide = function( options ) {	    
	    // Extend the settings with those the user has provided
        var settings = $.extend({}, $.fn.pageslide.defaults, options);
	    
	    // Are we trying to open in different direction?
        if( $pageslide.is(':visible') && $pageslide.data( 'direction' ) != settings.direction) {
            $.pageslide.close(function(){
                _load( settings.href, settings.iframe );
                _start( settings.direction, settings.speed );
            });
        } else {                
            _load( settings.href, settings.iframe );
            if( $pageslide.is(':hidden') ) {
                _start( settings.direction, settings.speed );
            }
        }
        
        $pageslide.data( settings );
	}
	
	// Close the pageslide
	$.pageslide.close = function( callback ) {
        var $pageslide = $('#pageslide'),
            slideWidth = $pageslide.outerWidth( true ),
            speed = $pageslide.data( 'speed' ),
            bodyAnimateIn = {},
            slideAnimateIn = {}
            	        
        // If the slide isn't open, just ignore the call
        if( $pageslide.is(':hidden') || _sliding ) return;	        
        _sliding = true;
        
        switch( $pageslide.data( 'direction' ) ) {
            case 'left':
                bodyAnimateIn['margin-left'] = '+=' + slideWidth;
                slideAnimateIn['right'] = '-=' + slideWidth;
                break;
            default:
                bodyAnimateIn['margin-left'] = '-=' + slideWidth;
                slideAnimateIn['left'] = '-=' + slideWidth;
                break;
        }
        
        $pageslide.animate(slideAnimateIn, speed);
        $body.animate(bodyAnimateIn, speed, function() {
            $pageslide.hide();
            _sliding = false;
            if( typeof callback != 'undefined' ) callback();
        });
    }
	
	/* Events */
	
	// Don't let clicks to the pageslide close the window
    $pageslide.click(function(e) {
        e.stopPropagation();
    });

	// Close the pageslide if the document is clicked or the users presses the ESC key, unless the pageslide is modal
	$(document).bind('click keyup', function(e) {
	    // If this is a keyup event, let's see if it's an ESC key
        if( e.type == "keyup" && e.keyCode != 27) return;
	    
	    // Make sure it's visible, and we're not modal	    
	    if( $pageslide.is( ':visible' ) && !$pageslide.data( 'modal' ) ) {	        
	        $.pageslide.close();
	    }
	});
	
})(jQuery);

/*! http://hui.huement.com */

