import Description from "./description";
import React from "react";
import Form from "./form";
class LoginPage extends React.Component {
  render() {
    return (
      <div className="loginPage">
        <Description />
        <Form />
      </div>
    );
  }
}

export default LoginPage;
