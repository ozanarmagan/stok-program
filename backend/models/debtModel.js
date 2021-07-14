var mongoose = require('mongoose');

var debtSchema = mongoose.Schema({
    amount: {
        type:Number,
        required:true
    },
    note:{
        type:String
    },
    customer_id: {
        type:String,
        required:true
    },
    customer_type: {
        type:Number,  /* 0 -> Şahıs 1 -> Şirket */
    },
    deadline: {
        type:Date,
        required:true
    },
    performer_id:{
        type:String,
        required:true
    }
});

var Debt = module.exports = mongoose.model('debt',debtSchema);
module.exports.get = function (callback,limit) {
    Debt.find(callback).limit(limit);
};
