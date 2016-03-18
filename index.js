var path = require( 'path' );
var fs = require( 'fs' );
var log = require( 'npmlog' );
var Promise = require( 'es6-promise' ).Promise;
var semver = require( 'semver' );

function run ( pathToRepo ) {
	pathToRepo = path.resolve( pathToRepo );
	var packageJson = require( path.resolve( pathToRepo, './package.json' ) );
	var dependenciesSeen = {};

	if ( packageJson.devDependencies ) {
		Object.keys( packageJson.devDependencies ).forEach( function ( packageName ) {
			dependenciesSeen[ packageName ] = {
				name: packageName,
				specified: packageJson.devDependencies[ packageName ]
			};
		} );
	}

	if ( packageJson.dependencies ) {
		Object.keys( packageJson.dependencies ).forEach( function ( packageName ) {
			dependenciesSeen[ packageName ] = {
				name: packageName,
				specified: packageJson.dependencies[ packageName ]
			};
		} );
	}

	var promises = [];
	Object.keys( dependenciesSeen ).forEach( function ( dependencySeen ) {
		promises.push( new Promise( function ( resolve, reject ) {
			var dependencyPath = path.resolve( pathToRepo, 'node_modules/' + dependencySeen );
			fs.stat( dependencyPath, function ( err, stat ) {
				if ( !err || err.code !== 'ENOENT' ) {
					var dependencyVersion = require( dependencyPath + '/package.json' ).version;
					dependenciesSeen[ dependencySeen ].actual = dependencyVersion;
				} else if ( err && err.code === 'ENOENT' ) {
					dependenciesSeen[ dependencySeen ].actual = undefined; // missing
				} else {
					reject( err );
				}
				resolve();
			} );
		} ) );
	} );

	return Promise.all( promises ).then( function () {
		// Update the dependencies list with more detail
		Object.keys( dependenciesSeen ).forEach( function ( dependencyKey ) {
			var dependency = dependenciesSeen[ dependencyKey ];

			if ( dependency.actual === undefined ) {
				dependency.match = 'missing';
			} else {
				var clean = semver.clean( dependency.specified );
				if ( clean === dependency.actual ) {
					// Perfect match between specified version and actual version
					dependency.match = 'perfect';
				} else if ( semver.satisfies( dependency.actual, dependency.specified ) ) {
					// Technically satisfies semver, but is using a range
					dependency.match = 'match';
				} else {
					// Totally fails semver!
					dependency.match = 'invalid';
				}
			}
		} );

		return dependenciesSeen;
	} );
}

module.exports = {
	run: run
};
