#hui - Classy like a Lady

hui is an under development web framework. It has two main areas, CSS and JS.    

css technologies include SVG icons, google style buttons, @font-face    

javascript is plenty of dynamic content widgets, and overall ui enhancements, as well as a number of useful scripts, like select box plugins, reactive navigation and animations.

## Why hui?
hui provides a great ui environment. Load the hui library and a theme and you've got a basic setup that can get your next project started quickly.

you can also rest assured that anything you build is going to work across all browsers. With special support for scaling to retina and television size displays.

the majority of hui is contained within the CSS theme file, the small javascript library shouldn't interfere with any of your other plugins. All hui code uses GruntJS and JSLint to ensure quality is maintained. In addition we also use Quint testing for a case by case breakdown of the library's core functions.

#### Automatic Functionality 

Items like Browser Resets, Media Queries, HTML5 Fallbacks & Shiv's, and oldIE Fixers.    

#### Write Better Code

Improve standard site elements, such as font-face Typography, SVG Icons. Page and app layout assistance with a 12 column grid and a Sprite Image backed button framework. Use the included node.js and sass setup to create clean and minified code unique to your site. Easily integrate your own style sheets by simply dropping them in the appropriate folder (js, css, sass) and calling the GruntJS command.   

#### Dynamic Plugins    

Git Submodules made adding on functionality easy. Clone plugins and load them on a page by page basis.    

## Download hui
Clone this repository into your projects web-root directory.    
    
    $ git clone https://github.com/johnny13/hui.git /your/webroot    
    

## Download plugins
### Optionally Setup the Plugins (optional but recommended)
Step 1. clone plugin repo into hui repo.   
    
    $ cd hui   
	$ git submodule init     
    $ npm install    
    

Step 2A. activate entire plugin system.    
    
	$ git clone https://github.com/johnny13/hui-plugins.git
	$ cd hui-plugins
	$ git submodule update --init --recursive  
    

Step 2B. OR activate single plugin (eg. slideshow plugin)    
    
    $ git submodule init Thimbleberry
    

Note: Its Important to immediately UPDATE Any Plugins you want to use.    
    
    $ cd ./hui-plugins/<plugin name>
    $ git pull origin master
    

More information about downloads, installs, cdn versions, plugin updates, builds and developer packages can be found at [hui.huement.com/start](http://hui.huement.com/start/).    

## Using hui    
Install is typical of most jQuery projects. It's recommended that you include the [Modernizr](http://modernizr.com/) library and a CSS theme file in your header, while jQuery and the hui library are loaded before the closing Body tag, but that is not required. If you dont use modernizr, you should include the [html5shiv](https://huementui.s3.amazonaws.com/cdn/html5shiv.js) here for backwards compatibility with older browsers. modernizr includes it already.

Included in the dist folder are two themes, hui-dark.css or hui-light.css. They are a combination of their respective Themes and the hui-x.xx.x.css file. Including one of them in your header is all you need to do. If you would like to build your own theme, checkout [theme building](https://github.com/johnny13/hui#theme-building) go here: [hui.huement.com/themes/](http://hui.huement.com/themes/).
    

```html
    <head>
    <link href="dist/hui-light.css" type="text/css" rel="stylesheet"/>   
    <script src="libs/modernizr/modernizr-min.js"></script>    
    </head>
    
    <body>
	<!-- some stuff -->
    <script src="libs/jquery/jquery.js"></script>
	<script src="dist/hui.min.js"></script>
	</body>
```

## Theme Building    
If you want to really customize the look and feel of hui for your site, the easiest way to do this, is simply swap out the hui-dark.css or hui-light.css minified theme for the hui-x.xx.x.css unminifed base css file. 

This will give you a base core. Next copy the dark or light dev-theme.css file. Now link your new file AFTER the unminifed hui.css on your page header. Finally you can now customize your new theme, or make changes to the core should you need to.

    
Full Theme information can be found at [hui.huement.com/themes/](http://hui.huement.com/themes/)    


## Build & Customize. Fall in Love.

hui uses a number of Node.js modules. Inclduing GruntJS, Sass, QUnit Tests, and PhantomJS to ensure quality code is written. These programs also benefit you the developers by allows for all sorts of custom setups and allows you to easily integrate other plugins and themes.  Drop in your custom plugins and style sheets, use the Grunt or Sass commands and get a unique hui build in seconds.
    
 * Grunt.JS : [http://gruntjs.com/](http://gruntjs.com/)
 * Grunt Sass : [http://github.com/sindresorhus/grunt-sass](https://github.com/sindresorhus/grunt-sass)
 * Phantom.JS : [http://phantomjs.org/](http://phantomjs.org/)
 * QUint Tests : [http://qunitjs.com/](http://qunitjs.com/)
    

if you would just like to download all the modules we use in one shot, get this Zip File and place it in the hui folder.
[http://huementui.s3.amazonaws.com/cdn/node_modules.zip](http://huementui.s3.amazonaws.com/cdn/node_modules.zip)


## Major Change log
   
v0.0.1	[jan-01-2013]	Released under GPL v3 & MIT    

..

v0.1.6	[may-15-2013]	Sass Themes. Demos and Widgets Updated.

v0.2.0	[may-19-2013]	Forms Implemented. TODO: Input Masking
    

## De jure
#### copyright (c) 2013 [huement.com](http://huement.com)    
Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) & [GPL v3](http://opensource.org/licenses/gpl-3.0.html) licenses.    
    
Author: Derek Scott [@huement.com](https://twitter.com/huement).    

### Acknowledgements
Thanks to all giants and plugin authors shoulders this framework is standing on.    
Credits to any forks can be found in the un-minified javascript file.

    

![hui - Huement User Interface](http://huement.s3.amazonaws.com/imgs/white_pumpkin.jpg)  