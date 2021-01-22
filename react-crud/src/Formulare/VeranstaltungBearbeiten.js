import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataService from "../services/Veranstaltungsverwaltung.service";
import {InputGroup} from "react-bootstrap";


export class VeranstaltungBearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.getVeranstaltung = this.getVeranstaltung.bind(this);
        this.updateVeranstaltung = this.updateVeranstaltung.bind(this);
        this.onChangeStartzeitpunkt = this.onChangeStartzeitpunkt.bind(this);
        this.onChangeEndzeitpunkt = this.onChangeEndzeitpunkt.bind(this);
        this.onChangeDauer = this.onChangeDauer.bind(this);
        this.onChangeBeschreibung = this.onChangeBeschreibung.bind(this);
        this.onChangeBezeichnung = this.onChangeBezeichnung.bind(this);
        this.onChangeDozent = this.onChangeDozent.bind(this);
        this.onChangePreis = this.onChangePreis.bind(this);
        this.onChangeZugangsart = this.onChangeZugangsart.bind(this);
        this.onChangemaxTE_Zahl = this.onChangemaxTE_Zahl.bind(this);
        this.onChangeRaum = this.onChangeRaum.bind(this);

        this.state = {
            currentVeranstaltung: {
                VeranstaltungID: null,
                Startzeitpunkt: null,
                Endzeitpunkt: null,
                Dauer: "",
                V_Beschreibung: "",
                V_Bezeichnung: "",
                Dozent: "",
                TE_Preis: "",
                Zugangsart: "",
                maxTE_Zahl: "",
                Status: "",
                RaumID: null,
                UserID: null
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
    }

    onChangeDauer(e) {
        const Dauer = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Dauer: Dauer
                }
            };
        });
    }

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
        const TE_Preis = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    TE_Preis: TE_Preis
                }
            };
        });
    }

    onChangeZugangsart(e) {
        const Zugangsart = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    Zugangsart: Zugangsart
                }
            };
        });
    }

    onChangemaxTE_Zahl(e) {
        const maxTE_Zahl = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    maxTE_Zahl: maxTE_Zahl
                }
            };
        });
    }

    onChangeRaum(e) {
        const RaumID = e.target.value;
        this.setState(function(prevState) {
            return {
                currentVeranstaltung: {
                    ...prevState.currentVeranstaltung,
                    RaumID: RaumID
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
            <div className="VeranstaltungBearbeiten">
                <header className="App-header">
                    <Form>

                        <Form.Group controlId="bezeichnung">
                            <Form.Label>Bezeichnung</Form.Label>
                            <Form.Control type="text" value={currentVeranstaltung.V_Bezeichnung} placeholder="Bezeichnung"
                                          onChange={this.onChangeBezeichnung}/>
                        </Form.Group>


                        <Form.Group controlId="startzeitpunkt">
                            <Form.Label>Startzeitpunkt</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Startzeitpunkt" value={currentVeranstaltung.Startzeitpunkt}
                                          onChange={this.onChangeStartzeitpunkt}/>
                        </Form.Group>

                        <Form.Group controlId="Endzeitpunkt">
                            <Form.Label>Endzeitpunkt</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Endzeitpunkt" value={currentVeranstaltung.Endzeitpunkt}
                                          onChange={this.onChangeEndzeitpunkt}/>
                        </Form.Group>

                        <Form.Group controlId="Dauer">
                            <Form.Label>Dauer</Form.Label>
                            <Form.Control type="number" min="1" placeholder="Dauer" value={currentVeranstaltung.Dauer}
                                          onChange={this.onChangeDauer}/>
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
                            <Form.Label>Teilnahmegebühren pro Person</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control type="number" min="0.00" placeholder="Teilnahmegebühren"
                                          value={currentVeranstaltung.TE_Preis}
                                          onChange={this.onChangePreis}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>€</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="Zugangsart">
                            <Form.Label>Zugangsart</Form.Label>
                            <Form.Control as="select" value={currentVeranstaltung.Zugangsart} onChange={this.onChangeZugangsart}>
                                <option value= {"offen"}>offen für beliebige Teilnehmer</option>
                                <option value= {"geschlossen"}>nur für Teilnehmer der Teilnehmerliste</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Raum">
                            <Form.Label>Raum</Form.Label>
                            <Form.Control type="number" min="1" placeholder="RaumID" value={currentVeranstaltung.RaumID}
                                          onChange={this.onChangeRaum}/>
                        </Form.Group>

                        <Button href="/Veranstaltungsverwaltung" variant="success" type="submit" onClick={() => {
                            this.updateVeranstaltung(); alert("Veranstaltung erfolgreich bearbeitet!")}}>
                            Bearbeiten
                        </Button>

                        <Button href="/Veranstaltungsverwaltung" variant="danger" type="submit">
                            Abbrechen
                        </Button>
                    </Form>
                </header>
            </div>
        );
    }
}
export default VeranstaltungBearbeiten;

