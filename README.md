hui - Classy like a Lady
======

hui [Huement User Interface] can adapt to viewport sizes, and has multiple fallbacks for various end user systems. It also supports a standard touch interface from the get go, and can be easily integrated into any project, online or offline. Basically a great option for any project supporting javascript and css.    

## Why hui?
hui aims to make your design process two things, Simple & Stylish.  
It does this by breaking things into a smaller pieces.

#### Area 1| Internals  Controls   

Items like Browser Resets, Media Queries, HTML5 Fallbacks & Shiv's, and oldIE Fixers.    

#### Area 2| CSS Theme and  JS Widgets    

Items like Typography, Colors, Modal Windows, and the likes.    

#### Area 3| Plugin Library    

Submodule setups for available addons. Easy to manage and update! Use what you need when you need it.    

## Download hui
1. required main library
    
    git clone https://github.com/johnny13/hui.git    
    

2. (optional but recommeneded) git Plugin Manager
    
    cd hui;    
    git clone https://github.com/johnny13/hui-plugins.git    
    cd hui-plugins;    
    

A. activate entire plugin system.    
    
    git submodule init    
    

B. activate single plugin (eg. slideshow plugin)    
    
    git submodule init Thimbleberry
    

Important to UPDATE Any Plugins you want to use.    
    
    cd ./hui-plugins/<plugin name>
    git pull origin master
    
More information about downloads, installs, cdn versions, plugin updates, builds and developer packages can be found at [hui.huement.com/start](http://hui.huement.com/start/).    

## Install hui    
Install requires you load each of the three interface elements, css, js and html.    

How you do this is mostly up to you, depending on what your needs are.    

the Minimal 25kb CSS Base file is required [hui-base-min.css](https://raw.github.com/johnny13/hui/master/dist/hui-base-min.css). You can either directly include that in your header, or have it loaded with a theme. Full Theme information can be found at [hui.huement.com/themes/](http://hui.huement.com/themes/).    
    
    <link href="hui/src/themes/dark/dev-theme.css" type="text/css" rel="stylesheet"/>    
    
Themes are not minifed as you will probably want to change or tweak a few things.    
GruntJS is included and can easily help you minify or concat any css files when you are ready for production.    

## Alternative Install    

hui can be included via HTTP(S):// CDNs.the Minimal 25kb-ish CSS_Base is required (hui-min-latest.css).    
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

Once you have hui installed, visit the Tests folder in a web browser to confirm everything is working correctly.    
After that, start building from scratch, or use one of our boilerplates.    
You should also consider setting up GruntJS so you can build your own custom version on the fly and allow for your codebase to grow and adapt.    
    
hui Main Page: [hui.huement.com](http://hui.huement.com).    
More Info on Our Blog: [huement.com/blog/](http://huement.com/blog/).

## Build, Hack & Customize. Fall in Love.

hui Uses GruntJS, QUnit Tests, and PhantomJS to ensure quality code is maintained. It also allows for all sorts of custom setups and allows you to easily integrate other plugins and themes.    
    
 * Grunt.JS : [http://gruntjs.com/](http://gruntjs.com/)
 * YUI Grunt Module : [https://github.com/mathiasbynens/grunt-yui-compressor](https://github.com/mathiasbynens/grunt-yui-compressor)
 * Phantom.JS : [http://phantomjs.org/](http://phantomjs.org/)
 * QUint Tests : [http://qunitjs.com/](http://qunitjs.com/)

## Smart and Stylish

hui has extensive documentation, a theme generator, and more helpful tools available at [hui.huement.com/docs/](http://hui.huement.com/docs/)    
In addition, there is a comprehensive demo included in the download. As well as a number of example boilerplates on the website for download and inspiration.


## Everybody's doing it

#### Turn ON    
Hey Kids, Lets get it ON. Always practice Safe Sex, and Use a Strict NO Conflict environment.    
hui's JS wont interfere with other JS Libraries, and frees up the ole $.() for anything you might need it for.
    
#### Tune IN     
hui has plenty of ways to increase your user INteractions. With Support for CSS transitions, Mobile Gestures, Keyboard Navigation, and upgraded Form Inputs.
    
#### Drop OUT
Reach OUT to all the platforms. Use Tools to display not only results, but page elements, both on load and dynamically. Extend data with Functions like an HTML5 History plugin, jQuery Cookies, and Flexible Navigation menus. 
    

## Major Changelog
   
v1.10.0	[jan-01-2013]	Released under GPL v3 & MIT    
    
v1.13.0	[jan-14-2013]	Added GruntJS, YUI Compressor & QUint Test Suite    

v1.13.2	[jan-18-2013]	Facebox & Notify mobile support added.

## De jure
#### copyright (c) 2013 [huement.com](http://huement.com)    
Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) & [GPL v3](http://opensource.org/licenses/gpl-3.0.html) licenses.    
    
Author: Derek Scott [@huement.com](https://twitter.com/huement).    

![hui - Huement User Interface](http://huement.s3.amazonaws.com/imgs/white_pumpkin.jpg)    
    

### Acknowledgements
Thanks to all giants and plugin authors shoulders this framework is standing on.    
Credits to any forks can be found in the un-minified javascript file.
