import React from "react";
import { Redirect, Route } from "react-router-dom";
import authService from "../../../services/auth-service";

export const LoggedInRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Redirect to={{ pathname: "/employees" }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};
