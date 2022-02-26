const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

function auth(req,res,next){
    const token =req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        // AKI ES DONDE HAY QUE VELIDAR SI CONTIENE TOKEN EN LA BASE DE DATOS
        const decoded = jwt.verify(token, config.secret);

        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}
module.exports = auth;