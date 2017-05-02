import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssflexbugsfixes from 'postcss-flexbugs-fixes'
import postcssflexibility from 'postcss-flexibility'

gulp.task('sass', () => {
  return gulp.src('app/stylesheets/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })], postcssflexbugsfixes(), postcssflexibility()))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('jade', () => {
  gulp.src('app/index.jade')
    .pipe(jade({  pretty: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('concat-js', () => {
  return gulp.src('app/js/*.js')
  .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('browserSync', () => {
  browserSync.create().init(['./dist/css/app.css', './dist/js/app.js', './dist/index.html'], {
    server: {
      baseDir: './dist'
    },
    port: 80,
    open: true,
    notify: false
  });
});

gulp.task('watch', ['sass', 'jade', 'concat-js', 'browserSync'], () => {
  gulp.watch(['app/stylesheets/*.scss','app/stylesheets/*/*.scss'], ['sass']);
  gulp.watch('app/index.jade', ['jade']);
  gulp.watch('app/js/*.js', ['concat-js']);
});

gulp.task('default', ['watch']);
