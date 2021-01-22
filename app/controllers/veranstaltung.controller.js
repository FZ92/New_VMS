const Veranstaltung = require("../models/veranstaltung.model");
// Create and Save a new Veranstaltung
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const veranstaltung = new Veranstaltung ({
        Startzeitpunkt: req.body.Startzeitpunkt,
        Endzeitpunkt: req.body.Endzeitpunkt,
        Dauer: req.body.Dauer,
        V_Beschreibung: req.body.V_Beschreibung,
        V_Bezeichnung: req.body.V_Bezeichnung,
        Dozent: req.body.Dozent,
        TE_Preis: req.body.TE_Preis,
        Zugangsart: req.body.Zugangsart,
        maxTE_Zahl: req.body.maxTE_Zahl,
        Status: req.body.Status,
    });
    Veranstaltung.create(veranstaltung, (err, data) => {
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
    Veranstaltung.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Find a single Veranstaltung with an id
exports.findOne = (req, res) => {
    Veranstaltung.findById(req.params.VeranstaltungID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Veranstaltung with id ${req.params.VeranstaltungID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Veranstaltung with id " + req.params.VeranstaltungID
                });
            }
        } else res.send(data);
    });
};

// Update a Veranstaltung by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Veranstaltung.updateById(
        req.params.VeranstaltungID,
        new Veranstaltung(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.VeranstaltungID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Veranstaltung with id " + req.params.VeranstaltungID
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Veranstaltung with the specified id in the request
exports.delete = (req, res) => {
    Veranstaltung.remove(req.params.VeranstaltungID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Veranstaltung with id ${req.params.VeranstaltungID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Veranstaltung with id " + req.params.VeranstaltungID
                });
            }
        } else res.send({ message: `Veranstaltungs was deleted successfully!` });
    });
};


