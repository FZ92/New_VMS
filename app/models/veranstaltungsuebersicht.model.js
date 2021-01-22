const connection = require("../models/index");


// constructor
const Veranstaltungsuebersicht = function(veranstaltungsuebersicht) {
    this.blockiert = veranstaltungsuebersicht.blockiert;
    this.raumID = veranstaltungsuebersicht.raumID;
    this.veranstaltungID = veranstaltungsuebersicht.veranstaltungID;
    this.active = veranstaltungsuebersicht.active;
};

Veranstaltungsuebersicht.create = (newVeranstaltungssuebersicht, result) => {
    connection.query("INSERT INTO Veranstaltungsuebersicht SET ? ", newVeranstaltungssuebersicht, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Veranstaltungsuebersicht: ", { datum: res.insertdatum, ...newVeranstaltungssuebersicht });
        result(null, { datum: res.insertdatum, ...newVeranstaltungssuebersicht });
    });
};

Veranstaltungsuebersicht.findByDatum = (Datum, result) => {
    connection.query(`SELECT * FROM VERANSTALTUNGSUEBERSICHT WHERE Datum = ${Datum}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Veranstaltungsuebersicht: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Veranstaltungsuebersicht with the Datum
        result({ kind: "not_found" }, null);
    });
};

Veranstaltungsuebersicht.getAll = result => {
    connection.query("SELECT * FROM Veranstaltungsuebersicht", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Veranstaltungsuebersicht: ", res);
        result(null, res);
    });
};

Veranstaltungsuebersicht.updateByDatum = (Datum, Veranstaltungsuebersicht, result) => {
    connection.query(
        "UPDATE Veranstaltungsuebersicht SET Blockiert = ?, RaumID = ?, VeranstaltungID = ? WHERE Datum = ?",
        [Veranstaltungsuebersicht.Blockiert, Veranstaltungsuebersicht.RaumID, Veranstaltungsuebersicht.VeranstaltungID, Veranstaltungsuebersicht.Datum],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Veranstaltungsuebersicht with the Datum
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Veranstaltungsuebersicht: ", { Datum: Datum, ...Veranstaltungsuebersicht });
            result(null, { Datum: Datum, ...Veranstaltungsuebersicht });
        }
    );
};

Veranstaltungsuebersicht.remove = (datum, result) => {
    connection.query("DELETE FROM Veranstaltungsuebersicht WHERE Datum = ?", Datum, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Veranstaltungsuebersicht with the Datum
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Veranstaltungsuebersicht with Datum: ", Datum);
        result(null, res);
    });
};

Veranstaltungsuebersicht.removeAll = result => {
    connection.query("DELETE FROM Veranstaltungsuebersicht", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Veranstaltungsuebersicht`);
        result(null, res);
    });
};

module.exports = Veranstaltungsuebersicht;
