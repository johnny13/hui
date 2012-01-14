<!-- xmlPlayer file. it has two instances in it. first video then the audio player -->
<div id='xmlDemotxt' class="L" style='width:30%;text-align:right;padding-right:5px;border-right:1px inset #999'>
	<h1 style='margin-left:20px'>xmlPlayer Widget</h1>
	<button id='avToggle'>audio / video toggle</button><br/>
	<p>Plays Media via HTML5 w/ A Flash Fallback Option.</p><p>Both the Audio And Video Playlists are loaded via AJAX from an XML file.</p><p>The code is based on <a href='http://www.jplayer.org' target='_blank'>jPlayer</a>, only the theme is all done with huement-ui elements.<br/><br/> <span class='footnote'>more info:</span></p>
	<p>
	<a href='http://www.huement.com/git/xmlPlayer'>xmlPlayer HomePage</a><br/><br/>
	<a href='http://www.huement.com/git/xmlPlayer/docs.html'>xmlPlayer docs</a><br/><br/>
	<a href='http://groups.google.com/group/jplayer'>jPlayer group</a>
	</p>
	</div>
	
	<br/>
	<br/>
					
	<div class="R" id='xmlVideoExample' style='width:65%;min-height:400px;'>	
	
	<div class="jp-video jp-video-270p">
			<div class="jp-type-playlist">
				<div id="jquery_jplayer_2" class="jp-jplayer"></div>
				<div id="jp_interface_2" class="jp-interface">
					<div class="jp-video-play"></div>
					<ul id="xmlVideoPlayer" class="jp-controls ui-widget ui-helper-clearfix"">
						
						<li class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-previous ui-icon-big ui-icon-seek-prev-big" tabindex="1">previous</a></li>
						
						<li class="vid-play ui-state-default ui-corner-all xmlP"><a href="#" class="jp-play ui-icon-big ui-icon-play-big" tabindex="1">play</a></li>
						
						<li class="vid-pause ui-state-default ui-corner-all xmlP"><a href="#" class="jp-pause ui-icon-big ui-icon-pause-big" tabindex="1">pause</a></li>
						
						<li class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-next ui-icon-big ui-icon-seek-next-big" tabindex="1">next</a></li>
						
						<li class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-stop ui-icon-big ui-icon-stop-big" tabindex="1">stop</a></li>
						
						<li class="vid-mute ui-state-default ui-corner-all xmlP"><a href="#" class="jp-mute ui-icon-big ui-icon-volume-on-big" tabindex="1">mute</a></li>
						
						<li class="vid-unmute ui-state-default ui-corner-all xmlP"><a href="#" class="jp-unmute ui-icon-big ui-icon-volume-off-big" tabindex="1">unmute</a></li>
						
					</ul>
					<div class="jp-progress ui-corner-all">
						<div class="jp-seek-bar">
							<div id="video-play-bar" class="jp-play-bar"></div>
						</div>
					</div>
					<div id='videovolume' class="jp-volume-bar">
						<div class="jp-volume-bar-value"></div>
					</div>
					<br style='clear:both' />
					<div class="jp-current-time"></div>
					<div class="jp-duration"></div>
				</div>
				<div id="jp_playlist_2" class="jp-playlist">
					<ul>
						<!-- The method Playlist.displayPlaylist() uses this unordered list -->
						<li></li>
					</ul>
				</div>
			</div>
	</div>
	</div>
	
<!-- ************************************************************ END XML VIDEO SECTION -->

<div id='xmlExample' class="R" style='width:65%;min-height:400px;display:none'>	

<div id="jquery_jplayer_1" class="jp-jplayer"></div>		
<div class="jp-audio">
	<div class="jp-type-playlist">
		<div id="jp_interface_1" class="jp-interface">
			<ul id="xmlPlayer" class="jp-controls ui-widget ui-helper-clearfix">
				
				<li id="jp-prev" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-previous ui-icon-big ui-icon-seek-prev-big" tabindex="1"></a></li>
				
				<li id="jp-play" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-play ui-icon-big ui-icon-play-big" tabindex="1"></a></li>
				
				<li id="jp-pause" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-pause ui-icon-big ui-icon-pause-big" tabindex="1"></a></li>
				
				<li id="jp-next" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-next ui-icon-big ui-icon-seek-next-big" tabindex="1"></a></li>
				
				<li id="jp-stop" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-stop ui-icon-big ui-icon-stop-big" tabindex="1"></a></li>
				
				<li id="jp-mute" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-mute ui-icon-big ui-icon-volume-off-big" tabindex="1"></a></li>
				
				<li id="jp-unmute" class="ui-state-default ui-corner-all xmlP"><a href="#" class="jp-unmute ui-icon-big ui-icon-volume-on-big" tabindex="1"></a></li>
				
			</ul>
			<div class="jp-progress ui-corner-all">
				<div class="jp-seek-bar">
					<div id="audio-play-bar" class="jp-play-bar"></div>
				</div>
			</div>
			
			<div id='audiovolume' class="jp-volume-bar">
				<div class="jp-volume-bar-value"></div>
			</div>
			<div class="jp-current-time"></div>
			<div class="jp-duration"></div>
		</div>
		<div id="jp_playlist_1" class="jp-playlist">
			<ul>
				<!-- The method Playlist.displayPlaylist() uses this unordered list -->
				<li></li>
			</ul>
		</div>
	</div>
</div>		
</div>