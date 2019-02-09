import React, { Component } from "react";
import { connect } from "react-redux";
import { toUpperCase, pretifyDate } from "../../../helper/index";

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
          <img src={employee.image} className="emp-card-img-top" alt="..." />
          <div className="employee-card">
            <div className="card-body">
              <h5 className="card-title ">
                <p>Name : {toUpperCase(employee.empName)} </p>
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p>Designation : {toUpperCase(employee.designation)} </p>
              </li>
              <li className="list-group-item">
                <p>Salary : {employee.salary}</p>
              </li>
              <li className="list-group-item">
                <p>Description : {employee.description} </p>
              </li>
            </ul>
            <div className="card-bottom">
              <p>Created At : {pretifyDate(employee.createdAt)}</p>
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
