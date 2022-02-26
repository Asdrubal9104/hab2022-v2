const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const db = require("../models/asociationsDB");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

const User = db.user;
const Role = db.role;
const Analytic = db.analytic;
const SurveyForm = db.survey_form;

// create
router.post("/", (req, res) => {
    const { first_name, last_name, email, phone_number, password, language, last_screen, verification_code, role_id } = req.body;
    if (
        first_name === '' ||
        last_name === '' ||
        email === '' ||
        phone_number === '' ||
        password === '' ||
        language === '' ||
        last_screen === '' ||
        role_id === ''
    ) {
        return res.status(501).send('incomplete_information');
    }
    User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        password: bcrypt.hashSync(password, 8),
        language: language,
        last_screen: last_screen,
        verification_code: verification_code,
        role_id: role_id
    }).then(user => res.status(200).send(user));
});

//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    }).then(
        Analytic.destroy({
            where: { user_id: id }
        }),
        SurveyForm.destroy({
            where: { user_id: id }
        }).then(res.send("Deleted"))
    );
});

//update
router.put("/", (req, res) => {
    const {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        language,
        last_screen,
        verification_code,
        role_id
    } = req.body;
    let password = null
    if (req.body.passsword !== undefined && req.body.passsword !== null) {
        password = req.body.passsword
        User.update(
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                password: bcrypt.hashSync(password, 8),
                language: language,
                last_screen: last_screen,
                verification_code: verification_code,
                role_id: role_id
            }, { where: { id: id } }
        ).then(res.send("Updated"));
    } else {
        User.update(
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                language: language,
                last_screen: last_screen,
                verification_code: verification_code,
                role_id: role_id
            }, { where: { id: id } }
        ).then(res.send("Updated"));
    }
});

//get all user
router.get("/all", (req, res) => {
    User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'language', 'last_screen', 'verification_code'],
        include: [{
            model: Role,
            as: 'role',
            attributes: ['name'],
        }, {
            model: Analytic,
            as: 'analytics',
            attributes: ['current_date', 'current_view', 'before_view', 'time']
        }],
    }).then(users => res.json(users));
});

//get by id
router.get("/:id", (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        include: [{
            model: Role,
            as: 'role',
            attributes: ['name'],
        }, {
            model: Analytic,
            as: 'analytics',
            attributes: ['current_date', 'current_view', 'before_view', 'time']
        }],
    }).then(user => res.json(user));
});

router.put('/verification-code', (req, res) => {
    const { id, verification_code } = req.body;
    User.update({
        verification_code: verification_code
    }, {
        where: { id: id }
    }).then(res.send("Updated"));
});

module.exports = router;