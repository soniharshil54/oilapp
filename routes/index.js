const UserRoutes = require("./User/Auth")


module.exports = function (app) {

    app.use("/user", UserRoutes)

}