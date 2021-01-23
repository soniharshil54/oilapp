const express = require('express')
const mongoose = require('mongoose')
const Config = require("./configs/constant/config")
const SeederService = require("./services/seeder")
let config = new Config()

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to mongodb")
    }

})

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

SeederService.seedAllConfigs()
var routes = require('./routes')(app)
global.io = io; //added
require('./configs/socket')(io)

const port = config.port;

var server = http.listen(port, () => {
    console.log(server.address().address)
    console.log(`server started on localhost:${port}`)
});