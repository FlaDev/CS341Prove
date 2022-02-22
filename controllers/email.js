
const extIP = require('ext-ip')();

exports.getIp = (req, res, next) => {
    console.log(req.connection.remoteAddress);
};