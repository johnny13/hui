<div id='ytDemotxt' class="R" style="min-width:230px;padding-right:10px;width:40%;">
	<h1>YouTube Widget</h1>
	<h2><a href=''>widget doc's</a></h2>
	<p>This is a jquery interface for manipulating the javascript version of the chromeless youtube video player. To use this widget, <a href=''>include the widget files</a>, and The playlist generator looks for</p>
	<pre>[ul]<br/>[li]<br/>[a title='videoid'][/a]<br/>[a title='videoidtwo'][/a]<br/>[/li]<br/>[/ul]</pre>
	
	<p>Flash is loaded by using SWFEmbed (as recommended by Google.) and has been confirmed to work in firefox 4, provided you include google in your allowed object and script sources, and the user has flash installed (obviously).If you're not familiar with the chromeless player, read up about it here: <a href='http://code.google.com/apis/youtube/js_api_reference.html'>Google Api Refrence</a>.</p><p> If you still have questions about firefox and content security policies, see this <a href='huement.com/blog'>blog post</a></p>
</div>
<div id='ytPOne' class='L'>
	<!-- youtube player widget -->
	<object type="application/x-shockwave-flash" name="youtubeplayer" id="youtubeplayer" data="http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=youtubeplayer" width="410" height="308">
	<param name="allowScriptAccess" value="always">
	<param name="bgcolor" value="#000000">
	<param name="wmode" value="transparent">
	</object>
	
	<div class='jYTp-interface'>
		<!-- progress bar -->
		<ul id="youtubePlayer" class="jYTp-controls ui-widget ui-helper-clearfix">
		
		<li id="jYTp-prev" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-prev ui-icon-big ui-icon-seek-prev-big" tabindex="1"></a></li>
		
		<li id="jYTp-play" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-play ui-icon-big ui-icon-play-big" tabindex="1"></a></li>
		
		<li id="jYTp-pause" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-pause ui-icon-big ui-icon-pause-big" tabindex="1"></a></li>
		
		<li id="jYTp-next" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-next ui-icon-big ui-icon-seek-next-big" tabindex="1"></a></li>
		
		<li id="jYTp-stop" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-stop ui-icon-big ui-icon-stop-big" tabindex="1"></a></li>
		
		<li id="jYTp-mute" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-mute ui-icon-big ui-icon-volume-off-big" tabindex="1"></a></li>
		
		<li id="jYTp-unmute" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jYTp-unmute ui-icon-big ui-icon-volume-on-big" tabindex="1"></a></li>
		
		<div class="jYTp-volume-bar R">
			<div class="jYTp-volume-bar-value"></div>
		</div>
		
		</ul>
		
		<!-- progress bar -->
		<div class="jYTp-progress">
		<div id="timebar" class="jYTp-seek-bar">
		<div id="jYTp-play-bar" class="jYTp-play-bar"></div>
		</div>
		</div>
		
		<div id='videotime' class='jYTp-current'>00m 00s</div>
		<div class='jYTp-duration'>00m 00s</div>
		<br/>
		
	</div><!-- END INTERFACE -->
<!-- youtube player widget -->
<div id="jYTp_playlist" class="jYTp-playlist">
	<ul id='youtube_playlist' class='jYTp-playlist'>
		<!-- The method Playlist.displayPlaylist() uses this unordered list -->
		<li><a href='#' id="1" class='video_link' title='Yd6pgqe3fAg'>Todd Snider - "Ballad of The Kingsman"</a></li>
		<li><a href='#' id="2" class='video_link' title='4J-ldJ9Iy9g'>Todd Snider - "Beer Run"</a></li>
		<li><a href='#' id="3" class='video_link' title='uapQDxDtG2A'>Todd Snider - "Fortunate Son"</a></li>
	</ul>
	<br/>
</div>
</div><!-- no -->