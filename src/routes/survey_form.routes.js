const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const db = require("../models/asociationsDB");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { survey_form } = require('../models/asociationsDB');

const SurveyForm = db.survey_form;

// create
router.post("/", (req, res) => {
    const {
        zip_code,
        purpose,
        first_time,
        property_type,
        occupancy,
        monthly_payment,
        credit_score,
        employment_type,
        monthly_icome,
        monthly_debts,
        collection,
        bankruptcy,
        foreclosure,
        co_first_time,
        co_credit_score,
        co_employment_type,
        co_monthly_icome,
        co_monthly_debts,
        co_collection,
        co_bankruptcy,
        co_foreclosure
    } = req.body;

    SurveyForm.create({
        zip_code: zip_code,
        purpose: purpose,
        first_time: first_time,
        property_type: property_type,
        occupancy: occupancy,
        monthly_payment: monthly_payment,
        credit_score: credit_score,
        employment_type: employment_type,
        monthly_icome: monthly_icome,
        monthly_debts: monthly_debts,
        collection: collection,
        bankruptcy: bankruptcy,
        foreclosure: foreclosure,
        co_first_time: co_first_time,
        co_credit_score: co_credit_score,
        co_employment_type: co_employment_type,
        co_monthly_icome: co_monthly_icome,
        co_monthly_debts: co_monthly_debts,
        co_collection: co_collection,
        co_bankruptcy: co_bankruptcy,
        co_foreclosure: co_foreclosure,
    }).then(survey_form => res.status(200).send(survey_form));
});

//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    SurveyForm.destroy({
        where: { id: id }
    }).then(res.send("Deleted"));
});

//update
router.put("/", (req, res) => {
    const {
        id,
        zip_code,
        purpose,
        first_time,
        property_type,
        occupancy,
        monthly_payment,
        credit_score,
        employment_type,
        monthly_icome,
        monthly_debts,
        collection,
        bankruptcy,
        foreclosure,
        co_first_time,
        co_credit_score,
        co_employment_type,
        co_monthly_icome,
        co_monthly_debts,
        co_collection,
        co_bankruptcy,
        co_foreclosure
    } = req.body;

    SurveyForm.update(
        {
            zip_code: zip_code,
            purpose: purpose,
            first_time: first_time,
            property_type: property_type,
            occupancy: occupancy,
            monthly_payment: monthly_payment,
            credit_score: credit_score,
            employment_type: employment_type,
            monthly_icome: monthly_icome,
            monthly_debts: monthly_debts,
            collection: collection,
            bankruptcy: bankruptcy,
            foreclosure: foreclosure,
            co_first_time: co_first_time,
            co_credit_score: co_credit_score,
            co_employment_type: co_employment_type,
            co_monthly_icome: co_monthly_icome,
            co_monthly_debts: co_monthly_debts,
            co_collection: co_collection,
            co_bankruptcy: co_bankruptcy,
            co_foreclosure: co_foreclosure,
        }, { where: { id: id } }
    ).then(res.send("Updated"));
});

//get all
router.get("/all", (req, res) => {
    SurveyForm.findAll().then(survey_forms => res.json(survey_forms));
});

//get by id
router.get("/:id", (req, res) => {
    SurveyForm.findOne({
        where: { id: req.params.id },

    }).then(survey_form => res.json(survey_form));
});

module.exports = router;