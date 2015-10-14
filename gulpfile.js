'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	bowerResolve = require('bower-resolve'),
	fs = require('fs'),
	mkdirp = require('mkdirp');

gulp.task('script', function(done) {
	mkdirp('dist/js');
	bowerResolve.offline = true;
	bowerResolve.init(function() {
		var b = browserify();

		b.require(bowerResolve('rangy'), {
			expose: 'rangy'
		});

		// workaround to have rangy-selectionsaverestore exposed to the path textAngular requires
		// var selectionsaverestore = bowerResolve('rangy').split('/').slice(0, -1).join('/') + '/rangy-selectionsaverestore.js';
		// b.require(selectionsaverestore, {
		// 	expose: 'rangy/lib/rangy-selectionsaverestore'
		// });

		var textAngular = bowerResolve('textAngular').split('/').slice(0, -1).join('/') + '/textAngular.js';
		b.require(textAngular, {
			expose: 'textAngular'
		});

		var textAngularSanitize = bowerResolve('textAngular').split('/').slice(0, -1).join('/') + '/textAngular-sanitize.js';
		b.require(textAngularSanitize, {
			expose: 'angular-sanitize'
		});

		b.bundle()
			.on('end', function(err) {
				done(err);
			})
			.pipe(fs.createWriteStream('dist/js/libs.min.js'));
	});
});

gulp.task('default', ['script'], function() {});
