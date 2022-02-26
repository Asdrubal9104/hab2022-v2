const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const db = require("../models/asociationsDB");

const Role = db.role;

// create
router.post("/", (req, res) => {
    const { name } = req.body;
    if (name === '') {
        return res.status(501).send('incomplete_information');
    }
    Role.create({
        name: name
    }).then(role => res.status(200).send(role));
});

//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Role.destroy({
        where: { id: id }
    }).then(res.send("Deleted"))
});

//update
router.put("/", (req, res) => {
    const { id, name } = req.body;
    Role.update({ name: name }, { where: { id: id } }).then(res.send("Updated"));
});

//get all user
router.get("/all", (req, res) => {
    Role.findAll().then(roles => res.json(roles));
});

//get by id
router.get("/:id", (req, res) => {
    Role.findOne({
        where: { id: req.params.id }
    }).then(role => res.json(role));
});

module.exports = router;