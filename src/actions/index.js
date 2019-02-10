import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-services";

import {
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_INIT,
  FETCH_EMPLOYEES_FAILURE,
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

const fetchEmployeesInit = () => {
  return {
    type: FETCH_EMPLOYEES_INIT
  };
};
const fetchEmployeesFailure = errors => {
  return {
    type: FETCH_EMPLOYEES_FAILURE,
    errors
  };
};
export const fetchEmployees = empName => {
  const url = empName ? `/employees?empName=${empName}` : "/employees";
  return dispatch => {
    dispatch(fetchEmployeesInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(employees => dispatch(fetchEmployeesSuccess(employees)))
      .catch(err => dispatch(fetchEmployeesFailure(err.response.data.errors)));
  };
};

export const fetchEmployeeById = employeeId => {
  return dispatch => {
    dispatch(fetchEmployeeByIdInit());
    axios
      .get(`/api/employees/${employeeId}`)
      .then(res => res.data)
      .then(employee => dispatch(fetchEmployeeByIdSuccess(employee)));
  };
};
export const createEmployee = employeeData => {
  return axiosInstance
    .post("/employees", { ...employeeData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

// -------------------------User actions------------------
export const getUserEmployees = () => {
  return axiosInstance
    .get(`/employees/manage`)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

export const deleteEmployee = employeeId => {
  return axiosInstance
    .delete(`/employees/${employeeId}`)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};

// -------------------------Authentication------------------

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
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
