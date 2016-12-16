// Include gulp
var gulp = require('gulp'),
    textDomain = 'bloc',
    appUrl = "bloc.local";

// Include Our Plugins
var jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    sassGlobbing = require('gulp-sass-glob'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browsersync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    cssimport = require('gulp-cssimport'),
    webpack = require('webpack-stream'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackStatic = require('webpack'),
    gutil = require('gulp-util'),
    bake = require('gulp-bake'),
    stylish = require('jshint-stylish'),
    sort = require('gulp-sort');


var webpackConfig = require('./webpack.config.js'),
    bundler = webpackStatic(webpackConfig);

gulp.task('browser-sync', function () {
    browsersync({
        open: false,
        notify: true,
        ghostMode: {
            clicks: false,
            forms: true,
            scroll: false
        },
        proxy: {
            target: appUrl,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {colors: true}
                    // http://webpack.github.io/docs/webpack-dev-middleware.html
                }),
                webpackHotMiddleware(bundler)
            ]
        }
    });
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src(['assets/js/*.js', '!assets/js/respond.min.js'])
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
    //.pipe(notify({message: "Javascript linted and compiled", title: "Compilation Successful"}));
});

//Lint sass
gulp.task('sass:lint', function() {

});

// Compile Our Sass
gulp.task('sass:compile', function () {

    return gulp.src('assets/styles/scss/**/*.scss')
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sassGlobbing())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/styles/css/'))
        .pipe(browsersync.stream())
        .pipe(cssimport())
        .pipe(cssmin({processImport: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/styles/css'));
    //.pipe(notify({message: "Sass compilation complete", title: "Compilation Successful"}));
});

// Concatenate & Minify JS
gulp.task('scripts', ['lint'], function () {
    return gulp.src([
        'assets/js/*.js',
        'assets/js/components/*.js'])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bloc.js'))
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(rename('bloc.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(notify({message: "Javascript linted and compiled", title: "Compilation Successful"}))
});

//Minify Bundle
gulp.task('bundle:minify', function () {
    return gulp.src([
        'assets/js/dist/bundle.js'
    ])
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/dist'))
});

// Concatenate & Minify JS
gulp.task('webpack:build', function () {
    return gulp.src([
        'assets/js/react/**/*.js*'
    ])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(webpack(require('./webpack.production.config')))
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(notify({message: "React built"}))
});

gulp.task('bake', function() {
   return gulp.src(['*.html'])
       .pipe(bake(require('./bakemap.js')))
       .pipe(gulp.dest('./dist/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('assets/js/dist/all.js').on('change', browsersync.reload);
    gulp.watch(['assets/js/*.js', 'assets/js/components/*.js', 'assets/js/react/*.js*'], ['lint', 'scripts']);
    gulp.watch(['assets/js/react/**/*.js*'], ['webpack:build']);
    gulp.watch(['assets/js/dist/bundle.js'], ['bundle:minify']);
    gulp.watch('assets/styles/scss/**/*.scss', ['sass:lint', 'sass:compile']);//.on( 'change', browsersync.stream );
    gulp.watch(['**.html', '!./dist/*]'], ['bake']);//.on( 'change', browsersync.stream );
});

// Default Task
gulp.task('default', ['lint', 'sass:lint', 'sass:compile', 'scripts', 'watch', 'webpack:build', 'bundle:minify', 'browser-sync']);
gulp.task('build', ['lint', 'sass:lint', 'sass:compile', 'scripts', 'webpack:build', 'bundle:minify']);


function errorAlert(error) {
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
};
