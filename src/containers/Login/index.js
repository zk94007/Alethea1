import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { requestLogin } from "../redux/actions";
import SimpleReactValidator from "simple-react-validator";
import history from "../../routes/history";
import Button from "@material-ui/core/Button";
import { ReactSVG } from "react-svg";
import "./styles.scss";
import { Link } from "react-router-dom";

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
      <div className="d-flex vh-100 flex-column justify-content-center align-items-center p-3">
        <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
          <ReactSVG src="logo_white.svg" className="auth-logo p-0 mb-5" />
          <h1 className="font-weight-bold">Sign in</h1>
          <label className="font-lg gray-color my-3">
            Using your email and password:
          </label>
          <div className="d-flex flex-column w-100 auth-form mt-5">
            <label className="font-weight-medium mb-1">Email</label>
            <TextField
              id="email"
              variant="outlined"
              className="mb-4"
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
              placeholder="Please enter your Email address"
            />
            {this.validator.message("email", username, "required|email", {
              className: "text-danger",
            })}
          </div>
          <div className="d-flex flex-column w-100 auth-form">
            <label className="font-weight-medium mb-0">Password</label>
            <TextField
              id="password"
              variant="outlined"
              className="my-1"
              value={password}
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Please enter your password here"
            />
            <div className="d-flex flex-row mb-4 align-items-center">
              <ReactSVG src={require("../../assets/warning.svg")} />
              <label className="font-tiny disabled mb-0 ml-1">
                Password length should be minimum 6 symbols
              </label>
            </div>
            {this.validator.message(
              "password",
              password,
              "required|min:6|max:120"
            )}
          </div>
          {errors && <label className="text-danger">{errors ?? ""}</label>}
          <Button
            variant="contained"
            color="primary"
            className="rounded-pill customShadow auth-button w-100"
            disabled={!this.validator.allValid()}
            onClick={() => this.onSubmit()}
          >
            Login
          </Button>
          <label className="font-lg gray-color my-4">or</label>
          <Button variant="outlined" className="w-100 auth-form google-button">
            <div className="w-100 d-flex justify-content-between align-items-center flex-row">
              <label className="mb-0 ml-3">Sign in with Google</label>
              <ReactSVG
                className="mr-3"
                src={require("../../assets/google_logo.svg")}
              />
            </div>
          </Button>
        </div>
        <label className="font-lg mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="link-text font-weight-bold">
            Sign Up For Free
          </Link>
        </label>
        <label className="font-sm my-3">
          By creating an account, or by signing in, I agree to Alethea AI's{" "}
          <b className="link-text">Terms & Conditions</b>
        </label>
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
