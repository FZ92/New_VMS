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
}