<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>huement-ui | server side setup</title>
<link href="favicon.ico" title="Icon" type="image/x-icon" rel="icon">
<link href="favicon.ico" title="Icon" type="image/x-icon" rel="shortcut icon">
<link href="css/hui.darkHD.css" type="text/css" rel="stylesheet" />	

<!-- demo Stylings:

if you were using either of both of the widgets, 
this is how you have to include their respective widget skins
or else when your user switches themes, any originally href'd style sheet will
get lost and only the new huement-ui css file will be in play.

@import url("css/xmlPlayer_skin/xmlPlayer.css");
@import url("css/youtube_skin/youtube_player.css");

(only inside a <style></style> tag obviously)
 -->
<style type="text/css" charset="utf-8"> 
@import url("css/xmlPlayer_skin/xmlPlayer.css");
@import url("css/youtube_skin/youtube_player.css");

ul#icons { margin: 0; padding: 0;}
ul#icons li { margin: 2px; position: relative; padding: 4px 0; cursor: pointer; float: left; list-style: none; }
ul#icons span.ui-icon { float: left; margin: 0 4px; }

ul#icons-big { margin: 0; padding: 0;}
ul#icons-big li { margin: 2px; position: relative; 
padding: 4px 0; cursor: pointer; float: left; list-style: none; }
ul#icons-big span.ui-icon-big { float: left; margin: 0 4px; }

ul.icons-big { margin: 0; padding: 0;}
ul.icons-big li { margin: 2px; position: relative; 
padding: 4px 0; cursor: pointer; float: left; list-style: none; }
ul.icons-big span.ui-icon-big { float: left; margin: 0 4px; }

ul#icons-social { margin: 0; padding: 0;}
ul#icons-social li { margin: 2px; position: relative; 
padding: 4px 0; cursor: pointer; float: left; list-style: none; }
ul#icons-social span.ui-icon-big { float: left; margin: 0 4px; }

ul#icons-social-small { margin: 0; padding: 0;}
ul#icons-social-small li { margin: 2px; position: relative; 
padding: 4px 0; cursor: pointer; float: left; list-style: none; }
ul#icons-social-small span.ui-icon { float: left; margin: 0 4px; }

.theme_bar {height:30px}
.themeSample { padding:3px;margin-bottom:5px;width:92px;}
.theme {
	float:left;
	width:150px;
}
.columnbox { height: 170px; width: 48%; float:left; margin-right: 1%; }
#eq span { height: 120px; float: left; margin: 15px; }
#countries { width: 300px; }
#stickyFooter {
	maring-top:50px;
	padding-top:25px;
	padding-bottom:0px;
	text-align:center;
	clear:both;	
}
</style>
<!-- required scripts -->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-ui.1.8.js"></script>
<script type="text/javascript" src='js/hui.0.1.js'></script>
<!-- serverside example script -->
<!-- youtube widget scripts -->
<script type="text/javascript" src="js/swfobject/swfobject.js"></script> 
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script>google.load("swfobject", "2.1");</script>
<script type="text/javascript" src='js/youtube.js'></script>
<!-- xmlplayer widget scripts -->
<script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="js/xmlPlayer.js"></script>
<!-- serverside example docready script -->
<script type="text/javascript" src='js/phpDemo.js'></script>
<script type="text/javascript" src='js/phpReady.js'></script>
</head>
<body>
<div class='theme_header'>
	<div class="L">
	<h1 style='margin-left:10px' ><a href='http://spectyle.huement.com/Li/builds/huementUI' title='huement-ui page'><img src='demo/huementUI_32.png' style='margin:3px 5px -3px 0px' /></a> |  A <a href='http://spectyle.huement.com' title='spectyle main page'><img src='demo/spectyle_logo_32.png' style='margin:-3px 5px -5px 0px' /></a> Plugin
	</h1>
	<h3 style='margin:25px 0 10px 30px;padding:0'>"An Easy to use and Easy to customize Multi Media Interface."</h3>
	</div>
	<p style="font-size: 1.3em;margin: 10px 30px 0px 0px; float:right;padding-top:30px;">
		<a class='black' id='mainPageBtn' href='http://dev.huement.com/git/hui'>HUI Main Page</a> <a class='black' href='http://dev.huement.com/git/hui/download.php' style='margin-left:30px;'>Downloads</a> <a id='themeBtn' href='#' style='margin-left:30px;' class='black'>change theme</a>
	</p>
</div>
<div id="boxFix" style='padding-top:20px;'>
<br/>
	<!-- Tabs -->
	<div id="tabs">
		<ul style='width:100%'>
			<li ><a href="#tabs-1"><span class="ui-icon-big bL ui-icon-huement-big check"></span>[Intro]</a></li>
			<li><a href="#tabs-2"><span class="ui-icon-big bL ui-icon-document-b-big check"></span>[Forms]</a></li>
			<li><a href="#tabs-3"><span class="ui-icon-big bL ui-icon-calendar-big check"></span>[Widgets]</a></li>
			<li><a href="#tabs-4"><span class="ui-icon-big bL ui-icon-extlink-big check"></span>[Actions]</a></li>
			<li><a href="#tabs-5"><span class="ui-icon-big bL ui-icon-video-big check"></span>[Media]</a></li>
		</ul>
