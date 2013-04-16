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

jQuery(window).ready(function(){
    var slidedTiles = jQuery('[data-role=Tarot], .block-slider, .Tarot');
    slidedTiles.each(function (index, tile) {
        var params = {};
        tile = jQuery(tile);
        params.direction = tile.data('paramDirection');
        params.duration = tile.data('paramDuration');
        params.period = tile.data('paramPeriod');
		params.easing = tile.data('paramEasing');
        tile.TarotShuffle(params);
    })
});