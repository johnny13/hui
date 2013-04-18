Theme Information:

There are two starter themes included with hui. Light and Dark. They are used in conjunction with with the base css.

Mostly they allow you to override default styles and add on to any hui plugin. It saves you from having to navigate around the core css file, which can be a bit unwieldy. Editing anything in there can be a nightmare.

The img folder gives you an example of what images are used, but don't forget about the 240 included icons already built into hui! The quickest way to get started is simply duplicate the light are dark folder and hack away.

In the dist/ directory, you will find minified versions of the Light and Dark themes. If you open the Gruntfile.js you can see that they are created by merging the hui-$ver.css with dev-theme.css and then minified down. 