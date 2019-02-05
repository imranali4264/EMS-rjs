import React, { Component } from "react";
import { EmployeeList } from "./EmployeeList";
import { connect } from "react-redux";

import * as actions from "actions";

class EmployeeListing extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchEmployees());
  }

  render() {
    return (
      <section id="employeeListing">
        <h1 className="page-title">All Employees</h1>
        <EmployeeList employees={this.props.employees} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.data
  };
};

export default connect(mapStateToProps)(EmployeeListing);
