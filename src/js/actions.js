/************************************************ [S01] Action Functions */
/* shuffle things */
/* example| jQuery.shuffle(colorArray); */
(function($){
  jQuery.fn.shuffle = function() {
    return this.each(function(){
      var items = $(this).children();
      return (items.length)
        ? $(this).html(jQuery.shuffle(items))
        : this;
    });
  }
 
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