const jwt = require('jsonwebtoken');
const constants = require('../constants/index');


module.exports.generateToken = function(payload,type) {
    if(type == 'access')
        return jwt.sign(payload,constants.SECRET_KEY,{expiresIn:constants.SECRET_EXPIRES_IN});
    else
        return jwt.sign(payload,constants.REFRESH_KEY,{expiresIn:constants.REFRESH_EXPIRES_IN});
}

module.exports.verifyToken = function (payload,type) {
    if(type == 'access')
        return jwt.verify(payload,constants.SECRET_KEY);
    else if(type == 'refresh')
        return jwt.verify(payload,constants.REFRESH_KEY);
}

