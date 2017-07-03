import React, { Component } from 'react';

class HiddenPage extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="h3">
          <strong>This is the super secret page</strong>
        </h3>
      </div>
    );
  }
}

export default HiddenPage;