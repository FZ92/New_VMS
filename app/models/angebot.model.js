const connection = require("./index");


// constructor
const Angebot = function(angebot) {
    this.A_Preis = angebot.A_Preis;
    this.Leistung = angebot.Leistung;
    this.UserID = angebot.UserID;
    this.VeranstaltungID = angebot.VeranstaltungID;
    this.AnfrageID = angebot.AnfrageID;
};

Angebot.create = (newAngebot, result) => {
    connection.query("INSERT INTO Angebot SET ?", newAngebot, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Angebot: ", { AngebotID: res.insertId, ...newAngebot });
        result(null, { AngebotID: res.insertId, ...newAngebot });
    });
};

Angebot.findById = (AngebotID, result) => {
    connection.query(`SELECT * FROM ANGEBOT WHERE AngebotID = ${AngebotID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Angebot: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Angebot with the id
        result({ kind: "not_found" }, null);
    });
};

Angebot.getAll = result => {
    connection.query("SELECT * FROM Angebot", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Angebot: ", res);
        result(null, res);
    });
};

Angebot.updateById = (AngebotID, Angebot, result) => {
    connection.query(
        "UPDATE User SET A_Preis = ?, Leistung = ?, UserID = ?, VeranstaltungID = ?, AnfrageID = ? WHERE AngebotID = ?",
        [Angebot.A_Preis, Angebot.Leistung, Angebot.UserID, Angebot.VeranstaltungID, Angebot.AnfrageID, Angebot.AngebotID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Angebot with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Angebot: ", { AngeboID: AngebotID, ...Angebot });
            result(null, { AngebotID: AngebotID, ...Angebot });
        }
    );
};

Angebot.remove = (id, result) => {
    connection.query("DELETE FROM Angebot WHERE AngebotID = ?", AngebotID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Angebot with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Angebot with id: ", AngebotID);
        result(null, res);
    });
};

Angebot.removeAll = result => {
    connection.query("DELETE FROM Angebot", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Angebot`);
        result(null, res);
    });
};

module.exports = Angebot;
