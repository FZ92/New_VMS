import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.Email}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>ID:</strong>{" "}
                    {currentUser.UserID}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.Email}
                </p>
                <p>
                    <strong>Vorname:</strong>{" "}
                    {currentUser.Vorname}
                </p>
                <p>
                    <strong>Nachname:</strong>{" "}
                    {currentUser.Nachname}
                </p>
                <p>
                    <strong>Rolle:</strong>{" "}
                    {currentUser.Rolle}
                </p>
            </div>
        );
    }
}
