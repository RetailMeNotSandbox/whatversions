# whatversions

Dead simple script to show you the difference between your package.json dependency versions specified and what you actually have in node_modules. Helps you track down weird inconsistencies in your dependency versions.

# Installation

```bash
npm install -g @rmn/whatversions
```

# CLI Usage

Just run `whatversions` from any repo with a `package.json` in it. You can also specify a path to a given directory with a `package.json` in it if you don't want to navigate to the directory before running the command.

```bash
> whatversions
info fyi Showing specified dependency versions vs. actual installed versions.
name                                  specified  actual   semver
------------------------------------  ---------  -------  -------
amd-inject-loader                     0.2.2      0.2.2    perfect
autoprefixer                          6.3.3      6.3.3    perfect
babel-core                            6.5.2      6.5.2    perfect
babel-loader                          6.2.3      6.2.3    perfect
babel-preset-es2015                   6.5.0      missing  missing
chai                                  3.0.0      3.0.0    perfect
colors                                0.6.2      0.6.2    perfect
css-loader                            0.23.1     0.23.1   perfect
exports-loader                        0.6.2      0.6.3    invalid
expose-loader                         0.7.1      0.7.1    perfect
extend                                3.0.0      3.0.0    perfect
extract-text-webpack-plugin           0.9.1      0.9.1    perfect
grunt                                 0.4.5      0.4.5    perfect
grunt-cli                             0.1.9      0.1.9    perfect
grunt-concurrent                      2.2.1      2.2.1    perfect
grunt-contrib-clean                   1.0.0      1.0.0    perfect
grunt-contrib-concat                  1.0.0      1.0.0    perfect
grunt-contrib-copy                    0.8.0      0.8.0    perfect
grunt-contrib-cssmin                  0.14.0     0.14.0   perfect
grunt-contrib-imagemin                1.0.0      1.0.0    perfect
grunt-contrib-jshint                  1.0.0      1.0.0    perfect
grunt-contrib-requirejs               0.4.4      0.4.4    perfect
grunt-contrib-uglify                  0.9.1      0.9.1    perfect
grunt-contrib-watch                   0.6.1      0.6.1    perfect
grunt-jsbeautifier                    0.2.8      0.2.8    perfect
grunt-jsdoc                           1.0.0      1.0.0    perfect
grunt-karma                           0.12.0     0.12.0   perfect
grunt-postcss                         0.7.2      0.7.2    perfect
grunt-svgstore                        0.5.0      0.5.0    perfect
grunt-webpack                         1.0.11     1.0.11   perfect
grunt-wellington                      0.2.0      0.2.0    perfect
handlebars                            2.0.0      2.0.0    perfect
hooker                                0.2.3      0.2.3    perfect
inject-loader                         2.0.1      2.0.1    perfect
isparta-loader                        2.0.0      2.0.0    perfect
istanbul-instrumenter-loader          0.2.0      0.2.0    perfect
jquery                                1.11.1     1.11.1   perfect
js-beautify                           1.6.2      1.6.2    perfect
jshint-stylish                        2.0.1      2.0.1    perfect
karma                                 0.13.21    0.13.21  perfect
karma-chai-sinon                      0.1.5      0.1.5    perfect
karma-chrome-launcher                 0.2.0      0.2.0    perfect
karma-coverage                        0.5.2      0.5.2    perfect
karma-firefox-launcher                0.1.3      0.1.3    perfect
karma-mocha                           0.2.2      0.2.2    perfect
karma-nyan-reporter                   0.2.1      0.2.1    perfect
karma-phantomjs-launcher              1.0.0      1.0.0    perfect
karma-safari-launcher                 0.1.1      0.1.1    perfect
karma-sourcemap-loader                0.3.7      0.3.7    perfect
karma-spec-reporter                   0.0.24     0.0.24   perfect
karma-teamcity-reporter               0.2.0      0.2.0    perfect
karma-webpack                         1.7.0      1.7.0    perfect
load-grunt-config                     0.19.0     0.19.0   perfect
load-grunt-tasks                      3.1.0      3.1.0    perfect
lodash                                4.6.1      4.6.1    perfect
madge                                 0.5.0      0.5.0    perfect
minami                                1.1.1      1.1.1    perfect
mkpath                                1.0.0      1.0.0    perfect
mocha                                 2.4.5      2.4.5    perfect
node-sass                             3.4.2      3.4.2    perfect
phantomjs-prebuilt                    2.1.4      2.1.4    perfect
postcss-loader                        0.8.1      0.8.1    perfect
raw-loader                            0.5.1      0.5.1    perfect
requirejs                             2.1.20     2.1.20   perfect
sass-loader                           3.1.2      3.1.2    perfect
script-loader                         ^0.6.1     0.6.1    match
sinon                                 1.15.3     1.15.3   perfect
sinon-chai                            2.8.0      2.8.0    perfect
source-map-loader                     0.1.5      0.1.5    perfect
squirejs                              0.2.1      0.2.1    perfect
style-loader                          0.13.0     0.13.0   perfect
time-grunt                            1.3.0      1.3.0    perfect
uglify-js                             2.5.0      2.5.0    perfect
underscore                            1.7.0      1.7.0    perfect
webpack                               1.12.14    1.12.14  perfect
webpack-dev-server                    1.10.1     1.10.1   perfect
webpack-manifest-plugin               0.5.0      0.5.0    perfect
wellington-bin                        1.0.0      1.0.0    perfect
@rmn/ad-block-detector                ^1.0.0     1.0.0    match
```

A dependency specification (a key/value in the `dependency` field of your `package.json`) can have one of 4 states with the node module actually installed, as specified by the `semver` column:

- **match** - The installed module matches the [Semantic Versioning 2.0 spec](http://semver.org/) but is not a perfect match (see next bullet). Philosophically, `whatversions` calls this out to you because I do not recommend allowing ranges in your `package.json`. Rogue actors could publish new malicious versions within your expected module's range, or legitimate publishers could publish new minor and patch versions which introduce breaking changes due to expected peer dependencies or other surprising reasons.
- **perfect** - The installed module's version is exactly the same as what you specified. Examples of perfect matches: specified `1.10.1` and actual `1.10.1`, specified `^1.10.1` and actual `1.10.1`, specified `>=1.10.1` and actual `1.10.1`. `1.10.x` and `1.10.1` cannot be a perfect match, because the `x` stands for any value, meaning there is nothing to match "perfectly".
- **invalid** - The installed module does **not** match the semver spec and something is wrong.
- **missing** - The installed module is not, in fact, installed.

# API Usage

You can use `whatversions` programmatically by installing it locally (`npm install whatversions`) and then requiring and running it:

```javascript
var whatversions = require( 'whatversions' );
whatversions.run( 'path/to/directory' ).then( function ( dependenciesData ) {
	// Do something with dependenciesData
} );
```

Note that it returns a [Promises/A+ compliant Promise object](https://promisesaplus.com/) (specifically, I am using [bluebird](http://bluebirdjs.com)).

`dependenciesData` will be an object where each key is the name of a given dependency, and the value is an object with the following format:

```javascript
{
	// The name of the module - intentionally redundant with
	// the key that goes to this object
	name: 'module-name',
	// The specified version from your package.json
	specified: '^1.0.0',
	// The actual version installed to your node_modules directory
	actual: '1.0.1',
	// The match type - 'perfect', 'match', 'invalid', or 'missing'.
	// See above section for details on the types
	match: 'match'
}
```

Then, you can do whatever you want with the data.

# Contributing

To contribute, feel free to submit a pull request. Please include a description of the changes you made, as
well as tests for the code.
