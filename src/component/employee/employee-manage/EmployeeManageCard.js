import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "../../../helper/index";

export class EmployeeManageCard extends Component {
  constructor() {
    super();
    this.state = {
      wantDelete: false
    };
  }
  deleteEmployeeMenu() {
    this.setState({ wantDelete: true });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    });
  }
  deleteEmployee(employeeId, employeeIndex) {
    this.setState({ wantDelete: false });

    this.props.deleteEmployeeCb(employeeId, employeeIndex);
  }

  render() {
    const { employee, employeeIndex } = this.props;
    const { wantDelete } = this.state;
    const deleteClass = wantDelete ? "toBeDeleted " : "";
    return (
      <div className="col-md-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">{toUpperCase(employee.empName)}</h4>
            <Link className="btn btn-ems" to={`/employees/${employee._id}`}>
              Go to Employee
            </Link>
          </div>
          <div className="card-footer text-muted">
            Created at :{pretifyDate(employee.createdAt)}
            {!wantDelete && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.deleteEmployeeMenu();
                }}
              >
                Delete
              </button>
            )}
            {wantDelete && (
              <div className="delete-menu">
                Do You Confirm ?
                <button
                  onClick={() => {
                    this.deleteEmployee(employee._id, employeeIndex);
                  }}
                  className="btn btn-danger"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    this.closeDeleteMenu();
                  }}
                  className="btn btn-success"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
