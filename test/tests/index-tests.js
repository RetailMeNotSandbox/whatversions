var expect = require( 'chai' ).expect;
var whatversions = require( '../../index' );
var path = require( 'path' );
var fixturesPath = path.resolve( __dirname, '../fixtures' );

describe( 'whatversions', function () {
	describe( 'api', function () {
		it( 'properly recognizes invalid installed modules', function ( done ) {
			whatversions.run( path.resolve( fixturesPath, 'invalid' ) ).then( function ( dependenciesData ) {
				expect( dependenciesData ).to.deep.equal( {
					'lodash.isarray': {
						name: 'lodash.isarray',
						specified: '3.0.4',
						actual: '4.0.0',
						match: 'invalid'
					},
					npmlog: {
						name: 'npmlog',
						specified: '2.0.3',
						actual: '2.0.3',
						match: 'perfect'
					},
					colors: {
						name: 'colors',
						specified: '1.1.2',
						actual: '1.1.2',
						match: 'perfect'
					},
					'left-pad': {
						name: 'left-pad',
						specified: '1.0.1',
						actual: '1.0.0',
						match: 'invalid'
					}
				} );
				done();
			} );
		} );

		it( 'properly recognizes "match" range-installed modules', function ( done ) {
			whatversions.run( path.resolve( fixturesPath, 'match' ) ).then( function ( dependenciesData ) {
				expect( dependenciesData ).to.deep.equal( {
					'lodash.isarray': {
						name: 'lodash.isarray',
						specified: '^3.0.2',
						actual: '3.0.4',
						match: 'match'
					},
					npmlog: {
						name: 'npmlog',
						specified: '2.0.3',
						actual: '2.0.3',
						match: 'perfect'
					},
					colors: {
						name: 'colors',
						specified: '1.1.2',
						actual: '1.1.2',
						match: 'perfect'
					},
					'left-pad': {
						name: 'left-pad',
						specified: '^1.0.0',
						actual: '1.0.1',
						match: 'match'
					}
				} );
				done();
			} );
		} );

		it( 'properly recognizes perfectly installed modules', function ( done ) {
			whatversions.run( path.resolve( fixturesPath, 'perfect' ) ).then( function ( dependenciesData ) {
				expect( dependenciesData ).to.deep.equal( {
					'lodash.isarray': {
						name: 'lodash.isarray',
						specified: '3.0.4',
						actual: '3.0.4',
						match: 'perfect'
					},
					npmlog: {
						name: 'npmlog',
						specified: '2.0.3',
						actual: '2.0.3',
						match: 'perfect'
					},
					colors: {
						name: 'colors',
						specified: '1.1.2',
						actual: '1.1.2',
						match: 'perfect'
					},
					'left-pad': {
						name: 'left-pad',
						specified: '1.0.1',
						actual: '1.0.1',
						match: 'perfect'
					}
				} );
				done();
			} );
		} );

		it( 'properly recognizes missing modules', function ( done ) {
			whatversions.run( path.resolve( fixturesPath, 'missing' ) ).then( function ( dependenciesData ) {
				expect( dependenciesData ).to.deep.equal( {
					'lodash.isarray': {
						name: 'lodash.isarray',
						specified: '3.0.4',
						actual: '3.0.4',
						match: 'perfect'
					},
					npmlog: {
						name: 'npmlog',
						specified: '2.0.3',
						actual: undefined,
						match: 'missing'
					},
					colors: {
						name: 'colors',
						specified: '1.1.2',
						actual: '1.1.2',
						match: 'perfect'
					},
					'left-pad': {
						name: 'left-pad',
						specified: '1.0.1',
						actual: undefined,
						match: 'missing'
					}
				} );
				done();
			} );
		} );
	} );
} );
