var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();


  gulp.task('previewDist', function() {
    browserSync.init({
      notify: false,
      server: {
        baseDir: "docs"
      }
    });
  })



  gulp.task('deleteDistFolder', function() {
    return del("./docs");
  })


  gulp.task('copyGeneralFiles', function() {
    var pathsToCopy = [
      './app/**/*',
      '!./app/index.html',
      '!./app/html',
      '!./app/assets/styles/**',
      '!./app/assets/scripts/**',
      '!./app/temp',
      '!./app/temp/**'
    ]
    return gulp.src(pathsToCopy)
      .pipe(gulp.dest("./docs"));
  })


  gulp.task('optimizeImages', function() {
    return gulp.src('./app/assets/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest("./docs/assets/images"));
  })



// , "./app/html/index_en.html"
  gulp.task('usemin_index', function() {
    return gulp.src("./app/index.html" )
      .pipe(usemin({
        css: [function() {
          return rev()
        }, function() {
          return cssnano()
        }],
        js: [function() {
          return rev()
        }, function() {
          return uglify()
        }]
      }))
      .pipe(gulp.dest("./docs"))
  })

  gulp.task('usemin_index_en', function() {
    return gulp.src("./app/html/index_en.html" )
      .pipe(usemin({
        css: [function() {
          return rev()
        }, function() {
          return cssnano()
        }],
        js: [function() {
          return rev()
        }, function() {
          return uglify()
        }]
      }))
      .pipe(gulp.dest("./docs/html"))
  })



gulp.task('usemin', gulp.series('usemin_index', 'usemin_index_en'));
  gulp.task('build', gulp.series('deleteDistFolder',  'copyGeneralFiles', 'styles', 'optimizeImages', 'usemin'));
