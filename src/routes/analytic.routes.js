const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const db = require("../models/asociationsDB");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

const User = db.user;
const Role = db.role;
const Analytic = db.analytic;

// create
router.post("/", (req, res) => {
    const { current_date, current_view, before_view, time, user_id } = req.body;
    if (
        current_date === '' ||
        current_view === '' ||
        time === '' ||
        user_id === ''
    ) {
        return res.status(501).send('incomplete_information');
    }
    Analytic.create({
        current_date: current_date,
        current_view: current_view,
        before_view: before_view,
        time: time,
        user_id: user_id
    }).then(analytic => res.status(200).send(analytic));
});

//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Analytic.destroy({
        where: { id: id }
    }).then(res.send("Deleted"))
});

//get all
router.get("/all", (req, res) => {
    Analytic.findAll().then(analytics => res.json(analytics));
});

//get by id
router.get("/:id", (req, res) => {
    Analytic.findOne({
        where: { id: req.params.id }
    }).then(user => res.json(user));
});

module.exports = router;