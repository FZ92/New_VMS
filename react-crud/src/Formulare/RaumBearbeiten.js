import React, { Component } from "react";
import DataService from "../services/raum.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = value => {
    if(!value) {
        return(
            <div className="alert alert-danger" role="alert">
                Pflichtfeld!
            </div>
        );
    }
};

const Kapazitaet = value => {
    if ((value <= 0) && (value >= 3000)) {
        return (
            <div className="alert alert-danger" role="alert">
                Kapazität muss zwischen 1 und 3000
            </div>
        );
    }
};

const R_Bezeichnung = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Bezeichnung muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }
};

const R_Preis = value => {
    if (value <= 0) {
        return (
            <div className="alert alert-danger" role="alert">
                Preis muss größer als 0 sein!
            </div>
        );
    }
};

const Barrierefreiheit = value => {
    if (value !== ("0" && "1")) {
        return (
            <div className="alert alert-danger" role="alert">
                Bitte 1 für barrierefrei oder 0 für nicht barrierefrei angeben
            </div>
        );
    }
};

export class RaumBearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.getRaum = this.getRaum.bind(this);
        //this.updateRaum = this.updateRaum.bind(this);
        this.onChangeKapazitaet = this.onChangeKapazitaet.bind(this);
        this.onChangeR_Bezeichnung = this.onChangeR_Bezeichnung.bind(this);
        this.onChangeR_Preis = this.onChangeR_Preis.bind(this);
        this.onChangeBarrierefreiheit = this.onChangeBarrierefreiheit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            currentRaum: {
                RaumID: null,
                Kapazitaet: "",
                R_Bezeichnung: "",
                R_Preis: "",
                Barrierefreiheit: null,
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

    handleRegister(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {

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
            alert("Raum erfolgreich bearbeitet!")
            this.props.history.push("/Räume/")
        }
    }


    render() {
        const {currentRaum} = this.state;
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="Kapazitaet">Kapazität</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Kapazitaet"
                                        value={currentRaum.Kapazitaet}
                                        onChange={this.onChangeKapazitaet}
                                        validations={[required, Kapazitaet]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="R_Bezeichnung">Bezeichnung</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="R_Bezeichnung"
                                        value={currentRaum.R_Bezeichnung}
                                        onChange={this.onChangeR_Bezeichnung}
                                        validations={[required, R_Bezeichnung]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="R_Preis">Preis</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="R_Preis"
                                        value={currentRaum.R_Preis}
                                        onChange={this.onChangeR_Preis}
                                        validations={[required, R_Preis]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Barrierefreiheit">Barrierefreiheit</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Barrierefreiheit"
                                        value={currentRaum.Barrierefreiheit}
                                        onChange={this.onChangeBarrierefreiheit}
                                        validations={[required, Barrierefreiheit]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Raum bearbeiten</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
export default RaumBearbeiten;