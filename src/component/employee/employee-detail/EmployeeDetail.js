import React, { Component } from "react";
import { connect } from "react-redux";
import { toUpperCase } from "../../../helper/index";

import * as actions from "actions";

class EmployeeDetail extends Component {
  componentWillMount() {
    //dispatch action
    const employeeId = this.props.match.params.id;
    this.props.dispatch(actions.fetchEmployeeById(employeeId));
  }
  render() {
    const employee = this.props.employee;
    if (employee._id) {
      return (
        <section id="employeeDetail">
          <img src={employee.image} class="emp-card-img-top" alt="..." />
          <div class="employee-card">
            <div class="card-body">
              <h5 class="card-title ">{toUpperCase(employee.empName)}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                {toUpperCase(employee.designation)}
              </li>
              <li class="list-group-item">{employee.salary}</li>
              <li class="list-group-item">{employee.description}</li>
            </ul>
            <div class="card-bottom">
              <p>Created At</p>
            </div>
          </div>
        </section>
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
