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
	setTimeout("jQuery('#facebox').addClass('showbox')", 800);
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
	 setTimeout("jQuery('#facebox').hide()",500);
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