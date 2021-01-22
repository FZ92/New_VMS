const connection = require("./index");


// constructor
const Raum = function(raum) {
    this.Kapazitaet = raum.Kapazitaet;
    this.Flaeche = raum.Flaeche;
    this.R_Bezeichnung = raum.R_Bezeichnung;
    this.Stockwerk = raum.Stockwerk;
    this.R_Preis = raum.R_Preis;
    this.Barrierefreiheit = raum.Barrierefreiheit;
};

Raum.findById = (RaumID, result) => {
    connection.query(`SELECT * FROM Raum WHERE RaumID = "${RaumID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found RUme: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found RUme with the id
        result({ kind: "not_found" }, null);
    });
};

Raum.getAll = result => {
    connection.query("SELECT * FROM Raum", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("RUme: ", res);
        result(null, res);
    });
};

Raum.updateById = (RaumID, Raum, result) => {
    connection.query(
        `UPDATE Raum SET Kapazitaet=?, R_Bezeichnung=?, R_Preis=?, Barrierefreiheit = ? WHERE RaumID ="${RaumID}"`,
        [Raum.Kapazitaet, Raum.R_Bezeichnung, Raum.R_Preis, Raum.Barrierefreiheit, Raum.RaumID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found RUme with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated RUme: ", { RaumID: RaumID, ...Raum });
            result(null, { RaumID: RaumID, ...Raum });
        }
    );
};



module.exports = Raum;