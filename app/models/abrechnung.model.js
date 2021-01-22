const connection = require("./index");

//constructor
const Abrechnung = function(abrechnung) {
    this.r_bezeichnung = abrechnung.r_bezeichnung;
    this.angebotid = abrechnung.angebotid;
    this.startzeitpunkt = abrechnung.startzeitpunkt;
    this.endzeitpunkt = abrechnung.endzeitpunkt;
    this.maxTE_Zahl = abrechnung.maxTE_Zahl;
    this.leistung = abrechnung.leistung;
    this.zugangsart = abrechnung.zugangsart;
};

//Für Abrechnungsanzeige Manager
Abrechnung.getAllManager = result => {
    connection.query("SELECT Angebot.AnfrageID, Angebot.VeranstaltungID, Veranstaltung.RaumID, User.Rolle, Veranstaltung.UserID, Raum.R_Bezeichnung, Veranstaltung.Startzeitpunkt, Veranstaltung.Endzeitpunkt, Veranstaltung.maxTE_Zahl, Angebot.Leistung, Veranstaltung.Zugangsart, Angebot.A_Preis FROM (((Angebot INNER JOIN Anfrage on Angebot.AnfrageID = Anfrage.AnfrageID) INNER JOIN Veranstaltung ON Angebot.VeranstaltungID = Veranstaltung.VeranstaltungID) INNER JOIN Raum ON Veranstaltung.RaumID = Raum.RaumID) INNER JOIN User ON Veranstaltung.UserID = User.UserID WHERE User.Rolle = 'Management'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Abrechnung: ", res);
        result(null, res);
    });
};

//Für Abrechnungsanzeige Veranstalter
/*Abrechnung.getAllVeranstalter = result => {
    connection.query("SELECT Angebot.AnfrageID, Angebot.VeranstaltungID, Veranstaltung.RaumID, User.Rolle, Veranstaltung.UserID, RUme.R_Bezeichnung, Veranstaltung.Startzeitpunkt, Veranstaltung.Endzeitpunkt, Veranstaltung.maxTE_Zahl, Angebot.Leistung, Veranstaltung.Zugangsart, Angebot.A_Preis FROM (((Angebot INNER JOIN Anfrage on Angebot.AnfrageID = Anfrage.AnfrageID) INNER JOIN Veranstaltung ON Angebot.VeranstaltungID = Veranstaltung.VeranstaltungID) INNER JOIN RUme ON Veranstaltung.RaumID = RUme.RaumID) INNER JOIN User ON Veranstaltung.UserID = User.UserID WHERE User.Rolle = 'Veranstaltungsanbieter'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Abrechnung: ", res);
        result(null, res);
    });
};*/


module.exports = Abrechnung;