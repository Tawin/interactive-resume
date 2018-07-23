const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssSimpleVars = require('postcss-simple-vars');
const cssNested = require('postcss-nested');
const cssImport = require('postcss-import');
const cssMixins = require('postcss-mixins');
const hexrgba = require('postcss-hexrgba');

gulp.task('styles', function() {
  return gulp
    .src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssMixins, cssSimpleVars, cssNested, hexrgba, autoprefixer]))
    .on('error', function(error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});
