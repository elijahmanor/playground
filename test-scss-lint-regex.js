var test = require( "ava" );
var results = { errorCount: 0 };

test( function( t ) {
  t.plan( 1 );

  console.log( JSON.stringify( results, null, 4 ) );

  t.skip.same( results.errorCount, 0 );
} );
