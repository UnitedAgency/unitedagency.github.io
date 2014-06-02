module.exports = function(grunt) {
	
	grunt.initConfig({

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '_img/',
					src: ['**/*.{png,jpg,jpeg,gif,ico}'],
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

		concat: {
			dist: {
				src: [
					'bower_components/jquery/dist/jquery.min.js', 
					'_sass/bootstrap-sass/javascripts/bootstrap/transition.js',
					'_sass/bootstrap-sass/javascripts/bootstrap/modal.js',
					'_sass/bootstrap-sass/javascripts/bootstrap/carousel.js'
				],
				dest: '_js/lib/jquery-bootstrap.js'
			}
		},

		uglify: {
			build: {
				files: {
					'js/main.min.js' : [
					'_js/lib/jquery-bootstrap.js',
					'_js/main.js'
					]
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
			},
			dev: {
				options: {
					config: '_config.dev.yml'
				}
			},
			prod: {
				options: {
					config: '_config.yml'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['_js/*.js'],
				tasks: ['concat', 'uglify'],
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
				tasks: ['jekyll:dev'],
				options: {
					spawn: false
				}
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);
}; 