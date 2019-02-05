import { employeeReducer, selectedEmployeeReducer } from "./employee-reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

export const init = () => {
  const reducer = combineReducers({
    employees: employeeReducer,
    employee: selectedEmployeeReducer
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
