#hui

hui is an under development web framework. Its aim is to add and augment existing Bootstrap 3 CSS, Components and Javascript. It uses SASS in place of Bootstrap's regular LESS.

## Download hui

Clone this repository into your projects web-root directory. It's still under heavy development so its not recommended for production usage.    
    
    $ git clone https://github.com/johnny13/hui.git /your/webroot

## Build Environment
This step will allow you to quickly theme and alter hui to your preferences. It requires Node.js, GruntJS, Ruby and SASS. Once all of those libraries are available globablly on your system you should be able to add the remaining Node packages via Node.js Package Manager (npm).   
  
#### Ruby & Sass
This project requeires Ruby and SASS to be installed. If you are on Linux or Mac you probably have ruby installed and all you have to do is run this command.
  
    $ gem install sass    
  
Otherwise you will also need to install Ruby. 
  
#### Node.js
You will need Node installed on your system. [http://nodejs.org/download/](http://nodejs.org/download/)

    $ cd hui
    $ npm install   
    $ grunt default
  
If that command works you should be good to. You can begin making your changes to hui or core bootstrap files and see the results in the /dist/ directory when grunt has finished.


### Next Steps

Checkout the Docs section for detailed explanation and code examples. There are a number of live demos in the docs/demos folder that will further highlight a number of HUI's best features.
  
  
    $ grunt docs
    
  
Will give you a rough app template and webserver with jade and live update. You could modify this in the gruntfile to start your own simply web app. 
  
If you already have a project, simply replace your bootstrap.css and bootstrap.js files with the respective hui files from the dist folder. You will also need to copy over any fonts you wish to use. Otherwise its a pretty standard boostrap setup. Checkout the hui website for more information. 
  
