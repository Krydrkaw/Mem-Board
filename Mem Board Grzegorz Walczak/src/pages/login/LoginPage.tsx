import React, {Component} from 'react';
import './LoginPage.css';
import Button from "react-bootstrap/Button";
import {Form} from 'react-bootstrap';
import {ACCESS_TOKEN} from "../../common/Constants";
import {login, LoginAndPassResp} from "../../common/FakeApi";
import {Snackbar} from "@material-ui/core";

export interface LoginAndPass {
    username: string;
    password: string;
}


export interface LoginProp {
    onLogin: () => void;

}

export interface LoginState {
    open: boolean;
    message: string;
    username: string;
    password: string;
}


class Login extends Component<LoginProp, LoginState> {
    constructor(props: LoginProp) {
        super(props);
        this.state = {
            open: false,
            message: "",
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };
        login(loginRequest)
            .then((response: LoginAndPassResp) => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(error => {
                this.setState({
                    open: true,
                    username: "",
                    password: "",
                    message: 'Podany login lub hasło są nieprawidłowe. Proszę spróbuj ponownie!'
                });

        });
    }

    render() {
        return (
            <div className="App-header login-container">
                <h1>Logowanie</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Group>
                        <Form.Control
                            required
                            name="username"
                            value={this.state.username}
                            placeholder="Login"
                            onChange={event => this.setState({username: event.target.value})}
                        />
                    </Form.Group>
                    <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>

                    <Form.Group>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value})}
                            placeholder="Hasło"
                        />
                        <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit" className="login-form-button">Zaloguj się</Button>
                    </Form.Group>
                </Form>
                <Snackbar
                    style={{width: 300, color: 'green'}}
                    open={this.state.open}
                    onClose={(event, reason) => {
                        this.setState({open: false});
                    }}
                    autoHideDuration={3000} message={this.state.message}/>
            </div>
        );
    }
}

export default Login;
