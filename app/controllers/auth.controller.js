
const config = require("../config/auth.config");
const User = require("../models/user.model");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = async (req, res2) => {
    try {
        const {Email, Passwort} = req.body;

        if (!Email || !Passwort) {
            return res2.status(400);

        }

        User.getMailPW(Email, Passwort, async (err, res) => {

            if (Passwort !== res.Passwort)
            {   console.log(1);
                console.log("Fehler");
                return false;
            }
            else
            {
                const UserID = res.UserID;
                const token = jwt.sign({UserID: UserID}, 'secret-key')
                console.log(token);
                res2.status(200).send({
                    Email: res.Email,
                    Passwort: res.Passwort,
                    Rolle: res.Rolle,
                    Vorname: res.Vorname,
                    Nachname: res.Nachname,
                    UserID: res.UserID,
                    accessToken: token
                });
            }
        })}
    catch (error) {
        console.log(token);
    }
}






