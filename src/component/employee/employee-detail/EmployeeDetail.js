import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "actions";

class EmployeeDetail extends Component {
  componentWillMount() {
    //dispatch action
    const employeeId = this.props.match.params.id;
    this.props.dispatch(actions.fetchEmployeeById(employeeId));
  }
  render() {
    const employee = this.props.employee;
    if (employee.id) {
      return (
        <div>
          <h1>{employee.empName}</h1>
          <h1>{employee.designation}</h1>
          <h1>{employee.salary}</h1>
          <h1>{employee.description}</h1>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
const mapStateToProps = state => {
  return {
    employee: state.employee.data
  };
};
export default connect(mapStateToProps)(EmployeeDetail);
