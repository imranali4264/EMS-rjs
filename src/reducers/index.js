import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { employeeReducer, selectedEmployeeReducer } from "./employee-reducer";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = combineReducers({
    employees: employeeReducer,
    employee: selectedEmployeeReducer,
    form: formReducer,
    auth: authReducer
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
