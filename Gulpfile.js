const { series } = require("gulp");

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify"),
    inject = require("gulp-inject"),
    order = require("gulp-order"),
    templateCache = require('gulp-angular-templatecache'),
    cssbeautify = require('gulp-cssbeautify');

function scripts() {
    return gulp
        .src(["src/app/**/*.js"])
        .pipe(order([
            '**/*.module.js',
            '**/*.js'
        ]))
        .pipe(concat("main.js"))
        .pipe(gulp.dest("dist/scripts/"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "JS files successfully concated and reduced to main.js" }));
}

function dependencies() {
    var sources = [
        'node_modules/angular/angular.js', 
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.js', 
        'node_modules/angular-touch/angular-touch.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/lodash/lodash.js',
        'node_modules/restangular/dist/restangular.js'

    ];

    return gulp
        .src(sources)
        .pipe(concat("dependencies.js"))
        .pipe(gulp.dest("dist/scripts/"))
        .pipe(notify({ message: "Dependency files successfully concated and reduced to dependencies.js" }));
}

function styles() {
    var sources = [
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
        "src/app/**/*.scss"
    ];

    return gulp
        .src(sources)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(concat("main.css"))
        .pipe(cssbeautify())
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "CSS files successfully compiled into main.css" }));
}

function compileTemplates(){
    return gulp.src(['src/app/**/*.html'])
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "HTML templates compiled and reduced to templates.js" }));
}

function index() {
    return gulp
        .src('src/index.html')
        .pipe(browserSync.stream())
        .pipe(gulp.dest("dist/"))
        .pipe(notify({ message: "Created index.html in dist folder" }));
}

function injectHtml(){
    var sources = gulp.src(['dist/scripts/dependencies.js', 'dist/scripts/templates.js', 'dist/scripts/main.js', 'dist/styles/main.css'], {read: false});

    return gulp
        .src('dist/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: "Injected all files to index.html" }));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    watch();
}

function watch() {
    gulp.watch("src/app/**/*.scss", styles);
    gulp.watch("src/app/**/*.js", scripts);
    gulp.watch("src/app/**/*.html", compileTemplates);
    gulp.watch("src/index.html", series(index, injectHtml));
    gulp.watch("src/", browserSync.reload());
}

exports.default = series(scripts, dependencies, styles, compileTemplates, index, injectHtml, serve);
