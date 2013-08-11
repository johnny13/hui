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