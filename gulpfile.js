const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const postcss = require('gulp-postcss');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const gutil = require('gulp-util');
const pug = require('gulp-pug');
const spritesmith = require('gulp.spritesmith');
const tinypng = require('gulp-tinypng-nokey');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const svgSymbols = require('gulp-svg-symbols');
const svgmin = require('gulp-svgmin');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const isDevelopment = process.env.NODE_ENV !== 'production';


gulp.task('views', function () {
  return gulp.src('./src/pages/**/index.pug')
    .pipe(pug({
      basedir: './'
    }))
    .on('error', function(error) {
      gutil.log(gutil.colors.red('Error: ' + error.message));
      this.emit('end');
    })
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function () {
  return gulp.src('./src/app.styl')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(stylus({
      'include css': true
    })
    .on('error', function(error) {
      gutil.log(gutil.colors.red('Error: ' + error.message));
      this.emit('end');
    }))
    .pipe(gulpIf(!isDevelopment, postcss([
      autoprefixer({
          browsers: ['> 5%', 'ff > 14']
      })
    ])))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, cleanCSS()))
    .pipe(rename('style.css'))
    .pipe(gulpIf(!isDevelopment, rev()))
    .pipe(gulp.dest('./public/css'))
    .pipe(gulpIf(!isDevelopment, rev.manifest()))
    .pipe(gulp.dest('./public'))
});

gulp.task('scripts', function(done) {
  return webpack(require('./webpack.config.js'), function(error, stats) {
    if (error) throw new gutil.PluginError('webpack', error);

    gutil.log('[scripts]', stats.toString({
      colors: gutil.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));

    done();
  });
});

gulp.task('svgSymbols', function () {
  return gulp.src('./src/assets/images/svg/**/*.svg')
    .pipe(svgmin())
    .pipe(svgSymbols({
      templates: ['default-svg'],
      className: '.icon_%f'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('images', function () {
  return gulp.src('./src/assets/images/**/*.*')
    .pipe(gulpIf(!isDevelopment, imagemin({
      verbose: true
    })))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function () {
  return gulp.src('./src/assets/fonts/**/*.*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('misc', function () {
  return gulp.src('./src/assets/misc/**/*.*')
    .pipe(gulp.dest('./public'));
});

gulp.task('revision', function (cb) {
  if (isDevelopment) return cb();

  gulp.src(['./public/rev-manifest.json', './public/**/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./public'));

  del('./public/rev-manifest.json');

  return cb();
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.pug', gulp.series('views'));
  gulp.watch('./src/**/*.{css,styl}', gulp.series('styles'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
  gulp.watch('./src/assets/misc/**/*.*', gulp.series('misc'));
  gulp.watch('./src/assets/images/svg/**/*.*', gulp.series('svgSymbols'));
  gulp.watch('./src/assets/images/**/*.*', gulp.series('images'));
});

gulp.task('serve', function () {
  browserSync.init({
    // proxy: 'example.com',
    // files: 'public/**/*.*',
    // https: true,
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('./public')
});

gulp.task('build', gulp.series(
  'clean',
  'svgSymbols',
  gulp.parallel(
    'images',
    'views',
    'styles',
    'scripts',
    'fonts',
    'misc'
  ),
  'revision'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
  )));
