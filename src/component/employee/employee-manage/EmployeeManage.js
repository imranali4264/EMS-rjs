import React, { Component } from "react";
import { Link } from "react-router-dom";
import { EmployeeManageCard } from "./EmployeeManageCard";
import { ToastContainer, toast } from "react-toastify";

import * as actions from "actions";

export class EmployeeManage extends Component {
  constructor() {
    super();
    this.state = {
      userEmployees: [],
      errors: [],
      isFetching: false
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentWillMount() {
    this.setState({ isFetching: true });
    actions
      .getUserEmployees()
      .then(
        userEmployees => this.setState({ userEmployees, isFetching: false }),
        errors => this.setState({ errors, isFetching: false })
      );
  }

  renderEmployeesCard(employees) {
    return employees.map((employee, index) => (
      <EmployeeManageCard
        key={index}
        employee={employee}
        employeeIndex={index}
        deleteEmployeeCb={this.deleteEmployee}
      />
    ));
  }

  deleteEmployee(employeeId, employeeIndex) {
    actions
      .deleteEmployee(employeeId)
      .then(
        () => this.deleteEmployeeFromList(employeeIndex),
        errors => toast.error(errors[0].detail)
      );
  }
  deleteEmployeeFromList(employeeIndex) {
    const userEmployees = this.state.userEmployees.slice();

    userEmployees.splice(employeeIndex, 1);
    this.setState({ userEmployees });
  }

  render() {
    const { userEmployees, isFetching } = this.state;
    return (
      <section id="userEmployees">
        <ToastContainer />
        <h1 className="page-title">Employees</h1>
        <div className="row">{this.renderEmployeesCard(userEmployees)}</div>
        {!isFetching && userEmployees.length === 0 && (
          <div className="alert alert-warning">
            You dont have any employees currenty created. If you want then
            follow link!
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-ems"
              to="/employees/create"
            >
              Create Employee
            </Link>
          </div>
        )}
      </section>
    );
  }
}
