var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    coffeelint = require('gulp-coffeelint');

// gulp.task('coffeescript', function(){
//   gulp.src('src/coffee/**/*.coffee')
//     .pipe(sourcemaps.init())
//     .pipe(coffee())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('src/js'));
// });

gulp.task('lint', function () {
  gulp.src('./src/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
});

gulp.task('coffee', function() {
  gulp.src('src/coffee/app.coffee', { read: false })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee'],
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('sass', function(){
  return sass('src/sass/app.scss', {sourcemap: true})
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css/'));
})

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('src/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('build/'));

  // Any other view files from app/views
  gulp.src('./src/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('build/views/'));
});

gulp.task('default', ['lint', 'coffee', 'sass', 'views']);