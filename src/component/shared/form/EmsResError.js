import React from "react";

export const EmsResError = props => {
  const errors = props.errors;
  return (
    errors.length > 0 && (
      <div className="alert alert-danger ems-res-errors">
        {errors.map((error, index) => (
          <p key={index}>{error.detail}</p>
        ))}
      </div>
    )
  );
};
