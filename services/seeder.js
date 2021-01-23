const bcrypt = require('bcrypt')
const User  = require('../models/User')
const Config = require("../configs/constant/config")
let config = new Config()
const saltRounds = config.saltRounds

module.exports =  {
    seedRootUser: async function () {
        try {
            if (await User.findOne({isRootUser: true})) {
                console.log('super user is seeded successfully.');
                return;
            }
            const hash = bcrypt.hashSync("super123", saltRounds);
            await User.create({
                name: 'super user',
                email: "superuser@demo.com",
                password: hash
            });
            console.log('super user is seeded successfully.');
            return;
        } catch (e) {
            console.log(e);
            return { error: e };
        }
    },
    async seedAllConfigs() {
        await this.seedRootUser();
    } 
}