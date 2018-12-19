var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	minifyCss 		= require('gulp-minify-css'),
	uglify 		 	= require('gulp-uglifyjs'),
	rename 			= require('gulp-rename'),
	del          	= require('del'),
	imagemin     	= require('gulp-imagemin'), 
    pngquant     	= require('imagemin-pngquant'), 
    cache        	= require('gulp-cache'),
    autoprefixer	= require('gulp-autoprefixer') 


gulp.task('sass', function (){
	return gulp.src('app/sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('css', function() {
	return gulp.src([
			'app/libraries/bootstrap/dist/css/bootstrap.min.css'
			])
			.on('error', console.log)
			.pipe(concat('vendor.css'))
			.pipe(gulp.dest('app/css'))
			.pipe(rename({suffix: ".min"}))
			.pipe(minifyCss())
			.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: true
	})
})

gulp.task('js', function() {
    return gulp.src([
        'app/libraries/jquery/dist/jquery.min.js',
        'app/libraries/bootstrap/dist/js/bootstrap.min.js'
        ])
				.pipe(concat('vendor.js')) 
				.pipe(gulp.dest('app/js')) 
				.pipe(rename({suffix: ".min"}))
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js')); 
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({  
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); 
});

gulp.task('clean', function() {
    return del.sync('dist'); 
});

gulp.task('clear', function() {
	return cache.clearAll();
})

gulp.task('dist', ['clean', 'img', 'sass', 'css', 'js'], function() {

	var distCss = gulp.src('app/css/**/*') 
	.pipe(gulp.dest('dist/css'))

	var distFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))

	var distJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))

	var distHtml = gulp.src('app/*.html') 
	.pipe(gulp.dest('dist'));

});

gulp.task('watch', ['browser-sync', 'sass', 'js'], function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html');
	gulp.watch('app/js/**/*.js', browserSync.reload);
})
