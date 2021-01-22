module.exports = app => {
    const Raum = require("../controllers/raum.controller.js");


    // Retrieve all RUme
    app.get("/Raum", Raum.findAll);

    // Retrieve a single RUme with id
    app.get("/Raum/:RaumID", Raum.findOne);

    // Update a RUme with id
    app.put("/Raum/:RaumID", Raum.update);


};