import React from 'react';
import './Anfragenerstellung.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {InputGroup} from "react-bootstrap";
import DataService from "../services/anfrage.service";


// Erstellung einer Anfrage
export class Anfragenerstellung extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Bezeichnung: "",
            Startdatum: "",
            Enddatum: "",
            Teilnehmerzahl: "",
            Zusatzleistungen: "",
            Zugang: "offen",
            Kosten: "",
            Barrierefreiheit: "0",
            UserID: 1
        };
    }
    doAnfrageErstellen = () => {
        console.log(this.state.Bezeichnung);
        const data = {
            Bezeichnung: this.state.Bezeichnung,
            Startdatum: this.state.Startdatum,
            Enddatum: this.state.Enddatum,
            Teilnehmerzahl: this.state.Teilnehmerzahl,
            Zusatzleistungen: this.state.Zusatzleistungen,
            Zugang: this.state.Zugang,
            Kosten: this.state.Kosten,
            Barrierefreiheit: this.state.Barrierefreiheit,
            UserID: this.state.UserID
        };

        DataService.create(data)
            .then(response => {
                this.setState({
                    Bezeichnung: response.data.Bezeichnung,
                    Startdatum: response.data.Startdatum,
                    Enddatum: response.data.Enddatum,
                    Teilnehmerzahl: response.data.Teilnehmerzahl,
                    Zusatzleistungen: response.data.Zusatzleistungen,
                    Zugang: response.data.Zugang,
                    Kosten: response.data.Kosten,
                    Barrierefreiheit: response.data.Barrierefreiheit,
                    UserID: response.data.UserID
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    changeBezeichnungHandler= (event) => {
        this.setState({Bezeichnung: event.target.value});
    }



    render() {

        return (
            <div className="Anfragenerstellung">
            <header className="App-header">
                <h2>Seminaranfrage erstellen</h2>

                <Form>
                    <Form.Group controlId="bezeichnung">
                        <Form.Label>Bezeichnung</Form.Label>
                        <Form.Control type="text" value={this.state.Bezeichnung} placeholder="Seminarname eingeben" onChange={e => this.setState({ Bezeichnung: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="startdatum">
                        <Form.Label>Startdatum</Form.Label>
                        <Form.Control type="date" placeholder="Startdatum" value={this.state.Startdatum} onChange={e => this.setState({ Startdatum: e.target.value })}/>
                    </Form.Group>

                    <Form.Group controlId="enddatum">
                        <Form.Label>Enddatum</Form.Label>
                        <Form.Control type="date" placeholder="Enddatum" value={this.state.Enddatum} onChange={e => this.setState({ Enddatum: e.target.value })}/>
                    </Form.Group>

                    <Form.Group controlId="teilnehmerzahl">
                        <Form.Label>Teilnehmerzahl</Form.Label>
                        <Form.Control type="number" min="1" max="10000" placeholder="maximale Teilnehmerzahl, wie z.B. 60 " value={this.state.Teilnehmerzahl} onChange={e => this.setState({ Teilnehmerzahl: e.target.value })}/>
                    </Form.Group>

                    <Form.Group controlId="zusatzleistungen">
                        <Form.Label>Zusatzleitsungen</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Zusatzleistungen, wie z.B. Beamer, Whiteboard etc." value={this.state.Zusatzleistungen}  onChange={e => this.setState({ Zusatzleistungen: e.target.value })}/>
                    </Form.Group>

                    <Form.Group controlId="zugang">
                        <Form.Label>Zugangsart wählen</Form.Label>
                        <Form.Control as="select" value={this.state.Zugang}  onChange={e => this.setState({ Zugang: e.target.value })}>
                            <option value="offen">offen für beliebige Teilnehmer</option>
                            <option value="geschlossen">nur für Personen der Teilnehmerliste</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="kosten">
                        <Form.Label>Teilnahmekosten pro Person</Form.Label>
                        <InputGroup className="mb-2">
                        <Form.Control type="number" min="0" max="100000" onkeypress="return event.charCode >= 48" onkeyup="if(this.value<0){this.value= this.value * -1}" placeholder="0.00" onChange={e => this.setState({ Kosten: e.target.value })} value={this.state.Kosten}/>
                            <InputGroup.Append>
                                <InputGroup.Text>€</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="barrierefreiheit">
                        <Form.Label>Barrierefreiheit</Form.Label>
                        <Form.Control as="select" value={this.state.Barrierefreiheit}  onChange={e => this.setState({ Barrierefreiheit: e.target.value })}>
                            <option value= {0}>nicht barrierefrei</option>
                            <option value= {1}>barrierefrei</option>
                        </Form.Control>

                    </Form.Group>

                        <Button href="/" variant="success" type="submit" onClick={() => {this.doAnfrageErstellen();alert("Anfrage erfolgreich gestellt! Sie erhalten in Kürze eine Antwort!")}}>
                            Absenden
                        </Button>
                    <tr>
                        <td></td>
                    </tr>
                        <Button href="/" variant="danger" type="submit" onClick={() => {alert("Anfragenerstellung abgebrochen! Sie werden zur Startseite weitergeleitet!")}}>
                            Abbrechen
                        </Button>

                </Form>
            </header>
            </div>
        );
    }
}

export default Anfragenerstellung;