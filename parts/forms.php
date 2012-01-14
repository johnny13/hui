<!-- Forms -->
<p>Here you will find all the common form elements, and how they look when using huement-ui. The actual select box requires you declare it somewhere in the doc ready. Other elemenets like input and text boxes are themed automatically by the css and jquery.</p>
<h2 class="demoHeaders">Autocomplete</h2>	
<p>do a little typing and watch as it guesses what country you're talk'n bout.</p><br/>
<div class="ui-widget">
	<label>Type a Country</label>
	<label for="countries" class="none">Brazil</label>
	<input type='text' id="countries">
</div>

<!-- Button --><br/>
<h2 class="demoHeaders">UI Button meets  &lt;Button&gt;</h2>	
<p>Combining both the jquery-ui button element and the css3 &lt;button&gt; tag, you can easily theme all your clickable elements. These examples are plain text or using standard size icons.</p>
<br/>
<div id="divButton">&lt;DIV&gt; Button</div>

<!-- Icon Buttons -->
<h2 class="demoHeaders">Standard Icon Buttons</h2>
<div id="leftIconButton">Left Icon</div> <br /><br />
<div id="bothIconButton">Left & Right Icons</div>
<br /><br />
<!-- BIG Icon Buttons -->
<h2 class="demoHeaders">BIG Icon Buttons</h2>	
<p style='line-height:24px'>Creating a large button How To:</p>
<ul>
<li>declare button. add class <b>"ui-bigBtn"</b> to the desired containter.</li>
<li>add the class <b>"bigBtnTxt"</b> to the button's text. (for shadow)</li>
<li>optionally, add icon and pick which side ie: <b>class='ui-icon-big ui-icon-star-big bL'</b></li>
</ul>
<br />

<div class="ui-state-default ui-corner-all ui-bigBtn">
<div class="ui-icon-big bR ui-icon-comment-big"></div>
<span class='bigBtnTxt' style='margin-left:-20px;'>shout it</span>
</div>
<br />
<div id="starIconButton" class="ui-state-default ui-corner-all ui-bigBtn" style='margin-top:20px'>
<span class='bigBtnTxt'>Star That Shit</span>
<div class="ui-icon-big bL ui-icon-star-big"></div>
</div>
<h2>[pre][/pre] star button example</h2>
<pre>
[div id="starIconButton" class="ui-state-default ui-corner-all ui-bigBtn"]
	[span class="bigBtnTxt"]Star That Shit[/span]
	[div class="ui-icon-big bL ui-icon-star-big"][/div]
[/div]
</pre>
<br />
<!-- Button Set -->
<h2 class="demoHeaders">Button Toggle</h2>	
<div id="radio1">
	<input type="radio" id="radio1" name="radio" /><label for="radio1">Choice 1</label>
	<input type="radio" id="radio2" name="radio" checked="checked" /><label for="radio2">Choice 2</label>
	<input type="radio" id="radio3" name="radio" /><label for="radio3">Choice 3</label>
</div><br/><br/>
<form method='' action=''><br/>
<div class="rowElem">
	<label>Actual Select Box :</label>
	<select name="select2" >
		<option value="opt1">First Option</option>
		<option value="opt2">Option 2</option>
		<option value="opt3">Option 3</option>
		<option value="opt4">Option 4</option>
		<option value="opt5">Option 5</option>
		<option value="opt6">Option 6</option>
		<option value="opt7">Option 7</option>
		<option value="opt8">Option 8</option>
	</select>
</div>

<div class='push'></div>

<div class="rowElem">
<label>Submit button:</label>
<input type="submit" value="Envoyer" />
</div>
</form>
<br/>
<h2 class="demoHeaders">Common Input Fields</h2>
<p>Hidden Label Fields are used to provide the default text on the input boxes, along with a small bit of jquery to ensure the new value is saved and the label is reapplied if no text is entered.</p>
<p>
	<label for="name" class='none'>name example</label><br />
	<input type="text" name="name" id="name">
