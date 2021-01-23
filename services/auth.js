const { MESSAGE } = require('../configs/message')
const Config = require("../configs/constant/config")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require('../models/User')
let config = new Config()
const jwtSecret = config.jwtSecret

module.exports = {
    login: async function (options) {
        try {
            let {email, password} = options
            console.log("email", email)
            let user = await User.findOne({email:email})
            let passwordhash = user.password
            let match = await bcrypt.compare(password, passwordhash)
            if(!match){
                return {
                    flag: false,
                    response: MESSAGE.EMAIL_PASS_NOT_MATCHED
                }
            }
            let payload = {
                _id: user._id,
                name : user.name,
                email : user.email
            }
            let tokenRef = jwt.sign(payload, jwtSecret, { expiresIn: 60 * 60 });
            let token = `JWT ${tokenRef}`
            let data = {
                token: token,
                user: user
            }
            return {
                flag: true,
                data: data,
                response: MESSAGE.OK
            }
        } catch (e) {
            console.log(e)
            return {
                flag: false,
                response: MESSAGE.SERVER_ERROR
            }
        }
    }
}