module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: { type: Sequelize.STRING(25) },
        last_name: { type: Sequelize.STRING(50) },
        email: { type: Sequelize.STRING(50) },
        phone_number: { type: Sequelize.STRING(25) },
        password: { type: Sequelize.STRING },
        language: { type: Sequelize.STRING(15) }, //(English, Spanish) 
        last_screen: { type: Sequelize.INTEGER },
        verification_code: { type: Sequelize.STRING(6) },
        last_login_date: { type: Sequelize.DATE },
        role_id: { type: Sequelize.INTEGER },
        token: { type: Sequelize.STRING },
    });
    return User;
}