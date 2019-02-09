import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EmployeeSearchInput extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  handleSearch() {
    const { history } = this.props;
    const empName = this.searchInput.current.value;

    empName
      ? history.push(`/employees/${empName}/q`)
      : history.push("/employees");
  }

  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          onKeyPress={event => {
            this.handleKeyPress(event);
          }}
          ref={this.searchInput}
          className="form-control mr-sm-2 ems-search"
          type="search"
          placeholder="Search Employee"
          aria-label="Search"
        />
        <button
          onClick={() => {
            this.handleSearch();
          }}
          className="btn btn-outline-success my-2 my-sm-0 btn-ems-search"
          type="submit"
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(EmployeeSearchInput);
