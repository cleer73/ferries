module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    concat: {
      scripts: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'App/UI/Bootstrap.js',
          'App/UI/Controllers/*.js'
        ],
        dest: 'public/app.js'
      },
      styles: {
        src: [
          'bower_components/skeleton/stylesheets/base.css',
          'bower_components/skeleton/stylesheets/skeleton.css',
          'bower_components/skeleton/stylesheets/layout.css',
          'bower_components/font-awesome/css/layout.css',
          'bower_components/font-awesome/css/font-awesome.css',
          'App/UI/**/*.css'
        ],
        dest: 'public/app.css'
    },
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/font-awesome/fonts/*'
        ],
        dest: 'public/fonts/',
        filter: 'isFile'
      }
    },
    watch: {
      scripts: {
        files: [
          'App/UI/**/*.js'
        ],
        tasks: ['concat:scripts']
      },
      styles: {
        files: [
          'App/UI/**/*.css'
        ],
        tasks: ['concat:styles']
      }
    }
  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Define tasks
  grunt.registerTask('default', ['concat', 'copy']);
  grunt.registerTask('monitor', ['concat', 'copy', 'watch']);
};
