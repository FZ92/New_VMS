const Angebot = require("../models/angebot.model");
// Create and Save a new Angebot
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const angebot = new Angebot ({
        A_Preis: req.body.A_Preis,
        Leistung: req.body.Leistung,
        UserID: req.body.UserID,
        VeranstaltungID: req.body.VeranstaltungID,
        AnfrageID: req.body.AnfrageID,
    });
    Angebot.create(angebot, (err, data) => {
        if (err)
            res.status(500).send( {
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });

};

// Retrieve all Angebote from the database.
exports.findAll = (req, res) => {
    Angebot.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Find a single Angebot with an id
exports.findOne = (req, res) => {
    Angebot.findById(req.params.AngebotID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Angebot with id ${req.params.AngebotID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Angebot with id " + req.params.AngebotID
                });
            }
        } else res.send(data);
    });
};

// Update a Angebot by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Angebot.updateById(
        req.params.AngebotID,
        new Angebot(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Angebot with id ${req.params.AngebotID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Angebot with id " + req.params.AngebotID
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Angebot with the specified id in the request
exports.delete = (req, res) => {
    Angebot.remove(req.params.AngebotID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Angebot with id ${req.params.AngebotID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Angebot with id " + req.params.AngebotID
                });
            }
        } else res.send({ message: `Angebot was deleted successfully!` });
    });
};

// Delete all Angebote from the database.
exports.deleteAll = (req, res) => {
    Angebot.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Angebote."
            });
        else res.send({ message: `All Angebote were deleted successfully!` });
    });
};
