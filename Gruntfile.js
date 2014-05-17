/*!
 * HUI Up All Night Gruntfile
 * hui.huement.com
 * @author Derek Scott
*/

/**
 * Grunt Module
*/
module.exports = function(grunt) {
  'use strict';
  grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}')
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
      bootbanner: "\n" + "/*! -- Built with Love and Bootstrap 3.1.1 -- */" + "\n" + "\n" + "\n",
      iebanner: "\n" + "/*! -- Internet Explorer Users Are People Too -- */" + "\n" + "\n" + "\n"
    },
    jqueryCheck: 'if (!jQuery) { throw new Error(\"HUI requires jQuery\") }\\n\\n',
    // Task configuration.
    clean: {
      dist: ['dist']
    },
    /**
    * Compile Fonts Folder
    */
    copy: {
      fonts: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, flatten: true, src: ['assets/fonts/**'], dest: 'dist/fonts', filter: 'isFile'}
        ]
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
    concat: {
      options: {
        banner: '<%= tag.banner %> <%= tag.bootbanner %>',
        stripBanners: false
      },
      bootstrap: {
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
          'assets/javascripts/hui/history.js', // HTML5 History or Bust
        ],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    /**
     * Sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          'dist/css/<%= pkg.name %>-<%= pkg.version %>.css': ['assets/stylesheets/bootstrap.scss','assets/stylesheets/font-awesome.scss','assets/stylesheets/hui.scss']
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          'dist/css/<%= pkg.name %>-min.css': ['assets/stylesheets/bootstrap.scss','assets/stylesheets/font-awesome.scss','assets/stylesheets/hui.scss']
        }
      }
    },
    /*
    * Minifify Regular CSS Files
    * used for the IE css right now but easily expandable.
    */
    cssmin: {
      combine: {
        options: {
          banner: '<%= tag.banner %> <%= tag.iebanner %>',
          stripBanners: false,
        },
        files: {
          'dist/css/IE/ie7-min.css': ['assets/stylesheets/IE/ie.css','assets/stylesheets/IE/bootstrap-ie7.css'], //Special Helper
          'dist/css/IE/ie8-min.css': 'assets/stylesheets/IE/ie8.css',  //IE8 Blank
          'dist/css/IE/ie9-min.css': 'assets/stylesheets/IE/ie9.css',  //IE9 Blank
          'dist/css/IE/ie10-min.css': 'assets/stylesheets/IE/ie10.css', //IE10 Blank
          'dist/css/IE/ie-min.css': 'assets/stylesheets/IE/ie.css' //Global IE File
        }
      }
    },
    /*
    * Jade Templates
    * Compile documentation
    */
    jade: {
        compile: {
            options: {
                client: false,
                pretty: true,
                data: grunt.file.readJSON("hui-data.json"),
                delimiters: 'handlebars-like-delimiters',
            },
            files: [ {
              cwd: "jade",
              src: ["**/index.jade","**/getting-started.jade","**/components.jade","**/css.jade","**/javascript.jade","**/tweak.jade"],
              dest: "docs",
              expand: true,
              ext: ".html",
              rename: function() {
                // use the source directory to create the file
                // example with your directory structure
                var Xdest = '';
                var src = 'docs/index.html/*';
                return Xdest + src.substring(0, src.indexOf('/'));
              }
            } ]
        }
    },
    /*
    template: {
        dev: {
          src: 'jade/pages/getting-started.html',
          dest: 'dev.html',
          variables: {
            css_url: 'app.css'
            title: 'Hello World',
            pretty: true
          }
        },
    },
    *
    * Watch - not setup by default
    */
    watch: {
      sass: {
        files: 'assets/stylesheets/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      jadedocs: {
        files: 'jade/{,*/}*.{html,jade}',
        tasks: ['jade']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-bump');
  
  /**
   * Load Grunt plugins.
   * call these from the command line, or just grunt for default.
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Default task(s).'watch'
  grunt.registerTask('default', ['jshint','clean','copy','sass','concat','cssmin','uglify']);
  
  // Default task(s).'watch'
  grunt.registerTask('docs', ['jade','watch:jadedocs']);
  
  grunt.registerTask('docstemp', ['template']);
};