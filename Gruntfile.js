'use strict';
exports.warnOn = '*.js';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.

    pkg: grunt.file.readJSON('hui.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        footer: '\n'+'/*! <%= pkg.homepage %> */'+'\n',
      },
      dist: {
        src: ['src/js/actions.js', 'src/js/history.js', 'src/js/notefy.js', 'src/js/useability.js', 'src/js/facebox.js', 'src/js/tipTip.js', 'src/js/animate.js', 'src/js/mediaQuery.js','src/js/pageslide.js', 'src/js/accordion.js', 'src/js/navigation.js', 'src/js/table.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      cssdist: {
        src: ['src/css/standardization.css', 'src/css/body.css', 'src/css/forms.css', 'src/css/display.css', 'src/css/buttons.css', 'src/css/character.css',  'src/css/widgets.css'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.css'
      },
    },
	cssmin: {
	 combine: {
	    files: {
	      'dist/<%= pkg.name %>-dark.css': ['dist/<%= pkg.name %>-<%= pkg.version %>.css','src/themes/dark/dev-theme.css'],
	      'dist/<%= pkg.name %>-light.css': ['dist/<%= pkg.name %>-<%= pkg.version %>.css','src/themes/li3/dev-theme.css'],
          'dist/ie-min.css': ['src/css/ie.css']
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
        src: ['src/js/actions.js', 'src/js/notefy.js', 'src/js/useability.js', 'src/js/facebox.js', 'src/js/tipTip.js', 'src/js/mediaQuery.js', 'src/js/accordion.js', 'src/js/navigation.js', 'src/js/table.js']
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

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'cssmin', 'uglify']);

};
