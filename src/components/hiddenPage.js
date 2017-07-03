import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class HiddenPage extends Component {

  componentWillMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="container">
        <h3 className="h3">
          This is the super secret page
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.message}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(HiddenPage);