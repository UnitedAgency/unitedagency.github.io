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
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/main.css':'_sass/main.scss'
				}
			},
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
			my_target: {
				files: {
					'js/main.min.js' : ['_js/main.js']
				}
			},
			options: {
				preserveComments: 'some'
			}
		},

		jekyll: {
			build: {
				options: {
					serve: false
				}
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
			},
			jekyll: {
				files: [
					'./_layouts/*.html',
					'./_includes/*.html',
					'./_posts/*.markdown',
					'./index.html'
				],
				tasks: ['jekyll'],
				options: {
					spawn: false
				}
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'uglify', 'jekyll', 'watch']);
}; 