import React from "react";
import { Field, reduxForm } from "redux-form";
import { EmsInput } from "../shared/form/EmsInput";
import { EmsResError } from "../shared/form/EmsResError";

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={EmsInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={EmsInput}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        component={EmsInput}
        className="form-control"
      />
      <Field
        name="passwordConfirmation"
        label="Confirm Password"
        type="password"
        component={EmsInput}
        className="form-control"
      />
      <button
        className="btn btn-ems btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Register
      </button>
      <EmsResError errors={errors} />
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (values.username && values.username.length < 4) {
    errors.username = "Username must be more than 4 character";
  }
  if (!values.email) {
    errors.email = "Please enter valid email";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter confirm password";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = "password must be the same";
  }
  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate
})(RegisterForm);
