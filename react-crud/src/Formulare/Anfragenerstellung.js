import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import DataService from "../services/anfrage.service";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";


const required = value => {
    if(!value) {
        return(
            <div className="alert alert-danger" role="alert">
                Pflichtfeld!
            </div>
        );
    }
};

const Bezeichnung = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Bezeichnung muss zwischen 2 und 30 Zeichen lang sein
            </div>
        );
    }
};

const Startdatum = value => {
    if (value === null) {
        return (
            <div className="alert alert-danger" role="alert">
                Bitte ein Startdatum angeben!
            </div>
        );
    }
};

const Enddatum = value => {
    if (value === null) {
        return (
            <div className="alert alert-danger" role="alert">
                Bitte ein Enddatum angeben!
            </div>
        );
    }
};

const Teilnehmerzahl = value => {
    if (value.length < 1 || value.length > 3000) {
        return (
            <div className="alert alert-danger" role="alert">
                Teilnehmerzahl muss zwischen 1 und 3000 sein
            </div>
        );
    }
};

const Zusatzleistungen = value => {
    if(value.length < 0) {
        return(
        <div>
        Bitte Zusatzleistungen wie z. B. Beamer, etc. eintragen. Bei keiner gewünschten Leistung "Nein" eintragen;
        </div>
        )
    }

}

const Zugang = value => {
    if (value !== ("Offen" && "Geschlossen")) {
        return (
            <div className="alert alert-danger" role="alert">
                Bitte Zugangsart Offen oder Geschlossen eingeben
            </div>
        );
    }
};

const Kosten = value => {
    if (value < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                Bei kostenloser Veranstaltung bitte 0 eintragen!
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

// Erstellung einer Anfrage
export class Anfragenerstellung extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeBezeichnung = this.onChangeBezeichnung.bind(this);
        this.onChangeStartdatum = this.onChangeStartdatum.bind(this);
        this.onChangeEnddatum = this.onChangeEnddatum.bind(this);
        this.onChangeTeilnehmerzahl = this.onChangeTeilnehmerzahl.bind(this);
        this.onChangeZusatzleistungen = this.onChangeZusatzleistungen.bind(this);
        this.onChangeZugang = this.onChangeZugang.bind(this);
        this.onChangeKosten = this.onChangeKosten.bind(this);
        this.onChangeBarrierefreiheit = this.onChangeBarrierefreiheit.bind(this);


        this.state = {
            Bezeichnung: "",
            Startdatum: "",
            Enddatum: "",
            Teilnehmerzahl: "",
            Zusatzleistungen: "",
            Zugang: "",
            Kosten: "",
            Barrierefreiheit: "",
            UserID: "",
            successful: false,
            message: ""
        };

        this.state2 = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    onChangeBezeichnung(e) {
        this.setState({
            Bezeichnung: e.target.value
        });
    }

    onChangeStartdatum(e) {
        this.setState({
            Startdatum: e.target.value
        });
    }

    onChangeEnddatum(e) {
        this.setState({
            Enddatum: e.target.value
        });
    }

    onChangeTeilnehmerzahl(e) {
        this.setState({
            Teilnehmerzahl: e.target.value
        });
    }

    onChangeZusatzleistungen(e) {
        this.setState({
            Zusatzleistungen: e.target.value
        });
    }

    onChangeZugang(e) {
        this.setState({
            Zugang: e.target.value
        });
    }

    onChangeKosten(e) {
        this.setState({
            Kosten: e.target.value
        });
    }

    onChangeBarrierefreiheit(e) {
        this.setState({
            Barrierefreiheit: e.target.value
        });
    }

    componentDidMount() {

    }



        handleRegister(e) {
            e.preventDefault();
            this.setState({
                message: "",
                successful: false
            });

            this.form.validateAll();

            if (this.checkBtn.context._errors.length === 0) {
                const data = {
                    Bezeichnung: this.state.Bezeichnung,
                    Startdatum: this.state.Startdatum,
                    Enddatum: this.state.Enddatum,
                    Teilnehmerzahl: this.state.Teilnehmerzahl,
                    Zusatzleistungen: this.state.Zusatzleistungen,
                    Zugang: this.state.Zugang,
                    Kosten: this.state.Kosten,
                    Barrierefreiheit: this.state.Barrierefreiheit,
                    UserID: this.state2.currentUser.UserID
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
                    UserID: response.data.UserID,
                    message: response.data.message,
                    successful: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                const resMessage =
                    (e.response &&
                        e.response.data &&
                        e.response.data.message) ||
                    e.message ||
                    e.toString();
                this.setState({
                    successful: false,
                    message: resMessage
                })
            })
                alert("Anfrage erfolgreich erstellt!")
                this.props.history.push("/Anfragenverwaltung/")}
        }




    render() {
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
                                    <label htmlFor="Bezeichnung">Bezeichnung</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Bezeichnung"
                                        value={this.state.Bezeichnung}
                                        onChange={this.onChangeBezeichnung}
                                        validations={[required, Bezeichnung]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Startdatum">Startdatum</label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        name="enddatum"
                                        value={this.state.Startdatum}
                                        onChange={this.onChangeStartdatum}
                                        validations={[required, Startdatum]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Enddatum">Startdatum</label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        name="enddatum"
                                        value={this.state.Enddatum}
                                        onChange={this.onChangeEnddatum}
                                        validations={[required, Enddatum]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="teilnehmerzahl">Teilnehmerzahl</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="teilnehmerzahl"
                                        value={this.state.Teilnehmerzahl}
                                        onChange={this.onChangeTeilnehmerzahl}
                                        validations={[required, Teilnehmerzahl]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zusatzleistungen">Zusatzleistungen</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="zusatzleistung"
                                        value={this.state.Zusatzleistungen}
                                        onChange={this.onChangeZusatzleistungen}
                                        validations={[required, Zusatzleistungen]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zugang">Zugang</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="zugang"
                                        value={this.state.Zugang}
                                        onChange={this.onChangeZugang}
                                        validations={[required, Zugang]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kosten">Kosten</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="kosten"
                                        value={this.state.Kosten}
                                        onChange={this.onChangeKosten}
                                        validations={[required, Kosten]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="barrierefreiheit">Barrierefreiheit</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="barrierefreiheit"
                                        value={this.state.Barrierefreiheit}
                                        onChange={this.onChangeBarrierefreiheit}
                                        validations={[required, Barrierefreiheit]}
                                    />
                                </div>



                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Anfrage stellen</button>
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
                            style={{ display: "none" }}
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

export default Anfragenerstellung;