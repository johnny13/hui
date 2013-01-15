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

                if ( (o.tableDisplay !== true) || (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) <= 7) ) {

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
                    if (jQuery.browser.mozilla || jQuery.browser.msie) {
                        li_last_width = li_last_width - 1;
                    }
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
                if ( (o.tableDisplay !== true) || (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) <= 7) ) {
                    resizeTrigger( _construct, o.responsiveDelay );
                }
        /* minify down to select box on small screens */
        if ( typeof options !== "undefined" && options) {
         if ( typeof options["prependTo"] !== "undefined" && options["prependTo"]) {
         var prepre = options["prependTo"];
         jQuery(ul).mobileMenu({
          prependTo: prepre
         });
         } else {
          jQuery(ul).mobileMenu();
         }
        } else {
         jQuery(ul).mobileMenu();
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