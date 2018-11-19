import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import del from 'del';

gulp.task('build', function (done) {
  return gulp.src('./build/bracketzada.js')
        .pipe(babel({
          presets: [
            '@babel/preset-env'
          ]
        }))
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', () => done())
});

gulp.task('unit_test', function () {
  return gulp.src('./build/*.test.js')
      .pipe(mocha({
        reporter: 'spec'
      }))
});

gulp.task('del', function () {
  return del([
    './dist'
  ])
});

gulp.task('build', gulp.series(
  'del',
  'unit_test',
  'build'
));