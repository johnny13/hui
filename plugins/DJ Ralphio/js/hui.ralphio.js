/*
 * Youtube Chromeless Video Plugin
 * http://www.viget.com/
 *
 * Copyright (c) 2010 Trevor Davis
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 */
 
(function($) {
  $.fn.ytchromeless = function(options){
    
    //Initial configuration
    var config = {
      videoWidth  : '640',
      videoHeight : '360',
      videoIdBase : 'ytplayer',
      params : { 
		    allowScriptAccess: 'always',
		    wmode: 'transparent'
		  }
    };
        
    return this.each(function(i) {
      
      
      // initial var setup
      
        var o    = $.extend(config, options),
      
            // set jQuery objects
            $link      = $(this),

            // set variables          
            url        = $link.attr('href'),
            videoId    = $link.attr('id') || o.videoIdBase + i,
            ytVideoId  = url.substr(31),

            // new DOM elements
            $video     = $link.wrap( '<div class="video-player"></div>' ).parent(),
            $controls  = $('<div class="video-controls"></div>' ).appendTo( $video ),
            $toReplace = $('<div class="video"></div>').prependTo( $video ).attr('id', videoId),
            $bar,
            $indicator,
            $loaded,
            $mute,
            $play,
            $seek,

            // set up the special player object
            player;
           
        // bind public methods upfront 
        $video.bind({

          // playing, pausing, muting, 
          'togglePlay' : function(){ $video.togglePlay(); },
          'play'       : function(){ $video.play(); },
          'pause'      : function(){ $video.pause(); },
          'toggleMute' : function(){ $video.toggleMute(); },
          'mute'       : function(){ $video.mute(); },
          'unMute'     : function(){ $video.unMute(); },
          'seek'       : function(){ $video.seek(); },

          // initializing and revising the player
          'update'     : function(){ $video.update(); },
          'cue'        : function(){ player.cueVideoById( ytVideoId ); }

        });


      // control methods
        
        // function fired when the play/pause button is hit
        $video.togglePlay = function() {
          if( $play.hasClass('playing') ) {
            $video.trigger('pause');
          } else {
            $video.trigger('play');
          }
          return false;
        };
      
        // play the video
        $video.play = function() {
          player.playVideo();
          $play.removeClass('paused').addClass('playing').attr('title','Pause');        
        };  
      
        // pause
        $video.pause = function() {
          player.pauseVideo();
          $play.removeClass('playing').addClass('paused').attr('title','Play');
        };
        
        // function fired when the mute/unmute button is hit
        $video.toggleMute = function() {
          if( $mute.hasClass('muted') ) {
            $video.trigger('unMute');
          } else {
            $video.trigger('mute');
          }
          return false;
        };
      
        // mute the video
        $video.mute = function() {
          player.mute();
          $mute.addClass('muted').attr('title','Un-Mute');        
        };   
      
        // unmute
        $video.unMute = function() {
          player.unMute();
          $mute.removeClass('muted').attr('title','Mute');
        };
        
        //Seek to a position in the video
    		$video.seek = function(seekPosition) {
          var seekToPosition = Math.round(player.getDuration() * seekPosition);
          player.seekTo(seekToPosition, false);
        };
        
        
        
      // player init and update methods
      
        //Update the video status
		$video.update = function() {

		if( player && player.getDuration ) {

		if( player.getPlayerState() === 1 ) {
			video.play();
		} else if ( player.getPlayerState() === 0 ) {
			$video.pause();
		}

		if( player.getVideoBytesLoaded() > -1) {
			var loadedAmount = ( player.getVideoBytesLoaded() / player.getVideoBytesTotal())  * 100;
			$loaded.css( 'width', loadedAmount + '%' );
		}

		if( player.getCurrentTime() > 0 ) {
			var videoPosition = ( player.getCurrentTime() / player.getDuration() ) * 100;
			$indicator.css( 'left', videoPosition + '%' );
		}

		}

		};


		// the youtube movie calls this method when it loads
		// DO NOT CHANGE THIS METHOD'S NAME
		onYouTubePlayerReady = function( videoId ) {
			var $videoRef = $( document.getElementById( videoId ) ).parent();
		setInterval(function(){
			$videoRef.trigger('update');
		}, 250);
		$videoRef.trigger('cue');
		};
    	
  		
  		
      // init methods
      
	// the embed!
	$video.init = function() {
		swfobject.embedSWF(
		'http://www.youtube.com/apiplayer?&enablejsapi=1&playerapiid=' + videoId,
		videoId, 
		o.videoWidth, 
		o.videoHeight, 
		'8', 
		null, 
		null, 
		o.params, 
		{ id: videoId },
		function(){
		player = document.getElementById( videoId );
		}
		);
		$video.addControls();
	};

        // add controls
	$video.addControls = function() {
		//Play and pause button
		$play = $('<a/>', {
			href: '#',
			'class': 'play-pause',
			text: 'Play/Pause',
			title: 'Play',
			click: function() {
				$video.trigger('togglePlay');
				return false;
			}
		}).appendTo( $controls );
  	
		//Play and pause button
		$mute = $('<a/>', {
		href: '#',
		'class': 'volume',
		text: 'Volume',
		title: 'Mute',
			click: function() {
				$video.trigger('toggleMute');
				return false;
			}
		}).appendTo( $controls );
		  
		//View on YouTube
		$link
		.addClass('view-youtube')
		.attr('title', 'View on YouTube')
		.html('Play/View on YouTube')
		.appendTo( $controls );

		//Play and pause button
		$seek = $('<div/>', {'class': 'status',
			click: function(e) {
				var skipTo      = e.pageX - $seek.offset().left,
				statusWidth = $seek.width();
				$video.seek( skipTo / statusWidth );
			}
		}).appendTo( $controls );

		$bar       = $('<div class="bar"></div>').appendTo($seek);
		$loaded    = $('<div class="loaded"></div>').appendTo($bar);
		$indicator = $('<span class="indicator"></span>').appendTo($bar);
  
		};
	
		$video.init();

	    });

	};
  
})(jQuery);


