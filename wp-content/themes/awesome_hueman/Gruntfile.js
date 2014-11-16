module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'style.css': 'sass/style.scss'
        }
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'canvasisaweso.me',
          port: 21,
          authKey: 'key1'
        },
        src: './',
        dest: '/httpdocs/wp-content/themes/awesome_hueman/',
        exclusions: ['./**/.DS_Store', './**/Thumbs.db', './tmp', './sass','./.sass-cache','./node_modules']
      }
    }   
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('deploy', ['sass' ,'ftp-deploy']);

};