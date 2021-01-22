const Veranstaltungsuebersicht = require("../models/veranstaltungsuebersicht.model");
// Create and Save a new Veranstaltungsuebersicht
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const veranstaltungsuebersicht = new Veranstaltungsuebersicht ({
        Blockiert: req.body.Blockiert,
        RaumID: req.body.RaumID,
        VeranstaltungID: req.body.VeranstaltungID,
    });
    Veranstaltungsuebersicht.create(veranstaltungsuebersicht, (err, data) => {
        if (err)
            res.status(500).send( {
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });

};

// Retrieve all Veranstaltungsuebersicht from the database.
exports.findAll = (req, res) => {
    Veranstaltungsuebersicht.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Find a single Veranstaltungsuebersicht with a Datum
exports.findOne = (req, res) => {
    Veranstaltungsuebersicht.findByDatum(req.params.Datum, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Veranstaltungsuebersicht with Datum ${req.params.Datum}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Veranstaltungsuebersicht with Datum " + req.params.Datum
                });
            }
        } else res.send(data);
    });
};

// Update a Veranstaltungsuebersicht by the Datum in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Veranstaltungsuebersicht.updateByDatum(
        req.params.Datum,
        new Veranstaltungsuebersicht(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Veranstaltungsuebersicht with Datum ${req.params.Datum}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Veranstaltungsuebersicht with Datum " + req.params.Datum
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Veranstaltungsuebersicht with the specified Datum in the request
exports.delete = (req, res) => {
    Veranstaltungsuebersicht.remove(req.params.Datum, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Veranstaltungsuebersicht with Datum ${req.params.Datum}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Veranstaltungsuebersicht with Datum " + req.params.Datum
                });
            }
        } else res.send({ message: `Veranstaltungsuebersicht was deleted successfully!` });
    });
};

// Delete all Veranstaltungsuebersicht from the database.
exports.deleteAll = (req, res) => {
    Veranstaltungsuebersicht.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Veranstaltungsuebersicht."
            });
        else res.send({ message: `All Veranstaltungsuebersicht were deleted successfully!` });
    });
};
