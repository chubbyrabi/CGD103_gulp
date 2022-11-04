const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function defaultTask(cd){
    console.log('gulp ok');
    cd();
}
exports.c = defaultTask;


// task A
function missionA(cb) {
    console.log('missionA');
    cb();
}

// task B
function missionB(cb) {
    console.log('missionB');
    cb();
}

exports.sync = series(missionA, missionB);
exports.async = parallel(missionA, missionB);

// 以上使用在最後打包的流程控管

function file(){
    // return src('src/index.html').pipe(dest('dist/'));
    // return src('src/*.html').pipe(dest('dist/'));
    // * 全選
    // return src(['src/*.html', 'src/*.css']).pipe(dest('dist/'));
    // [,] 陣列(複選)
    // return src(['src/*.html', 'src/*.css', 'src/**/*.js']).pipe(dest('dist/'));
    // ** 下一層
    return src(['src/*.html', 'src/*.css', 'src/**/*.js','!src/about.html']).pipe(dest('dist/'));
    // ! 排除
}
exports.f = file;
// 搬家


// rename 移上來後可以兩個一起改名壓縮打包
const rename = require('gulp-rename');

// 壓縮css
// const cleanCSS = require('gulp-clean-css');
// function cssminify(){
//     return src('src/*.css').pipe(cleanCSS()).pipe(dest('dist/css'));
// }
// exports.css = cssminify;

// 壓縮js
// const uglify = require('gulp-uglify');
// function js(){
//     return src('src/js/*.js').pipe(uglify()).pipe(dest('dist/js'))
// }
// exports.minijs = js;

// 壓縮css+js
// exports.combine = parallel(js, cssminify)



// rename 改檔名
// const rename = require('gulp-rename');
// function cssname(){
//     return src('src/*.css')
//     .pipe(rename({
//         extname : 'min.css'
//     }))
//     .pipe(dest('dist/css'))
// }
// exports.re =cssname;

// function cssname(){
//     return src('src/*.css')
//     .pipe(rename({
//         extname : 'min.css'
//     }))
//     .pipe(dest('dist/css'))
// }
// exports.re =cssname;



// 壓縮css
const cleanCSS = require('gulp-clean-css');
function cssminify(){
  return src('src/*.css')
  .pipe(cleanCSS())
  .pipe(rename({
     extname : ".min.css"
  }))
  .pipe(dest('dist/css'))
}
exports.css = cssminify



// 壓縮js
const uglify = require('gulp-uglify');
function js(){
  return src('src/js/*.js')
  .pipe(uglify())
  .pipe(rename({
     extname : ".min.js"
  }))
  .pipe(dest('dist/js'));
}
exports.minijs = js;

//====== 同時壓縮 css js ======
exports.combine = parallel(js , cssminify)
// ============ end ============

// rename 改檔名
function cssname(){
   return src('src/*.css')
   .pipe(rename({
     extname : '.min.css'   
    }))
   .pipe(dest('dist/css'))
}

exports.re = cssname;

// sass

//sass => css
const sass = require('gulp-sass')(require('sass'));

function styleSass() {
    return src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('./dist/css'));
}
exports.style = styleSass;


// html
const fileinclude = require('gulp-file-include');

function html(){
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}

exports.h = html;


function watchfile(){
    watch(['src/*.html','src/layout/*.html'], html)
    watch(['src/sass/*.scss','src/sass/**/*.sass'], html)
}
exports.w = watchfile;