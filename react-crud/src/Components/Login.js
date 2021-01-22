import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";

import AuthService from "../services/auth.service";
import Button from "react-bootstrap/Button";
import Test from "react-validation/build/form";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePasswort = this.onChangePasswort.bind(this);

        this.state = {
            Email: "",
            Passwort: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangePasswort(e) {
        this.setState({
            Passwort: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        //this.form.validateAll();


        AuthService.login(this.state.Email, this.state.Passwort).then(
            () => {
                this.props.history.push("/Profil");
                window.location.reload();
            })
    }


    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">

                    <Form><Test>
                        <Form.Group controlId="formBasicUser">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type="Email" placeholder="E-Mail" value={this.state.Email}
                                          onChange={e => this.setState({ Email: e.target.value })} isValid={[required]}/>
                            <Form.Text className="text-muted">
                                Bitte geben Sie ihre Email ein.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control type="password" placeholder="Passwort" value={this.state.Passwort}
                                          onChange={e => this.setState({ Passwort: e.target.value })} isValid={[required]}/>
                        </Form.Group>

                        <Button onClick={this.handleLogin} variant="success">Login</Button>
                        <Button href="/Registrieren">Registrieren</Button>{' '}

                    </Test></Form>

                </div>
            </div>
        );
    }
}