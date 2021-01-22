const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "VMS" });
});

app.get("/", (req, res) => {
    res.send("file");
})

require("./app/routes/user.routes")(app);
require("./app/routes/angebot.routes")(app);
require("./app/routes/raum.routes")(app);
require("./app/routes/veranstaltung.routes")(app);
require("./app/routes/veranstaltungsuebersicht.routes")(app);
require("./app/routes/anfrage.routes")(app);
require("./app/routes/abrechnung.routes")(app);
require("./app/routes/veranstaltungsverwaltung.routes")(app);
require("./app/routes/auth.routes")(app);
//require("./backend/routes/teilnehmerliste.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});