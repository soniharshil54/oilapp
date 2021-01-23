const {MESSAGE} = require('../configs/message')
const UserService = require('../services/user')
const _ = require("lodash")

module.exports = function(io){
    try{
            io.on('connection', (socket) => {

        console.log('made socket connection', socket.id);

        socket.on('logSocketId', function (options) {
            console.log("log socket id")
            if (_.isString(options)) {
                options = JSON.parse(options);
            }
            options.socketId = socket.id;
            if (!options || !options.userId || !options.deviceId) {
                socket.emit('errors', {
                    flag: false,
                    requestName: "logSocketId",
                    message: MESSAGE.BAD_REQUEST.message
                });//throw error
            } else {
                UserService.logSocketId(options, function (err, response) {// update status
                    if (err) {
                        socket.emit('errors', {
                            flag: false,
                            requestName: "logSocketId",
                            message: MESSAGE.SERVER_ERROR.message
                        });//throw error
                    } else {
                        socket.join(options.userId);
                        socket.emit('success', {
                            flag: true,
                            requestName: "logSocketId",
                            message: "SocketId logged successfully."
                        });
                    }
                });
            }
        });
    
        socket.on('disconnect', function (data) {
            console.log("socket", socket.id)
            // console.log("data", data)
            let options = {
                socketId: socket.id
            }
            UserService.removeSocketId(options, function (err, response) {// update status
                if (err) {
                    console.log("error removig socket id")
                } else {
                    console.log("socket id removed")
                }
            });
            //socket.userId = data.user
        });
    
    
    });
    } catch(e){
        console.log("error",e)
    }

}


