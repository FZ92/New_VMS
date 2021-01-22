import React from 'react';
import './Benutzerverwaltung.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/user.service";


//Tabelle für Benutzerverwaltung
export class Benutzerverwaltung extends React.Component {
    constructor(props) {
        super(props);
        this.retrieveBenutzer = this.retrieveBenutzer.bind(this);
        this.loeschen = this.loeschen.bind(this);
        this.setActiveBenutzer = this.setActiveBenutzer.bind(this);

        this.state = {
            user: [],
            currentUser: null,
            currentIndex: -1,
        };

    }

    componentDidMount() {
        this.retrieveBenutzer();

    }

    retrieveBenutzer() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    user: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    loeschen(userDelete) {
        for (var i = 0; i < this.state.user.length; i++) {
            if (userDelete === this.state.user[i]) {
                DataService.delete(this.state.user[i].UserID)
                    .then(response => {
                        console.log(response.data);
                        this.props.history.push('/Benutzerverwaltung')

                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
    }

    setActiveBenutzer(userdata, index) {
        this.setState({
            currentUser: userdata,
            currentIndex: index
        });
        this.props.history.push("/BenutzerBearbeiten/" + userdata.UserID)
    }


    warnungLoeschen(userDelete) {
        const check = window.confirm('Benutzer wirklich löschen?');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.loeschen(userDelete);
        }
    }

   /* warnungBearbeiten(userdata) {
        const check = window.confirm('Benutzer wirklich bearbeiten?');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.props.history.push("/BenutzerBearbeiten/" + userdata.UserID)
        }
    }*/


    renderTableData() {
        const {user} = this.state;
            return (
                <div>

                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Rolle</th>
                            <th>Firmenname</th>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>E-Mail</th>
                            <th>Ort</th>
                            <th>PLZ</th>
                            <th>Straße und Hausnummer</th>
                            <th>Telefonnummer</th>
                            <th>Bearbeiten</th>
                            <th>Löschen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user && user.map((userdata, index) => (
                <tr key={index}>
                    <td>{userdata.Rolle}</td>
                    <td>{userdata.Firma}</td>
                    <td>{userdata.Vorname}</td>
                    <td>{userdata.Nachname}</td>
                    <td>{userdata.Email}</td>
                    <td>{userdata.Ort}</td>
                    <td>{userdata.PLZ}</td>
                    <td>{userdata.Strasse}</td>
                    <td>{userdata.Telefonnummer}</td>
                    <td><Button variant="primary" onClick={() => {
                        this.setActiveBenutzer(userdata, index)}}>Bearbeiten</Button>
                    </td>
                    <td><Button variant="danger" type="submit" onClick={() => {
                        this.warnungLoeschen(userdata);
                        window.location.reload(false)}}>Löschen</Button>
                    </td>
                </tr>
                        ))}</tbody>
                </Table>
        </div>
)}

    render() {
        return (
            <div className='m-5'>
                <h3>Benutzer</h3>
                {this.renderTableData()}
        </div>
        );
    }
}

export default Benutzerverwaltung;