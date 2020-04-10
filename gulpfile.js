'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');

gulp.task('sass', function () {
    return gulp
        .src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    const files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png, jpg, gif}',
    ];
    browserSync.init(files, {
        server: {
            baseDir: './',
        },
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch');
});

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('copyfonts', () => {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,wof,eof,svg}*').pipe(
        gulp.dest('./dist/fonts')
    );
});

gulp.task('imagemin', () => {
    return gulp
        .src('./img/*.{png, jpg, git}')
        .pipe(
            imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true,
            })
        )
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', () => {
    return gulp
        .src('./*.html')
        .pipe(
            flatmap((stream, file) => {
                return stream.pipe(
                    usemin({
                        css: [rev()],
                        html: [() => htmlmin({ collapseWhitespace: true })],
                        js: [uglify(), rev()],
                        inlinejs: [uglify()],
                        inlinecss: [cleanCss(), 'concat'],
                    })
                );
            })
        )
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['clean'], () => {
    gulp.start('copyfonts', 'imagemin', 'usemin');
});
