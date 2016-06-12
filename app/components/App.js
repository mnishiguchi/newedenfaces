import React from 'react';

// Import components.
import Navbar from './Navbar';
import Footer from './Footer';

/**
 *  React Routes (Client-Side)
 */
class App extends React.Component {
  render() {
    return (
      // Similar to <ng-view> of AngularJS.
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
