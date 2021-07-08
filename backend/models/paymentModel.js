var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
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
    payment_type:{ /* 0 -> bireysel 1 -> şirket */
        type:Number
    },
    customer_id:{
        type:String
    }
});

var payment = module.exports = mongoose.model('payment',paymentSchema);
module.exports.get = function (callback,limit) {
    payment.find(callback).limit(limit);
};

