const User = require("../models/User")
const { MESSAGE } = require("../configs/message")

module.exports = {

    /**
    * @function isDuplicate
    * @description A function to check for duplications in db which expects unique records.
    * @param {Object} params - field values of which duplicaton will be checked
    * @returns {Object || boolean} - will return object (error message) if duplication found
    */
    async isDuplicate(params) {
        if (params.email) {

            let query = { "email": params.email }
            if (params.id) {
                query['_id'] = {
                    $ne: params.id
                }
            }
            let users = await User.find(query)
            if (users && users.length > 0) {
                return {
                    flag: true,
                    response: MESSAGE.EMAIL_REGISTERED
                }
            }
            else {
                return {
                    flag: false
                }
            }
        }
        return {
            flag: false
        }
    }
}