const User = require("../models/user.model");
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const today = new Date();

    const user = new User ({
        Email: req.body.Email,
        Passwort: req.body.Passwort,
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        Firma: req.body.Firma,
        Ort: req.body.Ort,
        PLZ: req.body.PLZ,
        Strasse: req.body.Strasse,
        Telefonnummer: req.body.Telefonnummer,
        Rolle: req.body.Rolle,
        Anlegedatum: today,
        Aenderungsdatum: 0,
        Geloescht: 0
    });
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send( {
                message:
                err.message || "Error"
            });
        else res.send(data);
    });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
User.getAll((err, data) => {
    if(err)
        res.status(500).send({
            message:
            err.message || "Error"
        });
    else res.send(data);
});
};

// Find a single User with an id
exports.findOne = (req, res) => {
    User.findById(req.params.UserID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.UserID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.UserID
                });
            }
        } else res.send(data);
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(req.params.UserID, new User(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.UserID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.UserID
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.remove(req.params.UserID, (err) => {
        console.log(req.params.UserID);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.UserID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.UserID
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};


// Find a single User with an Email
exports.getMail = (req, res) => {
    User.getMail(req.params.Email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with Email ${req.params.Email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with Email " + req.params.Email
                });
            }
        } else res.send(data);
    });
};

//Find a single User with a password
exports.getPasswort = (req, res) => {
    User.getPasswort(req.params.Passwort, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with Passwort ${req.params.Passwort}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with Passwort " + req.params.Passwort
                });
            }
        } else res.send(data);
    });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.managementBoard = (req, res) => {
    res.status(200).send("Management Content.");
};

exports.veranstalterBoard = (req, res) => {
    res.status(200).send("Veranstalter Content.");
};

exports.teilnehmerBoard = (req, res) => {
    res.status(200).send("Teilnehmer Content.");
};

