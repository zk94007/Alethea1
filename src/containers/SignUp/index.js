import React, {Component} from "react";
import {TextField, OutlinedInput, InputAdornment, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {requestLogin} from "../redux/actions";
import SimpleReactValidator from "simple-react-validator";
import history from "../../routes/history";
import Button from "@material-ui/core/Button";
import {ReactSVG} from "react-svg";
import "./styles.scss";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class SignUp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            showPassword: false
        }

        this.validator = new SimpleReactValidator();
    }

    onSubmit() {
        if (this.validator.allValid()) {
            const {actions: {loginRequest}} = this.props;
            const {email, password} = this.state;
            loginRequest({
                email: email,
                password: password,
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const {email, password, showPassword, lastName, firstName} = this.state;
        const {errors} = this.props;
        return (
            <div className="d-flex vh-100 flex-column justify-content-center align-items-center p-3">
                <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
                    <ReactSVG src="logo_white.svg"
                              className="auth-logo p-0 mb-5"/>
                    <h1 className="font-weight-bold">It's Free to Sign Up and Get Started.</h1>
                    <label className="font-lg gray-color my-3">Already have account or use Google? <Link to="/login" className="link-text font-weight-bold" >Sign In Here</Link></label>
                    <div className="d-flex flex-column w-100 auth-form mt-5">
                        <label className="font-weight-medium mb-1">
                            First name
                        </label>
                        <TextField
                            id="fist-name" variant="outlined" className="mb-4"
                            value={firstName}
                            onChange={(e) => this.setState({firstName: e.target.value})}
                            placeholder="Your first name"
                        />
                        {this.validator.message('email', firstName, 'required|min:2|max:120', { className: 'text-danger' })}
                    </div>
                    <div className="d-flex flex-column w-100 auth-form">
                        <label className="font-weight-medium mb-1">
                            Last name
                        </label>
                        <TextField
                            id="last-name" variant="outlined" className="mb-4"
                            value={lastName}
                            onChange={(e) => this.setState({lastName: e.target.value})}
                            placeholder="Your last name"
                        />
                        {this.validator.message('email', lastName, 'required|min:2|max:120', { className: 'text-danger' })}
                    </div>
                    <div className="d-flex flex-column w-100 auth-form">
                        <label className="font-weight-medium mb-1">
                            Email
                        </label>
                        <TextField
                            id="email" variant="outlined" className="mb-4"
                            value={email}
                            onChange={(e) => this.setState({username: e.target.value})}
                            placeholder="Your email"
                        />
                        {this.validator.message('email', email, 'required|email', { className: 'text-danger' })}
                    </div>
                    <div className="d-flex flex-column w-100 auth-form">
                        <label className="font-weight-medium mb-0">
                            Password
                        </label>
                        <OutlinedInput
                            className="my-1 authInput"
                            id="password"
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={event => this.setState({password: event.target.value})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className="p-0"
                                        onClick={(_) => this.setState({showPassword: !showPassword})}
                                        onMouseDown={(event) => event.preventDefault()}
                                    >
                                        {showPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <div className="d-flex flex-row mb-4 align-items-center">
                            <ReactSVG src={require('../../assets/warning.svg')}/>
                            <label className="font-tiny disabled mb-0 ml-1">Password length should be minimum 6 symbols</label>
                        </div>
                        {this.validator.message('password', password, 'required|min:6|max:120')}
                    </div>
                    {errors && <label className="text-danger">{errors ?? ''}</label>}
                    <Button variant="contained" color="primary"
                            className="rounded-pill customShadow auth-button w-100" disabled={!this.validator.allValid()}
                            onClick={() => this.onSubmit()}>
                        Sign up
                    </Button>
                </div>
                <label className="font-sm my-3">
                    By creating an account, or by signing in, I agree to Alethea AI's <b className="link-text">Terms & Conditions</b></label>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: {
        loginRequest: (id) => {
            dispatch(requestLogin(id));
        }
    }
});

const mapStateToProps = (state) => ({
    errors: state.alethea.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
