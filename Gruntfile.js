/*!
 * @description GRUNT! (.js)
 */

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        eqeqeq: true,
        trailing: true
      },
      target: {
        src : ['js/**/*.js']
      }
    },
    concat: {
      options: {
        
      },
      target : {
        src : [
          'js/lib/jquery/jquery.min.js',
          'js/lib/jquery-easing/jquery.easing.min.js',
          'js/lib/underscore/underscore-min.js',
          'js/lib/backbone/backbone.js',
          'js/lib/requirejs-text/text.js',
          'js/lib/fastclick/lib/fastclick.js',
          'js/lib/q/q.js',
          'js/lib/parse-1.2.16.js',
          'js/app/**/*.js'
        ],
        dest : 'js/app.js'

      }
    },
    uglify: {
      options: {
      },
      target : {
        src : ['js/app.js'],
        dest : 'js/app.min.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          yuicompress: false
        },
        files: {
          'css/style.css':'less/style.less'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/**/*.js','Gruntfile.js'],
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less'],
      }
    },
    requirejs: {
      compile: {
        options: {
          almond: true,
          baseUrl: './js/',
          findNestedDependencies: true,
          mainConfigFile: 'js/main.js',
          name : 'main',
          out: 'js/app.min.js',
          optimize: 'uglify',
          preserveLicenseComments: false,
          relativeUrl: './',
          skipDirOptimize: true,
          useStrict: true,
          include: ['lib/requirejs/require.js']


          // baseUrl: "./",
          // mainConfigFile: "js/main.js",
          // // optimize: "uglify",
          // // name: "js/lib/almond/almond.js", // assumes a production build using almond
          // modules: [
          // {
          //     name: "js/main.js",
          // }],
          // dir: 'build',

          // // out: "js/app.min.js",
          // uglify: {
          //     toplevel: true,
          //     ascii_only: true,
          //     beautify: true,
          //     max_line_length: 1000,

          //     //How to pass uglifyjs defined symbols for AST symbol replacement,
          //     //see "defines" options for ast_mangle in the uglifys docs.
          //     defines: {
          //         DEBUG: ['name', 'false']
          //     },

          //     //Custom value supported by r.js but done differently
          //     //in uglifyjs directly:
          //     //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
          //     no_mangle: true
          // },

          // // done: function(done, output) {
          // //   var duplicates = require('rjs-build-analysis').duplicates(output);

          // //   if (duplicates.length > 0) {
          // //     grunt.log.subhead('Duplicates found in requirejs build:');
          // //     grunt.log.warn(duplicates);
          // //     done(new Error('r.js built duplicate modules, please check the excludes option.'));
          // //   }

          // //   done();
          // // }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');



  // grunt.registerTask('deploy', ['less','cssmin']);
  grunt.registerTask('default', ['requirejs','less','cssmin']);
  
  


};