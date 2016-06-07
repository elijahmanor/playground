var test = require( "ava" );
var lint = require( "sass-lint" );
var file = {
  text: ".ComponentName { z-index: 1; }\n"
};
var options = {
  "merge-default-rules": false,
  "cache-config": false,
  "rules" : {
    "class-name-format": [
      2,
      {
        "convention": "^(([A-Z][a-z]+)+)(-(([a-z][a-zA-Z]+)+))?(--(([a-z][a-zA-Z]+)+))?$",
        "convention-explanation": "BEM"
      }
    ]
  }
};
var results = lint.lintText( file, options );

test( function( t ) {
  t.plan( 1 );

  console.log( JSON.stringify( results, null, 4 ) );

  t.same( results.errorCount, 0 );
} );
