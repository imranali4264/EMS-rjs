import React, { Component } from "react";
import EmployeeCreateForm from "./EmployeeCreateForm";
import { Redirect } from "react-router-dom";

import * as actions from "actions";

class EmployeeCreate extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      redirect: false
    };
    this.createEmployee = this.createEmployee.bind(this);
  }
  createEmployee(employeeData) {
    actions
      .createEmployee(employeeData)
      .then(
        employee => this.setState({ redirect: true }),
        errors => this.setState({ errors })
      );
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/employees"
          }}
        />
      );
    }
    return (
      <section id="newEmployee">
        <div className="ems-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Employee</h1>
              <EmployeeCreateForm
                submitCb={this.createEmployee}
                errors={this.state.errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  You can create or store employee data
                </h2>
                <img src={process.env.PUBLIC_URL + "/img/1.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EmployeeCreate;
