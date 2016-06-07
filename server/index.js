require( "babel/register" );

var config = require( "./config" );
var pkg = require( "../package.json" );
var fount = require( "fount" );
var hyped = require( "hyped" )( true, true );
var log = require( "./config/log" );
var metronic = require( "./config/metrics" );
var redis = require( "./config/redis" );
var sql = require( "./config/sql" )( config );
var metrics = metronic( config );

// note: order of registrations matter!
fount.register( "metrics", metrics );
fount.register( "redis", redis( config ) );
fount.register( "sql", sql );
fount.register( "postal", require( "postal" ) );
fount.register( "loggingCollectorConfig", config.logging );

if ( fount.canResolve( [ "webpackCompiler" ] ) ) {
	config.host.modules.push( "autohost-webpack-hot" );
}

module.exports = require( "@lk/web-common-init" )( {
	fount: fount,
	pkg: pkg,
	sql: sql,
	hyped: hyped,
	log: log,
	metrics: metrics,
	config: config,
	setupAuth: true
} );
