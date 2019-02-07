import React from "react";
import { Field, reduxForm } from "redux-form";
import { EmsInput } from "../shared/form/EmsInput";
import { EmsResError } from "../shared/form/EmsResError";
import { required, minLength4 } from "../shared/form/Validator";

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={EmsInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        component={EmsInput}
        className="form-control"
        validate={[required]}
      />
      <button
        className="btn btn-ems btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Login
      </button>
      <EmsResError errors={errors} />
    </form>
  );
};
export default reduxForm({
  form: "loginForm"
})(LoginForm);
