const {MESSAGE} = require('../configs/message')
const Config = require("../configs/constant/config")
const jwt = require('jsonwebtoken');
let config = new Config()
const jwtSecret = config.jwtSecret

module.exports = (req, res, next) => {
    try {
        const tokenRef = req.headers.authorization;
        const token = tokenRef.split(" ")[1]
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.unauthorized(null, MESSAGE.UNAUTHORIZED)
    }
};