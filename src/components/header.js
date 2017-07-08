import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    if (this.props.authed) {
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>
      );
    }
    return [
      <li key="1" className="nav-item">
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li key="2" className="nav-item">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Home</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ authed: state.auth.authenticated });

export default connect(mapStateToProps)(Header);
