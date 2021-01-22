import React from 'react';
import './BenutzerAnlegen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {BenutzerAnlegen} from './BenutzerAnlegen';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                //count: null,
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
                    <Form>

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
}
export default BenutzerBearbeiten;