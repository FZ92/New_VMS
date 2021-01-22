const Abrechnung = require("../models/abrechnung.model");



exports.findAllManager = (req, res) => {
    Abrechnung.getAllManager((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
}

  /*  exports.findAllVeranstalter = (req, res) => {
        Abrechnung.getAllVeranstalter((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Error"
                });
            else res.send(data);
        });
}*/
