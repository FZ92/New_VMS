module.exports = app => {
    const Anfrage = require("../controllers/anfrage.controller.js");


    // Create a new Anfrage!
    app.post("/Anfrage", Anfrage.create);

    // Retrieve all Anfrage
    //app.get("/Anfrage", Anfrage.findAll);

    // Retrieve all Anfrage and connected User
    app.get("/Anfrage", Anfrage.findAllAndUser);

    // Retrieve a single Anfrage with id
    app.get("/Anfrage/:AnfrageID", Anfrage.findOne);

    // Update a Anfrage with id
    app.put("/Anfrage/:AnfrageID", Anfrage.update);

    // Delete a Anfrage with id
    app.delete("/Anfrage/:AnfrageID", Anfrage.delete);

    // Delete all Anfragen
    app.delete("/Anfrage", Anfrage.deleteAll);
};