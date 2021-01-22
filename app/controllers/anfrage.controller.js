const Anfrage = require("../models/anfrage.model");
// Create and Save a new Anfrage
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const anfrage = new Anfrage ({
        Bezeichnung: req.body.Bezeichnung,
        Startdatum: req.body.Startdatum,
        Enddatum: req.body.Enddatum,
        Teilnehmerzahl: req.body.Teilnehmerzahl,
        Zusatzleistungen: req.body.Zusatzleistungen,
        Zugang: req.body.Zugang,
        Kosten: req.body.Kosten,
        Barrierefreiheit: req.body.Barrierefreiheit,
        UserID: req.body.UserID,
    });
    Anfrage.create(anfrage, (err, data) => {
        if (err)
            res.status(500).send( {
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });

};

// Retrieve all Anfragen from the database.
exports.findAll = (req, res) => {
    Anfrage.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Retrieve all Anfragen and connected User from the database.
exports.findAllAndUser = (req, res) => {
    Anfrage.getAllAndUser((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};

// Find a single Anfrage with an id
exports.findOne = (req, res) => {
    Anfrage.findById(req.params.AnfrageID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Anfrage with id ${req.params.AnfrageID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Anfrage with id " + req.params.AnfrageID
                });
            }
        } else res.send(data);
    });
};

// Update a Anfrage by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Anfrage.updateById(
        req.params.AnfrageID, new Anfrage(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Anfrage with id ${req.params.AnfrageID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Anfrage with id " + req.params.AnfrageID
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Anfrage with the specified id in the request
exports.delete = (req, res) => {
    Anfrage.remove(req.params.AnfrageID, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Anfrage with id ${req.params.AnfrageID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Anfrage with id " + req.params.AnfrageID
                });
            }
        } else res.send({ message: `Anfrage was deleted successfully!` });
    });
};

// Delete all Anfragen from the database.
exports.deleteAll = (req, res) => {
    Anfrage.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Anfragen."
            });
        else res.send({ message: `All Anfragen were deleted successfully!` });
    });
};
