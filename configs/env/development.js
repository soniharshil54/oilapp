module.exports = {
    mongoURI : "mongodb://127.0.0.1:27017/boilerplate",
    port : process.env.PORT ||  5600,
    jwtSecret : 'secret',
    saltRounds : 10
}