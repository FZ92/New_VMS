import React from 'react';
import './Veranstaltungsverwaltung.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/Veranstaltungsverwaltung.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

//Übersichtstabelle für Admin

export class VeranstaltungsverwaltungVeranstalter extends React.Component {

    constructor(props) {

        super(props);
        this.retrieveVeranstaltungsverwaltung= this.retrieveVeranstaltungsverwaltung.bind(this);
        this.loeschen = this.loeschen.bind(this);
        this.setActiveVeranstaltung = this.setActiveVeranstaltung.bind(this);
        this.check = this.check.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.state = {
            veranstaltung: [],

            password: [],
            currentIndex: -1,
            currentVeranstaltung: null,
            checkarray: [],
            currentUser: AuthService.getCurrentUser()
        };




    }
    componentDidMount() {
        this.check();
    }

    retrieveVeranstaltungsverwaltung() {
        DataService.getAllVeranstaltungRolle()
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

    getPassword()  {
        UserService.getAll()
            .then(response => {
                this.setState( {
                    password: response.data
                });
                console.log(response.data);
            })
    }

    check() {
        DataService.getAllVeranstaltungRolle(this.state.Email)
            .then(response => {this.setState({
                checkarray: response.data
            })})
    }



    loeschen(veranstaltungDelete) {
        for (var i = 0; i < this.state.veranstaltung.length; i++) {
            if (veranstaltungDelete === this.state.veranstaltung[i]) {
                DataService.delete(this.state.veranstaltung[i].VeranstaltungID)
                    .then(response => {
                        console.log(response.data);
                        this.props.history.push('/Veranstaltungsverwaltung')

                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
    }

    setActiveVeranstaltung(veranstaltungsdata, index) {
        this.setState({
            currentVeranstaltung: veranstaltungsdata,
            currentIndex: index
        });
        this.props.history.push("/VeranstaltungBearbeiten/" + veranstaltungsdata.VeranstaltungID)
    }

    warnungLoeschen(veranstaltungDelete) {
        const check = window.confirm('Veranstaltung wirklich löschen?');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.loeschen(veranstaltungDelete);
        }
    }


    renderTableData() {
        const {checkarray} = this.state;
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Bezeichnung</th>
                        <th>Startzeitpunkt</th>
                        <th>Endzeitpunkt</th>
                        <th>Beschreibung</th>
                        <th>Dozent</th>
                        <th>Preis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkarray && checkarray.map((veranstaltungsdata, index) => (
                        <tr key={index}>
                            <td>{veranstaltungsdata.V_Bezeichnung}</td>
                            <td>{veranstaltungsdata.Startzeitpunkt}</td>
                            <td>{veranstaltungsdata.Endzeitpunkt}</td>
                            <td>{veranstaltungsdata.V_Beschreibung}</td>
                            <td>{veranstaltungsdata.Dozent}</td>
                            <td>{veranstaltungsdata.TE_Preis}</td>
                            <td><Button variant="primary" onClick={() => {
                                this.setActiveVeranstaltung(veranstaltungsdata, index)
                            }}>Bearbeiten
                            </Button></td>
                            <td><Button variant="danger" type="submit" onClick={() => {
                                this.warnungLoeschen(veranstaltungsdata);
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
                <h3>Alle Veranstaltungen</h3>
                {this.renderTableData()}
            </div>
        )
    }
}

export default VeranstaltungsverwaltungVeranstalter;