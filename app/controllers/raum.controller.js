const Raum = require("../models/raum.model");
// Create and Save a new RUme
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const raum = new Raum ({
        Kapazitaet: req.body.Kapazitaet,
        Flaeche: req.body.Flaeche,
        R_Bezeichnung: req.body.R_Bezeichnung,
        Stockwerk: req.body.Stockwerk,
        R_Preis: req.body.R_Preis,
        Barrierefreiheit: req.body.Barrierefreiheit,
    });
    Raum.create(raum, (err, data) => {
        if (err)
            res.status(500).send( {
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });

};

// Retrieve all RUme from the database.
exports.findAll = (req, res) => {
    Raum.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Find a single RUme with an id
exports.findOne = (req, res) => {
    Raum.findById(req.params.RaumID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Raum with id ${req.params.RaumID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving RUme with id " + req.params.RaumID
                });
            }
        } else res.send(data);
    });
};

// Update a RUme by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Raum.updateById(req.params.RaumID, new Raum(req.body),(err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Raum with id ${req.params.RaumID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating RUme with id " + req.params.RaumID
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a RUme with the specified id in the request
exports.delete = (req, res) => {
    Raum.remove(req.params.RaumID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Raum with id ${req.params.RaumID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete RUme with id " + req.params.RaumID
                });
            }
        } else res.send({ message: `Raum was deleted successfully!` });
    });
};

// Delete all RUme from the database.
exports.deleteAll = (req, res) => {
    Raum.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Rooms."
            });
        else res.send({ message: `All Rooms were deleted successfully!` });
    });
};