module.exports = app => {
    const Angebot = require("../controllers/angebot.controller.js");


    // Create a new Angebot!
    app.post("/Angebot", Angebot.create);

    // Retrieve all Angebote
    app.get("/Angebot", Angebot.findAll);

    // Retrieve a single Angebot with id
    app.get("/Angebot/:AngebotID", Angebot.findOne);

    // Update a Angebot with id
    app.put("/Angebot/:AngebotID", Angebot.update);

    // Delete a Angebot with id
    app.delete("/Angebot/:AngebotID", Angebot.delete);

    // Delete all Angebote
    app.delete("/Angebot", Angebot.deleteAll);
};