// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// settings
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// routes
//const login = require('./src/routes/login');
const user_routes = require('./routes/user.routes');
const role_routes = require('./routes/role.routes');
const analytic_routes = require('./routes/analytic.routes');
const survey_form = require('./routes/survey_form.routes');

//app.use('/api/login', login);
app.use('/api/user', user_routes);
app.use('/api/role', role_routes);
app.use('/api/analytic', analytic_routes);
app.use('/api/survey_form', survey_form);

module.exports = app;