import React from "react";
import { Link } from "react-router-dom";

export function EmployeeCard(props) {
  const employee = props.employee;
  return (
    <div className={props.colNum}>
      <Link className="employee-detail-link" to={`/employees/${employee.id}`}>
        <div className="card text-white bg-dark mb-3">
          <div className="card-header">{employee.empName}</div>
          <div className="card-body">
            <h5 className="card-title">{employee.designation}</h5>
            <p className="card-text">{employee.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
