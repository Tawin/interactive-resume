const gulp = require('gulp');
const webpack = require('webpack');

gulp.task('scripts', ['modernizr'], function(callback) {
  webpack(require('../../webpack.config'), function(err, stats) {
    if (err) {
      console.log(err.message);
    }

    console.log(stats.toString());
    callback();
  });
});
