import React, { Component } from "react";
import DataService from "../services/raum.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup} from "react-bootstrap";

export class RaumBearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.getRaum = this.getRaum.bind(this);
        this.updateRaum = this.updateRaum.bind(this);
        this.onChangeKapazitaet = this.onChangeKapazitaet.bind(this);
        this.onChangeR_Bezeichnung = this.onChangeR_Bezeichnung.bind(this);
        this.onChangeR_Preis = this.onChangeR_Preis.bind(this);
        this.onChangeBarrierefreiheit = this.onChangeBarrierefreiheit.bind(this);
        this.state = {
            currentRaum: {
                RaumID: null,
                Kapazitaet: "",
                R_Bezeichnung: "",
                R_Preis: "",
                Barrierefreiheit: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getRaum(this.props.match.params.RaumID);
    }

    onChangeKapazitaet(e) {
        const Kapazitaet = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRaum: {
                    ...prevState.currentRaum,
                    Kapazitaet: Kapazitaet
                }
            };
        });
    }

    onChangeR_Bezeichnung(e) {
        const R_Bezeichnung = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRaum: {
                    ...prevState.currentRaum,
                    R_Bezeichnung: R_Bezeichnung
                }
            };
        });
    }

    onChangeR_Preis(e) {
        const R_Preis = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRaum: {
                    ...prevState.currentRaum,
                    R_Preis: R_Preis
                }
            };
        });
    }

    onChangeBarrierefreiheit(e) {
        const Barrierefreiheit = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRaum: {
                    ...prevState.currentRaum,
                    Barrierefreiheit: Barrierefreiheit
                }
            };
        });
    }

    getRaum(RaumID) {
        DataService.get(RaumID)
            .then(response => {
                this.setState({
                    currentRaum: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateRaum() {
        DataService.update(
            this.state.currentRaum.RaumID,
            this.state.currentRaum
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Räume was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentRaum } = this.state;

        return (
            <div className="RaumBearbeiten">
                <header className="RaumBearbeiten-header">
                    <Form>

                        <Form.Group controlId="kapazitaet">
                            <Form.Label>Kapazität</Form.Label>
                            <Form.Control type="number" min="1" max="10000" className="form-control"
                                          value={currentRaum.Kapazitaet} onChange={this.onChangeKapazitaet}/>
                        </Form.Group>

                        <Form.Group controlId="r_bezeichnung">
                            <Form.Label>Raumname</Form.Label>
                            <Form.Control type="text" className="form-control"
                                          value={currentRaum.R_Bezeichnung} onChange={this.onChangeR_Bezeichnung}/>
                        </Form.Group>

                        <Form.Group controlId="r_preis">
                            <Form.Label>Raumpreis pro Tag</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control type="number" min="1" max="10000" className="form-control"
                                          value={currentRaum.R_Preis} onChange={this.onChangeR_Preis}/>
                            <InputGroup.Append>
                                <InputGroup.Text>€</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="barrierefreiheit">
                            <Form.Label>Barrierefreiheit</Form.Label>
                            <Form.Control as="select" value={currentRaum.Barrierefreiheit}  onChange={this.onChangeBarrierefreiheit}>
                                <option value= {0}>nicht barrierefrei</option>
                                <option value= {1}>barrierefrei</option>
                            </Form.Control>
                        </Form.Group>

                        <Button href="/Räume" variant="success" type="submit" onClick={() => {this.updateRaum(); alert("Raum erfolgreich bearbeitet!")}}>
                            Raum bearbeiten
                        </Button>
                        <Button href="/Räume" variant="danger" type="submit">
                            Abbrechen
                        </Button>
                    </Form>
                </header>
            </div>
        );
    }
}
export default RaumBearbeiten;