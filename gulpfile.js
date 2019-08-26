let gulp        = require('gulp'),
    sass        = require('gulp-sass')
    cleanCSS    = require('gulp-clean-css')
    browserSync = require('browser-sync')
    rename      = require('gulp-rename')

//  ТАСКИ

gulp.task('browser-sync', () => {                  // создаем таск для обновления страницы и конфигурируем его
    browserSync({                                  
        server: { baseDir: 'app' },
        notify: false
    })
})

gulp.task('code', () => {                          // обновление страницы при изменении html
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('scripts', () => {                       // обновление страницы при изменении JS
    return gulp.src('app/js/**/*/js')
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('sass', async () => {                    // Создаем таск "sass"
    return gulp.src('app/sass/**/*.sass')          // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(sass())                              // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cleanCSS())                          // минификация css
        .pipe(rename({suffix: '.min'}))            // добавляем суффикс .min
        .pipe(gulp.dest('app/css'))                // Выгружаем результатs в папку app/css
        .pipe(browserSync.reload({stream: true}))  // Обновляем страницу чтобы отобразить изменения
} )

gulp.task('watch', async () => { 
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('code'))
    gulp.watch('app/js/**/*/js', gulp.parallel('scripts'))
})




gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'))


