import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Provider } from "react-redux";

import { Header } from "./shared/Header";
import EmployeeListing from "./component/employee/employee-listing/EmployeeListing";
import EmployeeDetail from "./component/employee/employee-detail/EmployeeDetail";

import { init } from "./reducers";
import "./App.css";

const store = init();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <div className="container">
              <Route
                exact
                path="/"
                render={() => <Redirect to="/employees" />}
              />
              <Route exact path="/employees" component={EmployeeListing} />
              <Route exact path="/employees/:id" component={EmployeeDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
