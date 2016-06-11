/**
 * NOTE:  The main.js is the entry point for our React application.
 * We use it in gulpfile.js where Browserify will traverse the entire tree of
 * dependencies and generate the final bundle.js file.
 * We will rarely have to touch this file after its initial setup.
 */
import React    from 'react';
import ReactDOM from 'react-dom';
import Router   from 'react-router';
import routes   from './routes';
import createBrowserhistory from 'history/lib/createBrowserHistory';

// Enable HTML5 History API in order programmatically transition between routes
// and to make URLs look pretty.
// E.g., `http://localhost:3000/add` instead of `http://localhost:3000/#add`
let history = createBrowserhistory();

// React Router bootstraps the routes from routes.js file.
ReactDOM.render(
  <Router history={history}>{routes}</Router>,
  document.getElementById('app')
);
