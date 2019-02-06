import React from "react";
import { Link } from "react-router-dom";
import { toUpperCase } from "helper";

export function EmployeeCard(props) {
  const employee = props.employee;
  return (
    <div className={props.colNum}>
      <Link className="employee-detail-link" to={`/employees/${employee._id}`}>
        <div className="card text-white bg-dark mb-3">
          <div className="card-header">{toUpperCase(employee.empName)}</div>
          <div className="card-body">
            <h5 className="card-title">{toUpperCase(employee.designation)}</h5>
            <p className="card-text">{employee.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
