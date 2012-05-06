<!-- Forms -->
<h2 class="demoHeaders" class='p10 m10'>Style & Form Examples</h2>
<p class='p10 m10'>
	<label for="name" class='none'>name example</label><br />
	<input type="text" name="name" id="name" value='username'>
</p>
<h3 class='p10 m10'>input example</h3>
<p class='p10 m10'>
	<label for="email" class='none'>email address</label>
	<input type="text" name="email" id="email" value='me@email'>  
	<label for="passw" class='none'>password example</label>
	<input type="password" name="passw" id="passw" value='username' />
</p>
<p class='p10 m10' style='display:block;clear:both;'>
	<strong>Text Area</strong><br />
	<textarea cols="32"></textarea>
</p>
<br/><br/>
<div id='buttonClass'>
	<h2 class='p10 m10'>a href & submit Classes</h2>
	<p class='p10 m10'>Sample Button Classes let you easily turn [a href]item[/a] into [a href class=black]item[/a] and you get a sexy CSS3 button!</p>
	<br/>
<a href='#' class='m10 black'>black</a>
<a href='#' class='m10 white'>white</a>
<a href='#' class='m10 MAC'>MAC</a>
<a href='#' class='m10 red'>red</a>
<a href='#' class='m10 iTunes'>iTunes</a>
<a href='#' class='m10 orange'>orange</a>
</div><br/>
<div id='checkbox' style='margin-top:40px'>
<h2 class='p10 m10'>CheckBoxes</h2>
<p>This is a jQuery based replacement for the standard checkbox. It makes the checkbox more user friendly and can really help illustrate toggle functionality.</p><br /><br />
 <table>
    <tr class="disabled">
      <th><label for="disabled">Disabled</label></th>
      <td>
         <input class='mac' type='checkbox' id="disabled" disabled="disabled" />
      </td>
    </tr>
    <tr class="on_off">
      <th><label for="on_off">Default</label></th>
      <td>
        <input class='mac L m5' style='clear:none' type='checkbox' id="Default" value='noteTheme' />
        <input class='mac R m5' style='clear:none' type="checkbox" checked='true' id="DefaultOn" />
      </td>
    </tr>
    <tr class="on_off">
      <th><label for="on_off_on">Auto Switching</label></th>
      <td>
         <input class='mac' type='checkbox' checked='true' id="on_off_on" />
      </td>
    </tr>
    <tr class="onchange">
      <th>Event tracking</th>
      <td>
        <p>Checkbox status is <strong><span id="status">...</span></strong>.</p>
      </td>
    </tr>
  </table>

</div>
<br /><br />