</p>
<h3>login example</h3>
<p>
	<label for="email" class='none'>email address</label><label for="passw" class='none'>password example</label>
	<input type="text" name="email" id="email">  <input type="password" name="passw" id="passw" />
</p>
<p style='display:block;clear:both;'>
	<strong>Text Area</strong><br />
	<textarea cols="32"></textarea>
</p>
<br/><br/>
<div id='checkbox'>
<h2>CheckBoxes</h2>
<p>This is a jQuery replacement for standard form checkboxes. All the styling is done via CSS. No images are used!</p><br /><br />
 <table>
    <tr class="disabled">
      <th><label for="disabled">Disabled</label></th>
      <td>
        <input type="checkbox" id="disabled" disabled="disabled" />
      </td>
    </tr>
    <tr class="on_off">
      <th><label for="on_off">Default</label></th>
      <td>
        <input type="checkbox" id="on_off" />
      </td>
    </tr>
    <tr class="on_off">
      <th><label for="on_off_on">Default On</label></th>
      <td>
        <input type="checkbox" checked="checked" id="on_off_on"/>
      </td>
    </tr>
    <tr class="long_tiny">
      <th><label class="left" for="long_tiny">Long and short labels</label></th>
      <td>
        <input type="checkbox" id="long_tiny" />
      </td>
    </tr>
    <tr class="onchange">
      <th>Event tracking</th>
      <td>
        <input type="checkbox" id="onchange" />
        <p>Checkbox status is <strong><span id="status">...</span></strong>.</p>
      </td>
    </tr>
  </table>

</div>
<br /><br />
<p>
<strong>Sample File Upload</strong><br />
<input type="file" /> <br />
</p>
<br/><br />
<h2>Included Table Stylings</h2>
<p>this is a simple table layout that provides a quick and easy way to bring any table element up to snuff. below is some sample code of the example.</p>
<pre>
[th scope="col" abbr="Starter"]Smart Starter[/th]
...
[th scope="row"]MySQL Databases[/th]
...
[td][span class="ui-icon-big ui-icon-check-big check"][/span][/td]
</pre>
<table class="table">
	<thead>
		<tr>
			<th></th>
			<th scope="col" abbr="Starter">Smart Starter</th>
			<th scope="col" abbr="Medium">Smart Medium</th>
			<th scope="col" abbr="Business">Smart Business</th>
			<th scope="col" abbr="Deluxe">Smart Deluxe</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th scope="row">Price per month</th>
			<td>$ 2.90</td>
			<td>$ 5.90</td>
			<td>$ 9.90</td>
			<td>$ 14.90</td>
		</tr>
	</tfoot>
	<tbody>
		<tr>
			<th scope="row">Storage Space</th>
			<td>512 MB</td>
			<td>1 GB</td>
			<td>2 GB</td>
			<td>4 GB</td>
		</tr>
		<tr>
			<th scope="row">Bandwidth</th>
			<td>50 GB</td>
			<td>100 GB</td>
			<td>150 GB</td>
			<td>Unlimited</td>
		</tr>
		<tr>
			<th scope="row">MySQL Databases</th>
			<td>Unlimited</td>
			<td>Unlimited</td>
			<td>Unlimited</td>
			<td>Unlimited</td>
		</tr>
		<tr>
			<th scope="row">Setup</th>
			<td>19.90 $</td>
			<td>12.90 $</td>
			<td>free</td>
			<td>free</td>
		</tr>
		<tr>
			<th scope="row">PHP 5</th>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
		</tr>
		<tr>
			<th scope="row">Ruby on Rails</th>
			<td><span class="ui-icon-big ui-icon-check-big
			check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
			<td><span class="ui-icon-big ui-icon-check-big check"></span></td>
		</tr>
	</tbody>
</table>

<br /><br />