import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import './Button.css'

class Login extends Component {
    render() {
        return (
            <Router >
                <div className="Appp">

                    <div className="appAside" >

                        <a href="/"><button className="btt" >
                            Back
                        </button>
                        </a>
                        <img src={require('../../assets/images/logo.png')} alt="" />

                    </div>
                    <div className="appForm">
                        <div className="pageSwitcher">
                            <NavLink
                                to="/sign-in"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign in
                            </NavLink>
                            <NavLink
                                exact
                                to="/sign-up"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign up
                            </NavLink>

                        </div>

                        <div className="formTitle">
                            <NavLink
                                to="/sign-in"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign in
                            </NavLink>{" "}
                            or{" "}
                            <NavLink
                                exact
                                to="/sign-up"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign up
                            </NavLink>
                        </div>

                        <Route exact path="/sign-up" component={SignUpForm} />
                        <Route exact path="/sign-in" component={SignInForm} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default Login;


