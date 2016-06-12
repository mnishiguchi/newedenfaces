// Babel ES6/JSX Compiler
require( 'babel-register' );


//---
// Import core Node.js modules — path, querystring, http, etc.
//---

var path = require('path');


//---
// Import third-party NPM libraries — mongoose, express, request, etc.
//---

// Server stuff.
const express    = require( 'express' );
const logger     = require( 'morgan' );
const bodyParser = require( 'body-parser' );

// Template engine.
const swig       = require( 'swig' );

// React stuff.
const React      = require( 'react' );
const ReactDOM   = require( 'react-dom/server' );
const Router     = require( 'react-router' );
const routes     = require( './app/routes' );

// Dagabase stuff.
const mongoose   = require( 'mongoose' );


//---
// Import application files — controllers, models, config, etc.
//---

const config     = require( './config' );
// const routes     = require( './app/routes' );
const Character  = require( './models/character' );


//---
//---


// Initializes app to be a function handler using Express.
const app = express();
app.set( 'port', process.env.PORT || 3000 );

// Connect to the database.
mongoose.connect( config.database );
mongoose.connection.on( 'error', function() {
  console.info( 'Error: Could not connect to MongoDB. Did you forget to run `mongod`?' );
});

// Express middlewares.
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// app.listen( app.get( 'port' ), () => {
//   console.log( 'Express server listening on port ' + app.get( 'port' ) );
// });


/**
 * Socket.io stuff.
 *
 * Increment / decrement the users count when a user joined / left.
 */
const server = require( 'http' ).createServer( app );
const io     = require( 'socket.io' )( server );
let onlineUsers = 0;

io.sockets.on( 'connection', socket => {
  onlineUsers++;

  // Emit the 'onlineUsers' event with the updated data.
  io.sockets.emit( 'onlineUsers', { onlineUsers: onlineUsers } );

  socket.on( 'disconnect', () => {
    onlineUsers--;

    // Emit the 'onlineUsers' event with the updated data.
    io.sockets.emit( 'onlineUsers', { onlineUsers: onlineUsers } );
  });
});

server.listen( app.get( 'port' ), () => {
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