<!-- SPECTYLE UI - TAB ONE ******************************* -->
		<div id="tabs-1">
			<h1>what is <span class='hue'>huement-ui</span>?</h1>
			<p>A jQuery based multi-media user interface.</p>
			<p>Weaving several popular javascript elemenets into a cohesive easy to use framework for user interactions. Not just clicks and drags, it integrates Forms, Notifications, and ofcourse Audio and Visual playblack.</p><br/>
			<h2>Best Features:</h2>
			<ul style='font-size:18px;line-height:25px;font-weight:bold;'>
			<li>Quick Color Changing! (hue button in the header)</li>
			<li><a href='http://www.jplayer.org' target='blank'>jPlayer Support (HTML5 & Flash Audio/Video Player)</a></li>
			<li>YouTube Video Player</li>
			<li>Improved Button and Icon Functionality</li>
			<li>Working Modal Themes (Highligh and Alert)</li>
			<li><a href='http://plugins.jquery.com/project/jGrowl' target='blank'>jGrowl Notifications</a></li>
			<li>Spectyle CSS Form Elements & Layouts</li>
			<li>Image Pre-Loading (Automatically from css files and any declared)</li>
			</ul>
			<p>Navigate around to see what each elemenet looks like. The tabs break the user interface into managable bits. Below this main set of tabs you'll find even more widgets that extend the native ability of the basic user interface.</p><br /><br />
				<div style="position: relative; width: 70%; height: 200px; padding:1% 4%; overflow:hidden;margin:0 0 0 20px;border:1px solid #000" class="fakewindowcontain">
					<p>Lorem <span class='hue'>ipsum dolor<span> sit amet,  Nulla nec tortor. Donec id elit quis purus consectetur consequat. </p><p>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. <span class='hue'>Suspendisse scelerisque dui </span>nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. </p><p>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus. <span class='hue'>lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede</span>. Nulla nec tortor. Donec id elit quis purus consectetur consequat. </p><p>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. <span class='hue'>Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem</span>. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. </p><p>Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat. Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. </p><p>Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat. Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. </p>
					
					<!-- ui-dialog -->
					<div class="ui-overlay"><div class="ui-widget-overlay"></div><div class="ui-widget-shadow ui-corner-all" style="width: 302px; height: 152px; position: absolute; left: 50px; top: 30px;"></div></div>
					<div style="position: absolute; width: 280px; height: 130px;left: 50px; top: 30px; padding: 10px; overflow:hidden;" class="ui-widget ui-widget-content ui-corner-all">
						<div class="ui-dialog-content ui-widget-content" style="background: none; border: 0;">
							<p><span class='hue'>Lorem ipsum dolor </span>sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
			
				</div>
					<br/>
			</div>
			
			<!-- SPECTYLE UI - TAB TWO ******************************************************** -->
			<div id="tabs-2">
			<?php require 'phpParts/forms.php'; ?>
			</div>
			
			<!-- SPECTYLE UI - TAB THREE ****************************************************** -->
			<div id="tabs-3">
			<?php require 'phpParts/widgets.php'; ?>
			</div><!-- END TAB THREE -->
		
			<!-- SPECTYLE UI - TAB FOUR ****************************************************** -->			
			<div id="tabs-4">
			<?php require 'phpParts/actions.php'; ?>
			</div><!-- END TAB FOUR -->
			
			<!-- SPECTYLE UI - TAB FOUR ****************************************************** -->			
			<div id="tabs-5">
			<?php require 'phpParts/xmlPlayer.php'; ?>
			<br/>
			<?php require 'phpParts/youtubePlayer.php'; ?>
			<br style='clear:both'/>
			</div><!-- END TAB FOUR -->
		
	</div><!-- END TABS -->
			<!-- MODAL Theme Gallery -->
			<div id="theme_switcher" title="Color Shifting" style='display:none'>
			<h3>Here You Can Change the Theme.</h3>
				<div class='theme' style='display:none'>
					<div id='teaLeaf' class='themeSample'>
						<ul class="icons-big ui-widget ui-helper-clearfix" style='width:100px'>
						<li class="ui-state-default ui-corner-all ui-state-hover themecon">
							<span class="ui-icon-big ui-icon-play-big"></span></li>
						<li class="ui-state-default ui-corner-all themecon">
							<span class="ui-icon-big ui-icon-pause-big"></span></li>
						<br style='clear:both' />
						<li class="ui-state-default ui-corner-all themecon">
							<span class="ui-icon-big ui-icon-stop-big"></span></li>
						<li class="ui-state-default ui-corner-all ui-state-hover themecon">
							<span class="ui-icon-big ui-icon-seek-next-big"></span></li>
						</ul>
						<div class="theme_bar jp-progress"></div>
					</div>
				<button class='themeToggle' title='red'>cherryTree</button>
				</div>
				
				<div class='theme'>
				<img class='themeToggle' src='demo/themes/cherryTree.png' title='red' /><br/>
				cherryTree
				</div>

				<div class='theme'>
				<img class='themeToggle' src='demo/themes/teaLeaf.png' title='lucky' /><br/>
				teaLeaf
				</div>
				
				<div class='theme'>
				<img class='themeToggle' src='demo/themes/ubuntu.png' title='ubuntu' /><br/>
				hueman
				</div>
			</div>
</div>	
<!-- theme modal -->
<div id="stickyFooter" class='S'>
		<p class="footnote"><a href='http://lithify.me/'><img src='images/li3.gif' /></a> & <a href='http://jquery.com/'><img src='images/jquery.gif' /></a> & <a href='http://jquery.com/'><img src='images/huement.gif' /></p>
</div>
</body>
</html>
