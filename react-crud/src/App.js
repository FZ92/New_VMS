import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Router, Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Benutzerverwaltung from './Formulare/Benutzerverwaltung';
import Login from './Components/Login';
import Abrechnung from "./Tabelle/Abrechnung";
import Räume from "./Tabelle/Räume";
import Registrieren from "./Components/Registrieren";
import RegistrierenVeranstalter from "./Components/RegistrierenVeranstalter";
import Anfragen from "./Tabelle/Anfragen";
import {NavDropdown} from "react-bootstrap";
import {Veranstaltungsverwaltung} from "./Tabelle/Veranstaltungsverwaltung";
import {BenutzerAnlegen} from "./Formulare/BenutzerAnlegen";
import {Anfragenerstellung} from "./Formulare/Anfragenerstellung";
import {RaumBearbeiten} from "./Formulare/RaumBearbeiten";
import {BenutzerBearbeiten} from "./Formulare/BenutzerBearbeiten";
import {VeranstaltungBearbeiten} from "./Formulare/VeranstaltungBearbeiten";
import {VeranstaltungAnlegen} from "./Tabelle/VeranstaltungAnlegen";
import AuthService from "./services/auth.service";
import Profil from "./Components/Profil";
import LandingPage from "./Pages/LandingPage";
import BoardAdmin from "./Pages/BoardAdmin";
import BoardManagement from "./Pages/BoardManagement";
import BoardVeranstalter from "./Pages/BoardVeranstalter";
import BoardTeilnehmer from "./Pages/BoardTeilnehmer";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showManagementBoard: false,
      showVeranstalterBoard: false,
      showTeilnehmerBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const res = AuthService.getCurrentUser();
    if (res) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showAdminBoard: res.Rolle.includes("Admin"),
        showManagementBoard: res.Rolle.includes("Management"),
        showVeranstalterBoard: res.Rolle.includes("Veranstalter"),
        showTeilnehmerBoard: res.Rolle.includes("Teilnehmer"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.props.history.push("/LandingPage")
    window.location.reload();

  }

  render() {
    const {currentUser, showAdminBoard, showManagementBoard, showVeranstalterBoard, showTeilnehmerBoard} = this.state;
    return (
        <BrowserRouter>
          <div className="App">

            <header className='mt-3'>
              <h2>Willkommen beim Veranstaltungsmanagement</h2>

              <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                  <div><Nav.Link href="/LandingPage">Home</Nav.Link>
                    {showAdminBoard && (
                        <Nav.Link href="/Admin">AdminPage</Nav.Link>
                    )}
                    {showManagementBoard && (
                        <Nav.Link href="/Management">ManagementPage</Nav.Link>
                    )}
                    {showVeranstalterBoard &&(
                        <Nav.Link href="/Veranstalter">VeranstalterPage</Nav.Link>
                    )}

                    {showTeilnehmerBoard && (
                        <Nav.Link href="/Teilnehmer">TeilnehmerPage</Nav.Link>
                    )}

                  </div>

                  <Nav.Link href="/Abrechnung">Abrechnungsverwaltung</Nav.Link>
                  <Nav.Link href="/Räume">Raumverwaltung</Nav.Link>
                  <Nav.Link href="/Anfragenverwaltung">Anfragenverwaltung</Nav.Link>
                  <Nav.Link href="/Anfragenerstellung">Anfrage stellen</Nav.Link>
                  <NavDropdown title="Veranstaltungsverwaltung" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Veranstaltungsverwaltung">Veranstaltungen verwalten</NavDropdown.Item>
                    <NavDropdown.Item href="/VeranstaltungAnlegen">Veranstaltung anlegen</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Benutzerverwaltung" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Benutzerverwaltung">Benutzer verwalten</NavDropdown.Item>
                    <NavDropdown.Item href="/BenutzerAnlegen">Benutzer anlegen</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Registrieren" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/RegistrierenVeranstalter">Registrierung Veranstalter</NavDropdown.Item>
                    <NavDropdown.Item href="/Registrieren">Registrierung Teilnehmer</NavDropdown.Item>
                  </NavDropdown>
                  {currentUser ? (
                    <div>
                      <Nav.Link href="/Profil">Profil</Nav.Link>
                    </div>
                ) : (
                    <div>
                      <Nav.Link href="/Login">Login</Nav.Link>
                    </div>
                )}

                </Nav>
                <Form inline>
                  <Button variant="outline-info" onClick={this.logOut}>Logout</Button>
                </Form>
              </Navbar>
              <br />
            </header>

            <Switch>
              <Route exact path={["/", "/LandingPage"]} component={LandingPage} />
              <Route exact path="/Abrechnung" component={Abrechnung} />
              <Route exact path="/Räume" component={Räume} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Anfragenverwaltung" component={Anfragen} />
              <Route exact path="/Veranstaltungsverwaltung" component={Veranstaltungsverwaltung} />
              <Route exact path="/Benutzerverwaltung" component={Benutzerverwaltung} />
              <Route exact path="/BenutzerBearbeiten/:UserID" component={BenutzerBearbeiten} />
              <Route exact path="/BenutzerAnlegen" component={BenutzerAnlegen} />
              <Route exact path="/Registrieren" component={Registrieren} />
              <Route exact path="/RegistrierenVeranstalter" component={RegistrierenVeranstalter} />
              <Route exact path="/Anfragenerstellung" component={Anfragenerstellung} />
              <Route exact path="/Raumbearbeiten/:RaumID" component={RaumBearbeiten} />
              <Route exact path="/VeranstaltungBearbeiten/:VeranstaltungID" component={VeranstaltungBearbeiten}/>
              <Route exact path="/VeranstaltungAnlegen" component={VeranstaltungAnlegen}/>
              <Route exact path="/Profil" component={Profil}/>
              <Route exact path="/Admin" component={BoardAdmin}/>
              <Route exact path="/Management" component={BoardManagement}/>
              <Route exact path="/Veranstalter" component={BoardVeranstalter}/>
              <Route exact path="/Teilnehmer" component={BoardTeilnehmer}/>
            </Switch>


          </div>
        </BrowserRouter>
    );
  }
}


