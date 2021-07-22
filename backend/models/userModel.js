var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        uniqiue:true,
        dropDups:true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    surname: {
        type:String,
        required:true
    },
    created_date: {
        type:Date
    },
    user_type:{
        type:Number, /* 0 -> normal 1 -> admin 2 -> superadmin */
        required:true
    },
    performer_id:{
        type:String,
        required:true
    }
});

var User = module.exports = mongoose.model('user',userSchema,'user');
module.exports.get = function (callback,limit) {
    User.find(callback).limit(limit);
};