(function( $ ){
  $.fn.DJRalphio = function( playlistTitle ) {  

return this.each(function() {
    var $this = $(this);
	var ytid = "";
	var myHTML = "";
	var sexyLadies = $(this).attr("class");
	//console.debug(sexyLadies);
		if ( !playlistTitle ) { playlistTitle = "YouTube Playlist"; }
	
	//BUILD LIST
	$('.'+sexyLadies+' '+'li').each(function(index) {
	   $(this).hide();
		var sexyValue = $(this).text();
		$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+sexyValue+'?v=2&alt=jsonc',function(data,status,xhr){
				$("#N_"+sexyValue).html(data.data.title);
				$("#D_"+sexyValue).html(data.data.description);
				//console.debug(data.data);
		});

		var listHTMLBox = '<li id="LI_' + sexyValue + '" class="withimage"><a class="noeffect video-link" id="' + sexyValue + '" href="http://www.youtube.com/watch?v=' + sexyValue + '"><img alt="test" src="http://img.youtube.com/vi/' + sexyValue + '/default.jpg" /><span class="name" id="N_' + sexyValue + '"></span><span class="comment" id="D_' + sexyValue + '"></span><span class="arrow"></span></a></li><div id="M_' + sexyValue + '"></div>';

		$('.'+sexyLadies).append(listHTMLBox);
	});

	//ADD LIST TITLE
	$('.'+sexyLadies).prepend("<li class='title'>" + playlistTitle + "</li>");
		
	//SETUP LIST CLICKS
	$("a.video-link").live("click",function(){
		//Destroy Players
		ytid = $(this).attr("id");
		myHTML = $(this).html();
		
		if($("#M_"+ytid).hasClass("yt-Big")==false){
			$(".yt-Big").animate({ 
				"opacity": "hide",
				height: 0 + 'px',
				}, 1000, "easeInCirc" );
				$('html,body').animate({
				scrollTop: $(window).scrollTop() - 100
			});
			$("#M_"+ytid).removeClass("yt-None");
			$("#M_"+ytid).addClass("yt-Big");
			$("#M_"+ytid).animate({ 
				"opacity": "show",
				height: 390 + 'px',
				}, 1500, "easeOutCirc" );

				$(this).ytPlaylist();
				
				$('html,body').animate({
				scrollTop: $(window).scrollTop() + 400
				});
				
				//$("#LI_"+ytid).html(myHTML);
		} else {
			$("#M_"+ytid).removeClass("yt-Big");
			$("#M_"+ytid).addClass("yt-None");
			$("#M_"+ytid).animate({ 
				"opacity": "hide",
				height: 0 + 'px',
				}, 1000, "easeInCirc" );
				$('html,body').animate({
				scrollTop: $(window).scrollTop() - 100
			});
			
		}
		return false;
	});
});

};
})( jQuery );

/*
 * Youtube Chromeless Video Plugin
 * http://www.viget.com/
 *
 * Copyright (c) 2010 Trevor Davis
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 */
 
