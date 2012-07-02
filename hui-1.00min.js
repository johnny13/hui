(function(a){a.fn.shuffle=function(){return this.each(function(){var b=a(this).children();return(b.length)?a(this).html(a.shuffle(b)):this})};a.shuffle=function(c){for(var d,b,e=c.length;e;d=parseInt(Math.random()*e),b=c[--e],c[e]=c[d],c[d]=b){}return c}})(jQuery);function suitUp(a){$("link[rel=stylesheet]").attr({href:a})}function notefy(b,e,f,d,c){if(f!=false){var a=f}else{var a="notefy"}if(d!="stick"){$.jGrowl(e,{header:b,icon_theme:a,sticky:false})}else{$.jGrowl(e,{header:b,icon_theme:a,sticky:true})}}(function(j){function a(){var d=j("script:first"),f=d.css("color"),h=false;if(/^rgba/.test(f)){h=true}else{try{h=f!=d.css("color","rgba(0, 0, 0, 0.5)").css("color");d.css("color",f)}catch(g){}}return h}function c(d,f,h){var g="rgb"+(j.support.rgba?"a":"")+"("+parseInt(d[0]+h*(f[0]-d[0]),10)+","+parseInt(d[1]+h*(f[1]-d[1]),10)+","+parseInt(d[2]+h*(f[2]-d[2]),10);if(j.support.rgba){g+=","+(d&&f?parseFloat(d[3]+h*(f[3]-d[3])):1)}g+=")";return g}function e(d){var f,g;if(f=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(d)){g=[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16),1]}else{if(f=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(d)){g=[parseInt(f[1],16)*17,parseInt(f[2],16)*17,parseInt(f[3],16)*17,1]}else{if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(d)){g=[parseInt(f[1]),parseInt(f[2]),parseInt(f[3]),1]}else{if(f=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(d)){g=[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10),parseFloat(f[4])]}}}}return g}j.extend(true,j,{support:{rgba:a()}});var b=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];j.each(b,function(d,f){j.fx.step[f]=function(g){if(!g.init){g.a=e(j(g.elem).css(f));g.end=e(g.end);g.init=true}g.elem.style[f]=c(g.a,g.end,g.pos)}});j.fx.step.borderColor=function(d){if(!d.init){d.end=e(d.end)}var f=b.slice(2,6);j.each(f,function(h,g){d.init||(d[g]={a:e(j(d.elem).css(g))});d.elem.style[g]=c(d[g].a,d.end,d.pos)});d.init=true}})(jQuery);(function(a){a.jGrowl=function(b,c){if(a("#jGrowl").size()==0){a('<div id="jGrowl"></div>').addClass((c&&c.position)?c.position:a.jGrowl.defaults.position).appendTo("body")}a("#jGrowl").jGrowl(b,c)};a.fn.jGrowl=function(b,d){if(a.isFunction(this.each)){var c=arguments;return this.each(function(){var e=this;if(a(this).data("jGrowl.instance")==undefined){a(this).data("jGrowl.instance",a.extend(new a.fn.jGrowl(),{notifications:[],element:null,interval:null}));a(this).data("jGrowl.instance").startup(this)}if(a.isFunction(a(this).data("jGrowl.instance")[b])){a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"),a.makeArray(c).slice(1))}else{a(this).data("jGrowl.instance").create(b,d)}})}};a.extend(a.fn.jGrowl.prototype,{defaults:{pool:0,header:"",group:"",sticky:false,position:"top-left",glue:"after",theme:"default",icon_theme:"notefy",themeState:"highlight",corners:"3px",check:250,life:3000,closeDuration:"normal",openDuration:"normal",easing:"swing",closer:true,closeTemplate:"&times;",closerTemplate:"<div>[ close all ]</div>",log:function(c,b,d){},beforeOpen:function(c,b,d){},afterOpen:function(c,b,d){},open:function(c,b,d){},beforeClose:function(c,b,d){},close:function(c,b,d){},animateOpen:{opacity:"show"},animateClose:{opacity:"hide"}},notifications:[],element:null,interval:null,create:function(b,c){var c=a.extend({},this.defaults,c);if(typeof c.speed!=="undefined"){c.openDuration=c.speed;c.closeDuration=c.speed}this.notifications.push({message:b,options:c});c.log.apply(this.element,[this.element,b,c])},render:function(d){var b=this;var c=d.message;var e=d.options;var d=a('<div class="jGrowl-notification '+e.themeState+" ui-corner-all"+((e.group!=undefined&&e.group!="")?" "+e.group:"")+'"><div class="hui-icon-'+e.icon_theme+'"></div><div class="jGrowl-close">'+e.closeTemplate+'</div><div class="jGrowl-header">'+e.header+'</div><div class="jGrowl-message">'+c+"</div></div>").data("jGrowl",e).addClass(e.theme).children("div.jGrowl-close").bind("click.jGrowl",function(){a(this).parent().trigger("jGrowl.close")}).parent();a(d).bind("mouseover.jGrowl",function(){a("div.jGrowl-notification",b.element).data("jGrowl.pause",true)}).bind("mouseout.jGrowl",function(){a("div.jGrowl-notification",b.element).data("jGrowl.pause",false)}).bind("jGrowl.beforeOpen",function(){if(e.beforeOpen.apply(d,[d,c,e,b.element])!=false){a(this).trigger("jGrowl.open")}}).bind("jGrowl.open",function(){if(e.open.apply(d,[d,c,e,b.element])!=false){if(e.glue=="after"){a("div.jGrowl-notification:last",b.element).after(d)}else{a("div.jGrowl-notification:first",b.element).before(d)}a(this).animate(e.animateOpen,e.openDuration,e.easing,function(){if(a.browser.msie&&(parseInt(a(this).css("opacity"),10)===1||parseInt(a(this).css("opacity"),10)===0)){this.style.removeAttribute("filter")}a(this).data("jGrowl").created=new Date();a(this).trigger("jGrowl.afterOpen")})}}).bind("jGrowl.afterOpen",function(){e.afterOpen.apply(d,[d,c,e,b.element])}).bind("jGrowl.beforeClose",function(){if(e.beforeClose.apply(d,[d,c,e,b.element])!=false){a(this).trigger("jGrowl.close")}}).bind("jGrowl.close",function(){a(this).data("jGrowl.pause",true);a(this).animate(e.animateClose,e.closeDuration,e.easing,function(){a(this).remove();var f=e.close.apply(d,[d,c,e,b.element]);if(a.isFunction(f)){f.apply(d,[d,c,e,b.element])}})}).trigger("jGrowl.beforeOpen");if(e.corners!=""&&a.fn.corner!=undefined){a(d).corner(e.corners)}if(a("div.jGrowl-notification:parent",b.element).size()>1&&a("div.jGrowl-closer",b.element).size()==0&&this.defaults.closer!=false){a(this.defaults.closerTemplate).addClass("jGrowl-closer ui-state-highlight ui-corner-all").addClass(this.defaults.theme).appendTo(b.element).animate(this.defaults.animateOpen,this.defaults.speed,this.defaults.easing).bind("click.jGrowl",function(){a(this).siblings().trigger("jGrowl.beforeClose");if(a.isFunction(b.defaults.closer)){b.defaults.closer.apply(a(this).parent()[0],[a(this).parent()[0]])}})}},update:function(){a(this.element).find("div.jGrowl-notification:parent").each(function(){if(a(this).data("jGrowl")!=undefined&&a(this).data("jGrowl").created!=undefined&&(a(this).data("jGrowl").created.getTime()+parseInt(a(this).data("jGrowl").life))<(new Date()).getTime()&&a(this).data("jGrowl").sticky!=true&&(a(this).data("jGrowl.pause")==undefined||a(this).data("jGrowl.pause")!=true)){a(this).trigger("jGrowl.beforeClose")}});if(this.notifications.length>0&&(this.defaults.pool==0||a(this.element).find("div.jGrowl-notification:parent").size()<this.defaults.pool)){this.render(this.notifications.shift())}if(a(this.element).find("div.jGrowl-notification:parent").size()<2){a(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose,this.defaults.speed,this.defaults.easing,function(){a(this).remove()})}},startup:function(b){this.element=a(b).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');this.interval=setInterval(function(){a(b).data("jGrowl.instance").update()},parseInt(this.defaults.check));if(a.browser.msie&&parseInt(a.browser.version)<7&&!window.XMLHttpRequest){a(this.element).addClass("ie6")}},shutdown:function(){a(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();clearInterval(this.interval)},close:function(){a(this.element).find("div.jGrowl-notification").each(function(){a(this).trigger("jGrowl.beforeClose")})}});a.jGrowl.defaults=a.fn.jGrowl.prototype.defaults})(jQuery);jQuery.fn.addOption=function(){if(arguments.length==0){return this}var b=true;var a=false;if(typeof arguments[0]=="object"){a=true;var c=arguments[0]}if(arguments.length>=2){if(typeof arguments[1]=="boolean"){b=arguments[1]}else{if(typeof arguments[2]=="boolean"){b=arguments[2]}}if(!a){var d=arguments[0];var e=arguments[1]}}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return}if(a){for(var f in c){jQuery(this).addOption(f,c[f],b)}}else{var g=document.createElement("option");g.value=d;g.text=e;this.options.add(g)}if(b){this.options[this.options.length-1].selected=true}});return this};jQuery.fn.removeOption=function(){if(arguments.length==0){return this}if(typeof arguments[0]=="string"){var b=arguments[0]}else{if(typeof arguments[0]=="number"){var a=arguments[0]}else{return this}}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return}if(b){var c=this.options.length;for(var d=c-1;d>=0;d--){if(this.options[d].value==b){this.options[d]=null}}}else{this.remove(a)}});return this};jQuery.fn.sortOptions=function(a){this.each(function(){if(this.nodeName.toLowerCase()!="select"){return}a=typeof a=="undefined"?true:a;var b=this.options.length;var d=[];for(var c=0;c<b;c++){d[c]={value:this.options[c].value,text:this.options[c].text}}d.sort(function(f,e){option1text=f.text.toLowerCase();option2text=e.text.toLowerCase();if(option1text==option2text){return 0}if(a){return option1text<option2text?-1:1}else{return option1text>option2text?-1:1}});for(var c=0;c<b;c++){this.options[c].text=d[c].text;this.options[c].value=d[c].value}});return this};jQuery.fn.selectOptions=function(a){this.each(function(){if(this.nodeName.toLowerCase()!="select"){return}var b=this.options.length;for(var c=0;c<b;c++){if(this.options[c].value==a){this.options[c].selected=true}}});return this};(function(){var a;var b=Array.prototype.slice;a=(function(){function c(g,d){var e,f,h;this.elem=$(g);f=$.extend({},c.defaults,d);for(e in f){h=f[e];this[e]=h}this.elem.data(this.dataName,this);this.wrapCheckboxWithDivs();this.attachEvents();this.disableTextSelection();if(this.resizeHandle){this.optionallyResize("handle")}if(this.resizeContainer){this.optionallyResize("container")}this.initialPosition()}c.prototype.isDisabled=function(){return this.elem.is(":disabled")};c.prototype.wrapCheckboxWithDivs=function(){this.elem.wrap("<div class='"+this.containerClass+"' />");this.container=this.elem.parent();this.offLabel=$("<label class='"+this.labelOffClass+"'>\n  <span>"+this.uncheckedLabel+"</span>\n</label>").appendTo(this.container);this.offSpan=this.offLabel.children("span");this.onLabel=$("<label class='"+this.labelOnClass+"'>\n  <span>"+this.checkedLabel+"</span>\n</label>").appendTo(this.container);this.onSpan=this.onLabel.children("span");return this.handle=$("<div class='"+this.handleClass+"'>\n  <div class='"+this.handleRightClass+"'>\n    <div class='"+this.handleCenterClass+"' />\n  </div>\n</div>").appendTo(this.container)};c.prototype.disableTextSelection=function(){if($.browser.msie){return $([this.handle,this.offLabel,this.onLabel,this.container]).attr("unselectable","on")}};c.prototype._getDimension=function(d,e){if($.fn.actual!=null){return d.actual(e)}else{return d[e]()}};c.prototype.optionallyResize=function(g){var f,e,d;d=this._getDimension(this.onLabel,"width");e=this._getDimension(this.offLabel,"width");if(g==="container"){f=d>e?d:e;f+=this._getDimension(this.handle,"width")+this.handleMargin;return this.container.css({width:f})}else{f=d>e?d:e;return this.handle.css({width:f})}};c.prototype.onMouseDown=function(e){var d;e.preventDefault();if(this.isDisabled()){return}d=e.pageX||e.originalEvent.changedTouches[0].pageX;c.currentlyClicking=this.handle;c.dragStartPosition=d;return c.handleLeftOffset=parseInt(this.handle.css("left"),10)||0};c.prototype.onDragMove=function(f,d){var e,g;if(c.currentlyClicking!==this.handle){return}g=(d+c.handleLeftOffset-c.dragStartPosition)/this.rightSide;if(g<0){g=0}if(g>1){g=1}e=g*this.rightSide;this.handle.css({left:e});this.onLabel.css({width:e+this.handleRadius});this.offSpan.css({marginRight:-e});return this.onSpan.css({marginLeft:-(1-g)*this.rightSide})};c.prototype.onDragEnd=function(e,d){var f;if(c.currentlyClicking!==this.handle){return}if(this.isDisabled()){return}if(c.dragging){f=(d-c.dragStartPosition)/this.rightSide;this.elem.prop("checked",f>=0.5)}else{this.elem.prop("checked",!this.elem.prop("checked"))}c.currentlyClicking=null;c.dragging=null;return this.didChange()};c.prototype.refresh=function(){return this.didChange()};c.prototype.didChange=function(){var d;if(typeof this.onChange==="function"){this.onChange(this.elem,this.elem.prop("checked"))}if(this.isDisabled()){this.container.addClass(this.disabledClass);return false}else{this.container.removeClass(this.disabledClass)}d=this.elem.prop("checked")?this.rightSide:0;this.handle.animate({left:d},this.duration);this.onLabel.animate({width:d+this.handleRadius},this.duration);this.offSpan.animate({marginRight:-d},this.duration);return this.onSpan.animate({marginLeft:d-this.rightSide},this.duration)};c.prototype.attachEvents=function(){var f,e,d;d=this;f=function(g){return d.onGlobalMove.apply(d,arguments)};e=function(g){d.onGlobalUp.apply(d,arguments);$(document).unbind("mousemove touchmove",f);return $(document).unbind("mouseup touchend",e)};this.elem.change(function(){return d.refresh()});return this.container.bind("mousedown touchstart",function(g){d.onMouseDown.apply(d,arguments);$(document).bind("mousemove touchmove",f);return $(document).bind("mouseup touchend",e)})};c.prototype.initialPosition=function(){var d,e;d=this._getDimension(this.container,"width");this.offLabel.css({width:d-this.containerRadius});e=this.containerRadius+1;if($.browser.msie&&$.browser.version<7){e-=3}this.rightSide=d-this._getDimension(this.handle,"width")-e;if(this.elem.is(":checked")){this.handle.css({left:this.rightSide});this.onLabel.css({width:this.rightSide+this.handleRadius});this.offSpan.css({marginRight:-this.rightSide})}else{this.onLabel.css({width:0});this.onSpan.css({marginLeft:-this.rightSide})}if(this.isDisabled()){return this.container.addClass(this.disabledClass)}};c.prototype.onGlobalMove=function(e){var d;if(!(!this.isDisabled()&&c.currentlyClicking)){return}e.preventDefault();d=e.pageX||e.originalEvent.changedTouches[0].pageX;if(!c.dragging&&(Math.abs(c.dragStartPosition-d)>this.dragThreshold)){c.dragging=true}return this.onDragMove(e,d)};c.prototype.onGlobalUp=function(e){var d;if(!c.currentlyClicking){return}e.preventDefault();d=e.pageX||e.originalEvent.changedTouches[0].pageX;this.onDragEnd(e,d);return false};c.defaults={duration:200,checkedLabel:"ON",uncheckedLabel:"OFF",resizeHandle:true,resizeContainer:true,disabledClass:"iPhoneCheckDisabled",containerClass:"iPhoneCheckContainer",labelOnClass:"iPhoneCheckLabelOn",labelOffClass:"iPhoneCheckLabelOff",handleClass:"iPhoneCheckHandle",handleCenterClass:"iPhoneCheckHandleCenter",handleRightClass:"iPhoneCheckHandleRight",dragThreshold:5,handleMargin:15,handleRadius:4,containerRadius:5,dataName:"iphoneStyle",onChange:function(){}};return c})();$.iphoneStyle=this.iOSCheckbox=a;$.fn.iphoneStyle=function(){var l,k,d,m,c,h,i,n,j,g,f,e;l=1<=arguments.length?b.call(arguments,0):[];d=(j=(g=l[0])!=null?g.dataName:void 0)!=null?j:a.defaults.dataName;f=this.filter(":checkbox");for(i=0,n=f.length;i<n;i++){k=f[i];m=$(k).data(d);if(m!=null){c=l[0],h=2<=l.length?b.call(l,1):[];if((e=m[c])!=null){e.apply(m,h)}}else{new a(k,l[0])}}return this};$.fn.iOSCheckbox=function(c){var d;if(c==null){c={}}d=$.extend({},c,{resizeHandle:false,disabledClass:"iOSCheckDisabled",containerClass:"iOSCheckContainer",labelOnClass:"iOSCheckLabelOn",labelOffClass:"iOSCheckLabelOff",handleClass:"iOSCheckHandle",handleCenterClass:"iOSCheckHandleCenter",handleRightClass:"iOSCheckHandleRight",dataName:"iOSCheckbox"});return this.iphoneStyle(d)}}).call(this);(function(f){f.facebox=function(m,l){f.facebox.loading(m.settings||[]);if(m.ajax){g(m.ajax,l)}else{if(m.image){c(m.image,l)}else{if(m.div){j(m.div,l)}else{if(f.isFunction(m)){m.call(f)}else{f.facebox.reveal(m,l)}}}}};f.extend(f.facebox,{settings:{opacity:0.2,overlay:true,loadingImage:"http://cloud.ndrigs.com/img/loading.gif",closeImage:"http://cloud.ndrigs.com/img/closelabel.png",imageTypes:["png","jpg","jpeg","gif"],faceboxHtml:'    <div id="facebox" style="display:none;">       <div class="popup">         <div class="content">         </div>         <a href="#" class="close"></a>       </div>     </div>'},loading:function(){k();if(f("#facebox .loading").length==1){return true}e();f("#facebox .content").empty().append('<div class="loading"><img src="'+f.facebox.settings.loadingImage+'"/></div>');f("#facebox").show().css({top:h()[1]+(i()/10),left:f(window).width()/2-(f("#facebox .popup").outerWidth()/2)});f(document).bind("keydown.facebox",function(l){if(l.keyCode==27){f.facebox.close()}return true});f(document).trigger("loading.facebox")},reveal:function(m,l){f(document).trigger("beforeReveal.facebox");if(l){f("#facebox .content").addClass(l)}f("#facebox .content").empty().append(m);f("#facebox .popup").children().fadeIn("normal");f("#facebox").css("left",f(window).width()/2-(f("#facebox .popup").outerWidth()/2));f(document).trigger("reveal.facebox").trigger("afterReveal.facebox")},close:function(){f(document).trigger("close.facebox");return false}});f.fn.facebox=function(l){if(f(this).length==0){return}k(l);function m(){f.facebox.loading(true);var n=this.rel.match(/facebox\[?\.(\w+)\]?/);if(n){n=n[1]}j(this.href,n);return false}return this.bind("click.facebox",m)};function k(n){if(f.facebox.settings.inited){return true}else{f.facebox.settings.inited=true}f(document).trigger("init.facebox");d();var l=f.facebox.settings.imageTypes.join("|");f.facebox.settings.imageTypesRegexp=new RegExp("\\.("+l+")(\\?.*)?$","i");if(n){f.extend(f.facebox.settings,n)}f("body").append(f.facebox.settings.faceboxHtml);var m=[new Image(),new Image()];m[0].src=f.facebox.settings.closeImage;m[1].src=f.facebox.settings.loadingImage;f("#facebox").find(".b:first, .bl").each(function(){m.push(new Image());m.slice(-1).src=f(this).css("background-image").replace(/url\((.+)\)/,"$1")});f("#facebox .close").click(f.facebox.close).append('<img src="'+f.facebox.settings.closeImage+'" class="close_image" title="close">')}function h(){var m,l;if(self.pageYOffset){l=self.pageYOffset;m=self.pageXOffset}else{if(document.documentElement&&document.documentElement.scrollTop){l=document.documentElement.scrollTop;m=document.documentElement.scrollLeft}else{if(document.body){l=document.body.scrollTop;m=document.body.scrollLeft}}}return new Array(m,l)}function i(){var l;if(self.innerHeight){l=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){l=document.documentElement.clientHeight}else{if(document.body){l=document.body.clientHeight}}}return l}function d(){var l=f.facebox.settings;l.loadingImage=l.loading_image||l.loadingImage;l.closeImage=l.close_image||l.closeImage;l.imageTypes=l.image_types||l.imageTypes;l.faceboxHtml=l.facebox_html||l.faceboxHtml}function j(m,l){if(m.match(/#/)){var n=window.location.href.split("#")[0];var o=m.replace(n,"");if(o=="#"){return}f.facebox.reveal(f(o).html(),l)}else{if(m.match(f.facebox.settings.imageTypesRegexp)){c(m,l)}else{g(m,l)}}}function c(m,l){var n=new Image();n.onload=function(){f.facebox.reveal('<div class="image"><img src="'+n.src+'" /></div>',l)};n.src=m}function g(m,l){f.facebox.jqxhr=f.get(m,function(n){f.facebox.reveal(n,l)})}function b(){return f.facebox.settings.overlay==false||f.facebox.settings.opacity===null}function e(){if(b()){return}if(f("#facebox_overlay").length==0){f("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')}f("#facebox_overlay").hide().addClass("facebox_overlayBG").css("opacity",f.facebox.settings.opacity).click(function(){f(document).trigger("close.facebox")}).fadeIn(200);return false}function a(){if(b()){return}f("#facebox_overlay").fadeOut(200,function(){f("#facebox_overlay").removeClass("facebox_overlayBG");f("#facebox_overlay").addClass("facebox_hide");f("#facebox_overlay").remove()});return false}f(document).bind("close.facebox",function(){if(f.facebox.jqxhr){f.facebox.jqxhr.abort();f.facebox.jqxhr=null}f(document).unbind("keydown.facebox");f("#facebox").fadeOut(function(){f("#facebox .content").removeClass().addClass("content");f("#facebox .loading").remove();f(document).trigger("afterClose.facebox")});a()})})(jQuery);(function(a){a.fn.tipTip=function(c){var g={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var e=a.extend(g,c);if(a("#tiptip_holder").length<=0){var b=a('<div id="tiptip_holder" style="max-width:'+e.maxWidth+';"></div>');var d=a('<div id="tiptip_content"></div>');var f=a('<div id="tiptip_arrow"></div>');a("body").append(b.html(d).prepend(f.html('<div id="tiptip_arrow_inner"></div>')))}else{var b=a("#tiptip_holder");var d=a("#tiptip_content");var f=a("#tiptip_arrow")}return this.each(function(){var i=a(this);if(e.content){var l=e.content}else{var l=i.attr(e.attribute)}if(l!=""){if(!e.content){i.removeAttr(e.attribute)}var h=false;if(e.activation=="hover"){i.hover(function(){k()},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}else{if(e.activation=="focus"){i.focus(function(){k()}).blur(function(){j()})}else{if(e.activation=="click"){i.click(function(){k();return false}).hover(function(){},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}}}function k(){e.enter.call(this);d.html(l);b.hide().removeAttr("class").css("margin","0");f.removeAttr("style");var y=parseInt(i.offset()["top"]);var p=parseInt(i.offset()["left"]);var v=parseInt(i.outerWidth());var A=parseInt(i.outerHeight());var x=b.outerWidth();var s=b.outerHeight();var w=Math.round((v-x)/2);var o=Math.round((A-s)/2);var n=Math.round(p+w);var m=Math.round(y+A+e.edgeOffset);var t="";var C="";var u=Math.round(x-12)/2;if(e.defaultPosition=="bottom"){t="_bottom"}else{if(e.defaultPosition=="top"){t="_top"}else{if(e.defaultPosition=="left"){t="_left"}else{if(e.defaultPosition=="right"){t="_right"}}}}var r=(w+p)<parseInt(a(window).scrollLeft());var q=(x+p)>parseInt(a(window).width());if((r&&w<0)||(t=="_right"&&!q)||(t=="_left"&&p<(x+e.edgeOffset+5))){t="_right";C=Math.round(s-13)/2;u=-12;n=Math.round(p+v+e.edgeOffset);m=Math.round(y+o)}else{if((q&&w<0)||(t=="_left"&&!r)){t="_left";C=Math.round(s-13)/2;u=Math.round(x);n=Math.round(p-(x+e.edgeOffset+5));m=Math.round(y+o)}}var z=(y+A+e.edgeOffset+s+8)>parseInt(a(window).height()+a(window).scrollTop());var B=((y+A)-(e.edgeOffset+s+8))<0;if(z||(t=="_bottom"&&z)||(t=="_top"&&!B)){if(t=="_top"||t=="_bottom"){t="_top"}else{t=t+"_top"}C=s;m=Math.round(y-(s+5+e.edgeOffset))}else{if(B|(t=="_top"&&B)||(t=="_bottom"&&!z)){if(t=="_top"||t=="_bottom"){t="_bottom"}else{t=t+"_bottom"}C=-12;m=Math.round(y+A+e.edgeOffset)}}if(t=="_right_top"||t=="_left_top"){m=m+5}else{if(t=="_right_bottom"||t=="_left_bottom"){m=m-5}}if(t=="_left_top"||t=="_left_bottom"){n=n+5}f.css({"margin-left":u+"px","margin-top":C+"px"});b.css({"margin-left":n+"px","margin-top":m+"px"}).attr("class","tip"+t);if(h){clearTimeout(h)}h=setTimeout(function(){b.stop(true,true).fadeIn(e.fadeIn)},e.delay)}function j(){e.exit.call(this);if(h){clearTimeout(h)}b.fadeOut(e.fadeOut)}}})}})(jQuery);jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});(function(w,C){function v(){var e=D.elements;return"string"==typeof e?e.split(" "):e}function z(f){var e=u[f[d]];e||(e={},A++,f[d]=A,u[A]=e);return e}function c(f,e,g){e||(e=C);if(B){return e.createElement(f)}g||(g=z(e));e=g.cache[f]?g.cache[f].cloneNode():a.test(f)?(g.cache[f]=g.createElem(f)).cloneNode():g.createElem(f);return e.canHaveChildren&&!F.test(f)?g.frag.appendChild(e):e}function E(f,e){if(!e.cache){e.cache={},e.createElem=f.createElement,e.createFrag=f.createDocumentFragment,e.frag=e.createFrag()}f.createElement=function(g){return !D.shivMethods?e.createElem(g):c(g,f,e)};f.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+v().join().replace(/\w+/g,function(g){e.createElem(g);e.frag.createElement(g);return'c("'+g+'")'})+");return n}")(D,e.frag)}function b(f){f||(f=C);var e=z(f);if(D.shivCSS&&!y&&!e.hasCSS){var h,g=f;h=g.createElement("p");g=g.getElementsByTagName("head")[0]||g.documentElement;h.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";h=g.insertBefore(h.lastChild,g.firstChild);e.hasCSS=!!h}B||E(f,e);return f}var x=w.html5||{},F=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,a=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,y,d="_html5shiv",A=0,u={},B;(function(){try{var f=C.createElement("a");f.innerHTML="<xyz></xyz>";y="hidden" in f;var e;if(!(e=1==f.childNodes.length)){C.createElement("a");var h=C.createDocumentFragment();e="undefined"==typeof h.cloneNode||"undefined"==typeof h.createDocumentFragment||"undefined"==typeof h.createElement}B=e}catch(g){B=y=!0}})();var D={elements:x.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==x.shivCSS,supportsUnknownElements:B,shivMethods:!1!==x.shivMethods,type:"default",shivDocument:b,createElement:c,createDocumentFragment:function(g,f){g||(g=C);if(B){return g.createDocumentFragment()}for(var f=f||z(g),l=f.frag.cloneNode(),k=0,j=v(),i=j.length;k<i;k++){l.createElement(j[k])}return l}};w.html5=D;b(C)})(this,document);