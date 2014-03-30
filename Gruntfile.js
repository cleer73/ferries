module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    concat: {
      scripts: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/feed/src/feed.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'app/ui/bootstrap.js',
          'app/ui/controllers/*.js'
        ],
        dest: 'public/scripts/app.js'
      },
      styles: {
        src: [
          'bower_components/font-awesome/css/font-awesome.css',
          'app/ui/styles/reset.css',
          'app/ui/styles/layout.css',
          'app/ui/styles/typography.css'
        ],
        dest: 'public/styles/app.css'
      }
    },
    htmlmin: {
      templates: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/index.html':                'app/ui/bootstrap.html',
          'public/templates/messages.html':   'app/ui/templates/messages.html',
          'public/templates/navigation.html': 'app/ui/templates/navigation.html',
          'public/templates/schedule.html':   'app/ui/templates/schedule.html'
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: ['bower_components/font-awesome/fonts/*'],
        dest: 'public/fonts/',
        filter: 'isFile'
      },
      scripts: {
        expand: true,
        flatten: true,
        src: ['bower_components/jquery/dist/jquery.min.map'],
        dest: 'public/scripts/',
        filter: 'isFile'
      }
    },
    watch: {
      scripts: {
        files: ['app/ui/**/*.js'],
        tasks: ['concat:scripts']
      },
      styles: {
        files: ['app/ui/**/*.css'],
        tasks: ['concat:styles']
      },
      templates: {
        files: ['app/ui/**/*.html'],
        tasks: ['htmlmin:templates']
      }
    }
  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Define tasks
  grunt.registerTask('default', ['concat', 'copy', 'htmlmin']);
};


