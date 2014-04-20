module.exports = function(grunt) {

   /**
    *
    * Grunt Task Configuration
    *
    */

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      webapp: {
        dest:     'dist/',
        js_dest:  'dist/webapp/scripts',
        css_dest: 'dist/webapp/styles'
      }
    },

    clean: {
      webapp: 'dist/webapp/*' //deletes files in dist/webapp dir 
    },

    concat: {
      webapp: {
        options: {
          separator: '\n',
          banner: '/**\n * \n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> ' +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n' +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  '<%= pkg.author ? " * " + pkg.author + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>, License - <%= pkg.license %>\n' +
                  ' *\n */\n'
        },
        src: ['dist/webapp/scripts/*'],
        dest: 'dist/webapp/build.js'
      }
    },
    
    connect: {
      dev: {
        options: {
          port: 9001,
          base: '.',
          keepalive: true,
          hostname : '*'
        }
      }
    },

    copy: {
      webapp: { 
        files: [
          {
          expand: true, 
          cwd: 'src/webapp/',
          src: [ 
            'scripts/*'
          ], // include or exclude files to copy
          dest: 'dist/webapp'
          }
        ]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**'],
      options: {
        '-W002': true //supress warning about IE8 by listing warning number from console output
      }
    },

    open: {
      src: {
        path: 'http:localhost:9001/src'
      }
    },

    processhtml: {
      webapp: {
        files: {
          'dist/webapp/index.html': ['src/webapp/index.html']
        }
      }
    },

    remove: {
      options: {
        trace: true
      },
      webapp: {
        dirList: ['dist/webapp/scripts'],
      }
    },

    uglify: {
      webapp: {
        files: {
          'dist/webapp/build.min.js': ['dist/webapp/build.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/**'],
        tasks: [ /*setup tasks to run on watch */ ]
      },
      docs: {
        files: ['src/**'],
        tasks: [ /* tasks to run on watch */ ]
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          themedir: 'docs/yuidoc-theme/tellart', 
          paths: 'src/',
          outdir: 'docs/'
        }
      }
    }
  });

  /*
   * Load NPM Tasks
   */

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-remove');

  /*
   * Registered Grunt Tasks
   */

  grunt.registerTask('default', ['clean', 'concat']);
  grunt.registerTask('build-webapp', [
    'clean:webapp', 
    'copy:webapp', 
    'bower:webapp', 
    'concat:webapp',
    'remove:webapp',
    'uglify:webapp',
    'processhtml:webapp'
    ]);
};