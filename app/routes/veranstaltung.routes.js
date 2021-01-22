module.exports = app => {
    const Veranstaltung = require("../controllers/veranstaltung.controller.js");


    // Create a new Veranstaltung!
    app.post("/Veranstaltung", Veranstaltung.create);

    // Retrieve all Veranstaltungen
    app.get("/Veranstaltung", Veranstaltung.findAll);

    // Retrieve a single Veranstaltung with id
    app.get("/Veranstaltung/:VeranstaltungID", Veranstaltung.findOne);

    // Update a Veranstaltung with id
    app.put("/Veranstaltung/:VeranstaltungID", Veranstaltung.update);

    // Delete a Veranstaltung with id
    app.delete("/Veranstaltung/:VeranstaltungID", Veranstaltung.delete);


};