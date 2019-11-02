const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const cp = require('child_process');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

var bTsProject = ts.createProject('./tsconfig.json', {rootDir:'./src', outDir:'./dist'});


//frontend
//base to preserve the subfolder structure

//clean old files
function bClean(){
  return del(['./dist/**','!./dist']); //https://www.npmjs.com/package/del !The glob pattern ** matches all children and the parent. You have to explicitly ignore the parent directories too:
}

function bTs(){
  return gulp.src('./src/*.ts', {base:'./src'}).pipe(bTsProject()).pipe(gulp.dest('./dist'));
}

function fWebPack(){
  return gulp.src('./dist/main.js', {base:'./dist'}).pipe(named()).pipe(webpack({mode:"development", node:{fs:'empty'}})).pipe(gulp.dest('./dist'));
}

function run(cb){
    let child = cp.exec('node ./dist/index.js'); 
    child.stdout.setEncoding('utf8'); 
    child.stdout.on('data', function(data) {
      console.log(data.toString()); 
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function(data) {
      console.log(data.toString()); 
    });
    child.on('close', function() {
        run(cb);
        cb();
    });
  }

exports.default = gulp.series(bClean, bTs, fWebPack, run);