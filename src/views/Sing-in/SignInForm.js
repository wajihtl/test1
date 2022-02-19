import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactLoading from "react-loading";
var CryptoJS = require("crypto-js");



class SignInForm extends Component {


    constructor() {

        super();


        this.state = {
            username: "",
            password: "",
            Loading: false,
            verification: false,
            verification1: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {

        event.preventDefault();

        this.setState({ Loading: true });
        this.setState({ verification: false });
        this.setState({ verification1: false });



        try {
            axios.post(`http://54.38.33.104:8000/api/login`, { 'username': this.state.username, 'password': this.state.password })

                .then(res => {
                    if (res.data.success === true && res.data.token === false) {

                        let data_username = res.data.username;
                        let data_id = res.data.id;

                        // Encrypt username
                        var crypted_username = CryptoJS.AES.encrypt(JSON.stringify(data_username), 'my-secret-key@123').toString();

                        // Encrypt id
                        var crypted_id = CryptoJS.AES.encrypt(JSON.stringify(data_id), 'my-secret-key@123').toString();



                        this.setState({ Loading: false });
                        localStorage.setItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH', crypted_id);
                        localStorage.setItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T', crypted_username);
                        localStorage.setItem('Flag', "Eagl€_€y€");


                        window.location = '/';

                    }
                    else if (res.data.success === true && res.data.token === true) {

                        this.setState({ verification: true });
                        this.setState({ Loading: false });

                    }

                }).finally(res => {

                    let token = localStorage.getItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH');
                    if (!token) {

                        this.setState({ verification1: true });
                        this.setState({ Loading: false });

                    }
                }


                )

        } catch (error) {
            throw error;


        }


    }
    render() {
        return (
            <div className="formCenter">
                <form className="formFields" onSubmit={this.handleSubmit}>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="username"
                            className="formFieldInput"
                            placeholder="Enter your email"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="formFieldInput"
                            placeholder="Enter your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="formField">
                        <button className="formFieldButton">Sign In</button>{" "}
                        <Link to="/sign-up" className="formFieldLink">
                            Create an account
                        </Link>
                        {this.state.verification1 ? <p style={{ color: "#FF6666", marginTop: "10px" }}>error! </p> : null}

                        {this.state.verification ? <p style={{ color: "#FF6666", marginTop: "10px" }}>Account not yet confirmed! </p> : null}

                        <div style={{ marginLeft: '35%' }}>
                            {this.state.Loading ? <ReactLoading type="bars" color="green" width={'35%'} /> : null}
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}

export default SignInForm;
