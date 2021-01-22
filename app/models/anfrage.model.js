const connection = require("./index");


// constructor
const Anfrage = function(anfrage) {
    this.Bezeichnung = anfrage.Bezeichnung;
    this.Startdatum = anfrage.Startdatum;
    this.Enddatum = anfrage.Enddatum;
    this.Teilnehmerzahl = anfrage.Teilnehmerzahl;
    this.Zusatzleistungen = anfrage.Zusatzleistungen;
    this.Zugang = anfrage.Zugang;
    this.Kosten = anfrage.Kosten;
    this.Barrierefreiheit = anfrage.Barrierefreiheit;
    this.UserID = anfrage.UserID;
};

Anfrage.create = (newAnfrage, result) => {
    connection.query("INSERT INTO Anfrage SET ? ", newAnfrage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Anfrage: ", { id: res.insertId, ...newAnfrage });
        result(null, { id: res.insertId, ...newAnfrage });
    });
};

Anfrage.findById = (AnfrageID, result) => {
    connection.query(`SELECT * FROM Anfrage WHERE AnfrageID = "${AnfrageID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Anfrage: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Anfrage with the id
        result({ kind: "not_found" }, null);
    });
};

Anfrage.getAll = result => {
    connection.query("SELECT * FROM Anfrage", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Anfrage: ", res);
        result(null, res);
    });
};

Anfrage.getAllAndUser = result => {
    connection.query(`SELECT * FROM Anfrage INNER JOIN User ON User.UserID = Anfrage.UserID`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("AnfrageAndUser: ", res);
        result(null, res);
    });
};

Anfrage.updateById = (AnfrageID, Anfrage, result) => {
    connection.query(
        `UPDATE Anfrage SET Bezeichnung = ?, Startdatum = ?, Enddatum = ?, Teilnehmerzahl = ?, Zusatzleistungen = ?, Zugang = ?, Kosten = ?, Barrierefreiheit = ? WHERE AnfrageID = ${AnfrageID}`,
        [Anfrage.Bezeichnung, Anfrage.Startdatum, Anfrage.Enddatum, Anfrage.Teilnehmerzahl, Anfrage.Zusatzleistungen, Anfrage.Zugang, Anfrage.Kosten, Anfrage.Barrierefreiheit, Anfrage.AnfrageID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Anfrage with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Anfrage: ", { AnfrageID: AnfrageID, ...Anfrage });
            result(null, { AnfrageID: AnfrageID, ...Anfrage });
        }
    );
};

Anfrage.remove = (AnfrageID, result) => {
    connection.query("DELETE FROM Anfrage WHERE AnfrageID = ?", AnfrageID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Anfrage with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Anfrage with id: ", AnfrageID);
        result(null, res);
    });
};

Anfrage.removeAll = result => {
    connection.query("DELETE FROM Anfrage", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Anfrage`);
        result(null, res);
    });
};

module.exports = Anfrage;
