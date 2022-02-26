module.exports = (sequelize, Sequelize) => {
    const SurveyForm = sequelize.define("survey_forms", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        zip_code: { type: Sequelize.INTEGER(5) },
        purpose: { type: Sequelize.INTEGER(5) },
        first_time: { type: Sequelize.BOOLEAN },
        property_type: { type: Sequelize.STRING(50) },
        occupancy: { type: Sequelize.STRING(50) },
        monthly_payment: { type: Sequelize.INTEGER },
        credit_score: { type: Sequelize.INTEGER },
        employment_type: { type: Sequelize.STRING(5) },
        monthly_icome: { type: Sequelize.INTEGER },
        monthly_debts: { type: Sequelize.INTEGER },
        collection: { type: Sequelize.BOOLEAN },
        bankruptcy: { type: Sequelize.BOOLEAN },
        foreclosure: { type: Sequelize.BOOLEAN },
        co_first_time: { type: Sequelize.BOOLEAN },
        co_credit_score: { type: Sequelize.BOOLEAN },
        co_employment_type: { type: Sequelize.STRING(25) },
        co_monthly_icome: { type: Sequelize.INTEGER },
        co_monthly_debts: { type: Sequelize.INTEGER },
        co_collection: { type: Sequelize.BOOLEAN },
        co_bankruptcy: { type: Sequelize.BOOLEAN },
        co_foreclosure: { type: Sequelize.BOOLEAN },
    });
    return SurveyForm;
};