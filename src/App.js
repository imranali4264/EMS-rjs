import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import Header from "./component/shared/Header";
import EmployeeListing from "./component/employee/employee-listing/EmployeeListing";
import EmployeeDetail from "./component/employee/employee-detail/EmployeeDetail";
import EmployeeCreate from "./component/employee/employee-create/EmployeeCreate";
import Login from "./component/login/Login";
import { Register } from "./component/register/Register";
import EmployeeSearch from "./component/employee/employee-listing//EmployeeSearch";
import { EmployeeManage } from "./component/employee/employee-manage/EmployeeManage";

import { ProtectedRoute } from "./component/shared/auth/ProtectedRoute";
import { LoggedInRoute } from "./component/shared/auth/LoggedInRoute";

import { init } from "./reducers";
import * as actions from "./actions";

import "./App.css";

const store = init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }
  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }
  logout() {
    store.dispatch(actions.logout());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/employees" />}
                />
                <Route exact path="/employees" component={EmployeeListing} />
                <Route
                  exact
                  path="/employees/:empName/q"
                  component={EmployeeSearch}
                />
                <ProtectedRoute
                  exact
                  path="/employees/manage/"
                  component={EmployeeManage}
                />
                <ProtectedRoute
                  exact
                  path="/employees/create/"
                  component={EmployeeCreate}
                />
                <ProtectedRoute
                  exact
                  path="/employees/:id"
                  component={EmployeeDetail}
                />
                <Route exact path="/login" component={Login} />
                <LoggedInRoute exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
