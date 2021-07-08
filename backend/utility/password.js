let bcrypt = require('bcrypt');

module.exports.hash = function (pw) {
    return bcrypt.hashSync(pw,10);
}

module.exports.isValid = async function(pw,hash) {
    return await bcrypt.compare(pw,hash);
}