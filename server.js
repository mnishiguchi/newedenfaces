// Babel ES6/JSX Compiler
require( 'babel-register' );

const swig       = require( 'swig' );
const React      = require( 'react' );
const ReactDOM   = require( 'react-dom/server' );
const Router     = require( 'react-router' );
const routes     = require( './app/routes' );

const express    = require( 'express' );
const path       = require( 'path' );
const logger     = require( 'morgan' );
const bodyParser = require( 'body-parser' );

// Express middlewares.
const app = express();

app.set( 'port', process.env.PORT || 3000 );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.listen( app.get( 'port' ), () => {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

/**
 * React Routes (Server-Side)
 *
 * This middleware function will be executed on every request to the server,
 * unless a request is handled by the API endpoints.
 * Depending on the type of response, we take different actions.
 * 200 Success and 404 Not Found are usually the most common responses.
 */
app.use( ( req, res ) => {
  Router.match(
    {
      routes:   routes.default,
      location: req.url
    },
    ( err, redirectLocation, renderProps ) => {
      if ( err ) {
        res
          .status( 500 )
          .send( err.message )

      } else if ( redirectLocation ) {
        res
          .status( 302 )
          .redirect( redirectLocation.pathname + redirectLocation.search )

      } else if ( renderProps ) {
        const html = ReactDOM.renderToString(
          React.createElement( Router.RoutingContext, renderProps )
        );
        const page = swig.renderFile( 'views/index.html', { html: html } );
        res
          .status( 200 )
          .send( page );

      } else {
        res
          .status( 404 )
          .send( 'Page Not Found' )
      }
    }
  );
});
