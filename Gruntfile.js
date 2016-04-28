/*!
 * HUI Up All Night Gruntfile
 * hui.huement.com
 * @author Derek Scott
*/

/**
 * Grunt Module
*/
module.exports = function (grunt) {
  'use strict';
  grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}');
  // Project configuration.
  grunt.initConfig({
  // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    appdata: grunt.file.readJSON('./app/package.json'),
    /**
     * Project banner
     */
    tag: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' License: <%= pkg.license.type %> */' + "\n",
      bootbanner: "\n" + "/*! -- I Built This. Dont Hate. -- */" + "\n" + "\n" + "\n",
      iebanner: "\n" + "/*! -- Internet Explorer Users Are People Too -- */" + "\n" + "\n" + "\n"
    },
    jqueryCheck: 'if (!jQuery) { throw new Error(\"HUI requires jQuery\") }\\n\\n',
    // Only for 
    clean: {
      dist: ['dist']
    },
    /*
    * Grunt Copy
    * used for moving assests to dist
    */
    copy: {
      fonts: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, flatten: true, src: ['assets/fonts/**'], dest: 'dist/fonts', filter: 'isFile'}
        ]
      },
      IEStuff: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['assets/stylesheets/IE/*'], dest: 'dist/IE', filter: 'isFile'}
        ],
      },
      app: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['dist/*'], dest: 'app/libs/hui', filter: 'isFile'}
        ],
      }
    },
    jshint: {
      library: {
        options: {
          jshintrc: 'assets/javascripts/.jshintrc'
        },
        src: ['assets/javascripts/*.js']
      },
      app: {
        options: {
          jshintrc: 'app/js/.jshintrc'
        },
        src: ['app/js/*.js']
      }
    },
    /**
     * Sass ( optional Compass )
     *
     * You can set the Compass Option to True. However you need Ruby-compass gems and other requirements.
     * I was able to get it working w/ homebrew on my mac, but 13.10 ubuntu had issues
     *
     * It probably will work for you w/o it on. Its defaulted to off.
     *
     */
    sass: {
      library: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'assets/stylesheets/bootstrap_built.css': 'assets/stylesheets/bootstrap.scss',
          'assets/stylesheets/font-awesome_built.css': 'assets/stylesheets/font-awesome/font-awesome.scss',
          'assets/stylesheets/hui_built.css': 'assets/stylesheets/hui.scss'
        }
      },
      app: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'app/css/styles.css': 'app/sass/styles.scss'
        }
      }
    },
    /*
    * Minify CSS Files
    */
    cssmin: {
      library: {
        options: {
          banner: '<%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>',
        },
        files: {
          'dist/css/hui-min.css': ['assets/stylesheets/bootstrap_built.css', 'assets/stylesheets/font-awesome_built.css','assets/stylesheets/hui_built.css']
        }
      },
      app: {
        options: {
          banner: '<%= appdata.name %>-<%= appdata.version %> <%= grunt.template.today("yyyy-mm-dd") %>',
        },
        files: {
          'dist/css/<%= appdata.name %>.min.css': ['app/css/<%= appdata.name %>.css']
        }
      }
    },
    /*
    * Combine JS & CSS Files
    */
	concat: {
      options: {
        banner: '<%= grunt.template.today("yyyy-mm-dd") %>',
        stripBanners: false
      },
      libraryjs: {
        src: [
          'assets/javascripts/bootstrap/transition.js',
          'assets/javascripts/bootstrap/alert.js',
          'assets/javascripts/bootstrap/button.js',
          'assets/javascripts/bootstrap/carousel.js',
          'assets/javascripts/bootstrap/collapse.js',
          'assets/javascripts/bootstrap/dropdown.js',
          'assets/javascripts/bootstrap/modal.js',
          'assets/javascripts/bootstrap/tooltip.js',
          'assets/javascripts/bootstrap/popover.js',
          'assets/javascripts/bootstrap/scrollspy.js',
          'assets/javascripts/bootstrap/tab.js',
          'assets/javascripts/bootstrap/affix.js',
          'assets/javascripts/hui/equalheights.js',      // EqualHeight Plugin
          'assets/javascripts/hui/actions.js',          // additional hui functions
          'assets/javascripts/hui/bootstrap-switch.js', // checkboxes
          'assets/javascripts/hui/offcanvas.js',        // sliding menu
          'assets/javascripts/hui/colors.js',           // When Its Gotta be Hot
          'assets/javascripts/hui/storage.js',          // Localstorage
          'assets/javascripts/hui/form.js',             // Usability Upgrades
          'assets/javascripts/hui/hammer.js',           // touch sensitive
          'assets/javascripts/hui/history.js'          // HTML5 History or Bust
          
        ],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      librarystyle: {
        src: ['assets/stylesheets/bootstrap_built.css','assets/stylesheets/font-awesome_built.css','assets/stylesheets/hui_built.css'],
        dest: 'dist/css/<%= pkg.name %>-<%= pkg.version %>.css',
      },
      appjs: {
        src: [
          'app/js/*.js', // Minify App Code
          '!app/js/<%= appdata.name %>.js'
        ],
        dest: 'app/js/<%= appdata.name %>.js'
      },
      appstyle: {
        src: ['app/css/*.css', '!app/css/<%= appdata.name %>.css', '!app/css/styles.css'],
        dest: 'app/css/<%= appdata.name %>.css',
      }
    },
    /*
    * Jade Templates
    * Compile Jade Templates using package.json data
    *
    * Used for creating the documentation
    */
    pug: {
      docs: {
        options: {
          client: false,
          pretty: true,
          expand: true,
          ext: ".html",
          data: function(dest, src) {
              // Return an object of data to pass to templates
              return require('./package.json');
          }
        },
        files: {
          "docs/index.html": "jade/index.jade",
          "docs/getting_started.html": "jade/getting_started.jade",
          "docs/components.html": "jade/components.jade",
          "docs/css.html": "jade/css.jade",
          "docs/javascript.html": "jade/javascript.jade",
          "docs/tweak.html": "jade/tweak.jade",
        }
      }
    },
    /*
    * Watch - not setup by default
    */
    watch: {
      sass: {
        files: 'assets/stylesheets/{,*/}*.{scss,sass}',
        tasks: ['sass', 'cssmin', 'concat:stylesheets']
      },
      library: {
        files: ['assets/stylesheets/{,*/}*.{scss,sass}','assets/javascripts/{,*/}*.js'],
        tasks: ['librarybuild']
      },
      jadedocs: {
        files: 'jade/{,*/}*.{html,jade}',
        tasks: ['pug:docs']
      },
      app: {
        files: ['app/sass/{,*/}*.{scss,sass}','app/js/{,*/}*.js'],
        tasks: ['appbuild']
      },
    },
    /*
    * Minify Final Javascript Results
    */
    uglify: {
      library: {
       options: {
          banner: '/*! <%= pkg.name %> <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>-<%= pkg.version %>.js']
        }
      },
      app: {
        options: {
          banner: '/*! <%= appdata.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'app/js/<%= appdata.name %>.js': ['app/js/<%= appdata.name %>.min.js']
        }
      }
    },
    /*
    * Grunt Bump
    * Git Task used for Releasing New Versions
    */
    bump: {
      hui: {
        options: {
          files: ['package.json', 'bower.json'],
          updateConfigs: ['pkg', 'bower'],
          add: true,
          addFiles: ['.'],
          commit: true,
          commitMessage: 'Release ver %VERSION%',
          commitFiles: ['-a'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          npm: false,
          npmTag: "Release v%VERSION%",
          gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
        }
      },
      app: {
        options: {
          files: ['app/package.json', 'app/bower.json'],
          updateConfigs: ['appdata'],
          add: true,
          addFiles: ['.'],
          commit: true,
          commitMessage: 'Release ver %VERSION%',
          commitFiles: ['-a'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          npm: false,
          npmTag: "Release v%VERSION%",
          gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-push-release');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
	
  /**
   * Load Grunt plugins.
   * call these from the command line, or just grunt for default.
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('default', 'Basic GruntJS Task', function() {
    grunt.log.writeln(' ');
    grunt.log.writeln('--------- HUI COMMANDS ---------');
    grunt.log.writeln(' ');
    grunt.log.writeln('Build deployable WebApps');
    grunt.log.writeln('---------------');
    grunt.log.writeln('appbuild     - Build /app/ JS & SASS & JADE once');
    grunt.log.writeln('applive      - LiveBuild /app/ JS & SASS & JADE');
    grunt.log.writeln(' ');
    grunt.log.writeln('Library JS & SASS Builder');
    grunt.log.writeln('---------------');
    grunt.log.writeln('librarybuild - Build /assets/ into /dist/ JS & SASS (will delete /dist/)');
    grunt.log.writeln('librarylive  - LiveBuild /assets/ JS & SASS');
    grunt.log.writeln('huistyle     - Build /assets/stylesheets SASS once');
    grunt.log.writeln('huistylelive - LiveBuild /assets/stylesheets SASS');
    grunt.log.writeln(' ');
    grunt.log.writeln('HUI Documentation');
    grunt.log.writeln('---------------');
    grunt.log.writeln('docsbuild    - Build /jade/ once');
    grunt.log.writeln('docslive     - LiveBuild /jade/ directory');
  });
  
  // Editing the documentation for a while
  grunt.registerTask('docslive', ['pug:docs', 'watch:jadedocs']);
  // Rebuild the docs once
  grunt.registerTask('docsbuild', ['pug:docs']);

  // Build Sample App Once
  grunt.registerTask('appbuild', ['jshint:app', 'sass:app', 'concat:app', 'cssmin:app', 'uglify:app']);
  // App Live Reload Server
  grunt.registerTask('applive', ['appbuild', 'watch:app']);
  
  // Rebuild the HUI Library
  grunt.registerTask('librarybuild', ['jshint:library', 'clean', 'copy:fonts', 'copy:IEStuff', 'sass:library', 'concat:libraryjs', 'concat:librarystyle', 'cssmin:library', 'uglify:library']);
  // App Live Reload Server
  grunt.registerTask('librarylive', ['appbuild', 'watch:library']);
  
  //Style Sheets Only
  grunt.registerTask('huistyle', ['sass:library', 'cssmin:library', 'concat:appstyle']);
  //Style Sheets Only
  grunt.registerTask('huistylelive', ['huistyle', 'watch:sass']);
  
  // Release New version unto the world
  grunt.registerTask('bump', ['bumper:hui']);
  
  // Release New version unto the world
  grunt.registerTask('appdeploy', ['bumper:app']);
};