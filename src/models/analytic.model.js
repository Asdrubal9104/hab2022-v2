module.exports = (sequelize, Sequelize) => {
    const Analytic = sequelize.define('analytics', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        current_date: { type: Sequelize.STRING(100) },
        current_view: { type: Sequelize.STRING(50) },
        before_view: { type: Sequelize.STRING(50) },
        time: { type: Sequelize.INTEGER },
        user_id: { type: Sequelize.INTEGER },
    });
    return Analytic;
}