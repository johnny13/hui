(function($) {

    $.TarotShuffle = function(element, options) {
        var defaults = {
            period: 2000,
            duration: 1000,
            direction: 'up',
			easing: 'easeInOutCubic'
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        var blocks,
            currentBlockIndex,
            slideInPosition, 
            slideOutPosition,
            tileWidth, 
            tileHeight;

        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);
			
            
            blocks = $element.children(".tarotCard-content");

            if (blocks.length <= 1) {
                return;
            }

            currentBlockIndex = 0;

            tileWidth = $element.innerWidth();
            tileHeight = $element.innerHeight();
            slideInPosition = getSlideInPosition();
            slideOutPosition = getSlideOutPosition();

            blocks.each(function (index, block) {
                block = $(block);
                
                if (block.css('position') !== 'absolute') {
                    block.css('position', 'absolute');
                }
               
                if (index !== 0) {
                    block.css('left', tileWidth);
                }
            });

           
            setInterval(function () {
                slideBlock();
            }, plugin.settings.period);
        };

        
        var slideBlock = function() {

            var slideOutBlock, 
                slideInBlock, 
                mainPosition = {'left': 0, 'top': 0},
                options;

            slideOutBlock = $(blocks[currentBlockIndex]);

            currentBlockIndex++;
            if (currentBlockIndex >= blocks.length) {
                currentBlockIndex = 0;
            }
            slideInBlock = $(blocks[currentBlockIndex]);

            slideInBlock.css(slideInPosition);
			
            options = {
                duration: plugin.settings.duration,
                easing: plugin.settings.easing
            };

            slideOutBlock.animate(slideOutPosition, options);
            slideInBlock.animate(mainPosition, options);
        };

        var getSlideInPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                };
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                };
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                };
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                };
            }
            return pos;
        };

        var getSlideOutPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                };
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                };
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                };
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                };
            }
            return pos;
        };

        plugin.getParams = function() {

            // code goes here

        };

        plugin.init();

    };

    $.fn.TarotShuffle = function(options) {
		//console.debug(options);
        return this.each(function() {
            if (undefined === jQuery(this).data('TarotShuffle')) {
                var plugin = new $.TarotShuffle(this, options);
                jQuery(this).data('TarotShuffle', plugin);
            }
        });
    };

})(jQuery);



var colorCards = [];
var ColorArray = ["#C51111","#44B915","#109CDD","#8F00D1","#E65614","#F10000","#57DB23","#49C5FF","#C14DF7","#DD6B00"];

function colorShift(){
	var color_duration;
	if (colorCards.length >= 1) {
	$.each(colorCards,function(index,value){
		jQuery.shuffle(ColorArray);
		tile = jQuery(value);
		if(tile.data('paramDuration')!=undefined){
			color_duration = tile.data('paramDuration');
		} else {
			color_duration = 4884;
		}
		if(index %2 != 0){
			jQuery(value).stop(true).animate({"backgroundColor": ColorArray[1]}, color_duration);
		} else {
			jQuery(value).stop(true).animate({"backgroundColor": ColorArray[0]}, color_duration);
		}
	});
	}
	setTimeout("colorShift()",5000);
}

function shuffleTarot(){
	var tile;
	/* automatically load any sliding cards */
	var slidedTiles = jQuery('[data-role=Tarot], .block-slider, .Tarot');
    slidedTiles.each(function (index, card) {
        var params = {};
        tile = jQuery(card);
        params.direction = tile.data('paramDirection');
        params.duration = tile.data('paramDuration');
        params.period = tile.data('paramPeriod');
		params.easing = tile.data('paramEasing');
        tile.TarotShuffle(params);
    });
	/* automatically colorshift selected */
	var colorTiles = jQuery('.tarotCard');
	colorTiles.each(function (index, card) {
		var ctile = jQuery(card);
		if(ctile.data('paramShift')!==undefined){
			colorCards.push(card);
		}
	});
	colorShift();
}

jQuery(window).ready(function(){
    shuffleTarot();
});