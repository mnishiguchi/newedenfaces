import React   from 'react';
import {Route} from 'react-router';
import App     from './components/App';
import Home    from './components/Home';

export default (
  // React Router bootstraps the routes from here.
  // If we are on '/' path, then {this.props.children} will render the Home component.
  // Navbar and Footer do not change/disappear between route transitions.
  <Route component={App}>
    <Route path='/' component={Home} />
  </Route>
);
