import React from 'react';

/**
 *  React Routes (Client-Side)
 */
class App extends React.Component {
  render() {
    return (
      // Similar to <ng-view> of AngularJS.
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
