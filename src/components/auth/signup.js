import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type} />
    {touched && error && <span className="text-danger">{error}</span>}
  </fieldset>
);

class Signup extends Component {

  handleFormSubmit({ email, password1 }) {
    const password = password1;
    this.props.signUpUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
    return (null);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text" component={renderField} className="form-control" label="Email" />
        <Field name="password1" component={renderField} type="password" className="form-control" label="Password" />
        <Field name="password2" component={renderField} type="password" className="form-control" label="Confirm Password" />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign Up</button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (values.email === undefined) {
    return errors;
  }
  if (!values.password1) {
    errors.password1 = 'You must enter a password';
  }
  if (!values.password2) {
    errors.password2 = 'You must enter your password again';
  }
  if (values.password1 != values.password2) {
    errors.password2 = 'Password and password confirmation don\'t match!';
  }
  if (!values.email) {
    errors.email = 'You must provide and email';
  }
  if (values.email.indexOf('@') === -1) {
    errors.email = 'You must enter a valid email address';
  }
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.error });
const form = reduxForm({ form: 'signup', validate })(Signup);

export default connect(mapStateToProps, actions)(form);
