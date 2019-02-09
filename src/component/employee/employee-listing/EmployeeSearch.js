import React, { Component } from "react";
import { EmployeeList } from "./EmployeeList";
import { connect } from "react-redux";

import { toUpperCase } from "../../../helper/index";
import * as actions from "actions";

class EmployeeSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchedEmpName: ""
    };
  }

  componentWillMount() {
    this.searchEmployeesByName();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.empName;
    const prevUrlParam = prevProps.match.params.empName;

    if (currentUrlParam !== prevUrlParam) {
      this.searchEmployeesByName();
    }
  }

  searchEmployeesByName() {
    const searchedEmpName = this.props.match.params.empName;
    this.setState({ searchedEmpName });
    this.props.dispatch(actions.fetchEmployees(searchedEmpName));
  }
  renderTitle() {
    const { errors, data } = this.props.employees;
    const { searchedEmpName } = this.state;
    let title = "";
    if (errors.length > 0) {
      title = errors[0].detail;
    }
    if (data.length > 0) {
      title = `You Search For ${toUpperCase(searchedEmpName)}`;
    }
    return <h1 className="page-title">{title}</h1>;
  }

  render() {
    return (
      <section id="employeeListing">
        {this.renderTitle()}
        <EmployeeList employees={this.props.employees.data} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  };
};

export default connect(mapStateToProps)(EmployeeSearch);
