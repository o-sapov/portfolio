var gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html').on("change", reload);
  watch('./app/html/index_en.html').on("change", reload);
  watch('./app/assets/styles/**/*.css', gulp.series('manageCSS'));

});

gulp.task('cssInject', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(browserSync.stream());
});

gulp.task('manageCSS', gulp.series('styles', 'cssInject'));
