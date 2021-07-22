var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
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
        required:true
    },
    fax: {
        type:Number,
        required:true
    },
    logo: {
        type:Buffer,
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
    performer_id:{
        type:String,
        required:true
    }
});

var Company = module.exports = mongoose.model('company',companySchema);
module.exports.get = function (callback,limit) {
    Company.find(callback).limit(limit);
};

