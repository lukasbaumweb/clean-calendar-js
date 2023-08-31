const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const webserver = require('gulp-webserver');

const SERVER_PORT = 3200;

gulp.task('clean-sass', function () {
  return gulp.src(['./dist/css'], { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task(
  'sass',
  gulp.series('clean-sass', function () {
    return gulp
      .src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('clean-calendar-js.min.css'))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css/'));
  })
);

gulp.task('clean-ts', function () {
  return gulp.src(['./tmp/', './dist/js'], { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task(
  'transpile',
  gulp.series('clean-ts', function () {
    const tsproject = ts.createProject('./tsconfig.json');
    return tsproject
      .src()
      .pipe(sourcemaps.init())
      .pipe(tsproject())
      .js.pipe(
        babel({
          presets: ['@babel/env'],
        })
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./tmp/js'));
  })
);

gulp.task(
  'min-js',
  gulp.series('transpile', () => {
    return gulp
      .src('./tmp/js/App.js')
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(browserify())
      .pipe(uglify())
      .pipe(concat('clean-calendar-js.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/js'));
  })
);

gulp.task('webserver', function () {
  gulp.src(__dirname).pipe(
    webserver({
      livereload: true,
      open: false,
      port: SERVER_PORT,
      fallback: './app/index.html',
    })
  );
});

gulp.task(
  'dev',
  gulp.parallel('webserver', () => {
    gulp.watch(['./sass/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./src/**/*.ts'], gulp.series('min-js'));
  })
);

gulp.task('build', gulp.series('sass', 'min-js'));

gulp.task('default', gulp.series('webserver'));
