var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        uniqiue:true,
        dropDups:true
    },
    address: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
    },
    gsm: {
        type:Number,
        required:true
    },
    identity_number: {
        type:Number,
        required:true
    },
    state: {
        type:String,
    },
    town: {
        type:String,
    },
    country: {
        type:String,
    },
    note:{
        type:String
    },
    debt_limit: {
        type:Number,
    },
    tax_no: {
        type:String,
    },
    tax_place: {
        type:String,
    },
    performer_id:{
        type:String,
        required:true
    }
});

var Customer = module.exports = mongoose.model('customer',customerSchema);
module.exports.get = function (callback,limit) {
    Customer.find(callback).limit(limit);
};

