import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/Abrechnung.service";

//Abrechnung
class Abrechnung extends React.Component {

    constructor(props) {
        super(props);
        this.retrieveAbrechnungen = this.retrieveAbrechnungen.bind(this);
        this.state = {
            abrechnungen: [],
            count: null,
        };


    }

    componentDidMount() {
        this.retrieveAbrechnungen();
    }
    retrieveAbrechnungen() {
        DataService.getAllManager()
            .then(response => {
                this.setState({
                    abrechnungen: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    renderTableData() {
        return this.state.abrechnungen.map((abrechnungen, index) => {
            const { AngebotID, R_Bezeichnung, Startzeitpunkt, Endzeitpunkt, maxTE_Zahl, Leistung, Zugangsart, A_Preis, } = abrechnungen //destructuring
            return (
                <tr key={AngebotID}>
                    <td>{R_Bezeichnung}</td>
                    <td>{Startzeitpunkt}</td>
                    <td>{Endzeitpunkt}</td>
                    <td>{maxTE_Zahl}</td>
                    <td>{Leistung}</td>
                    <td>{Zugangsart}</td>
                    <td>{A_Preis} €</td>
                    <td><Button variant="primary">Abrechnung senden</Button></td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className='m-5'>
                <h3>Abrechnungen</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>

                        <th>Raumbezeichnung</th>
                        <th>Startzeitpunkt</th>
                        <th>Endzeitpunkt</th>
                        <th>Teilnehmerzahl</th>
                        <th>Zusatzleistung</th>
                        <th>Zugangsart</th>
                        <th>Preis</th>

                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Abrechnung;