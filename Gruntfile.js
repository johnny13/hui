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
    // Task configuration.
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
		  }
    },
    jshint: {
      options: {
        jshintrc: 'assets/javascripts/.jshintrc'
      },
      src: {
        src: ['assets/javascripts/*.js']
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
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'assets/stylesheets/bootstrap_built.css': 'assets/stylesheets/bootstrap.scss',
					'assets/stylesheets/font-awesome_built.css': 'assets/stylesheets/font-awesome/font-awesome.scss',
					'assets/stylesheets/hui_built.css': 'assets/stylesheets/hui.scss'
        }
      }
    },
    /*
    * Minify CSS Files
    */
		cssmin: {
		  minify: {
	      options: {
	        banner: '<%= pkg.name %>-<%= pkg.version %>',
	      },
        files: {
					'dist/css/hui-min.css': ['assets/stylesheets/bootstrap_built.css', 'assets/stylesheets/font-awesome_built.css','assets/stylesheets/hui_built.css']
        }
		  },
		},
    /*
    * Combine Sass Files
    */
		concat: {
      options: {
        banner: '<%= tag.banner %> <%= tag.bootbanner %>',
        stripBanners: false
      },
      javascript: {
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
          'assets/javascripts/hui/actions.js', // additional hui functions
          'assets/javascripts/hui/bootstrap-switch.js', // checkboxes
          'assets/javascripts/hui/offcanvas.js', // checkboxes
          'assets/javascripts/hui/colors.js', // When Its Gotta be Hot
          'assets/javascripts/hui/cookie.js', // Browser to Jquery Cookie Delivery
          'assets/javascripts/hui/form.js', // Usability Upgrades
          'assets/javascripts/hui/hammer.js', // touch sensitive
          'assets/javascripts/hui/history.js' // HTML5 History or Bust
        ],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      },
			stylesheets: {
	      src: ['assets/stylesheets/bootstrap_built.css','assets/stylesheets/font-awesome_built.css','assets/stylesheets/hui_built.css'],
	      dest: 'dist/css/<%= pkg.name %>-<%= pkg.version %>.css',
	    },
    },
    /*
    * Jade Templates
    * Compile Jade Templates using package.json data
    *
    * Used for creating the documentation
    */
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true,
          data: require('./package.json')
          //,delimiters: 'handlebars-like-delimiters'
        },
        files: [ {
          cwd: "jade",
          src: ["**/index.jade", "**/getting_started.jade", "**/components.jade", "**/css.jade", "**/javascript.jade", "**/tweak.jade"],
          dest: "docs",
          expand: true,
          ext: ".html",

          rename: function () {
            // use the source directory to create the file
            // example with your directory structure
            var Xdest = '', src = 'docs/index.html/*';
            return Xdest + src.substring(0, src.indexOf('/'));
          }
        } ]
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
      jadedocs: {
        files: 'jade/{,*/}*.{html,jade}',
        tasks: ['jade']
      }
    },
    /*
    * Minify Final Javascript Results
    */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    /*
    * Grunt Bump
    * Optional Task used for Releasing New Versions
    */
    bump: {
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
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-jade');
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
  
  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'sass', 'concat', 'cssmin', 'uglify']);
  
  // Command You run when you're editing the documentation
  grunt.registerTask('docs', ['jade', 'watch:jadedocs']);
	
  // Command You run when you're editing the documentation
  grunt.registerTask('docsbuild', ['cssmin']);
	
  //Style Sheets Only
  grunt.registerTask('style', ['sass', 'cssmin', 'concat:stylesheets']);
  
  // Release New version unto the world
  grunt.registerTask('bump', ['bumper']);
};