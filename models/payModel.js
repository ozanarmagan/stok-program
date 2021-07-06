var mongoose = require('mongoose');

var paySchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    note:{
        type:String
    },
    date:{
        type:Date
    },
    pay_type:{ /* 0 -> bireysel 1 -> şirket */
        type:Number
    },
    payId:{
        type:String
    }
});

var pay = module.exports = mongoose.model('pay',paySchema);
module.exports.get = function (callback,limit) {
    pay.find(callback).limit(limit);
};

