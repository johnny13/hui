Huement User Interface [ HUI ]
======

Huement User Interface *[HUI]* can adapt to viewport sizes, and has multiple fallbacks for various end user systems. It also supports a standard touch interface from the get go, and can be easily integrated into any project, online or offline, anywhere supporting javascript and css.

*HUI* aims to make your design process two things, Simple & Stylish.  
It does this by breaking things into a modular architecture.

Allowing you to focus on either: 

1. *Internal Workings*. Items like Browser Resets. HTML5 Shiv's, and Internet Explorer 8 Compatibility.
2. *Page Theme and general Widget Styles*. Items like Typography, Colors, Modal Windows, and the likes.

## Install HUI in 2 Easy Steps
*HUI* can be worked into your project in a few different ways. First, you will want to include the style sheet in your header. 

1. Include css theme in HTML page header.
<link href="css_base/hui-min-latest.css" type="text/css" rel="stylesheet"/>

2. Load jQuery and HUI Library. [Preferably before closing </body> tag]    

body CDN example:    
```javascript    
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>    
    <script type="text/javascript">window.jQuery || document.write('<script type="text/javascript" src="js/jquery-1.8.3.min.js"><\/script>')</script>    

    <script type="text/javascript" src="//huementui.s3.amazonaws.com/hui-min-latest.js"></script>    
    <script type="text/javascript">window.jQuery || document.write('<script type="text/javascript" src="js/hui-1.10.js"><\/script>')</script>    
```

You can also optionally select a theme, which will provide some basic style elements, css buttons, and a number of other helpful additions. Full information can be found at huement.com/hui/themes

### Stylish Docs

*HUI* has extensive documentation, a theme generator, and more helpful tools available at [hui.huement.com](http://hui.huement.com)


### javascript anywhere

The next item you'll want to include is the javascript file, hui.js or hui-min.js. This can be placed in the header or footer, depending on your preferences. for speed purposes you should load all your javascript in the footer.

This script will make a number of helpful ui additions to your standard jquery library. hui.js includes alot of helpful functions. shuffle, preload images, notefy command, color change animations, modal window, tool tips, and the jquery easing library. Along with other things. Full information can be found at huement.com/hui/code

### jQuery on, jQuery in, Design out

Those two files should give you a fully working framework, capable of getting your app quickly up and off the ground. Examples, and more information can be found at huement.com/hui

"Turn on" meant go within to activate your neural and genetic equipment. Become sensitive to the many and various levels of consciousness and the specific triggers that engage them. Drugs were one way to accomplish this end. "Tune in" meant interact harmoniously with the world around you - externalize, materialize, express your new internal perspectives. "Drop out" suggested an active, selective, graceful process of detachment from involuntary or unconscious commitments. "Drop Out" meant self-reliance, a discovery of one's singularity, a commitment to mobility, choice, and change. Unhappily my explanations of this sequence of personal development were often misinterpreted to mean "Get stoned and abandon all constructive activity".

## Acknowledgements
Thanks to all giants and plugin authors shoulders this framework is standing on.    
Credits to any forks can be found in the un-minified javascript file. 

#### Copyright (c) 2012 [huement.com](http://huement.com)    
Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) & [GPL v3](http://opensource.org/licenses/gpl-3.0.html) licenses.    
    

Author: Derek Scott [@huement.com](https://twitter.com/huement).    

![HUI - Huement User Interface](https://huementui.s3.amazonaws.com/images/gitpumpkin.png)