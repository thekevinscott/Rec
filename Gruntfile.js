/*!
 * @description GRUNT! (.js)
 */

module.exports = function(grunt) {

  grunt.initConfig({

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
          'css/style.css': ['css/style.css']
        }
      }
    },
    watch: {
      less: {
        files: 'less/**/*.less',
        tasks: ['less'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('deploy', ['less','cssmin']);
  grunt.registerTask('default', ['less','cssmin','watch']);

};