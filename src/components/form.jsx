import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class Form extends React.Component {
  state = {
    data: {
      firstname: "",
      lastname: "",
      emailAddress: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstname: Joi.string().required().label("First Name"),
    lastname: Joi.string().required().label("Last Name"),
    emailAddress: Joi.string().email().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (error === null) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const validateTarget = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(validateTarget, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    this.setState({ errors });
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    const { firstname, lastname, emailAddress, password } = this.state.data;
    const { errors } = this.state;
    return (
      <div className="right">
        <div className="advertise mb-3 shadow">
          Try it free 7 days{" "}
          <span style={{ opacity: "0.8" }}>then $20/mo. thereafter</span>
        </div>
        <div className="form shadow">
          <form onSubmit={this.handleSubmit}>
            <Input
              name="firstname"
              type="text"
              onChange={this.handleChange}
              value={firstname}
              style={{ height: "45px" }}
              className="form-control mt-3"
              id="firstname"
              label="First Name"
              errors={errors}
            />

            <Input
              name="lastname"
              type="text"
              onChange={this.handleChange}
              value={lastname}
              style={{ height: "45px" }}
              className="form-control mt-3"
              id="lastname"
              label="Last Name"
              errors={errors}
            />
            <Input
              name="emailAddress"
              type="email"
              onChange={this.handleChange}
              value={emailAddress}
              style={{ height: "45px" }}
              className="form-control mt-3"
              id="emailAddress"
              label="Email Address"
              errors={errors}
            />
            <Input
              name="password"
              type="password"
              onChange={this.handleChange}
              value={password}
              style={{ height: "45px" }}
              className="form-control mt-3"
              id="password"
              label="Password"
              errors={errors}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                height: "45px",
                backgroundColor: "hsl(154, 59%, 51%)",
                color: "white",
              }}
              className="mt-3 btn btn-lg btn-block"
            >
              CLAIM YOUR FREE TRIAL
            </button>
          </form>
          <p style={{ fontSize: "0.7rem" }} className="mt-2">
            By clicking to the button you are aggreing to our{" "}
            <span style={{ color: "hsl(0, 100%, 74%)" }}>
              Terms of Services
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Form;
