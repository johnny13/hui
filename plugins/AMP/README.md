hui widget - ajax media player
---------------------------------------------
This is all about the Media Player widget for Huement User Interface. It is not included in the basic HUI package and must be included separately on any page you want to play HTML5 Audio and Video. You will also need to include a SWF Flash fallback for older devices (should you wish to support them). There are numerous ways to do this, but we recommend Google's method. More on required scripts later.

Why You might want AMP
----------------------
AMP is great at playing all sorts of Audio and Video Codecs. Unlike traditional audio and video players which rely heavily on CSS Sprites or Massive image files for their markup, AMP is dynamic. It will scale to your viewport. This means the same music player will work on an iPhone, or a Desktop.

AMP relies heavily on HUI for this. It might be possible to adapt AMP to other projects without HUI, but the HUI base file is only like 10kb anyways, So I recommend just using that for your reset (im biased).

AMP allows you to easily load in an XML File, or send a JSON array with your Playlist Information. It also does most of the markup creation in the code, so there is very little work for the developer. Making it ideal for situations where the person creating the playlist doesn't know alot of HTML coding.

Installing AMP
--------------
Like most jQuery plugins, this one comes in two parts. The Plugin file [amp.js] and the CSS Style sheet theme of your choosing.

Wordpress Plugin
----------------
AMP IS ALREADY INCLUDED in the main HUI wordpress theme. This is super simple for creating playlists as blog posts or side bar widgets.

AMP PLAYLIST CREATION
---------------------
You can use the HUI website to create AMP Playlists for you. The media will automatically be stored in your Dropbox or Google Drive folder.

Acknowledgements
----------------
hui | huement user interface

Copyright (c) 2012 huement
Licensed under the MIT and GPL licenses.
http://www.opensource.org/licenses/mit-license.php
http://opensource.org/licenses/gpl-3.0.html

Author: Derek Scott @huement.
