import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import { userLogin } from 'admin-on-rest';
import authProvider from './authProvider';
import "./Login.css";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          email: "",
          password: ""
        };
    }

    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = {
            email: this.state.email,
            password: this.state.password
         };

        // Dispatch the userLogin action (injected by connect)
        //this.props.userLogin(credentials);

        authProvider('AUTH_LOGIN', credentials);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.submit}>
                    <div className="title">Login to your admin panel</div>
                    <Form.Group controlId="email" bssize="large">
                        <Form.Control
                            autoFocus
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bssize="large">
                        <Form.Control
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
};

export default connect(undefined, { userLogin })(LoginPage);