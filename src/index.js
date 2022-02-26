const app = require('./app');
const db = require("./models/asociationsDB");
const port = 3000;

// SERVER HTTPS
// const port_https = 3001;
const fs = require('fs');
// const https = require('https');
const bcrypt = require('bcryptjs');

const Role = db.role;
const User = db.user;
const SurveyForm = db.survey_form;
// ------------------------------ COMENTAR ------------------------------------
//db.sequelize.sync({ force: true }).then(() => {
//  console.log('Drop and Resync Db');
//  initial();
//});
//function initial() {
  //Role.create({ id: 1, name: "admin" });

  //Role.create({ id: 2, name: "user" });

  //User.create({
   // 'first_name': 'Administrador',
   // 'last_name': 'Apellido1 Apellido2',
   // 'email': 'admin@gmail.com',
  //  'phone_number': '+(53) 50123012',
    //'password': bcrypt.hashSync('lokol', 8),
   // 'language': 'Spanish',
   // 'last_screen': 500,
   // 'verification_code': '',
 //   'role_id': 1
  //});
//}
// ------------------------------ COMENTAR ------------------------------------

app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// configurations for https
// https.createServer({
//     key: fs.readFileSync('key.txt'),
//     cert: fs.readFileSync('cert.txt')
// }, app).listen(port_https, function () {
//     console.log(`My HTTPS server listening on port " ${port_https} `);
// });

// app.get('/foo', function (req, res) {
//   console.log('Hello, I am foo.');
//   return res.json('Hello, I am foo.')
// });