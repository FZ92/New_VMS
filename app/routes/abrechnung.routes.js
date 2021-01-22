module.exports = app => {
    const Abrechnung = require("../controllers/abrechnung.controller");
    //
    app.get("/Abrechnung", Abrechnung.findAllManager);
    /*app.get("/Abrechnung/Veranstalter", Abrechnung.findAllVeranstalter);*/
}