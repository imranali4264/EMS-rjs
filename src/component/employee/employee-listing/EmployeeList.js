import React, { Component } from "react";
import { EmployeeCard } from "./EmployeeCard";

export class EmployeeList extends Component {
  renderEmployees() {
    return this.props.employees.map((employee, index) => {
      return (
        <EmployeeCard
          key={index}
          colNum="col-md-3 col-xs-6"
          employee={employee}
        />
      );
    });
  }

  render() {
    return <div className="row">{this.renderEmployees()}</div>;
  }
}
