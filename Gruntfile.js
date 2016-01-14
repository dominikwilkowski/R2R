'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                   ██████╗  ███████╗ ██████╗  ██╗      ███████╗  ██████╗
//                                                   ██╔══██╗ ██╔════╝ ██╔══██╗ ██║      ██╔════╝ ██╔════╝
//                                                   ██████╔╝ ███████╗ ██████╔╝ ██║      ███████╗ ██║
//                                                   ██╔══██╗ ╚════██║ ██╔══██╗ ██║      ╚════██║ ██║
//                                                   ██████╔╝ ███████║ ██████╔╝ ███████╗ ███████║ ╚██████╗
//                                                   ╚═════╝  ╚══════╝ ╚═════╝  ╚══════╝ ╚══════╝  ╚═════╝
//                                                                            Created by Dominik Wilkowski
//
// URL:      https://github.com/dominikwilkowski/BSBLSC
// Issues:   https://github.com/dominikwilkowski/BSBLSC/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// var figures = require('figures');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * colorize a boolen value
 *
 * boolen  boolen  A boolen expression to be epressed with colors
 */
function Colorize( boolen ) {
	return boolen ? figures.tick.green + '  true'.green : figures.cross.red + '  false'.red;
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-autoprefixer');
	// grunt.loadNpmTasks('grunt-grunticon');
	// grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-shopify');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-wakeup');


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		currentVersion: '<%= pkg.name %>.<%= pkg.version %>',

		shpfy: grunt.file.readJSON('shopify.json'),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			pre: ['./tmp'], //delete before running
			post: ['./tmp'], //delete after running
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// stylus task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		stylus: {
			site: {
				options: {
					compress: true,
				},
				files: {
					'./tmp/css/<%= currentVersion  %>.min.css': './dev/stylus/site.styl',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// vendor prefixes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		autoprefixer: {
			Prefix: {
				src: './tmp/css/<%= currentVersion  %>.min.css',
				dest: './tmp/css/<%= currentVersion  %>.min.css',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JS minification
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				preserveComments: 'some',
			},
			js: {
				files: {
					'./tmp/js/<%= currentVersion  %>.min.js': ['./dev/js/*.js', '!./dev/lib/*.js'],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// minify svgs
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// svgmin: {
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'dev/svg/',
		// 			src: ['*.svg'],
		// 			dest: 'temp/svg/',
		// 		}],
		// 	},
		// },


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// grunticon
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// grunticon: {
		// 	myIcons: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'temp/svg',
		// 			src: '*.svg',
		// 			dest: 'prod/css',
		// 		}],
		// 		options: {
		// 			datasvgcss: 'symbols.data.svg.css',
		// 			datapngcss: 'symbols.data.png.css',
		// 			urlpngcss: 'symbols.fallback.css',
		// 			cssprefix: '.symbol-',
		// 			customselectors: {
		// 				// 'radio-on': ['input[type="radio"]:checked + label'],
		// 				// 'radio-off': ['.radio label', '.radio-inline label'],
		// 				// 'checkbox-on': ['input[type="checkbox"]:checked + label'],
		// 				// 'checkbox-off': ['.checkbox label', '.checkbox-inline label']
		// 			},
		// 		},
		// 	},
		// },


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// minify images
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		imagemin: {
			images: {
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: './dev/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: './shopify/assets/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// replace task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			css: {
				src: ['./tmp/css/*.*'],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},

			js: {
				src: ['./tmp/js/*.*'],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},

			html: {
				src: ['./tmp/HTML/**/*.*'],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// shopify file transfer
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		shopify: {
			options: {
				api_key: '<%= shpfy.api_key %>',
				password: '<%= shpfy.password %>',
				url: '<%= shpfy.url %>',
				theme: '<%= shpfy.theme %>',
				base: './shopify/',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// copy all files to shopify folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {

			//css files
			CSS: {
				files: [{
					expand: true,
					cwd: './dev/css',
					src: ['**/*.css'],
					dest: './shopify/assets/',
				}]
			},

			//stylus file
			Stylus: {
				files: [{
					expand: true,
					cwd: './tmp/css',
					src: ['**/*.css'],
					dest: './shopify/assets/',
				}]
			},

			//js file
			JS: {
				files: [{
					expand: true,
					cwd: './tmp/js',
					src: ['**/*.js'],
					dest: './shopify/assets/',
				}]
			},

			//js lib files
			JSLibs: {
				files: [{
					expand: true,
					cwd: './dev/js/libs',
					src: ['**/*.js'],
					dest: './shopify/assets/',
				}]
			},

			//fonts
			Fonts: {
				files: [{
					expand: true,
					cwd: './dev/fonts',
					src: ['**/*'],
					dest: './shopify/assets/',
				}],
			},

			//html config to tmp folder
			HTMLtmpConfig: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './dev/HTML/config',
					src: ['*.*'],
					dest: './tmp/HTML/config/',
				}],
			},

			//html layout to tmp folder
			HTMLtmpLayout: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './dev/HTML/layout',
					src: ['*.*'],
					dest: './tmp/HTML/layout/',
				}],
			},

			//html snippets to tmp folder
			HTMLtmpSnippets: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './dev/HTML/snippets',
					src: ['*.*'],
					dest: './tmp/HTML/snippets/',
				}],
			},

			//html templates to tmp folder
			HTMLtmpTemplates: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './dev/HTML/templates',
					src: ['*.*'],
					dest: './tmp/HTML/templates/',
				}],
			},

			//html config
			HTMLconfig: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './tmp/HTML/config',
					src: ['*.*'],
					dest: './shopify/config/',
				}],
			},

			//html layout
			HTMLlayout: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './tmp/HTML/layout',
					src: ['*.*'],
					dest: './shopify/layout/',
				}],
			},

			//html snippets
			HTMLsnippets: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './tmp/HTML/snippets',
					src: ['*.*'],
					dest: './shopify/snippets/',
				}],
			},

			//html templates
			HTMLtemplates: {
				files: [{
					expand: true,
					flatten: true,
					cwd: './tmp/HTML/templates',
					src: ['*.*'],
					dest: './shopify/templates/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banner
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				colors: ['blue', 'yellow'],
				maxLength: 13,
			},

			title: {
				text: ' BSBLSC',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
					notifications: true,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					port: 1337,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// watch for changes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			css: {
				files: [
					'./dev/css/**/*',
					'./dev/stylus/**/*',
				],
				tasks: [
					'clean:pre',
					'css',
					'wakeup',
					'clean:post',
				],
			},

			js: {
				files: [
					'./dev/js/**/*',
				],
				tasks: [
					'clean:pre',
					'js',
					'wakeup',
					'clean:post',
				],
			},

			image: {
				files: [
					'./dev/img/**/*',
				],
				tasks: [
					'clean:pre',
					'image',
					'wakeup',
					'clean:post',
				],
			},

			fonts: {
				files: [
					'./dev/fonts/**/*',
				],
				tasks: [
					'clean:pre',
					'fonts',
					'wakeup',
					'clean:post',
				],
			},

			html: {
				files: [
					'./dev/HTML/**/*',
				],
				tasks: [
					'clean:pre',
					'html',
					'wakeup',
					'clean:post',
				],
			},

			shopify: {
				files: [
					'shopify/assets/**',
					'shopify/config/**',
					'shopify/snippets/**',
					'shopify/layout/**',
					'shopify/templates/**',
				],
				tasks: [
					'shopify',
				],
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Tasks breakdown
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('css', [
		'stylus',
		'autoprefixer',
		'replace:css',
		'copy:CSS',
		'copy:Stylus',
	]);

	grunt.registerTask('js', [
		'uglify',
		'replace:js',
		'copy:JS',
		'copy:JSLibs',
	]);

	grunt.registerTask('image', [
		'imagemin',
	]);

	grunt.registerTask('fonts', [
		'copy:Fonts',
	]);

	grunt.registerTask('html', [
		'copy:HTMLtmpConfig',
		'copy:HTMLtmpLayout',
		'copy:HTMLtmpSnippets',
		'copy:HTMLtmpTemplates',
		'replace:html',
		'copy:HTMLconfig',
		'copy:HTMLlayout',
		'copy:HTMLsnippets',
		'copy:HTMLtemplates',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
		'clean:pre',
		'connect',
		'css',
		'js',
		'image',
		'fonts',
		'html',
		'clean:post',
		'wakeup',
		'watch',
	]);

	grunt.registerTask('upload', [
		'font',
		'clean:pre',
		'connect',
		'css',
		'js',
		'image',
		'fonts',
		'html',
		'clean:post',
		'shopify:upload',
		'wakeup',
	]);
};