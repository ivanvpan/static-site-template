'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist',
      vendorAssets: 'dist/vendor'
    },

    stylus: {
      compile: {
        options: {
        },
        files: {
          '<%= config.dist %>/assets/css/main.css': '<%= config.src %>/assets/styles/index.styl'
        }
      }
    },

    jshint: {
      srcjs: ['<%= config.src %>/assets/js/*.js'],
      options: {
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      styles: {
        files: ['<%= config.src %>/assets/styles/*.styl'],
        tasks: ['stylus']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      bootstrap: { expand: true, cwd: 'bower_components/bootstrap/dist', src: '**', dest: '<%= config.vendorAssets %>/bootstrap/'},
      images: { expand: true, cwd: '<%= config.src %>/assets/images', src: '**', dest: '<%= config.dist %>/assets/images'},
      staticFiles: { expand: true, cwd: '<%= config.src %>/static', src: '*', dest: '<%= config.dist %>'}
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: [
      '<%= config.dist %>/**/*.{html,xml}'
    ]

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean',
    'copy',
    'stylus:compile',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
