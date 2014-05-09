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

		uglify: {
			build: {
				src: '_js/main.js',
				dest: 'js/main.min.js'
			},
			options: {
				preserveComments: 'some'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['_js/*.js'],
				tasks: ['uglify'],
				options: {
					spawn: false
				}
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'uglify', 'watch']);
}; 