var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require('browser-sync');
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");

// compile .less files
gulp.task('less',function(){
	return gulp.src('less/*.less')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('css'))

});

// browser synchronization
gulp.task('browserSync',function(){
	browserSync({
		server:{
			baseDir:"."
		}
	})
});

// watch file changes
gulp.task('watch',['browserSync','less'],function(){
	// compile .less files on changes
	gulp.watch('less/*.less',['less'])
	// reload page when .html, .css, or .js files change
	gulp.watch('*.html',browserSync.reload);
	gulp.watch('css/*.css',browserSync.reload);
	gulp.watch('js/*.{js,json}',browserSync.reload);
});

var onError = function(err){
	gutil.beep();
	console.log(err);
}
