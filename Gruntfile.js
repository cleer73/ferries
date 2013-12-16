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
          'App/UI/**/*.css'
        ],
        dest: 'public/app.css'
      }
    },
    watch: {
      scripts: {
        files: 'App/UI/**/*.js',
        tasks: ['concat:scripts']
      }
    }
  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define tasks
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('watch-scripts', ['watch:scripts']);
};