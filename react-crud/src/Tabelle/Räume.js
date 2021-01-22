import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "react-bootstrap";
import DataService from "../services/raum.service";

//Räume
export class Räume extends React.Component {
    constructor(props) {
        super(props);
        this.setActiveRaum = this.setActiveRaum.bind(this);
        this.retrieveRäume = this.retrieveRäume.bind(this);

        this.state = {
            raeume: [],
            currentRaum: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveRäume();
    }

    retrieveRäume() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    raeume: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveRaum(raum, index) {
        this.setState({
            currentRaum: raum,
            currentIndex: index
        });
        this.props.history.push("/RaumBearbeiten/" + raum.RaumID)
    }

    setBarrierefreiheit(raum) {
        if (raum.Barrierefreiheit === 0) {
            var barrierefrei = "nicht barrierefrei"
        } else barrierefrei = "barrierefrei";
        return barrierefrei;
    }

    renderTableData() {

        const {raeume} = this.state;//destructuring

        return (
            <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                    <tr>
                        <th>Bezeichnung</th>
                        <th>Kapazität</th>
                        <th>Fläche</th>
                        <th>Stockwerk</th>
                        <th>Preis</th>
                        <th>Barrierefreiheit</th>
                        <th>Bearbeiten</th>
                    </tr>
                        </thead>
                        <tbody>
                        {raeume && raeume.map((raum, index) => (
                    <tr key={index}>
                        <td>{raum.R_Bezeichnung}</td>
                        <td>{raum.Kapazitaet}</td>
                        <td>{raum.Flaeche} m²</td>
                        <td>{raum.Stockwerk}</td>
                        <td>{raum.R_Preis} €</td>
                        <td>{this.setBarrierefreiheit(raum, index)}</td>
                        <td><Button variant="primary" onClick={() => {
                            this.setActiveRaum(raum, index)
                        }}>Bearbeiten</Button></td>
                    </tr>
                    ))}</tbody>
                    </Table>

            </div>
        )

    }

    render() {
        return (
            <div className='m-5'>
                <h3>Räume</h3>
{this.renderTableData()}

            </div>
        );
    }
}

export default Räume;