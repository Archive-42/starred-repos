module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {}
			}
		},
		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'public/react-prod/script.js': 'public/react-src/script.jsx'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			jsx: {
				options: {
					livereload: false
				},
				files: ['**/*.jsx'],
				tasks: ['babel']
			},
			js: {
				files: ['**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['babel']);
	grunt.registerTask('dev', ['babel', 'watch']);
}