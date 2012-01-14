<!-- actions -->
<h2 class="demoHeaders">Modal Dialog</h2>
<div id="dialog_link">Open Modal Dialog</div>

<h2 class="demoHeaders">jGrowl Dialog</h2>
<button id='jGrowlMsgBtn'>jGrowl Random Message</button>

<!-- ui-dialog -->
<div id="dialog" title="Your Dialog's Title">
	<h3>Hey, Did you know you can DRAG this window about?</h3>
	<h4>You Do Now.</h4>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	<a href="#" id="buttonInModal" class="uibutton">Change</a>
</div>
	<!-- Horizontal Slider -->
<h2 class="demoHeaders">Horizontal Slider</h2>
<div id="horizSlider"></div>

<!-- Vertical Slider -->
<h2 class="demoHeaders">Vertical Slider</h2>
<div class="columnbox">
	<div id="eq">
		<span>88</span>
		<span>77</span>
		<span>55</span>
		<span>33</span>
		<span>40</span>
		<span>45</span>
		<span>70</span>
	</div>
</div>
<br clear="all" />

<!-- Highlight / Error -->
<h2 class="demoHeaders">Highlight / Error</h2>
<div class="ui-widget">
	<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 10px;background-color:#a5e5ee"> 
		<p style='margin-top:0'><span class="ui-icon-big ui-icon-notice-big" style="float: left; margin-right: .7em;"></span>
		<strong>Did you know:</strong> Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
	</div><br/>
	<button id='modalHighlight' class="ui-widget" style='margin-left:100px'>Dialog Highlight example</button>
</div>
<br/>
<div class="ui-widget">
	<div class="ui-state-error ui-corner-all" style="padding:10px;"> 
		<p style='margin-top:0'><span class="ui-icon-big ui-icon-alert-big" style="float: left; margin-right: .7em;"></span> 
		<strong>Error:</strong> Needs more cowbell. </p>
	</div>
</div><br/>

<button id='modalError' class="ui-widget" style='margin-left:100px'>Dialog ERROR! example</button>
<br/><br/>
<!-- MODAL SHITS -->
<div id="modalHighlight_dialog" class='highlight' style='display:none'>
	<h3>This Is an Example of the Highlight Theme applied to the dialog widget</h3>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><br/>
	<button id='modalHighlightClose' style='width:150px;position:relative;margin-left:110px;' class='highlight'>understood!</button>
</div>
<div id="modalError_dialog" class='error' style='display:none'>
	<h1>Oh Snap!</h1>
	<p>This is what an error message would look like. if you apply the class='error' to your dialog container.</p><br/>
	<button id='modalErrorClose' style='width:150px;position:relative;margin-left:160px;' class='error'>Alerted!</button>
</div>
<!-- -->