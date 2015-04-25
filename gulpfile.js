var gulp = require('gulp');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

gulp.task('default', function() {
	return gulp.src('src/**/*.js')
    	.pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('test', ['default'], function() {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('watch', function() {
    gulp.watch('src/**', ['default']);
});