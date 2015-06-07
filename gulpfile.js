var gulp = require('gulp');
var useref = require('gulp-useref');
var ghPages = require('gulp-gh-pages');

gulp.task('assets', function () {
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

  return gulp.src('index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['assets', 'fonts', 'html'], function () {
});

gulp.task('cname', function () {
  return gulp.src('CNAME')
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build', 'cname'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({remoteUrl: 'git@github.com:cllu/getswitchpal.com.git'}));
});
