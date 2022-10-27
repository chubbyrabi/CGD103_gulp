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