var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    note:{
        type:String
    },
    debt_limit: {
        type:Number,
        required:true
    },
    tax_no: {
        type:String,
        required:true
    },
    tax_place: {
        type:String,
        required:true
    },
});

var Customer = module.exports = mongoose.model('customer',customerSchema);
module.exports.get = function (callback,limit) {
    Customer.find(callback).limit(limit);
};

