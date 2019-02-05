import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT
} from "../actions/types";

const INITIAL_STATE = {
  employees: {
    data: []
  },
  employee: {
    data: {}
  }
};
export const employeeReducer = (state = INITIAL_STATE.employees, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, data: action.employees };
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
