module.exports = app => {
    const Veranstaltungsuebersicht = require("../controllers/veranstaltungsuebersicht.controller.js");


    // Create a new Veranstaltungsuebersicht!
    app.post("/Veranstaltungsuebersicht", Veranstaltungsuebersicht.create);

    // Retrieve all Veranstaltungsuebersichten
    app.get("/Veranstaltungsuebersicht", Veranstaltungsuebersicht.findAll);

    // Retrieve a single Veranstaltungsuebersicht with datum
    app.get("/Veranstaltungsuebersicht/:Datum", Veranstaltungsuebersicht.findOne);

    // Update a Veranstaltungsuebersicht with datum
    app.put("/Veranstaltungsuebersicht/:Datum", Veranstaltungsuebersicht.update);

    // Delete a Veranstaltungsuebersicht with datum
    app.delete("/Veranstaltungsuebersicht/:Datum", Veranstaltungsuebersicht.delete);

    // Delete all Veranstaltungsuebersichten
    app.delete("/Veranstaltungsuebersicht", Veranstaltungsuebersicht.deleteAll);
};