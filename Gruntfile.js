module.exports = function(grunt) {
	
	grunt.initConfig({

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '_img/',
					src: ['**/*.{png,jpg,jpeg,gif}'],
					dest: 'img/'
				}]
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main.min.css':'_sass/main.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['_sass/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},
			img: {
				files: ['_img/*.*'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'imagemin', 'watch']);
}; 