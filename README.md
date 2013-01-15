HUI - Classy like a Lady
======

HUI [Huement User Interface] can adapt to viewport sizes, and has multiple fallbacks for various end user systems. It also supports a standard touch interface from the get go, and can be easily integrated into any project, online or offline, anywhere supporting javascript and css.

## Why HUI?
HUI aims to make your design process two things, Simple & Stylish.  
It does this by breaking things into a smaller pieces.

A Neat Modular Structure. separate script, design and basic UI/UX elements.

#### Area 1| CSS Internals    

Items like Browser Resets. HTML5 Shiv's, and Internet Explorer 8 Compatibility.    

#### Area 2| CSS Theme and Widgets    

Items like Typography, Colors, Modal Windows, and the likes.    

#### Area 3| Javascript Library    

All the required code to make everything sing.

## Install HUI    

HUI is HTTPS:// and CDN ready to get it on out of the box. Style sheet wise, the Minimal 25kb-ish CSS_Base is required (hui-min-latest.css).    
For a totally custom build, load a full theme. Along with the basic CSS style elements, tap into all default widgets and displays.    
Full Theme information can be found at [hui.huement.com/themes/](http://hui.huement.com/themes/)    


#### Step 1| Include CSS base *OR* CSS theme in HTML Header.   
    
     css_base/hui-min-latest.css   
     css_themes/dark/theme-min.css   
    

#### Step 2| Load Javascript Libraries (http or https).  
    
    ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js    
    huementui.s3.amazonaws.com/cdn/hui-min-latest.js    
    

Preferably load all Javascript before closing &lt;/body&gt; tag. However you can load everything inside the &lt;head&gt; &lt;/head&gt; if your app needs the additional security at the cost of load time.  
    
## Get Started    

Once you have HUI installed, visit the Tests folder in a web browser to confirm everything is working correctly.    
After that, start building from scratch, or use one of our boilerplates.    
You should also consider setting up GruntJS so you can build your own custom version on the fly and allow for your codebase to grow and adapt.    
    
HUI Main Page: [hui.huement.com](http://hui.huement.com).    
More Info on Our Blog: [huement.com/blog/](http://huement.com/blog/).

## Build, Hack & Customize. Fall in Love.

HUI Uses GruntJS, QUnit Tests, and PhantomJS to ensure quality code is maintained. It also allows for all sorts of custom setups and allows you to easily integrate other plugins and themes.    
    
 * Grunt.JS : [http://gruntjs.com/](http://gruntjs.com/)
 * YUI Grunt Module : [https://github.com/mathiasbynens/grunt-yui-compressor](https://github.com/mathiasbynens/grunt-yui-compressor)
 * Phantom.JS : [http://phantomjs.org/](http://phantomjs.org/)
 * QUint Tests : [http://qunitjs.com/](http://qunitjs.com/)

## Smart and Stylish

HUI has extensive documentation, a theme generator, and more helpful tools available at [hui.huement.com/docs/](http://hui.huement.com/docs/)    
In addition, there is a comprehensive demo included in the download. As well as a number of example boilerplates on the website for download and inspiration.


## Everybody's doing it

#### Turn ON    
Hey Kids, Lets get it ON. Always practice Safe Sex, and Use a Strict NO Conflict environment.    
HUI's JS wont interfere with other JS Libraries, and frees up the ole $.() for anything you might need it for.
    
#### Tune IN     
HUI has plenty of ways to increase your user INteractions. With Support for CSS transitions, Mobile Gestures, Keyboard Navigation, and upgraded Form Inputs.
    
#### Drop OUT
Reach OUT to all the platforms. Use Tools to display not only results, but page elements, both on load and dynamically. Extend data with Functions like an HTML5 History plugin, jQuery Cookies, and Flexible Navigation menus. 
    

## Changelog
   
v1.10	[jan-01-2013]	Released under GPL v3 & MIT    
    
v1.13	[jan-14-2013]	Added GruntJS, YUI Compressor & QUint Test Suite    

## De jure
#### copyright (c) 2013 [huement.com](http://huement.com)    
Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) & [GPL v3](http://opensource.org/licenses/gpl-3.0.html) licenses.    
    
Author: Derek Scott [@huement.com](https://twitter.com/huement).    

![HUI - Huement User Interface](http://huement.s3.amazonaws.com/imgs/white_pumpkin.jpg)    
    

### Acknowledgements
Thanks to all giants and plugin authors shoulders this framework is standing on.    
Credits to any forks can be found in the un-minified javascript file.
