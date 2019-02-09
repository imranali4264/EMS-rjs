import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import EmployeeSearchInput from "../employee/EmployeeSearchInput";
import { toUpperCase } from "../../helper";

class Header extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push("/login");
  }
  renderAuthButtons(isAuth) {
    if (isAuth) {
      return (
        <a className="nav-item nav-link clickable" onClick={this.handleLogout}>
          Logout
        </a>
      );
    }
    return (
      <React.Fragment>
        <Link className="nav-item nav-link active" to="/login">
          Login <span className="sr-only">(current)</span>
        </Link>
        <Link className="nav-item nav-link" to="/register">
          Register
        </Link>
      </React.Fragment>
    );
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            className="nav-link nav-item dropdown-toggle clickable"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Owner Section
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/employees/create">
              Create Employee
            </Link>
            <Link className="dropdown-item" to="#">
              Manage Employees
            </Link>
          </div>
        </div>
      );
    }
  }
  render() {
    const { username, isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/employees">
            BookWithMe
          </Link>
          <EmployeeSearchInput />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {isAuth && (
                <a className="nav-item nav-link">{toUpperCase(username)}</a>
              )}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps)(Header));
