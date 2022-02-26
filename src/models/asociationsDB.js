const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { CLIENT_CONNECT_WITH_DB } = require("mysql/lib/protocol/constants/client");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.analytic = require("./analytic.model.js")(sequelize, Sequelize);
db.survey_form = require("./survey_form.model")(sequelize, Sequelize);

//relation between tables

// 1 a 1
db.user.hasOne(db.survey_form, { as: 'survey_form', foreignKey: 'user_id' });
db.survey_form.belongsTo(db.user, { as: 'user', foreignKey: 'user_id' });

// 1 a N
// un rol tiene muchos usuarios
db.role.hasMany(db.user, { as: 'users', foreignKey: 'role_id' });
db.user.belongsTo(db.role, { as: 'role', foreignKey: 'role_id' });

// 1 a N
db.user.hasMany(db.analytic, { as: 'analytics', foreignKey: 'user_id' });
db.analytic.belongsTo(db.user, { as: 'user', foreignKey:'user_id' })

module.exports = db;