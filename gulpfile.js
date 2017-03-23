var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-cleancss'),
    clean = require('gulp-clean'),
    header = require('gulp-header');
    webpack = require('webpack-stream'),
    argv = require('yargs').argv;

var banner = 
    '/*!\n' + 
    ' * Existing-table v0.1.0 (https://roctive.github.io/existing-table/)\n' +
    ' * Copyright 2017 Galen Tian.\n' +
    ' * Licensed under the MIT license\n' +
    ' */\n',
    projectArray = ['js', 'less'],
    projectName = 'existing-table',
    distRoot = './dist/'

// Clean
// ========================================

var cleanTask = 'clean';

gulp.task(cleanTask, function () {
    return gulp.src(distRoot, { read: false }).pipe(clean());
});

// Tasks
// ========================================

gulp.task(projectArray[0], [cleanTask], function () {
    var srcPath = './js/' + projectName + '.js',
        distPath = distRoot + 'js';

    return gulp.src(srcPath)
        .pipe(webpack({
            output: {
                filename: projectName + '.js'
            }
        }))
        .pipe(header(banner))
        .pipe(gulp.dest(distPath))
        .pipe(rename(projectName + '.min.js'))
        .pipe(gulp.dest(distPath))
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(gulp.dest(distPath));
});
gulp.task(projectArray[1], [cleanTask], function () {
    var srcPath = './less/' + projectName + '.less',
        distPath = distRoot + 'css';

    return gulp.src(srcPath)
        .pipe(less())
        .pipe(header(banner))
        .pipe(rename(projectName + '.css'))
        .pipe(gulp.dest(distPath))
        .pipe(rename(projectName + '.min.css'))
        .pipe(cleancss())
        .pipe(header(banner))
        .pipe(gulp.dest(distPath));
});

// Default
// ========================================

var zipFile = 'dist.zip',
    _version = '';

gulp.task('default', projectArray, function () {
    return gulp;
});