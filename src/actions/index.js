import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-services";

import {
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT,
  FETCH_EMPLOYEES_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./types";

// ------------------Employee action----------------

const axiosInstance = axiosService.getInstance();

const fetchEmployeeByIdInit = () => {
  return {
    type: FETCH_EMPLOYEE_BY_ID_INIT
  };
};
const fetchEmployeeByIdSuccess = employee => {
  return {
    type: FETCH_EMPLOYEE_BY_ID_SUCCESS,
    employee
  };
};
const fetchEmployeesSuccess = employees => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    employees
  };
};
export const fetchEmployees = () => {
  return dispatch => {
    axiosInstance
      .get("/employees")
      .then(res => res.data)
      .then(employees => {
        dispatch(fetchEmployeesSuccess(employees));
      });
  };
};

export const fetchEmployeeById = employeeId => {
  return dispatch => {
    dispatch(fetchEmployeeByIdInit());
    axios
      .get(`/api/employees/${employeeId}`)
      .then(res => res.data)
      .then(employee => {
        dispatch(fetchEmployeeByIdSuccess(employee));
      });
  };
};

// -------------------------Authentication------------------

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};
export const register = userData => {
  return axios
    .post("/api/users/register", { ...userData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post("/api/users/login", { ...userData })
      .then(res => res.data)
      .then(token => {
        localStorage.setItem("auth_token", token);
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};
export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  };
};
