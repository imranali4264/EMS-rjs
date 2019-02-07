import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Provider } from "react-redux";

import Header from "./component/shared/Header";
import EmployeeListing from "./component/employee/employee-listing/EmployeeListing";
import EmployeeDetail from "./component/employee/employee-detail/EmployeeDetail";
import Login from "./component/login/Login";
import { Register } from "./component/register/Register";

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
              <Route
                exact
                path="/"
                render={() => <Redirect to="/employees" />}
              />
              <Route exact path="/employees" component={EmployeeListing} />
              <ProtectedRoute
                exact
                path="/employees/:id"
                component={EmployeeDetail}
              />
              <Route exact path="/login" component={Login} />
              <LoggedInRoute exact path="/register" component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
