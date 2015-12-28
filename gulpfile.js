var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var ghPages = require('gulp-gh-pages');

gulp.task('sass', function () {
  gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('styles'));
});

gulp.task('assets', ['sass'], function () {
  return gulp.src([
    'styles/**/*.css',
    'scripts/**/*.*',
    'images/**/*.*'
  ], {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src('bower_components/fontawesome/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function () {
  var assets = useref.assets();

  return gulp.src(['_site/**/*.html', '!_site/bower_components/**/*.html'])
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['assets', 'fonts', 'html'], function () {
});

gulp.task('dev', ['build'], function () {
  var express = require('express');
  var server = express();
  server.use(express.static('./dist'));
  server.listen(2345);
  console.log('Server is up on http://localhost:2345');

  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch(['styles/*.css', 'scripts/*.*', 'index.html'], ['build']);

});

gulp.task('cname', function () {
  return gulp.src('CNAME')
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build', 'cname'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({remoteUrl: 'git@github.com:switchpal/getswitchpal.com.git'}));
});
