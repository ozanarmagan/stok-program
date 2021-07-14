var mongoose = require('mongoose');

var billSchema = mongoose.Schema({
    customer_id:{
        type:String
    },
    products:[{
        id:String,
        amount:Number
    }],
    bill_no:{
        type:Number
    },
    created_date: {
        type:Date,
    },
    pay_type: {
        type:String
    },
    is_company: {
        type:Boolean,
    },
    performer_id:{   /* ekleyen kişi id */
        type:String,
        required:true
    }
});

var Bill = module.exports = mongoose.model('bill',billSchema);
module.exports.get = function (callback,limit) {
    Bill.find(callback).limit(limit);
};


