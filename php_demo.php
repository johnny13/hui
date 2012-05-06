<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>hui | php demo</title>
<link href="favicon.ico" title="Icon" type="image/x-icon" rel="icon">
<link href="favicon.ico" title="Icon" type="image/x-icon" rel="shortcut icon">
<link href="css/hui_phat.css" type="text/css" rel="stylesheet" />	

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

#cssList {
	padding:10px; 
	margin:10px;
	list-style:square;
}
#cssList li {
	padding:10px; 
	margin:10px;
	list-style:square;
}
#buttonClass a.white,#buttonClass a.MAC {
	color:#222222;
}
#buttonClass a.iTunes,#buttonClass a.orange,#buttonClass a.red {
	color:#FFF;
	font-weight:bold;
}
.iPhoneCheckContainer {
  position: relative;
  height: 27px;
  cursor: pointer;
  overflow: hidden;
  border: 2px insert #CFCFCF;
  max-width:300px;
  float:left;
  margin:3px 20px 3px 5px;
 }

tbody {width:500px;}
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
<script type="text/javascript" src="http://s3.amazonaws.com/huement/code/jquery.js"></script>	
<script type="text/javascript" src="http://s3.amazonaws.com/huement/code/jquery-hui.phat.js"></script>	
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
	<div class="L" class='m10 p10'>
	<a href='http://www.huement.com/hui/' title='hui home page' class='m10' style='margin:10px 5px 20px 20px'><img src='demo/hui_logo.png' height='55px' style='margin-top:10px' /></a>
	</div>
	<div class="R m10 p10">
	<a class='white' id='mainPageBtn' href='http://dev.huement.com/git/hui'>hui docs</a> <a class='white' href='http://dev.huement.com/git/hui/download.php' style='margin-left:30px;'>Downloads</a> <a id='themeBtn' href='#' style='margin-left:30px;' class='white'>change theme</a>
	</div>
</div>
<div id="content" style='padding-top:20px;'>
<br/>
	<!-- Tabs -->
	<div id="tabs">
		<ul style='width:100%'>
			<li ><a href="#tabs-1"><span class="ui-icon-big bL ui-icon-huement-big check"></span>[Intro]</a></li>
			<li><a href="#tabs-2"><span class="ui-icon-big bL ui-icon-pencil-big check"></span>[Style]</a></li>
			<li><a href="#tabs-3"><span class="ui-icon-big bL ui-icon-person-big check"></span>[Widgets]</a></li>
			<li><a href="#tabs-4"><span class="ui-icon-big bL ui-icon-document-b-big check"></span>[CSS]</a></li>
			<li><a href="#tabs-5"><span class="ui-icon-big bL ui-icon-video-big check"></span>[Media]</a></li>
		</ul>
<!-- SPECTYLE UI - TAB ONE ******************************* -->
		<div id="tabs-1">
			<h1 style='margin-top:0;'>what is <span class='hue'>hui</span>?</h1>
			<p>Why it is a jQuery based multi-media user interface!</p>
			<p>Weaving several popular javascript elemenets into a cohesive easy to use framework for user interactions. Not just clicks and drags, it integrates Forms, Notifications, and ofcourse Audio and Visual playblack.</p><br/>
			
			<h1 class='oldTimes' style='font-size:40px'>Best Features:</h1>
			<h2 style='margin-top:-20px;padding-top:0px' class='m10 p10'>brought to you by the letter <strong class='oldTimes' style='margin-top:-30px'>W</strong></h2>
			<hr/>
			<ul style='font-size:18px;line-height:25px;font-weight:bold;list-style-type:square;margin-left:40px;'>
			<li class='p10' style='list-style-type:square'>When you need Quick and Sexy HTML Styling</li>
			<li class='p10' style='list-style-type:square'>Worked in <a href='http://www.jplayer.org' target='blank'>jPlayer</a> Support (HTML5 & Flash Audio/Video Player)</li>
			<li class='p10' style='list-style-type:square'>Watch <a href='http://youtube.com' target='blank'>YouTube</a> Video PLAYLIST Player</li>
			<li class='p10' style='list-style-type:square'>Write CSS3 Button Styles with ease.</li>
			<li class='p10' style='list-style-type:square'>Well-Drawn Icon Ready Buttons</li>
			<li class='p10' style='list-style-type:square'>Witches Brew! Also <a href='http://defunkt.io/facebox/' target='blank'>FaceBox!</a></li>
			<li class='p10' style='list-style-type:square'>With <a href='http://plugins.jquery.com/project/jGrowl' target='blank'>jGrowl</a>  Notifications & Icon Ready HD Theme</li>
			</ul>
			<p class='p10 m10'><span class='oldTimes' style='margin:0;padding:5px;font-size:35px'>N</span>avigate around to see what each elemenet looks like. You can also get a feel for how it works, because obviously all of this is coded using the interface itself. The tabs break the user interface into category bits. The media tab is only available in the full "phat" version, as it required not only a lot of jQuery UI but it also requires PHP and server side loading for playlist creation. More info is available on the documentation pages.</p><br /><br />
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
			
			<!-- CSS - TAB THREE ****************************************************** -->
			<div id="tabs-4">
			<?php require 'phpParts/css.php'; ?>
			</div><!-- END TAB THREE -->
			
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
