<!-- Forms -->
<p>Here you will find all the common form elements, and how they look when using huement-ui. The actual select box requires you declare it somewhere in the doc ready. Other elemenets like input and text boxes are themed automatically by the css and jquery.</p>
<h2 class="demoHeaders">Autocomplete</h2>	
<p>do a little typing and watch as it guesses what country you're talk'n bout.</p><br/>
<div class="ui-widget">
	<label>Type a Country</label>
	<label for="countries" class="none">Brazil</label>
	<input type='text' id="countries">
</div>
<br/><br/><br/>
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