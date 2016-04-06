var gulp = require( 'gulp' );
var semver = require( 'semver' );
var shell = require( 'gulp-shell' );
var watch = require( 'gulp-watch' );
var bump = require( 'gulp-bump' );
var pkg = require( './package.json' );

gulp.task( 'deploy', function() {

    var newVer = semver.inc( pkg.version, 'patch' );

    return gulp.src( [ './package.json' ] )
               .pipe( bump( { version: newVer } ) )
               .pipe( gulp.dest( './' ) )
               .on( 'end', shell.task( [
                   'git add --all',
                   'git commit -m "' + newVer + '"',
                   'git tag -a "' + newVer + '" -m "' + newVer + '"',
                   'git push origin master',
                   'git push origin --tags'
               ] ) );

} );

gulp.task( 'link', function() {
    watch( [ 'lib/**/*' ], shell.task( [ 'jspm link github:<%= user %>/<%= repo %>@dev -y' ] ) );
} );