(function($) {
$.fn.ytPlaylist = function(options){

//Initial configuration
var config = {
  videoWidth  : '640',
  videoHeight : '360',
  videoIdBase : 'ytplayer',
  params : { 
  allowScriptAccess: 'always',
  wmode: 'transparent'
}
};
    
return this.each(function(i) {
  
  
  // initial var setup
  
    var o    = $.extend(config, options),
  
        // set jQuery objects
        $link      = $(this),
		
        // set variables          
        url        = $link.attr('href'),
        videoId    = $link.attr('id') || o.videoIdBase + i,
        ytVideoId  = url.substr(31),
		$vidbox    = $("#M_"+videoId),
        // new DOM elements
        //$video     = $vidbox.wrap('<div class="ralphio-player jYTp-interface"></div>').parent(),
		$video			= $vidbox.html('<div class="ralphio-player"></div>'),
        $controls  = $('<div class="video-controls"></div>').appendTo( ".ralphio-player" ),
        $toReplace = $('<div class="video"></div>').prependTo( $video ).attr('id', "V_"+videoId),
        $bar,
        $indicator,
        $loaded,
        $mute,
        $play,
        $seek,

        // set up the special player object
        player;
       
    // bind public methods upfront 
    $video.bind({

      // playing, pausing, muting, 
      'togglePlay' : function(){ $video.togglePlay(); },
      'play'       : function(){ $video.play(); },
      'pause'      : function(){ $video.pause(); },
      'toggleMute' : function(){ $video.toggleMute(); },
      'mute'       : function(){ $video.mute(); },
      'unMute'     : function(){ $video.unMute(); },
      'seek'       : function(){ $video.seek(); },

      // initializing and revising the player
      'update'     : function(){ $video.update(); },
      'cue'        : function(){ player.cueVideoById( ytVideoId ); }

    });


  // control methods
    
    // function fired when the play/pause button is hit
    $video.togglePlay = function() {
      if( $play.hasClass('playing') ) {
        $video.trigger('pause');
      } else {
        $video.trigger('play');
      }
      return false;
    };
  
    // play the video
    $video.play = function() {
      player.playVideo();
      $play.removeClass('paused').addClass('playing').attr('title','Pause');        
    };  
  
    // pause
    $video.pause = function() {
      player.pauseVideo();
      $play.removeClass('playing').addClass('paused').attr('title','Play');
    };
    
    // function fired when the mute/unmute button is hit
    $video.toggleMute = function() {
      if( $mute.hasClass('muted') ) {
        $video.trigger('unMute');
      } else {
        $video.trigger('mute');
      }
      return false;
    };
  
    // mute the video
    $video.mute = function() {
      player.mute();
      $mute.addClass('muted').attr('title','Un-Mute');        
    };   
  
    // unmute
    $video.unMute = function() {
      player.unMute();
      $mute.removeClass('muted').attr('title','Mute');
    };
    
    //Seek to a position in the video
		$video.seek = function(seekPosition) {
      var seekToPosition = Math.round(player.getDuration() * seekPosition);
      player.seekTo(seekToPosition, false);
    };
    
    
    
  // player init and update methods
  
 //Update the video status
$video.update = function() {

if( player && player.getDuration ) {

   if( player.getPlayerState() === 1 ) {
     $video.play();
   } else if ( player.getPlayerState() === 0 ) {
     $video.pause();
   }

   if( player.getVideoBytesLoaded() > -1) {
     var loadedAmount = ( player.getVideoBytesLoaded() / player.getVideoBytesTotal())  * 100;
     $loaded.css( 'width', loadedAmount + '%' );
   }
   
   if( player.getCurrentTime() > 0 ) {
     var videoPosition = ( player.getCurrentTime() / player.getDuration() ) * 100;
     $indicator.css( 'left', videoPosition + '%' );
   }

}

};
		

		// the youtube movie calls this method when it loads
		// DO NOT CHANGE THIS METHOD'S NAME
		onYouTubePlayerReady = function( videoId ) {

		var $videoRef = $( document.getElementById( videoId ) ).parent();

		setInterval(function(){
		  $videoRef.trigger('update');
		}, 250);

		  $videoRef.trigger('cue');

		};



  // init methods
  
    // the embed!
		$video.init = function() {
  			var tvidbox    = "V_"+videoId;
				  swfobject.embedSWF(
		        'http://www.youtube.com/apiplayer?&enablejsapi=1&playerapiid=' + videoId,
		        tvidbox, 
		        o.videoWidth, 
		        o.videoHeight, 
		        '8', 
		        null, 
		        null, 
		        o.params, 
		        { id: tvidbox },
		        function(){
		          player = document.getElementById( tvidbox );
		        }
		      );
			$video.addControls();
			$(".tipTip").tipTip();
		};

    	$video.addControls = function() {
			//Play and pause button
			$play = $('<a/>', {
				href: '#',
				'class': 'play-pause',
				text: 'Play/Pause',
				title: 'Play',
				click: function() {
					$video.trigger('togglePlay');
					return false;
				}
			}).appendTo( $controls );

			//Play and pause button
			$mute = $('<a/>', {
			href: '#',
			'class': 'volume',
			text: 'Volume',
			title: 'Mute',
				click: function() {
					$video.trigger('toggleMute');
					return false;
				}
			}).appendTo( $controls );

			//View on YouTube
			$link
			.addClass('view-youtube')
			.attr('title', 'View on YouTube')
			.html('Play/View on YouTube')
			.appendTo( $controls );

			//Play and pause button
			$seek = $('<div/>', {'class': 'status',
				click: function(e) {
					var skipTo      = e.pageX - $seek.offset().left,
					statusWidth = $seek.width();
					$video.seek( skipTo / statusWidth );
				}
			}).appendTo( $controls );

			$bar       = $('<div class="bar"></div>').appendTo($seek);
			$loaded    = $('<div class="loaded"></div>').appendTo($bar);
			$indicator = $('<span class="indicator"></span>').appendTo($bar);
			
			
			};

			$video.init();

		    });

		};

})(jQuery);