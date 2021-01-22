module.exports = app => {
    const User = require("../controllers/user.controller.js");
    const authJwt  = require("../middleware/");
    const controller = require("../controllers/user.controller");
    const Sign = require("../controllers/auth.controller");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/LandingPage", controller.allAccess);

    app.get(
        "/Teilnehmer",
        [authJwt.verifyToken, authJwt.isTeilnehmer],
        controller.teilnehmerBoard
    );

    app.get(
        "/Veranstalter",
        [authJwt.verifyToken, authJwt.isVeranstalter],
        controller.veranstalterBoard
    );

    app.get(
        "/Management",
        [authJwt.verifyToken, authJwt.isManagement],
        controller.managementBoard
    );

    app.get(
        "/Admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get("/Login", Sign.signin)

    // Create a new User!
    app.post("/User", User.create);

    // Retrieve all User
    app.get("/User", User.findAll);

    // Retrieve a single User with id
    app.get("/User/:UserID", User.findOne);

    // Update a User with id
    app.put("/User/:UserID", User.update);

    // Delete a User with id
    app.delete("/User/:UserID", User.delete);

    // Delete all User
    //app.deleteAlles("/User", User.deleteAlles);

    //Get User by Mail
    app.get("/User/:Email", User.getMail);

    //Get User by Password
    app.get("/User/:Passwort", User.getPasswort);

    //app.post('/User', User.mailPW);

};
