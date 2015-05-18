var gulp = require('gulp'),
	semver = require('semver'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch'),
	bump = require('gulp-bump'),
	pkg = require('./package.json'),
	watch = require('gulp-watch'),
	sass = require('gulp-ruby-sass'),
	htmlreplace = require('gulp-html-replace');

gulp.task('styles', function() {
	return sass('src/scss/main.scss')
		.on('error', function (err) {
      		console.error('Error!', err.message);
   		})
		.pipe(gulp.dest('src/css'))
});

gulp.task('deploy-master', function() {
	var newVer = semver.inc(pkg.version, 'patch');
	return gulp.src(['./package.json'])
		.pipe(bump({
			version: newVer
		}))
		.pipe(gulp.dest('./'))
		.on('end', shell.task([
			'git add --all',
			'git commit -m "' + newVer + '"',
			'git tag -a "' + newVer + '" -m "' + newVer + '"',
			'git push origin master',
			'git push origin --tags'
		]));
});

gulp.task('deploy', ['build'], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./build s3://gdn-cdn/<%= path %>/ --profile interactive --acl public-read --cache-control="max-age=0, no-cache"'
		]));
});

gulp.task('build', ['styles'], function() {
	gulp.src('./')
		.pipe(shell([
			'jspm bundle-sfx --minify src/lib/index',
			'cp -f ./build.js ./build/',
			'cp -rf ./src/css ./build && cp -rf ./src/images ./build/images',
			'cp -f ./src/boot.js ./build'
		]));

	gulp.src('./index.html')
		.pipe(htmlreplace({
			src: 'index.html',
			'js': {
				src: ['build.js']
			}
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', ['styles']);
});
