import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEE_BY_ID_SUCCESS,
  FETCH_EMPLOYEE_BY_ID_INIT
} from "./types";

const employees = [
  {
    id: 1,
    empName: "Haniya",
    designation: "Graphic Designer",
    salary: "40000",
    image: "http://via.placeholder.com/350x250",
    description: "this is data 1",
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    empName: "Imran",
    designation: "Software Engineer",
    salary: "50000",
    image: "http://via.placeholder.com/350x250",
    description: "this is data 2",
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    empName: "Ahsan",
    designation: "Data Analyst",
    salary: "55000",
    image: "http://via.placeholder.com/350x250",
    description: "this is data 3",
    createdAt: "25/12/2017"
  },
  {
    id: 4,
    empName: "Tabish",
    designation: "Java Developer",
    salary: "85000",
    image: "http://via.placeholder.com/350x250",
    description: "this is data 4",
    createdAt: "2/06/2017"
  }
];

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

export const fetchEmployees = () => {
  return {
    type: FETCH_EMPLOYEES,
    employees
  };
};

export const fetchEmployeeById = employeeId => {
  return dispatch => {
    dispatch(fetchEmployeeByIdInit());
    // Simulate server call
    setTimeout(() => {
      const employee = employees.find(
        employee => employee.id.toString() === employeeId
      );
      dispatch(fetchEmployeeByIdSuccess(employee));
    }, 1000);
  };
};
