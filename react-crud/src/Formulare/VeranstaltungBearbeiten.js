import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {BenutzerAnlegen} from './BenutzerAnlegen';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DataService from "../services/Veranstaltungsverwaltung.service";

//Webformular zum Anlegen eines neuen Benutzers

export class VeranstaltungBearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.getVeranstaltung = this.getVeranstaltung.bind(this);
        this.updateVeranstaltung = this.updateVeranstaltung.bind(this);
        this.onChangeStartzeitpunkt = this.onChangeStartzeitpunkt.bind(this);
        this.onChangeEndzeitpunkt = this.onChangeEndzeitpunkt.bind(this);
        this.onChangeBezeichnung = this.onChangeBezeichnung.bind(this);
        this.onChangeBeschreibung = this.onChangeBeschreibung.bind(this);
        this.onChangeDozent = this.onChangeDozent.bind(this);
        this.onChangePreis = this.onChangePreis.bind(this);

        this.state = {
            currentVeranstaltung: {
                //count: null,
                VeranstaltungID: null,
                Startzeitpunkt: "",
                Endzeitpunkt: "",
                V_Bezeichnung: "",
                V_Beschreibung: "",
                Dozent: "",
                TE_Preis: "",
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getVeranstaltung(this.props.match.params.VeranstaltungID);
    }

    onChangeStartzeitpunkt(e) {
        const Startzeitpunkt = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Startzeitpunkt: Startzeitpunkt
                }
            };
        });
    }
    onChangeEndzeitpunkt(e) {
        const Endzeitpunkt = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Endzeitpunkt: Endzeitpunkt
                }
            };
        });
    }VeranstaltungBearbeiten

    onChangeBezeichnung(e) {
        const V_Bezeichnung = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    V_Bezeichnung: V_Bezeichnung
                }
            };
        });
    }

    onChangeBeschreibung(e) {
        const V_Beschreibung = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    V_Beschreibung: V_Beschreibung
                }
            };
        });
    }

    onChangeDozent(e) {
        const Dozent = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Dozent: Dozent
                }
            };
        });
    }

    onChangePreis(e) {
        const Preis = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Preis: Preis
                }
            };
        });
    }



    getVeranstaltung(VeranstaltungID) {
        DataService.get(VeranstaltungID)
            .then(response => {
                this.setState({
                    currentVeranstaltung: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateVeranstaltung() {
        DataService.update(
            this.state.currentVeranstaltung.VeranstaltungID,
            this.state.currentVeranstaltung
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Veranstaltung erfolgreich geupdated!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {

        const {currentVeranstaltung} = this.state;
        return (

            <div className="Webformular">
                <header className="Webformular-header">
                    <Form>

                        <Form.Group controlId="bezeichnung">
                            <Form.Label>Bezeichnung</Form.Label>
                            <Form.Control type="text" value={currentVeranstaltung.V_Bezeichnung} placeholder="Bezeichnung"
                                          onChange={this.onChangeBezeichnung}/>
                            <Form.Text className="form-group"></Form.Text>
                        </Form.Group>


                        <Form.Group controlId="startzeitpunkt">
                            <Form.Label>Startzeitpunkt</Form.Label>
                            <Form.Control type="date" placeholder="Startzeitpunkt" value={currentVeranstaltung.Startzeitpunkt}
                                          onChange={this.onChangeStartzeitpunkt}/>
                        </Form.Group>

                        <Form.Group controlId="Endzeitpunkt">
                            <Form.Label>Endzeitpunkt</Form.Label>
                            <Form.Control type="date" placeholder="Endzeitpunkt" value={currentVeranstaltung.Endzeitpunkt}
                                          onChange={this.onChangeEndzeitpunkt}/>
                        </Form.Group>

                        <Form.Group controlId="beschreibung">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control type="text" placeholder="Beschreibung" value={currentVeranstaltung.V_Beschreibung}
                                          onChange={this.onChangeBeschreibung}/>
                        </Form.Group>

                        <Form.Group controlID="dozent">
                            <Form.Label>Dozent</Form.Label>
                            <Form.Control type="text" placeholder="Dozent" value={currentVeranstaltung.Dozent}
                                          onChange={this.onChangeDozent}/>
                        </Form.Group>

                        <Form.Group controlId="Preis">
                            <Form.Label>Preis</Form.Label>
                            <Form.Control type="number" placeholder="Preis"
                                          value={currentVeranstaltung.Preis}
                                          onChange={this.onChangePreis}/>
                        </Form.Group>

                        <Button href="/Veranstaltungsverwaltung" variant="success" type="submit" onClick={() => {
                            this.updateVeranstaltung();
                            alert("Bearbeitung erfolgreich")
                        }}>
                            veranstaltung Bearbeiten
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
export default VeranstaltungBearbeiten;

