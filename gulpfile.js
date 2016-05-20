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
    browsersync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    cssimport = require('gulp-cssimport'),
    sort = require('gulp-sort');

gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: appUrl,
        open: false,
        notify: false,
        ghostMode: {
            clicks: false,
            forms: true,
            scroll: false
        }
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['assets/js/*.js', '!assets/js/respond.min.js'])
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'));
        //.pipe(notify({message: "Javascript linted and compiled", title: "Compilation Successful"}));
});

// Compile Our Sass
gulp.task('sass', function() {

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
gulp.task('scripts', function() {
    return gulp.src(['assets/js/*.js'])
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

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/dist/bloc.js').on( 'change', browsersync.reload);
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/styles/scss/**/*.scss', ['sass']);//.on( 'change', browsersync.stream );
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'browser-sync']);


function errorAlert(error){
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
};
