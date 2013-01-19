/*global module:false*/
module.exports = function(grunt) {

 grunt.loadNpmTasks('grunt-yui-compressor');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:hui.jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      js: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/js/actions.js>', 'src/js/history.js', 'src/js/notefy.js', 'src/js/useability.js', 'src/js/facebox.js', 'src/js/tipTip.js', 'src/js/animate.js', 'src/js/mediaQuery.js', 'src/js/accordion.js', 'src/js/navigation.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/css/standardization.css>', 'src/css/body.css', 'src/css/character.css', 'src/css/datadisplay.css', 'src/css/buttons.css'],
        dest: 'dist/<%= pkg.name %>-base.css'
      }
    },
    min: {
      js: {
        src: ['<config:concat.js.dest>'],
        dest: 'dist/<%= pkg.name %>-min.js'
      }
    },
    'cssmin': {
			'dist': {
				'src': 'dist/hui-base.css',
				'dest': 'dist/hui-base-min.css'
			}
		},
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/js/actions.js', 'src/js/notefy.js', 'src/js/useability.js', 'src/js/facebox.js', 'src/js/tipTip.js', 'src/js/mediaQuery.js', 'src/js/accordion.js', 'src/js/navigation.js']
    },
    csslint: {
     base_theme: {
      src: "themes/*.css",
      rules: {
        "import": false,
        "overqualified-elements": 2
      }
     }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min cssmin');

};