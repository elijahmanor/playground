/* eslint-disable */
var webpack = require( "webpack" );
/* eslint-enable */
var glob = require( "glob" );
var _ = require( "lodash" );
var path = require( "path" );

function aliasComponents() {
	var components = {};
	var matches = glob.sync( "./client/js/components/**/*.jsx" );
	matches.forEach( function( match ) {
		var filename = path.basename( match, ".jsx" );
		components[ filename ] = path.join( appConfig.root, match );
	} );
	return components;
}

function aliasCommon() {
	var common = {};
	var matches = glob.sync( "./node_modules/@lk/web-common-ui/src/{actions/*.js,components/**/*.jsx,infrastructure/*.js,mixins/*.js,stores/**/*.js}" );
	matches.forEach( function( match ) {
		var filename = path.basename( match );
		filename = filename.substr( 0, filename.lastIndexOf( "." ) );

		common[ "common/" + filename ] = match.replace( "./node_modules/", "" );
	} );

	return common;
}

module.exports = {
	amd: { jQuery: true },
	module: {
		loaders: [
			{
				test: /(client|@lk).*\.(js|jsx)$/,
				loader: "babel",
				query: {
					auxiliaryCommentBefore: "istanbul ignore next - babel generated code",
					compact: false,
					blacklist: [ "strict" ],
					experimental: true,
					optional: "runtime"
				}
			},
			{ test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader?{browsers:[\"last 2 version\", \"ie >= 9\"]}" },
			{ test: /\.less$/, loader: "style-loader!css-loader!autoprefixer-loader?{browsers:[\"last 2 version\", \"ie >= 9\"]}!less-loader!" + path.join( appConfig.root, "./tasks/tools/less-loader.js" ) },
			{ test: /sinon.*\.js/, loader: "imports?define=>false" }
		]
	},
	resolve: {
		root: path.join( appConfig.root, "./client/js" ),
		extensions: [ "", ".webpack.js", ".web.js", ".js", ".jsx" ],
		alias: _.extend( {
				window: "@lk/web-common-ui/src/infrastructure/windowProxy",
				react: "react/addons",
				"react-router": "react-router/umd/ReactRouter"
			}, aliasComponents(), aliasCommon()
		)
	}
};
