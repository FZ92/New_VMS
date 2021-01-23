/*import React from 'react';
import './BenutzerAnlegen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {BenutzerAnlegen} from './BenutzerAnlegen';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DataService from "../services/user.service";

//Webformular zum Anlegen eines neuen Benutzers

export class BenutzerAnlegen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Passwort: "",
            Rolle: "Admin",
            Vorname: "",
            Nachname: "",
            Firma: "",
            Email: "",
            Ort: "",
            PLZ: "",
            Strasse: "",
            Telefonnummer: "",
            Anlegedatum: ""
        };
    }

    doRegister = () => {
        console.log(this.state.Email);
        const data = {
            Passwort: this.state.Passwort,
            Rolle: this.state.Rolle,
            Firma: this.state.Firma,
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
                    Rolle: response.data.Rolle,
                    Firma: response.data.Firma,
                    Vorname: response.data.Vorname,
                    Nachname: response.data.Nachname,
                    Email: response.data.Email,
                    Ort: response.data.Ort,
                    PLZ: response.data.PLZ,
                    Strasse: response.data.Strasse,
                    Telefonnummer: response.data.Telefonnummer
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    changeEmailHandler = (event) => {
        this.setState({Email: event.target.value});
    }

    render() {

        return (
            <div className="Webformular">
                <header className="Webformular-header">
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><h3> Rolle auswählen</h3></Form.Label>
                            <Form.Control as="select" type="rolle" value={this.state.Rolle} onChange={e => this.setState({Rolle: e.target.value})}>
                                <option value="Admin">Admin</option>
                                <option value = "Management">Manager</option>
                                <option value = "Veranstaltungsanbieter">Veranstaltungsanbieter</option>
                                <option value = "Teilnehmer">Teilnehmer</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="email" value={this.state.Email} placeholder="E-Mail eingeben"
                                          onChange={e => this.setState({Email: e.target.value})}/>
                            <Form.Text className="form-group"></Form.Text>
                        </Form.Group>
                        <Form.Group controlId="passwort">
                            <Form.Control type="password" placeholder="Passwort" value={this.state.Passwort}
                                          onChange={e => this.setState({Passwort: e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="passwortWiederholen">

                            <Form.Control type="password2" placeholder="Passwort wiederholen"/>
                        </Form.Group>

                        <Form.Group controlId="firma">
                            <Form.Control type="text" placeholder="Firmenname" value={this.state.Firma}
                                          onChange={e => this.setState({Firma: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="vorname">
                            <Form.Control type="text" placeholder="Vorname" value={this.state.Vorname}
                                          onChange={e => this.setState({Vorname: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="nachname">
                            <Form.Control type="text" placeholder="Nachname" value={this.state.Nachname}
                                          onChange={e => this.setState({Nachname: e.target.value})}/>
                        </Form.Group>

                        <Form.Group><Form.Control type="text" placeholder="Ort" value={this.state.Ort}
                                                  onChange={e => this.setState({Ort: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="plz">
                            <Form.Control type="PLZ" placeholder="PLZ"
                                          onChange={e => this.setState({PLZ: e.target.value})} value={this.state.PLZ}/>
                        </Form.Group>

                        <Form.Group><Form.Control type="text" placeholder="Straße"
                                                  onChange={e => this.setState({Strasse: e.target.value})}
                                                  value={this.state.Strasse}/>
                        </Form.Group>

                        <Form.Group><Form.Control type="text" placeholder="Telefonnummer"
                                                  onChange={e => this.setState({Telefonnummer: e.target.value})}
                                                  value={this.state.Telefonnummer}/>
                        </Form.Group>

                        <Button href="/Benutzerverwaltung" variant="success" type="submit" onClick={() => {
                            this.doRegister();
                            alert("Formulare angelegt!")
                        }}>
                            Benutzer anlegen
                        </Button>
                        <tr>
                            <td></td>
                        </tr>
                        <Button href="/Benutzerverwaltung" variant="danger" type="submit">
                            Abbrechen
                        </Button>
                    </Form>
                </header>
            </div>
        )
    }
}*/
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

const Rolle = value => {
    if (value !== ( "Teilnehmer" && "Management" && "Veranstaltungsanbieter" && "Admin")) {
        return (
            <div className="alert alert-danger" role="alert">
                Rolle muss Admin, Management, Veranstaltungsanbieter oder Teilnehmer sein!
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

const Firma = value => {
    if(value) {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Firma muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }}
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
export class BenutzerAnlegen extends React.Component {

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
        this.onChangeRolle = this.onChangeRolle.bind(this);
        this.onChangeFirma = this.onChangeFirma.bind(this);


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

    onChangeRolle(e) {
        this.setState( {
            Rolle: e.target.value
        });
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

    onChangeFirma(e) {
        this.setState({
            Firma: e.target.value
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
                Firma: this.state.Firma,
                Rolle: this.state.Rolle,
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
                        Rolle: response.data.Passwort,
                        Firma: response.data.Firma,
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
            alert("Benutzer erfolgreich angelegt!")
            this.props.history.push("/Benutzerverwaltung/")}
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
                                    <label htmlFor="Rolle">Rolle</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Rolle"
                                        value={this.state.Rolle}
                                        onChange={this.onChangeRolle}
                                        validations={[required, Rolle]}
                                    />
                                </div>

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
                                    <label htmlFor="firma">Firma</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firma"
                                        value={this.state.Firma}
                                        onChange={this.onChangeFirma}
                                        validations={[required, Firma]}
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
                                    <button className="btn btn-primary btn-block">Benutzer anlegen</button>
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
export default BenutzerAnlegen;
