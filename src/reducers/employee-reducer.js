import {
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_INIT,
  FETCH_EMPLOYEES_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
  employees: {
    data: [],
    errors: []
  },
  employee: {
    data: {}
  }
};
export const employeeReducer = (state = INITIAL_STATE.employees, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_INIT:
      return { ...state, data: [], errors: [] };
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, data: action.employees };
    case FETCH_EMPLOYEES_FAILURE:
      return Object.assign({}, state, { errors: action.errors, data: [] });
    default:
      return state;
  }
};

export const selectedEmployeeReducer = (
  state = INITIAL_STATE.employee,
  action
) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_BY_ID_INIT:
      return { ...state, data: {} };
    case FETCH_EMPLOYEE_BY_ID_SUCCESS:
      //  return Object.assign({}, state, { data: action.employee });
      return { ...state, data: action.employee };
    default:
      return state;
  }
};
