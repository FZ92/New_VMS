const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = require("../models/user.model");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.UserID = decoded.UserID;
        next();
    });
};

isAdmin = (req, res2, next) => {
    User.getMailPW(req.Email, req.Passwort, (err, res) => {
        if(res.Rolle === "Admin") {
            return;
        } else {
            res2.status(403).send({
                message: "Require Management Role!"
            });
        }
    })
};

isManagement = (req, res2, next) => {
    User.getMailPW(req.Email, req.Passwort, (err, res) => {
        if(res.Rolle === "Management") {
            return;
        } else {
            res2.status(403).send({
                message: "Require Management Role!"
            });
        }
    })
};

isVeranstalter = (req, res2, next) => {
    User.getMailPW(req.Email, req.Passwort, (err, res) => {
        if(res.Rolle === "Veranstaltungsanbieter") {
            return;
        } else {
            res2.status(403).send({
                message: "Require Management Role!"
            });
        }
    })
};

isTeilnehmer = (req, res2, next) => {
    User.getMailPW(req.Email, req.Passwort, (err, res) => {
        if(res.Rolle === "Teilnehmer") {
            return;
        } else {
            res2.status(403).send({
                message: "Require Management Role!"
            });
        }
    })
};



/*isManagement = (req, res, next) => {
    User.findById(req.UserID).then(User => {
        User.getRolle().then(user => {
            for (let i = 0; i < user.length; i++) {
                if (user[i].Rolle === "Management") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Management Role!"
            });
            return;
        });
    });
};

isVeranstalter = (req, res, next) => {
    User.findById(req.UserID).then(User => {
        User.getRolle().then(user => {
            for (let i = 0; i < user.length; i++) {
                if (user[i].Rolle === "Veranstalter") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Veranstalter Role!"
            });
            return;
        });
    });
};

isTeilnehmer = (req, res, next) => {
    User.findById(req.UserID).then(User => {
        User.getRolle().then(user => {
            for (let i = 0; i < user.length; i++) {
                if (user[i].Rolle === "Teilnehmer") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Teilnehmer Role!"
            });
            return;
        });
    });
};*/

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isManagement: isManagement,
    isVeranstalter: isVeranstalter,
    isTeilnehmer: isTeilnehmer
}

module.exports = authJwt;