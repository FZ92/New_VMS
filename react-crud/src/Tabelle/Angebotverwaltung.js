import React from 'react';
import './Veranstaltungsverwaltung.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/Angebotverwaltung.service";
import AnfrageService from "../services/anfrage.service";
import RaumService from "../services/raum.service";
import VeranstaltungService from "../services/AlleVeranstaltungen.service";

//Übersichtstabelle für Admin

export class Angebotverwaltung extends React.Component {

    constructor(props) {
        super(props);
        this.retrieveAngebot = this.retrieveAngebot.bind(this);
        this.retrieveRaum = this.retrieveRaum.bind(this);
        this.retrieveAnfrage = this.retrieveAnfrage.bind(this);
        this.retrieveVeranstaltung = this.retrieveVeranstaltung.bind(this);
        this.loeschen = this.loeschen.bind(this);
        this.setActiveAngebot = this.setActiveAngebot.bind(this);
        this.state = {
            angebote: [],
            currentIndex: -1,
            currentAngebot: null
        };

        this.state2 = {
            raum: [],
            currentIndex: -1,
            currentRaum: null
        };
        this.state3 = {
            anfrage: [],
            currentIndex: -1,
            currentAnfrage: null
        };

        this.state4 = {
            veranstaltung: [],
            currentIndex: -1,
            currentVeranstaltung: null
        };

    }
    componentDidMount() {
        this.retrieveAngebot();
        this.retrieveRaum = this.retrieveRaum.bind(this);
        this.retrieveAnfrage = this.retrieveAnfrage.bind(this);
        this.retrieveVeranstaltung = this.retrieveVeranstaltung.bind(this);
    }
    retrieveAngebot() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    angebote: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveVeranstaltung() {
        VeranstaltungService.getAll()
            .then(response => {
                this.setState({
                    veranstaltung: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveRaum() {
        RaumService.getAll()
            .then(response => {
                this.setState({
                    raum: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveAnfrage() {
        AnfrageService.getAll()
            .then(response => {
                this.setState({
                    anfrage: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    loeschen(angebotDelete) {
        for (var i = 0; i < this.state.angebote.length; i++) {
            if (angebotDelete === this.state.angebote[i]) {
                DataService.delete(this.state.angebote[i].AngebotID)
                    .then(response => {
                        console.log(response.data);
                        this.props.history.push('/Angebotverwaltung')

                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
    }

    setActiveAngebot(angebot, index) {
        this.setState({
            currentAngebot: angebot,
            currentIndex: index
        });
        this.props.history.push("/" + angebot.AngebotID)
    }

    warnungLoeschen(angebotDelete) {
        const check = window.confirm('Angebot wirklich ablehnen? Sie müssen danach eine neue Anfrage stellen!');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.loeschen(angebotDelete);
        }
    }


    renderTableData() {
        const {angebote} = this.state;
        const {anfrage} = this.state3;
        const {veranstaltung} = this.state4;
        const {raum} = this.state2;
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Veranstaltungsbezeichnung</th>
                        <th>Startdatum</th>
                        <th>Enddatum</th>
                        <th>Raumname</th>
                        <th>Teilnehmerzahl</th>
                        <th>Zugangsart</th>
                        <th>Angebotspreis</th>
                        <th>Leistungen</th>
                        <th>Bearbeiten</th>
                        <th>Ablehnen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {angebote && angebote.map((angebot, index) => (
                        <tr key={index}>
                            <td>{anfrage.Bezeichnung}</td>
                            <td>{anfrage.Startdatum}</td>
                            <td>{anfrage.Enddatum}</td>
                            <td>{raum.R_Bezeichnung}</td>
                            <td>{anfrage.Teilnehmerzahl}</td>
                            <td>{anfrage.Zugang}</td>
                            <td>{angebot.A_Preis}</td>
                            <td>{angebot.Leistung}</td>
                            <td><Button variant="primary" onClick={() => {
                                this.setActiveAngebot(angebot, index)
                            }}>Bearbeiten
                            </Button></td>
                            <td><Button variant="danger" type="submit" onClick={() => {
                                this.warnungLoeschen(angebot);
                                window.location.reload(false)

                            }}>Löschen
                            </Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

        )
    }



    render() {
        return (
            <div className='m-5'>
                <h3>Alle Angebote</h3>
                {this.renderTableData()}
            </div>
        )
    }
}

export default Angebotverwaltung;