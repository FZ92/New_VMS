/*import React from 'react';
import './BenutzerAnlegen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataService from "../services/user.service";


//Webformular zum Anlegen eines neuen Benutzers
export class BenutzerBearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirma = this.onChangeFirma.bind(this);
        this.onChangeVorname = this.onChangeVorname.bind(this);
        this.onChangeNachname = this.onChangeNachname.bind(this);
        this.onChangeOrt = this.onChangeOrt.bind(this);
        this.onChangePLZ = this.onChangePLZ.bind(this);
        this.onChangeStrasse = this.onChangeStrasse.bind(this);
        this.onChangeTelefonnummer = this.onChangeTelefonnummer.bind(this);


        this.state = {
            currentUser: {
                UserID: null,
                Email: "",
                Vorname: "",
                Nachname: "",
                Firma: "",
                Ort: "",
                PLZ: "",
                Strasse: "",
                Telefonnummer: "",
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getUser(this.props.match.params.UserID);
    }

    onChangeEmail(e) {
        const Email = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Email: Email
                }
            };
        });
    }
    onChangeFirma(e) {
        const Firma = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Firma: Firma
                }
            };
        });
    }

    onChangeVorname(e) {
        const Vorname = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Vorname: Vorname
                }
            };
        });
    }

    onChangeNachname(e) {
        const Nachname = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Nachname: Nachname
                }
            };
        });
    }

    onChangeOrt(e) {
        const Ort = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Ort: Ort
                }
            };
        });
    }

    onChangePLZ(e) {
        const PLZ = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    PLZ: PLZ
                }
            };
        });
    }

    onChangeStrasse(e) {
        const Strasse = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Strasse: Strasse
                }
            };
        });
    }

    onChangeTelefonnummer(e) {
        const Telefonnummer = e.target.value;
        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Telefonnummer: Telefonnummer
                }
            };
        });
    }

    getUser(UserID) {
        DataService.get(UserID)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {
        DataService.update(
            this.state.currentUser.UserID,
            this.state.currentUser
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Räume was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

        render() {

        const {currentUser} = this.state;
        return (

            <div className="Webformular">
                <header className="Webformular-header">
                    <Form class="row g-3 needs-validation" novalidate>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={currentUser.Email} className="form-control"
                                          onChange={this.onChangeEmail}/>
                        </Form.Group>


                        <Form.Group controlId="firma">
                            <Form.Label>Firmenname</Form.Label>
                            <Form.Control type="text" value={currentUser.Firma} className="form-control"
                                          onChange={this.onChangeFirma}/>
                        </Form.Group>

                        <Form.Group controlId="vorname">
                            <Form.Label>Vorname</Form.Label>
                            <Form.Control type="text" className="form-control" value={currentUser.Vorname}
                                          onChange={this.onChangeVorname}/>
                        </Form.Group>

                        <Form.Group controlId="nachname">
                            <Form.Label>Nachname</Form.Label>
                            <Form.Control type="text" className="form-control" value={currentUser.Nachname}
                                          onChange={this.onChangeNachname}/>
                        </Form.Group>

                        <Form.Group controlID="ort">
                            <Form.Label>Ort</Form.Label>
                            <Form.Control type="text" className="form-control" value={currentUser.Ort}
                            onChange={this.onChangeOrt}/>
                        </Form.Group>

                        <Form.Group controlId="plz">
                            <Form.Label>PLZ</Form.Label>
                            <Form.Control type="number" className="form-control"
                                          value={currentUser.PLZ}
                                          onChange={this.onChangePLZ}/>
                        </Form.Group>

                        <Form.Group controlId="strasse">
                            <Form.Label>Straße</Form.Label>
                            <Form.Control type="text" className="form-control"
                                                  value={currentUser.Strasse}
                                                  onChange={this.onChangeStrasse}/>
                        </Form.Group>

                        <Form.Group controlId="Telefonnummer">
                            <Form.Label>Telefonnummer</Form.Label>
                            <Form.Control type="text" className="form-control"
                                                  value={currentUser.Telefonnummer}
                                                  onChange={this.onChangeTelefonnummer}/>
                        </Form.Group>

                        <Button href="/Benutzerverwaltung" variant="success" type="submit" onClick={() => {
                            this.updateUser();
                            alert("Bearbeitung erfolgreich")
                        }}>
                            Benutzer Bearbeiten
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

const Email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Keine gültige E-Mail Adresse!
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
export class BenutzerBearbeiten extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeVorname = this.onChangeVorname.bind(this);
        this.onChangeNachname = this.onChangeNachname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.getUser = this.getUser.bind(this);
        this.onChangeOrt = this.onChangeOrt.bind(this);
        this.onChangePLZ = this.onChangePLZ.bind(this);
        this.onChangeStrasse = this.onChangeStrasse.bind(this);
        this.onChangeTelefonnummer = this.onChangeTelefonnummer.bind(this);
        //this.doUpdate = this.doUpdate.bind(this);
        this.onChangeFirma = this.onChangeFirma.bind(this);


        this.state = {
            currentUser: {
                UserID: null,
                Rolle: "",
                Passwort: "",
                Vorname: "",
                Nachname: "",
                Firma: "",
                Email: "",
                Ort: "",
                PLZ: "",
                Strasse: "",
                Telefonnummer: "",
                Anlegedatum: "",


            },  successful: false,
            message: ""
        };
    }
    componentDidMount() {
        this.getUser(this.props.match.params.UserID);
    }

    onChangeVorname(e) {
        const Vorname = e.target.value;
        this.setState({function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    Vorname: Vorname
                }
            }
            }
        });
    }

    onChangeNachname(e) {
        const Nachname = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Nachname: Nachname
                    }
                }
            }
        });
    }


    onChangeEmail(e) {
        const Email = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Email: Email
                    }
                }
            }
        });
    }

    onChangeOrt(e) {
        const Ort = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Ort: Ort
                    }
                }
            }
        });
    }

    onChangePLZ(e) {
        const PLZ = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        PLZ: PLZ
                    }
                }
            }
        });
    }

    onChangeStrasse(e) {
        const Strasse = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Strasse: Strasse
                    }
                }
            }
        });
    }

    onChangeTelefonnummer(e) {
        const Telefonnummer = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Telefonnummer: Telefonnummer
                    }
                }
            }
        });
    }


    onChangeFirma(e) {
        const Firma = e.target.value;
        this.setState({function(prevState) {
                return {
                    currentUser: {
                        ...prevState.currentUser,
                        Firma: Firma
                    }
                }
            }
        });
    }

   getUser(UserID) {
        DataService.get(UserID)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
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
                Firma: this.state.currentUser.Firma,
                Passwort: this.state.currentUser.Passwort,
                Vorname: this.state.currentUser.Vorname,
                Nachname: this.state.currentUser.Nachname,
                Email: this.state.currentUser.Email,
                Ort: this.state.currentUser.Ort,
                PLZ: this.state.currentUser.PLZ,
                Strasse: this.state.currentUser.Strasse,
                Telefonnummer: this.state.currentUser.Telefonnummer,
            };

            DataService.update(this.state.currentUser.UserID, data)
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The User was updated successfully!"
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);

                })

        }
    }


    /*doUpdate() {
        DataService.update(this.state.currentUser.UserID, this.state.currentUser)
            .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The User was updated successfully!"
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);

            })
    }*/


    render() {
        const {currentUser} = this.state;
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
                                        value={currentUser.Email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, Email]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="firma">Firma</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firma"
                                        value={currentUser.Firma}
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
                                        value={currentUser.Vorname}
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
                                        value={currentUser.Nachname}
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
                                        value={currentUser.Ort}
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
                                        value={currentUser.PLZ}
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
                                        value={currentUser.Strasse}
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
                                        value={currentUser.Telefonnummer}
                                        onChange={this.onChangeTelefonnummer}
                                        validations={[required, Telefonnummer]}
                                    />
                                </div>


                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Benutzer bearbeiten</button>
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
                            style={{display: "none"}}
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

export default BenutzerBearbeiten;