/*! huement user interface - v1.13.2 - 2013-02-02
* https://github.com/johnny13/hui
* Copyright (c) 2013 Derek Scott; Licensed MIT, GPL3 */

/* shuffle things */
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
window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window)
/************************************************ [S02] Notefy */
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
/**
 * Based On jGrowl 1.2.5
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
function notefy(headerMsg, msg, user_icon, sticky, user_position){

 //default options are top-right and not sticky.
 //with hui-icon-notefy as the class.
var icon = "";
 if(user_icon !== false){
  icon = user_icon;
 } else {
  icon = 'notefy';
 }
 if(sticky !== true){
  jQuery.huiNotify(msg, {
  header: headerMsg,
  icon_theme: icon,
  //afterOpen:function() {jQuery('.notefyIcon').addClass(icon);},
  sticky: false
  });
 } else {
  jQuery.huiNotify(msg, {
  header: headerMsg,
  icon_theme: icon,
  //afterOpen:function() {jQuery('.notefyIcon').addClass(icon);},
  sticky: true
  });
 }

}

(function(jQuery) {

 /** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
 jQuery.huiNotify = function( m , o ) {
  // To maintain compatibility with older version that only supported one instance we'll create the base container.
  if ( jQuery('#jGrowl').size() === 0 ) 
   jQuery('<div id="jGrowl"></div>').addClass( (o && o.position) ? o.position : jQuery.huiNotify.defaults.position ).appendTo('body');

  // Create a notification on the container.
  jQuery('#jGrowl').huiNotify(m,o);
 };


 /** Raise jGrowl Notification on a jGrowl Container **/
 jQuery.fn.huiNotify = function( m , o ) {
  if ( jQuery.isFunction(this.each) ) {
   var args = arguments;

   return this.each(function() {
    var self = this;

    /** Create a jGrowl Instance on the Container if it does not exist **/
    if ( jQuery(this).data('jGrowl.instance') === undefined ) {
     jQuery(this).data('jGrowl.instance', jQuery.extend( new jQuery.fn.huiNotify(), { notifications: [], element: null, interval: null } ));
     jQuery(this).data('jGrowl.instance').startup( this );
    }

    /** Optionally call jGrowl instance methods, or just raise a normal notification **/
    if ( jQuery.isFunction(jQuery(this).data('jGrowl.instance')[m]) ) {
     jQuery(this).data('jGrowl.instance')[m].apply( jQuery(this).data('jGrowl.instance') , jQuery.makeArray(args).slice(1) );
    } else {
     jQuery(this).data('jGrowl.instance').create( m , o );
    }
   });
  }
 };

 jQuery.extend( jQuery.fn.huiNotify.prototype , {

  /** Default JGrowl Settings **/
  defaults: {
   pool:    0,
   header:   '',
   group:    '',
   sticky:   true,
   position:   'top-right',
   glue:    'after',
   theme:    'default',
   icon_theme: 'notefy',
   themeState:  'highlight',
   corners:   '3px',
   check:    250,
   life:    3000,
   closeDuration:  'normal',
   openDuration:   'normal',
   easing:   'swing',
   closer:   true,
   closeTemplate: '&times;',
   closerTemplate: '<div>[ close all ]</div>',
   log:    function(e,m,o) {},
   beforeOpen:  function(e,m,o) {},
   afterOpen:   function(e,m,o) {},
   open:    function(e,m,o) {},
   beforeClose:  function(e,m,o) {},
   close:    function(e,m,o) {},
   animateOpen:  {
    opacity:  'show'
   },
   animateClose:  {
    opacity:  'hide'
   }
  },

  notifications: [],

  /** jGrowl Container Node **/
  element:  null,

  /** Interval Function **/
  interval:   null,

  /** Create a Notification **/
  create:  function( message , o ) {
   var o = jQuery.extend({}, this.defaults, o);

   /* To keep backward compatibility with 1.24 and earlier, honor 'speed' if the user has set it */
   if (typeof o.speed !== 'undefined') {
    o.openDuration = o.speed;
    o.closeDuration = o.speed;
   }

   this.notifications.push({ message: message , options: o });

   o.log.apply( this.element , [this.element,message,o] );
  },

  render:   function( notification ) {
   var self = this;
   var message = notification.message;
   var o = notification.options;

   var notification = jQuery(
    '<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
    ((o.group !== undefined && o.group !== '') ? ' ' + o.group : '') + '"><div class="hui-icon-'+ o.icon_theme +'"></div>' +
    '<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
    '<div class="jGrowl-header">' + o.header + '</div>' +
    '<div class="jGrowl-message">' + message + '</div></div>'
   ).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.huiNotify", function() {
    jQuery(this).parent().trigger('jGrowl.close');
   }).parent();


   /** Notification Actions **/
   jQuery(notification).bind("mouseover.huiNotify", function() {
    jQuery('div.jGrowl-notification', self.element).data("jGrowl.pause", true);
   }).bind("mouseout.huiNotify", function() {
    jQuery('div.jGrowl-notification', self.element).data("jGrowl.pause", false);
   }).bind('jGrowl.beforeOpen', function() {
    if ( o.beforeOpen.apply( notification , [notification,message,o,self.element] ) !== false ) {
     jQuery(this).trigger('jGrowl.open');
    }
   }).bind('jGrowl.open', function() {
    if ( o.open.apply( notification , [notification,message,o,self.element] ) !== false ) {
     if ( o.glue === 'after' ) {
      jQuery('div.jGrowl-notification:last', self.element).after(notification);
     } else {
      jQuery('div.jGrowl-notification:first', self.element).before(notification);
     }

     jQuery(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
      // Fixes some anti-aliasing issues with IE filters.
      if (jQuery(document).width() <= 800 && (parseInt(jQuery(this).css('opacity'), 10) === 1 || parseInt(jQuery(this).css('opacity'), 10) === 0))
       //$(this).style.removeAttribute('filter');
      jQuery(this).data("jGrowl").created = new Date();

      jQuery(this).trigger('jGrowl.afterOpen');
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
     jQuery(this).trigger('jGrowl.close');
   }).bind('jGrowl.close', function() {
    // Pause the notification, lest during the course of animation another close event gets called.
    jQuery(this).data('jGrowl.pause', true);
    jQuery(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
     jQuery(this).remove();
     var close = o.close.apply( notification , [notification,message,o,self.element] );

     if ( jQuery.isFunction(close) )
      close.apply( notification , [notification,message,o,self.element] );
    });
   }).trigger('jGrowl.beforeOpen');

   /** Optional Corners Plugin **/
   if ( o.corners !== '' && jQuery.fn.corner !== undefined ) jQuery(notification).corner( o.corners );

   /** Add a Global Closer if more than one notification exists **/
   if ( jQuery('div.jGrowl-notification:parent', self.element).size() > 1 && 
     jQuery('div.jGrowl-closer', self.element).size() === 0 && this.defaults.closer !== false ) {
    jQuery(this.defaults.closerTemplate).addClass('jGrowl-closer ui-state-highlight ui-corner-all').addClass(this.defaults.theme)
     .appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing)
     .bind("click.huiNotify", function() {
      jQuery(this).siblings().trigger("jGrowl.beforeClose");

      if ( jQuery.isFunction( self.defaults.closer ) ) {
       self.defaults.closer.apply( jQuery(this).parent()[0] , [jQuery(this).parent()[0]] );
      }
     });
   }
  },

  /** Update the jGrowl Container, removing old jGrowl notifications **/
  update:  function() {
   jQuery(this.element).find('div.jGrowl-notification:parent').each( function() {
    if ( jQuery(this).data("jGrowl") !== undefined && jQuery(this).data("jGrowl").created !== undefined && 
      (jQuery(this).data("jGrowl").created.getTime() + parseInt(jQuery(this).data("jGrowl").life, 0))  < (new Date()).getTime() && 
      jQuery(this).data("jGrowl").sticky !== true && 
      (jQuery(this).data("jGrowl.pause") === undefined || jQuery(this).data("jGrowl.pause") !== true) ) {

     // Pause the notification, lest during the course of animation another close event gets called.
     jQuery(this).trigger('jGrowl.beforeClose');
    }
   });

   if ( this.notifications.length > 0 && 
     (this.defaults.pool === 0 || jQuery(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool) )
    this.render( this.notifications.shift() );

   if ( jQuery(this.element).find('div.jGrowl-notification:parent').size() < 2 ) {
    jQuery(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
     jQuery(this).remove();
    });
   }
  },

  /** Setup the jGrowl Notification Container **/
  startup: function(e) {
   this.element = jQuery(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
   this.interval = setInterval( function() { 
    jQuery(e).data('jGrowl.instance').update(); 
   }, parseInt(this.defaults.check, 0));

   if (jQuery(document).width() <= 800) {
    jQuery(this.element).addClass('smallscreen');
   }
  },

  /** Shutdown jGrowl, removing it and clearing the interval **/
  shutdown:   function() {
   jQuery(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();
   clearInterval( this.interval );
  },

  close:  function() {
   jQuery(this.element).find('div.jGrowl-notification').each(function(){
    jQuery(this).trigger('jGrowl.beforeClose');
   });
  }
 });

 /** Reference the Defaults Object for compatibility with older versions of jGrowl **/
 jQuery.huiNotify.defaults = jQuery.fn.huiNotify.prototype.defaults;

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
/************************************************ [S04] Facebox */
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
      opacity      : 0.5,
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
        append('<div class="loading"><img src="'+jQuery.facebox.settings.loadingImage+'"/></div>');

				if(getPageHeight() >= 767){
					jQuery('#facebox').show().css({
						top: getPageScroll()[1] + (getPageHeight() / 10),
						left: jQuery(window).width() / 2 - (jQuery('#facebox .popup').outerWidth() / 2)
					});
				} else {
					jQuery('#facebox').show().css({
						top: getPageScroll()[1] + (getPageHeight() / 10)
						//, left: 0
					});
					//console.debug("mobile");
				}

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
      jQuery('#facebox .popup').children().fadeIn('normal');

			if(jQuery(window).width() >= 767){
				jQuery('#facebox').css('left', jQuery(window).width() / 2 - (jQuery('#facebox .popup').outerWidth() / 2));
				jQuery(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
			}else{
				jQuery('#facebox').css('left', 0);
				jQuery(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
				///console.debug("vision");
				jQuery('#facebox').width(jQuery(window).width()-10);
				jQuery('#facebox .popup').width(jQuery(window).width()-5);
			}
			
    },

    close: function() {
      jQuery(document).trigger('close.facebox');
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

  jQuery(document).bind('close.facebox', function() {
    if (jQuery.facebox.jqxhr) {
      jQuery.facebox.jqxhr.abort();
      jQuery.facebox.jqxhr = null;
    }
    jQuery(document).unbind('keydown.facebox');
    jQuery('#facebox').fadeOut(function() {
      jQuery('#facebox .content').removeClass().addClass('content');
      jQuery('#facebox .loading').remove();
      jQuery(document).trigger('afterClose.facebox');
    });
    hideOverlay();
  });

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
/************************************************ [S06] Animations */
/*
 * Kinema - transition and transformation css
 *
 * hui.huement.com/kinema
 * https://github.com/johnny13/kinema
 *
 * forked from
 * http://github.com/rstacruz/jquery.transit
*/

(function($) {
  "use strict";

  jQuery.transit = {
    version: "0.1.3",

    // Map of jQuery.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  // You can access this in jQuery's `jQuery.support.transition`.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set jQuery.support.transition to a string of the actual property name used.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  jQuery.extend(jQuery.support, support);

  var eventNames = {
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Avoid memory leak in IE.
  div = null;

  // ## jQuery.cssEase
  // List of easing aliases that you can use with `jQuery.fn.transition`.
  jQuery.cssEase = {
    '_default': 'ease',
    'in':       'ease-in',
    'out':      'ease-out',
    'in-out':   'ease-in-out',
    'snap':     'cubic-bezier(0,1,.5,1)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  jQuery.cssHooks["transit:transform"] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform');
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // jQuery 1.8 unprefixes for us automatically.
  if(jQuery.fn.jquery < "1.8.0") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    jQuery.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    jQuery.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `jQuery.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null) { this._translateX = unit(x, 'px'); }
        if (y !== null) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `jQuery.css(...)`.
  function getProperties(props) {
    var re = [];

    for(var key in props) {
      if(props.hasOwnProperty(key)) {
        key = jQuery.camelCase(key); // Convert "text-align" => "textAlign"
        key = jQuery.transit.propertyMap[key] || key;
        key = uncamel(key); // Convert back to dasherized
      }
      if (jQuery.inArray(key, re) === -1) { re.push(key); }
    }

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if (jQuery.cssEase[easing]) { easing = jQuery.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    for(var i = 0; i < props.length; i++) {
      var name = props[i];
      transitions.push(name + ' ' + attribs);
    }

    return transitions.join(', ');
  }

  // ## jQuery.fn.transition
  // Works like jQuery.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  jQuery.fn.transition = jQuery.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof properties.easing !== 'undefined') {
      easing = properties.easing;
      delete properties.easing;
    }

    if (typeof properties.duration !== 'undefined') {
      duration = properties.duration;
      delete properties.duration;
    }

    if (typeof properties.complete !== 'undefined') {
      callback = properties.complete;
      delete properties.complete;
    }

    if (typeof properties.queue !== 'undefined') {
      queue = properties.queue;
      delete properties.queue;
    }

    if (typeof properties.delay !== 'undefined') {
      delay = properties.delay;
      delete properties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = jQuery.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = jQuery.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(properties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = jQuery.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(properties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          for(var e = 0; e < self.length; e++) {
            var elem = self[e];
            elem.style[support.transition] = (oldTransitions[elem] || null);
          }
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && (jQuery.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      for(var e = 0; e < self.length; e++) {
        var elem = self[e];
        if (i > 0) {
          elem.style[support.transition] = transitionValue;
        }
        $(elem).css(properties);
      }
    }

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
      var i = 0;

      // Durations that are too slow will get transitions mixed up.
      // (Tested on Mac/FF 7.0.1)
      if ((support.transition === 'MozTransition') && (i < 25)) { i = 25; }

      window.setTimeout(function() { run(next); }, i);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { jQuery.cssNumber[prop] = true; }

    jQuery.transit.propertyMap[prop] = support.transform;

    jQuery.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform') || new Transform();
        return t.get(prop);
      },

      set: function(elem, value) {
        var $elem = $(elem)
        var t = $elem.css('transit:transform') || new Transform();
        t.setFromString(prop, value);
        $elem.css("transit:transform", t)
      }
    };
  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  //     toMS('fast')   //=> '400ms'
  //     toMS(10)       //=> '10ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow for string durations like 'fast'.
    if (jQuery.fx.speeds[i]) { i = jQuery.fx.speeds[i]; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  jQuery.transit.getTransitionValue = getTransition;
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

/************************************************ [SMQ] 
* 
* mediaQuery.js - modernish media queries (NO UA SNIFFING!)
*
* Based On: 
* Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  
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

/************************************************ [S07] Accordion Menus */
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
 *
*/
(function(jQuery) {
 jQuery.fn.flapperGirl = function(options, callbackGirl) {
   //var atarget = this.selector;
   var title_bar = options["title"];
   var flapper = options["loader"];
   var speakStage = options["stage"];
   
     jQuery(title_bar+" "+"li.basic:first").first().addClass("active");
     
     //<li id='category_example' class="title_bar"
     jQuery(title_bar).click(function(){
       var theid=jQuery(this).attr("id");
       jQuery(this).toggleClass("docked");
       jQuery("."+theid).slideToggle();
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
/************************************************ [S08] Navigation */
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

            // If set to responsive, re-construct after every browser resize
            if ( o.responsive === true ) {
                // Only need to do this for IE7 and below
                // or if we set tableDisplay to false
                if ( (o.tableDisplay !== true) || (!$.support.leadingWhitespace) ) {
                    resizeTrigger( _construct, o.responsiveDelay );
                }
        /* minify down to select box on small screens */
        
              if ( typeof options["prependTo"] !== "undefined" && options["prependTo"]) {
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
  var pull   = jQuery(options["pull"]);
  var menu   = jQuery(this.selector);
  var menuHeight = menu.height();

  jQuery(pull).on('click', function(e) {
   e.preventDefault();
   menu.slideToggle();
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