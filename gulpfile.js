const gulp = require('gulp');
const babel = require('gulp-babel');
const stylus = require('gulp-stylus');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');

const paths = {
  babel: ['./assets/js/**/*.js'],
  stylus: ['./assets/styl/**/*.styl'],
  jade: ['./assets/gradecalc_partials/**/*.jade'],
};

gulp.task('default', ['babel', 'stylus', 'jade']);

gulp.task('watch', () => {
  gulp.watch(paths.babel, ['babel']);
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.jade, ['jade']);
});

gulp.task('babel', () => {
  return gulp.src(paths.babel)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', () => {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./public/gradecalc_partials'));
});