import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Veranstaltungsverwaltung.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DataService from "../services/Veranstaltungsverwaltung.service";
import {InputGroup} from "react-bootstrap";

//Webformular zum Anlegen eines neuen Benutzers

export class VeranstaltungAnlegen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Startzeitpunkt: "",
            Endzeitpunkt: "",
            Dauer: 0,
            V_Beschreibung: "",
            V_Bezeichnung: "",
            Dozent: "",
            TE_Preis: 0,
            Zugangsart: "",
            maxTE_Zahl: 0,
            Status: "geplant",
            RaumID: 1,
            UserID: 1,
        };
    }

    doAnlegen= () => {
        console.log(this.state);
        const data = {
            Startzeitpunkt: this.state.Startzeitpunkt,
            Endzeitpunkt: this.state.Endzeitpunkt,
            Dauer: this.state.Dauer,
            V_Beschreibung: this.state.V_Beschreibung,
            V_Bezeichnung: this.state.V_Bezeichnung,
            Dozent: this.state.Dozent,
            TE_Preis: this.state.TE_Preis,
            Zugangsart: this.state.Zugangsart,
            maxTE_Zahl: this.state.maxTE_Zahl,
            Status: "geplant",
            RaumID: 1,
            UserID: 1

        };

        DataService.create(data)
            .then(response => {
                this.setState({
                    Startzeitpunkt: response.data.Startzeitpunkt,
                    Endzeitpunkt: response.data.Endzeitpunkt,
                    Dauer: response.data.Dauer,
                    V_Beschreibung: response.data.V_Beschreibung,
                    V_Bezeichnung: response.data.V_Bezeichnung,
                    Dozent: response.data.Dozent,
                    TE_Preis: response.data.TE_Preis,
                    Zugangsart: response.data.Zugangsart,
                    maxTE_Zahl: response.data.maxTE_Zahl,
                    Status: "geplant",
                    RaumID: 1,
                    UserID: 1
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {

        return (
            <div className="Webformular">
                <header className="App-header">
                    <Form>

                        <Form.Group controlId="bezeichnung">
                            <Form.Label>Bezeichnung</Form.Label>
                            <Form.Control type="text" value={this.state.V_Bezeichnung} placeholder="Bezeichnung"
                                          onChange={e => this.setState({V_Bezeichnung: e.target.value})}/>
                        </Form.Group>


                        <Form.Group controlId="startzeitpunkt">
                            <Form.Label>Startzeitpunkt</Form.Label>
                            <Form.Control type="datetime-local" value={this.state.Startzeitpunkt}
                                           onChange={e => this.setState({Startzeitpunkt: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="endzeitpunkt">
                            <Form.Label>Endzeitpunkt</Form.Label>
                            <Form.Control type="datetime-local" value={this.state.Endzeitpunkt}
                                          onChange={e => this.setState({Endzeitpunkt: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="dauer">
                            <Form.Label>Dauer</Form.Label>
                            <Form.Control type="text" placeholder="Dauer" value={this.state.Dauer}
                                          onChange={e => this.setState({Dauer: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="beschreibung">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Beschreibung" value={this.state.V_Beschreibung}
                                          onChange={e => this.setState({V_Beschreibung: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="dozent">
                            <Form.Label>Dozent</Form.Label>
                            <Form.Control type="text" placeholder="Dozent" value={this.state.Dozent}
                                          onChange={e => this.setState({Dozent: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="Preis">
                            <Form.Label>Preis</Form.Label>
                            <Form.Control type="number" placeholder="Preis" value={this.state.TE_Preis}
                                          onChange={e => this.setState({TE_Preis: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="zugangsart">
                            <Form.Label>Zugangsart</Form.Label>
                            <Form.Control type="text" placeholder="Zugangsart"
                                          value={this.state.Zugangsart}
                                          onChange={e => this.setState({Zugangsart: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" placeholder="Status"
                                          value={this.state.Status}
                                          onChange={e => this.setState({Status: e.target.value})}/>
                        </Form.Group>

                        <Button href="/Veranstaltungsverwaltung" variant="success" type="submit" onClick={() => {
                            this.doAnlegen();
                            alert("Veranstaltung angelegt!")
                        }}>
                            Veranstaltung anlegen
                        </Button>
                        <tr>
                            <td></td>
                        </tr>
                        <Button href="/Veranstaltungsverwaltung" variant="danger" type="submit">
                            Abbrechen
                        </Button>
                    </Form>
                </header>
            </div>
        )
    }
}