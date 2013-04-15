hui - Classy like a Lady
======

hui [Huement User Interface] can adapt to viewport sizes, and has multiple fallbacks for various end user systems. It also supports a standard touch interface from the get go, and can be easily integrated into any project, online or offline. Basically a great option for any project supporting javascript and css.    

## Why hui?
hui aims to make your design process two things, Simple & Stylish.  
Some of it's best features, and reason you might consider using it:

#### Automatic Functionality 

Items like Browser Resets, Media Queries, HTML5 Fallbacks & Shiv's, and oldIE Fixers.    

#### Basically Better

Improve standard site elements, such as Typography, Icons and Images, Animations and Grid Layouts.   

#### Area 3| Plugin Library    

Git Submodules made adding on functionality easy. Clone plugins and load them on a page by page basis.    

## Download hui
Step 1. required main library [typically do this in your projects web-root directory]    
    
    git clone https://github.com/johnny13/hui.git    
    

Step 2. (optional but recommended) hui Plugin Manager    
    
    cd hui    
    git clone https://github.com/johnny13/hui-plugins.git    
    cd hui-plugins    
    

Step 2A. activate entire plugin system.    
    
    git submodule init    
    

Step 2B. OR activate single plugin (eg. slideshow plugin)    
    
    git submodule init Thimbleberry
    

Note: Its Important to immediately UPDATE Any Plugins you want to use.    
    
    cd ./hui-plugins/<plugin name>
    git pull origin master
    

More information about downloads, installs, cdn versions, plugin updates, builds and developer packages can be found at [hui.huement.com/start](http://hui.huement.com/start/).    

## Install hui    
Install is typical of most jQuery projects. It's recommended that you include the [Modernizr](http://modernizr.com/) library and a CSS theme file in your header, while jQuery and the hui library are loaded before the closing Body tag, but that is not required. If you dont use modernizr, you should include the [html5shiv](https://huementui.s3.amazonaws.com/cdn/html5shiv.js) here for backwards compatibility with older browsers. modernizr includes it already.

Included in the dist folder are two themes, hui-dark.css or hui-light.css. They are a combination of their respective Themes and the hui-x.xx.x.css file. Including one of them in your header is all you need to do. If you would like to build your own theme, checkout the theme building section of this readme or go here: [hui.huement.com/themes/](http://hui.huement.com/themes/).
    

```html
    <head>
    <link href="dist/hui-light.css" type="text/css" rel="stylesheet"/>   
    <script src="libs/modernizr/modernizr-min.js"></script>    
    </head>
    
    <body>
    <script src="libs/jquery/jquery.js"></script>
	<script src="dist/hui.min.js"></script>
	</body>
```

## Theme Building    
If you want to customize hui for your site, the easiest way to to swap out the hui-dark.css or hui-light.css theme for the hui-x.xx.x.css unminifed base css file. This will give you a base core. Now copy the dark or light dev-theme.css file, and add your new file AFTER the unminifed hui.css. Now customize to your hearts content!

    
Full Theme information can be found at [hui.huement.com/themes/](http://hui.huement.com/themes/)    

    
## Get Cracking   

Once you have hui installed, visit the Tests folder in a web browser to confirm everything is working correctly.    
After that, start building from scratch, or use one of our HTML boilerplates.    
You should also consider setting up GruntJS so you can build your own custom version on the fly and allow for your codebase to grow and adapt.    
    
hui Main Page: [hui.huement.com](http://hui.huement.com).    
More Info on Our Blog: [huement.com/blog/](http://huement.com/blog/).

## Build, Hack & Customize. Fall in Love.

hui Uses GruntJS, QUnit Tests, and PhantomJS to ensure quality code is maintained. It also allows for all sorts of custom setups and allows you to easily integrate other plugins and themes.    
    
 * Grunt.JS : [http://gruntjs.com/](http://gruntjs.com/)
 * YUI Grunt Module : [https://github.com/mathiasbynens/grunt-yui-compressor](https://github.com/mathiasbynens/grunt-yui-compressor)
 * Phantom.JS : [http://phantomjs.org/](http://phantomjs.org/)
 * QUint Tests : [http://qunitjs.com/](http://qunitjs.com/)
    

## Major Change log
   
v1.10.0	[jan-01-2013]	Released under GPL v3 & MIT    

v1.13.5	[feb-12-2013]	Majorish Update! List styles added. Notefy revamp. CSS Cleanup.

v1.15.2	[apr-14-2013]	Woo! Framework cleaned up in a major effort to get production ready.
    

## De jure
#### copyright (c) 2013 [huement.com](http://huement.com)    
Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) & [GPL v3](http://opensource.org/licenses/gpl-3.0.html) licenses.    
    
Author: Derek Scott [@huement.com](https://twitter.com/huement).    

![hui - Huement User Interface](http://huement.s3.amazonaws.com/imgs/white_pumpkin.jpg)    
    

### Acknowledgements
Thanks to all giants and plugin authors shoulders this framework is standing on.    
Credits to any forks can be found in the un-minified javascript file.
