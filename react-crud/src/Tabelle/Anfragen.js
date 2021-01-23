import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/anfrage.service";

//Anfragen
export class Anfragen extends React.Component {
    constructor(props) {
        super(props);
        this.retrieveAnfragen= this.retrieveAnfragen.bind(this);
        this.ablehnen = this.ablehnen.bind(this);
        this.setActiveAnfrage = this.setActiveAnfrage.bind(this);

        this.state = {
            anfragen: [],
            currentIndex: -1,
            currentAnfrage: null
        };
    }

    componentDidMount() {
        this.retrieveAnfragen();
    }

    retrieveAnfragen() {
        DataService.getAllAndUser()
            .then(response => {
                this.setState({
                    anfragen: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    ablehnen(anfrageAblehnen) {
        for (var i = 0; i < this.state.anfragen.length; i++) {
            if (anfrageAblehnen === this.state.anfragen[i]) {
                DataService.delete(this.state.anfragen[i].AnfrageID)
                    .then(response => {
                        console.log(response.data);
                        this.props.history.push('/Anfragenverwaltung')

                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
    }

    setActiveAnfrage(anfrage, index) {
        this.setState({
            currentAnfrage: anfrage,
            currentIndex: index
        });
        this.props.history.push("/AnfrageAnnehmen/" + anfrage.AnfrageID)
    }

    warnungAblehnen(anfrageAblehnen) {
        const check = window.confirm('Anfrage wirklich ablehnen? Es besteht keine Möglichkeit die Anfrage wiederherzustellen!');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.ablehnen(anfrageAblehnen);
        }
    }

    warnungAnnehmen(anfrageAnnehmen) {
        const check = window.confirm('Anfrage wirklich annehmen? Es besteht keine Möglichkeit die Anfrage dann abzulehnen!');
        if (check === false) {
            window.location.reload(false)
        } else {
            this.setActiveAnfrage(anfrageAnnehmen);
        }
    }

    setBarrierefreiheit(anfrage) {
        if (anfrage.Barrierefreiheit === 0) {
            var barrierefrei = "nicht barrierefrei"
        } else barrierefrei = "barrierefrei";
        return barrierefrei;
    }

    renderTableData() {
        const {anfragen} = this.state;
            return (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Bezeichnung</th>
                            <th>Startdatum</th>
                            <th>Enddatum</th>
                            <th>maximale Teilnehmerzahl</th>
                            <th>Zusatzleistungen</th>
                            <th>Barrierefreiheit</th>
                            <th>Name des Veranstalters</th>
                            <th>Anfrage annehmen</th>
                            <th>Gegenangebot erstellen</th>
                            <th>Anfrage ablehnen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {anfragen && anfragen.map((anfrage, index) => (
                            <tr key={index}>
                                <td>{anfrage.Bezeichnung}</td>
                                <td>{anfrage.Startdatum}</td>
                                <td>{anfrage.Enddatum}</td>
                                <td>{anfrage.Teilnehmerzahl}</td>
                                <td>{anfrage.Zusatzleistungen}</td>
                                <td>{this.setBarrierefreiheit(anfrage, index)}</td>
                                <td>{anfrage.Vorname} {anfrage.Nachname}</td>
                                <td><Button variant="success" types="submit" onClick={() => {
                                    this.warnungAnnehmen(anfrage); window.location.reload(false)
                                }}>Annehmen</Button></td>
                                <td><Button variant="primary">Gegenangebot</Button></td>
                                <td><Button variant="danger" type="submit" onClick={() => {
                                    this.warnungAblehnen(anfrage); window.location.reload(false)}}>Ablehnen</Button>
                                </td>
                            </tr>
                        ))}</tbody>
                    </Table>
                </div>
            )}

    render() {
        return (
            <div className='m-5'>
                <h3>Anfragen</h3>
                    {this.renderTableData()}
            </div>
        );
    }
}

export default Anfragen;