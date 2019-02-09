import React, { Component } from "react";

export class EmsFileUpload extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const {
      input: { onChange }
    } = this.props;
    onChange("http://via.placeholder.com/350x250");
  }
  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </div>
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}
      </div>
    );
  }
}
