'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();
$.connect = require('gulp-connect');

var pkg = require('./package.json');
var banner = [
'/**',
' * <%= pkg.name %>',
' * <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

// Scripts
gulp.task('scripts', function () {
	return gulp.src('*.js')
		.pipe($.jshint('.jshintrc'))
		.pipe($.jshint.reporter('default'));
});

// Clean
gulp.task('clean', ['scripts'], function () {
	return gulp.src(['dist'], {read: false}).pipe($.clean());
});

// Add banner
gulp.task('dist', ['clean'], function() {
	gulp.src('pointertouch.js')
		.pipe($.header(banner, { pkg: pkg }))
		.pipe($.rename('jquery.event.pointertouch.js'))
		.pipe(gulp.dest('./dist'))
		.pipe($.uglify({ preserveComments: 'some' }))
		.pipe($.rename('jquery.event.pointertouch.min.js'))
		.pipe(gulp.dest('./dist'));
});

// Update JSON versions
gulp.task('version', ['dist'], function() {
	return gulp.src(['bower.json', 'event.pointertouch.jquery.json'])
		.pipe($.replace(/("version":\s*")[^"]+(")/, '$1' + pkg.version + '$2'))
		.pipe(gulp.dest(__dirname))
		.pipe($.jsonlint())
		.pipe($.jsonlint.reporter());
});

gulp.task('size', function() {
	gulp.src('./dist/jquery.event.pointertouch.min.js')
		.pipe($.gzip())
		.pipe($.micro({ limit: 540 }));
});

// Default task
gulp.task('default', ['dist']);

// Connect
gulp.task('connect', $.connect.server({
	root: [__dirname],
	port: 8001,
	livereload: true
}));

// Watch
gulp.task('watch', ['connect'], function () {
	// Watch for changes in `app` folder
	gulp.watch([
		'*.js',
		'test/index.html',
		'test/*.js'
	], $.connect.reload);

	// Watch gulpfile.js
	gulp.watch('gulpfile.js', ['scripts']);

	// Watch to rebuild
	gulp.watch('./pointertouch.js', ['default']);
});
