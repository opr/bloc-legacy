// Include gulp
let appUrl = 'localhost:8088',
    includeThreeJs = true;

// Include Our Plugins
let gulp = require('gulp'),
    jshint = require('gulp-jshint'),
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
    sassLint = require('gulp-sass-lint'),
    stylish = require('jshint-stylish'),
    sort = require('gulp-sort'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver'),
    genv = require('gulp-env');


let webpackConfig = require('./webpack.config.js'),
    bundler = webpackStatic(webpackConfig);

gulp.task('browser-sync', function () {
    browsersync({
        open: false,
        notify: false,
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

gulp.task('lint', function () {
    return gulp.src(['assets/js/*.js', '!assets/js/respond.min.js'])
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('sass:lint', function () {
    return gulp.src([
        '!assets/styles/scss/config/_reset.scss',
        '!assets/styles/scss/config/_variables.scss',
        '!assets/styles/scss/config/_fonts.scss',
        '!assets/styles/scss/mixins/_font-size.scss',
        '!assets/styles/scss/mixins/_rgba.scss',
        'assets/styles/scss/**/*.scss'
    ])
        .pipe(sassLint({
            options: {
                formatter: 'stylish',
                'max-warnings': 1
            },
            rules: {
                'no-ids': 2, // Severity 0 (disabled)
                'no-css-comments': 0,
                'variable-name-format': 0,
                'final-newline': 0,
                'no-important': 0,
                'no-mergeable-selectors': 1, // Severity 1 (warning)
                'pseudo-element': 0,
                'placeholder-in-extend': 0,
                'no-url-domains': 0,
                'no-url-protocols': 0,
                'mixins-before-declarations': 0,
                'property-sort-order': 0,
                'leading-zero': 0
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

//webserver for local dev
gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            port: 8088,
        }));
});

// Compile Our Sass
gulp.task('sass:compile', ['sass:lint'], function () {

    return gulp.src('assets/styles/scss/**/*.scss')
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sassGlobbing())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/styles/css/'))
        .pipe(browsersync.stream())
        .pipe(cssimport())
        .pipe(cssmin({processImport: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/styles/css'));
});

gulp.task('imagemin', () =>
    gulp.src(['assets/img/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('assets/dist/img/'))
);

gulp.task('scripts', ['lint'], function () {
    return gulp.src([
        /** DO NOT PUT EXTERNAL LIBRARIES HERE PUT THEM IN THE concatExternalScripts FUNCTION **/
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
    //.pipe(notify({message: "Javascript linted and compiled", title: "Compilation Successful"}))
});

gulp.task('bundle:minify', function () {
    return gulp.src([
        'assets/js/dist/bundle.js'
    ])
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(rename('bundle.min.js'))
        //.pipe(uglify()).on('error', gutil.log)
        .pipe(gulp.dest('assets/js/dist'))
});

// Concatenate & Minify JS
gulp.task('webpack:build', ['set-env'], function () {
    return gulp.src([
        'assets/js/react/**/*.js*',
        'assets/js/modules/**/*.js*'
    ])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(webpack(require('./webpack.production.config')))
        .pipe(gulp.dest('assets/js/dist'))
    //.pipe(notify({message: "React built"}))
});

gulp.task('scripts:concat-external:min', ['scripts'], concatExternalScripts(true));

gulp.task('scripts:concat-external', ['scripts'], concatExternalScripts());

function concatExternalScripts(min = false) {
    let threeJs = [];
    if (includeThreeJs) {
        threeJs = ['assets/vendor/three.js/three' + (min ? '.min' : '') + '.js'];
    }
    return () => {
        return gulp.src([...threeJs,
            /** put your libraries here **/
            'assets/vendor/babel-polyfill/dist/polyfill.min.js',
            //'assets/vendor/velocity/velocity.min.js',
            'assets/vendor/particles/particles.min.js',
            'assets/vendor/iscroll/iscroll.min.js',
            'assets/js/dist/bloc' + (min ? '.min' : '') + '.js'
        ])
            .pipe(concat('bloc' + (min ? '.min' : '') + '.js'))
            .pipe(gulp.dest('assets/js/dist'));
    }
}

gulp.task('set-env', function () {
    genv.set({NODE_ENV: 'production'});
});


// Watch Files For Changes
gulp.task('watch', function () {
    //gulp.watch(['assets/js/dist/bundle.min.js']).on('change', browsersync.reload);
    gulp.watch(['Views/**/*.cshtml', 'components/*.php']).on('change', browsersync.reload);
    gulp.watch(['assets/js/*.js', 'assets/js/components/*.js', 'assets/js/react/**/*.js*', 'assets/js/modules/**/*.js*'], ['lint', 'scripts', 'scripts:concat-external:min', 'scripts:concat-external']);
    gulp.watch(['assets/js/react/**/*.js*', 'assets/js/modules/**/*.js*'], ['webpack:build']);
    gulp.watch(['assets/js/dist/bundle.js'], ['bundle:minify']);
    gulp.watch('assets/styles/scss/**/*.scss', ['sass:lint', 'sass:compile']);//.on( 'change', browsersync.stream );
});

// Default Task
gulp.task('default', ['lint', 'sass:lint', 'sass:compile', 'scripts', 'scripts:concat-external:min', 'scripts:concat-external', 'watch', 'webpack:build', 'bundle:minify', 'browser-sync', 'webserver']);
gulp.task('build', ['set-env', 'lint', 'sass:lint', 'sass:compile', 'scripts', 'scripts:concat-external:min', 'scripts:concat-external', 'webpack:build', 'bundle:minify']);


function errorAlert(error) {
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
}