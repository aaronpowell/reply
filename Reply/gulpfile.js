/// <binding ProjectOpened='watch' />
var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var eslint = require('gulp-eslint');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

var getBrowserify = function () {
    var b = browserify({
        entries: './wwwroot/src/app.js',
        debug: true,
        extensions: ['.jsx', '.js']
    })
    .transform(babelify);

    return b.bundle();
};

gulp.task('clean', function (cb) {
    return del('./wwwroot/dist', cb);
});

gulp.task('eslint', function () {
    return gulp.src(['./wwwroot/src/**/*.js', './wwwroot/src/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('browserify', function () {
    return getBrowserify()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest('./wwwroot/dist'));
});

gulp.task('default', ['clean', 'eslint', 'browserify']);

gulp.task('release', ['clean', 'eslint'], function () {
    return getBrowserify()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./wwwroot/dist'));
});

gulp.task('watch', function () {
    gulp.watch(['./wwwroot/src/**/*.js', './wwwroot/src/**/*.jsx'], ['eslint', 'browserify']);
});