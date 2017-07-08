import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit({email, password}) {
    console.log(email, password);
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error};
}
const form = reduxForm({form: 'signin'})(Signin);

export default connect(mapStateToProps, actions)(form);