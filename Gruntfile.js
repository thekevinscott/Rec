/*!
 * @description GRUNT! (.js)
 */

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        eqeqeq: true,
        trailing: true,
        ignores: ['js/lib/**/*.js','js/app.min.js']
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
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint'],
      },
      scripts: {
        files: ['js/**/*.js', '!js/lib/**/*.js'],
        tasks: ['jshint','requirejs'],
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less','cssmin'],
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
  grunt.registerTask('default', ['jshint','requirejs','less','cssmin','watch']);
  
  


};