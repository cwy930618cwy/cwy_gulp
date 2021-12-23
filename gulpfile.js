const gulp = require('gulp')
const connect = require("gulp-connect");

gulp.task("hello", function(){
    console.log("hello world")
})

// html dom
gulp.task("copy-html", function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload())
})

// css 样式
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

// js 逻辑
const uglify = require('gulp-uglify');

gulp.task("js", function(){
    return gulp.src("js/index.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

// 监听
gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-html"])
    gulp.watch("stylesheet/index.scss", ["sass"])
    gulp.watch("js/index.js", ["js"])
})

// 服务
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

// build
gulp.task("build", ["hello","copy-html", "sass", "js"], function(){
    console.log('任务执行完毕')
})

// 全局
gulp.task("dev", ["watch", "server"])

