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