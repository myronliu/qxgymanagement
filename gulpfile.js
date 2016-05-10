var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var open = require("gulp-open");
var colors = require( "colors");
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var rename = require("gulp-rename");
var htmlreplace = require('gulp-html-replace');
var compass = require('gulp-compass');
var buffer = require('vinyl-buffer');

var APP_ENV = process.env.NODE_ENV || "development";

var vendorDependencies =  [
  'buffer', 'filesize', 'decimal', 'object-assign', 'clone', 'extend', 
  'react', 'react-bootstrap', 'react-notification-system',
  'underscore', 'superagent', 'evoflux', 'json2csv', 'qiniu'
];

// 可以考虑在指定环境中打包或压缩以提高打包效率
var isPackagejsVendor = (APP_ENV != "development");

// Compile third-party dependencies separately for faster performance. 
gulp.task('packagejs-vendor', function() {
  return browserify()
    .require(vendorDependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(isPackagejsVendor, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('./assets/'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('vendor.bundle.min.js'))
    .pipe(gulp.dest('./assets/'));
});

// 只在服务器端使用的包
var serverDependencies = [];

// Compile only project files, excluding all third-party dependencies. 
// gulp.task('packagejs', ['packagejs-vendor'], function() {
gulp.task('packagejs',function() {
  return browserify({entries: './main.js', extensions: ['.js'], debug: true})
    .transform(reactify)
    .external(serverDependencies.concat(vendorDependencies))
    .bundle()
    .on('error',function(err){
      console.error(err.message.red);
      console.error(err.stack.yellow);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./assets/'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./assets/'));
});

gulp.task('compass', function(){
  gulp.src('./src/*.scss')
    .pipe(compass({
      css: 'assets/css',
      sass: 'assets/sass',
      image: 'assets/imgs'
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(gulp.dest('assets/temp'));
});

// gulp.task('minijs')
gulp.task('reload',['packagejs'],function(){
  gulp.src(['./src/*.js','./src/**/*.js'])
    .pipe(connect.reload());
});

gulp.task('browsersync',['packagejs'],function(){
  browserSync({
    files: ['./assets/css/*.css'],
    server: {
      baseDir:[__dirname],
    },
    port: 8080,
    open: true,
    browser:"chrome",
    minify: false
  })
})

gulp.task('watch',function(){
  //gulp.watch(['./index.html','./src/**/*.js','./src/*.js'],['packagejs',browserSync.reload]);
  //gulp.watch(['./src/**/*.scss'],['compass']);
})

gulp.task('demon',function(){
  nodemon({
    script:'server.js',
    ext:'html css js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./assets/', './mock/']
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})

gulp.task('uat',function(){
  nodemon({
    script:'server.js',
    ext:'html css js',
    env: { 'NODE_ENV': 'uat' },
    ignore: ['./assets/', './mock/']
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})

gulp.task('demon-debug',function(){
  nodemon({
    script:'server.js',
    ext:'html css js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./assets/', './mock/'],
    nodeArgs: ['--debug']
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})

gulp.task('mock',function(){
  nodemon({
    script:'./mock/server.js',
    ext:'html css js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./assets/', './app/']
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})

gulp.task('rejsurl',['packagejs-vendor', 'packagejs', 'rejsurl-operation'],function(){
  gulp.src('./app/views/index.ejs')
    .pipe(htmlreplace({
      'js-vendor': '/vendor.bundle.min.js',
      'js':'/bundle.min.js'
    }))
    .pipe(gulp.dest('./app/distviews/'));
    
  gulp.src('./app/views/webpage.ejs')
    .pipe(gulp.dest('./app/distviews/'));
})

gulp.task('serve',['browsersync','watch']);
gulp.task('s',['serve']);
gulp.task('default',['packagejs']);
gulp.task('n',['demon']);
gulp.task('uat',['uat']);
gulp.task('d',['watch', 'demon-debug']);
gulp.task('m',['mock']);