import axios from "axios";
import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT,
  FETCH_EMPLOYEES_SUCCESS
} from "./types";

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
    axios
      .get("/api/employees")
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
