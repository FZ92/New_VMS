const connection = require("./index");

const today = new Date();

// constructor
const User = function(user) {
    this.Email = user.Email;
    this.Passwort = user.Passwort;
    this.Vorname = user.Vorname;
    this.Nachname = user.Nachname;
    this.Firma = user.Firma;
    this.Ort = user.Ort;
    this.PLZ = user.PLZ;
    this.Strasse = user.Strasse;
    this.Telefonnummer = user.Telefonnummer;
    this.Rolle = user.Rolle;
    this.Anlegedatum = user.Anlegedatum;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO User SET ? ", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created User: ", { UserID: res.insertId, ...newUser });
        result(null, { UserID: res.insertId, ...newUser });
    });
};

User.count = result => {
    connection.query("Select count(*) from User", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Anzahl: ", res);
        result(res);
    });
};



User.findById = (UserID, result) => {
    connection.query(`SELECT * FROM User WHERE UserID = "${UserID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    connection.query("SELECT * FROM User", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
};

User.updateById = (UserID, User, result) => {
    connection.query(
        `UPDATE User SET Email = ?, Passwort = ?, Vorname = ?, Nachname = ?, Firma = ?, Ort = ?, PLZ = ?, Strasse = ?, Telefonnummer = ?, Rolle = ?, Aenderungsdatum  = ? WHERE UserID = ${UserID}`,
        [User.Email, User.Passwort, User.Vorname, User.Nachname, User.Firma, User.Ort, User.PLZ, User.Strasse, User.Telefonnummer, User.Rolle, today, User.UserID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated User: ", { UserID: UserID, ...User });
            result(null, { UserID: UserID, ...User });
        }
    );
};

User.remove = (UserID, result) => {
    connection.query("DELETE FROM User WHERE UserID = ?", UserID, (err, res) => {
        //connection.query("DELETE FROM User WHERE UserID = ?", UserID,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted User with id: ", UserID);
        result(null, res);
    });
};

/*User.removeAll = result => {
    connection.query("DELETE FROM User", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} User`);
        result(null, res);
    });
};*/

User.getMail = result => {
    connection.query("SELECT Email, Passwort FROM User WHERE Email = ${Email}", (err, res) => {
        if(err) {
            console.log("err: Falsche Mail", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found Email: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the Email
        result({ kind: "not_found" }, null);
    });
}

User.getPasswort = result => {
    connection.query("SELECT * FROM User WHERE Passwort = ${Passwort}", (err, res) => {
        if(err) {
            console.log("err: Falsches Passwort", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found Passwort: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the Passwort
        result({ kind: "not_found" }, null);
    });
}

User.getRolle = result => {
    connection.query(`SELECT Rolle From User Where Email=${Email}`, (err, res) => {
        if(err) {
            console.log("err: Keine Rolle", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Rolle gefunden: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the Passwort
        result({ kind: "not_found" }, null);
    });
}

User.getMailPW = (Email, Passwort, result) => {
    connection.query(`SELECT * FROM User WHERE Email = "${Email}"`, (err, res) => {
        if(err) {
            console.log("err: Falsche Mail", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found Email: ", res[0]);
            result(null, res[0]);
            console.log("Fehler 7");
            return;
        }

        // not found User with the Email
        result({ kind: "not_found" }, null);
    });
}
module.exports = User;
