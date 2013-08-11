'use strict';
//exports.warnOn = '*.js';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('hui.jquery.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',

    // Task configuration.
    clean: {
      files: ['dist']
    },

	sass:{
      dist: {
          files: {
              'src/themes/lithium/dev-theme.css': 'src/themes/lithium/dev-theme.scss',
              'src/themes/dark/dev-theme.css': 'src/themes/dark/dev-theme.scss'
          }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        footer: '\n\n'+'/*! <%= pkg.homepage %> */'+'\n\n',
      },
      dist: {
        src: ['src/js_core/actions.js', 'src/js_core/history.js', 'src/js_core/notefy.js', 'src/js_core/useability.js', 'src/js_core/facebox.js', 'src/js_core/tips.js', 'src/js_core/animate.js', 'src/js_core/mediaQuery.js', 'src/js_core/accordion.js', 'src/js_core/navigation.js', 'src/js_core/table.js', 'src/js_core/classie.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      cssdist: {
	   options: {
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %>\n' +'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'+'\n/* THIS DOES NOT CONTAIN A DEV-THEME. Use this file if you want to make your own theme. Example themes are in the theme folder. */\n\n'
	   },
       src: ['<%= banner %>','src/css_core/standardization.css', 'src/css_core/body.css', 'src/css_core/display.css', 'src/css_core/buttons.css', 'src/css_core/character.css', 'src/css_core/forms.css', 'src/css_core/tips.css', 'src/css_core/widgets.css', 'src/css_core/slidemenu.css'],
       dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.css'
      },
    },
    
    cssmin: {
	 combine: {
		options: {
			stripBanners: true,
		},
	    files: {
	      'dist/<%= pkg.name %>-dark.css': ['dist/<%= pkg.name %>-<%= pkg.version %>.css','src/themes/dark/dev-theme.css'],
	      'dist/<%= pkg.name %>-light.css': ['dist/<%= pkg.name %>-<%= pkg.version %>.css','src/themes/lithium/dev-theme.css'],
          'dist/ie-min.css': ['src/css_core/ie.css']
	    }
	 }
	},
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>  v. <%= pkg.version %> || built on: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>-min.js'
      },
    },
    
    qunit: {
      files: ['test/index.html']
    },
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
		smarttabs: true,
		unused:true,
		trailing: false,
		es3: true,
        globals: {
          jQuery: true
        },
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/js_core/actions.js', 'src/js_core/notefy.js', 'src/js_core/useability.js', 'src/js_core/facebox.js', 'src/js_core/tips.js', 'src/js_core/mediaQuery.js', 'src/js_core/accordion.js', 'src/js_core/navigation.js', 'src/js_core/table.js', 'src/js_core/classie.js' ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'sass', 'concat', 'cssmin', 'uglify']);

};
