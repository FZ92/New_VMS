import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import DataService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";


const required = value => {
    if(!value) {
        return(
            <div className="alert alert-danger" role="alert">
                Pflichtfeld!
            </div>
        );
    }
};

const Email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Keine gültige E-Mail Adresse!
            </div>
        );
    }
};

const Passwort = value => {
    if (value.length < 6 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Passwort muss zwischen 6 und 30 Zeichen lang sein
            </div>
        );
    }
};

/*const PassworWiederholen = value => {
    if (value !== Passwort(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Passwort muss identisch sein!
            </div>
        )
    }
}*/

const Vorname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Vorname muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }
};

const Nachname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Nachname muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }
};

const Ort = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Ort muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }
};

const PLZ = value => {
    if (value.length !== 5) {
        return (
            <div className="alert alert-danger" role="alert">
                Keine gültige PLZ! Muss 5 Stellen enthalten!
            </div>
        );
    }
};

const Strasse = value => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Straße muss zwischen 3 und 30 Zeichen lang sein
            </div>
        );
    }
};

const Telefonnummer = value => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Telefonnummer muss zwischen 3 und 30 Zeichen lang sein
            </div>
        );
    }
};




// Registrierung für Veranstalter
export class Registrieren extends React.Component {

    constructor(props) {


        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeVorname= this.onChangeVorname.bind(this);
        this.onChangeNachname= this.onChangeNachname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePasswort = this.onChangePasswort.bind(this);
        this.onChangeOrt = this.onChangeOrt.bind(this);
        this.onChangePLZ = this.onChangePLZ.bind(this);
        this.onChangeStrasse = this.onChangeStrasse.bind(this);
        this.onChangeTelefonnummer= this.onChangeTelefonnummer.bind(this);


        this.state = {
            Passwort: "",
            Rolle: "",
            Vorname: "",
            Nachname: "",
            Firma: "",
            Email: "",
            Ort: "",
            PLZ: "",
            Strasse: "",
            Telefonnummer: "",
            Anlegedatum: "",
            successful: false,
            message: ""
        };
    }

    onChangeVorname(e) {
        this.setState({
            Vorname: e.target.value
        });
    }

    onChangeNachname(e) {
        this.setState({
            Nachname: e.target.value
        });
    }


    onChangePasswort(e) {
        this.setState({
            Passwort: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangeOrt(e) {
        this.setState({
            Ort: e.target.value
        });
    }

    onChangePLZ(e) {
        this.setState({
            PLZ: e.target.value
        });
    }

    onChangeStrasse(e) {
        this.setState({
            Strasse: e.target.value
        });
    }

    onChangeTelefonnummer(e) {
        this.setState({
            Telefonnummer: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const data = {
                Passwort: this.state.Passwort,
                Rolle: "Teilnehmer",
                Vorname: this.state.Vorname,
                Nachname: this.state.Nachname,
                Email: this.state.Email,
                Ort: this.state.Ort,
                PLZ: this.state.PLZ,
                Strasse: this.state.Strasse,
                Telefonnummer: this.state.Telefonnummer,
            };

            DataService.create(data)
                .then(response => {
                    this.setState({
                        Passwort: response.data.Passwort,
                        Rolle: "Teilnehmer",
                        Vorname: response.data.Vorname,
                        Nachname: response.data.Nachname,
                        Email: response.data.Email,
                        Ort: response.data.Ort,
                        PLZ: response.data.PLZ,
                        Strasse: response.data.Strasse,
                        Telefonnummer: response.data.Telefonnummer,
                        message: response.data.message,
                        successful: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    const resMessage =
                        (e.response &&
                            e.response.data &&
                            e.response.data.message) ||
                        e.message ||
                        e.toString();
                    this.setState({
                        successful: false,
                        message: resMessage

                })
            })
        }
    }





    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, Email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Passwort</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.Passwort}
                                        onChange={this.onChangePasswort}
                                        validations={[required, Passwort]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Passwort wiederholen</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.Passwort}
                                        onChange={this.onChangePasswort}
                                        validations={[required, Passwort]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="vorname">Vorname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="vorname"
                                        value={this.state.Vorname}
                                        onChange={this.onChangeVorname}
                                        validations={[required, Vorname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nachname">Nachname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="nachname"
                                        value={this.state.Nachname}
                                        onChange={this.onChangeNachname}
                                        validations={[required, Nachname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ort">Ort</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="ort"
                                        value={this.state.Ort}
                                        onChange={this.onChangeOrt}
                                        validations={[required, Ort]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plz">PLZ</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="plz"
                                        value={this.state.PLZ}
                                        onChange={this.onChangePLZ}
                                        validations={[required, PLZ]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="strasse">Straße</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="strasse"
                                        value={this.state.Strasse}
                                        onChange={this.onChangeStrasse}
                                        validations={[required, Strasse]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telefonnummer">Telefonnummer</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="telefonnummer"
                                        value={this.state.Telefonnummer}
                                        onChange={this.onChangeTelefonnummer}
                                        validations={[required, Telefonnummer]}
                                    />
                                </div>


                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Registrieren</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }

}
export default Registrieren;