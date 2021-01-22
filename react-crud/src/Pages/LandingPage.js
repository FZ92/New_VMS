import React, { Component } from "react";


import DataService from "../services/AlleVeranstaltungen.service";
import {Table} from "react-bootstrap";

export class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            veranstaltungen: [],
            count: null,
            searchTitle: ""
        };
        this.retrieveVeranstaltungen = this.retrieveVeranstaltungen.bind(this);

    }

    componentDidMount() {
        this.retrieveVeranstaltungen();
    }
    retrieveVeranstaltungen() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    veranstaltungen: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    renderTableData() {
        return this.state.veranstaltungen.map((veranstaltungen, index) => {
            const { VeranstaltungID, Startzeitpunkt, Endzeitpunkt, Dauer, V_Beschreibung, V_Bezeichnung, Dozent, TE_Preis, Zugangsart,
                maxTE_Zahl, Status} = veranstaltungen //destructuring
            return (
                <tr key={VeranstaltungID}>
                    <td>{V_Bezeichnung}</td>
                    <td>{Startzeitpunkt}</td>
                    <td>{Endzeitpunkt}</td>
                    <td>{Dauer}</td>
                    <td>{V_Beschreibung}</td>
                    <td>{Dozent}</td>
                    <td>{TE_Preis} €</td>
                    <td>{Zugangsart}</td>
                    <td>{maxTE_Zahl}</td>
                </tr>
            )
        })
    }
    render() {
        return (

            <div className='m-5'>
                <h3>Alle Veranstaltungen</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>

                        <th>Bezeichnung</th>
                        <th>Startzeitpunkt</th>
                        <th>Endzeitpunkt</th>
                        <th>Dauer</th>
                        <th>Beschreibung</th>
                        <th>Dozent</th>
                        <th>Preis</th>
                        <th>Zugangsart</th>
                        <th>Maximale Teilnehmerzahl</th>
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
export default LandingPage;
