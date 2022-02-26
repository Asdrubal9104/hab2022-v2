const express = require('express');
const router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const config = require("../config/auth.js");
const db = require("../models/asociationsDB");
const User = db.user;
const Role = db.role;

router.post('/', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        },
        include: [
            { model: Role, as: 'role' }
        ],
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid password!" });
        }

        var token = jwt.sign({
            id: user.id,
            email: user.email,
            full_name: `${user.first_name} ${user.last_name}`,
            role: ("ROLE_" + user.role.anme).toUpperCase(),
        }, config.secret, {
            expiresIn: 1478773621
        });
        User.update(
            { last_login_date: new Date() },
            {
                where: { id: user.id }
            })
        res.status(200).send({
            id: user.id,
            username: user.user_name,
            full_name: `${user.first_name} ${user.last_name}`,
            roles: ("ROLE_" + user.role.name).toUpperCase(),
            accessToken: token
        });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

module.exports = router;