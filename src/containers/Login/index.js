import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { requestLogin } from "../redux/actions";
import SimpleReactValidator from "simple-react-validator";
import history from "../../routes/history";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      password: "",
    };

    this.validator = new SimpleReactValidator();
  }

  onSubmit() {
    if (this.validator.allValid()) {
      const {
        actions: { loginRequest },
      } = this.props;
      const { username, password } = this.state;
      loginRequest({
        email: username,
        password: password,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { username, password } = this.state;
    const { errors } = this.props;
    return (
      <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
        <div className="d-flex flex-column">
          <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 font-weight-medium">
            Email
          </label>
          <TextField
            id="email"
            variant="outlined"
            className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3"
            value={username}
            onChange={(e) => this.setState({ username: e.target.value })}
            placeholder="Please enter your Email address"
          />
          {this.validator.message("email", username, "required|email", {
            className: "text-danger",
          })}
        </div>
        <div className="d-flex flex-column">
          <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 font-weight-medium">
            Password
          </label>
          <TextField
            id="password"
            variant="outlined"
            className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3"
            value={password}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Please enter your password here"
          />
          {this.validator.message(
            "password",
            password,
            "required|min:6|max:120"
          )}
        </div>
        <label className="text-danger">{errors ?? ""}</label>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="rounded-pill customShadow"
          onClick={() => this.onSubmit()}
        >
          Login
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loginRequest: (id) => {
      dispatch(requestLogin(id));
    },
  },
});

const mapStateToProps = (state) => ({
  errors: state.alethea.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
