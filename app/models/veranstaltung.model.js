const connection = require("./index");


// constructor
const Veranstaltung = function(veranstaltung) {
    this.VeranstaltungID = veranstaltung.VeranstaltungID;
    this.Startzeitpunkt = veranstaltung.Startzeitpunkt;
    this.Endzeitpunkt = veranstaltung.Endzeitpunkt;
    this.Dauer = veranstaltung.Dauer;
    this.V_Beschreibung = veranstaltung.V_Beschreibung;
    this.V_Bezeichnung = veranstaltung.V_Bezeichnung;
    this.Dozent = veranstaltung.Dozent;
    this.TE_Preis = veranstaltung.TE_Preis;
    this.Zugangsart = veranstaltung.Zugangsart;
    this.maxTE_Zahl = veranstaltung.maxTE_Zahl;
    this.Status = veranstaltung.Status;
    this.RaumID = veranstaltung.RaumID;
    this.UserID = veranstaltung.UserID;
};

Veranstaltung.create = (newVeranstaltung, result) => {
    connection.query("INSERT INTO Veranstaltung SET ?", newVeranstaltung, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Veranstaltung: ", { VeranstaltungID: res.insertId, ...newVeranstaltung });
        result(null, { VeranstaltungID: res.insertId, ...newVeranstaltung });
    });
};

Veranstaltung.findById = (VeranstaltungID, result) => {
    connection.query(`SELECT * FROM Veranstaltung WHERE VeranstaltungID = ${VeranstaltungID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Veranstaltung: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Veranstaltung with the id
        result({ kind: "not_found" }, null);
    });
};

Veranstaltung.getAll = result => {
    connection.query("SELECT * FROM Veranstaltung INNER JOIN Raum ON Veranstaltung.RaumID = Raum.RaumID INNER JOIN User ON Veranstaltung.UserID = User.UserID", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Veranstaltung: ", res);
        result(null, res);
    });
};

Veranstaltung.updateById = (VeranstaltungID, Veranstaltung, result) => {
    connection.query(
        `UPDATE Veranstaltung SET Startzeitpunkt = ?, Endzeitpunkt = ?, Dauer = ?, V_Beschreibung = ?, V_Bezeichnung = ?, Dozent = ?, TE_Preis = ?, Zugangsart = ?, maxTE_Zahl = ?, Status = ?, RaumID = ?, UserID = ? WHERE VeranstaltungID = ${VeranstaltungID}`,
        [Veranstaltung.Startzeitpunkt, Veranstaltung.Endzeitpunkt, Veranstaltung.Dauer, Veranstaltung.V_Beschreibung, Veranstaltung.V_Bezeichnung, Veranstaltung.Dozent, Veranstaltung.TE_Preis, Veranstaltung.Zugangsart, Veranstaltung.maxTE_Zahl, Veranstaltung.Status, Veranstaltung.RaumID, Veranstaltung.UserID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Veranstaltung with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Veranstaltung: ", { VeranstaltungID: VeranstaltungID, ...Veranstaltung });
            result(null, { VeranstaltungID: VeranstaltungID, ...Veranstaltung });
        }
    );
};

Veranstaltung.remove = (VeranstaltungID, result) => {
    connection.query("DELETE FROM Veranstaltung WHERE VeranstaltungID = ?", VeranstaltungID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Veranstaltung with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Veranstaltung with id: ", VeranstaltungID);
        result(null, res);
    });
};



module.exports = Veranstaltung;
