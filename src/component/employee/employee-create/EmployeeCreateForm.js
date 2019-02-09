import React from "react";
import { Field, reduxForm } from "redux-form";
import { EmsInput } from "../../shared/form/EmsInput";
import { EmsTextArea } from "../../shared/form/EmsTextArea";
import { EmsFileUpload } from "../../shared/form/EmsFileUpload";
import { EmsResError } from "../../shared/form/EmsResError";

const EmployeeCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="empName"
        type="text"
        label="Name"
        className="form-control"
        component={EmsInput}
      />
      <Field
        name="designation"
        type="text"
        label="Designation"
        className="form-control"
        component={EmsInput}
      />
      <Field
        name="salary"
        label="Salary"
        type="number"
        symbol="Rs"
        component={EmsInput}
        className="form-control"
      />
      <Field name="image" label="Image" component={EmsFileUpload} />
      <Field
        name="description"
        label="Description"
        type="text"
        rows="6"
        component={EmsTextArea}
        className="form-control"
      />
      <button
        className="btn btn-ems btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Create Employee
      </button>
      <EmsResError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "employeeCreateForm"
})(EmployeeCreateForm);
