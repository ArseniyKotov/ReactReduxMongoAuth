import React, { Component } from 'react';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="cold-md-12">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="h3">
              Welcome to the Auth Boilerplate
            </h3>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
