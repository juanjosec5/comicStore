const { series } = require("gulp");

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify"),
    inject = require("gulp-inject"),
    order = require("gulp-order"),
    templateCache = require('gulp-angular-templatecache');

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
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js'
    ];

    return gulp
        .src(sources)
        .pipe(concat("dependencies.js"))
        .pipe(gulp.dest("dist/scripts/"))
        .pipe(notify({ message: "Dependency files successfully concated and reduced to dependencies.js" }));
}

function styles() {
    return gulp
        .src(["src/app/**/*.scss"])
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(concat("main.css"))
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "CSS files successfully compiled into main.css" }));
}

function compileTemplates(){
    return gulp.src(['src/app/**/*.html'])
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('dist/scripts/'))
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
    gulp.watch("src/*.html", series(index, injectHtml));
    gulp.watch("src/", browserSync.reload());
}

exports.default = series(scripts, dependencies, styles, compileTemplates, index, injectHtml, serve);

//==================================================================
//Gulp 3.9.0
//==================================================================

// gulp.task("styles", function() {
//     return gulp
//     .src(["src/app/**/*.scss"])
//     .pipe(concat("main.css"))
//     .pipe(gulp.dest("dist/"))
//     .pipe(notify({ message: "CSS files successfully compiled into main.css" }));
// });

// gulp.task("serve", function() {
//     browserSync.init({
//         server: {
//             baseDir: "dist"
//         }
//     });

//     gulp.watch("app/**/*.scss", gulp.series("styles"));
//     gulp.watch("app/**/*.js", gulp.series("scripts"));
//     gulp.watch("dist", browserSync.reload);
// });

// gulp.task("scripts", function() {
//     return gulp
//         .src(["src/app/**/*.js"])
//         .pipe(concat("main.js"))
//         .pipe(gulp.dest("dist/"))
//         .pipe(notify({ message: "JS files successfully concated and reduced to main.js" }));
// });