var mongoose = require('mongoose');

var companyCustomerSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    owner: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone_gsm: {
        type:Number,
    },
    phone: {
        type:Number
    },
    fax: {
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
    total_debt: {
        type:Number,
    },
    total_paid: {
        type:Number
    },
    performer_id:{
        type:String,
        required:true
    }
    
});

var CompanyCustomer = module.exports = mongoose.model('companyCustomer',companyCustomerSchema);
module.exports.get = function (callback,limit) {
    CompanyCustomer.find(callback).limit(limit);
};

