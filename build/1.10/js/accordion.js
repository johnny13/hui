/************************************************ [S07] Accordion Menus */
/* ------------------ accordionNav MENU PLUGIN ----------- 
 * created exclusively for hui
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com
 *
 * inspired from: designmodo.com/jquery-accordion-menu/
 *
*/
(function($) {
	
	$.fn.accordionNav = function(options) {
		var atarget = this.selector;
		var atargethref = atarget + ' > li > a';
		var atargetsub = atarget + ' li > .sub-menu';
		
		var accordion_head = $(atargethref),
		accordion_body = $(atargetsub);

		// Open the first tab on load
		accordion_head.first().addClass('active').next().slideDown('normal');

		// Click function
		accordion_head.on('click', function(event) {
			// Disable header links

			event.preventDefault();

			// Show and hide the tabs on click

			if ($(this).attr('class') != 'active'){
			  accordion_body.slideUp('normal');
			  $(this).next().stop(true,true).slideToggle('normal');
			  accordion_head.removeClass('active');
			  $(this).addClass('active');
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
(function($) {
	$.fn.flapperGirl = function(options, callbackGirl) {
			//var atarget = this.selector;
			var title_bar = options["title"];
			var flapper = options["loader"];
			var speakStage = options["stage"];
			
					$(title_bar+" "+"li.basic:first").first().addClass("active");
					
					//<li id='category_example' class="title_bar"
					$(title_bar).click(function(){
							var theid=$(this).attr("id");
							$(this).toggleClass("docked");
							$("."+theid).slideToggle();
					});
					
					//<li class="basic category_example"><a href="#" class="pageloader">Download</a></li>
					//$(".sideBar ul li").removeClass("active");
					$(flapper).click(function(){
							$(speakStage+" ul li").removeClass("active");
							$(this).parent().addClass("active");

							if (typeof callbackGirl == 'function') { // make sure the callback is a function
					       callbackGirl();
							}
							return false;
						});
			return true;
		};
})(jQuery);
		
/********* [BETA] HW Accelerated Accordion *********/
/* ------------------ accordionNav MENU PLUGIN ----------- 
 * created exclusively for hui
 * UNDER HEAVY DEVELOPMENT
 *
 * By Derek Scott - Copyright 2012 - All rights reserved
 * Author URL: http://huement.com
 *
 * inspired from: designmodo.com/jquery-accordion-menu/
 *
*/
var TINY={};

function T$(i){return document.getElementById(i)}
function T$$(e,p){return p.getElementsByTagName(e)}

TINY.accordion=function(){
	function slider(n){this.n=n; this.a=[]}
	slider.prototype.init=function(t,e,m,o,k){
		var a=T$(t), i=s=0, n=a.childNodes, l=n.length; this.s=k||0; this.m=m||0;
		for(i;i<l;i++){
			var v=n[i];
			if(v.nodeType!=3){
				this.a[s]={}; this.a[s].h=h=T$$(e,v)[0]; this.a[s].c=c=T$$('div',v)[0]; h.onclick=new Function(this.n+'.pr(0,'+s+')');
				if(o==s){h.className=this.s; c.style.height='auto'; c.d=1}else{c.style.height=0; c.d=-1} s++
			}
		}
		this.l=s
	};
	slider.prototype.pr=function(f,d){
		for(var i=0;i<this.l;i++){
			var h=this.a[i].h, c=this.a[i].c, k=c.style.height; k=k=='auto'?1:parseInt(k); clearInterval(c.t);
			if((k!=1&&c.d==-1)&&(f==1||i==d)){
				c.style.height=''; c.m=c.offsetHeight; c.style.height=k+'px'; c.d=1; h.className=this.s; su(c,1)
			}else if(k>0&&(f==-1||this.m||i==d)){
				c.d=-1; h.className=''; su(c,-1)
			}
		}
	};
	function su(c){c.t=setInterval(function(){sl(c)},20)};
	function sl(c){
		var h=c.offsetHeight, d=c.d==1?c.m-h:h; c.style.height=h+(Math.ceil(d/5)*c.d)+'px';
		c.style.opacity=h/c.m; c.style.filter='alpha(opacity='+h*100/c.m+')';
		if((c.d==1&&h>=c.m)||(c.d!=1&&h==1)){if(c.d==1){c.style.height='auto'} clearInterval(c.t)}
	};
	return{slider:slider}
}();