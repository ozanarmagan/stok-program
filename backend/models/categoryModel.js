var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    tax_rate:{
        type:Number,
        required:true
    },
    interest_2: {
        type:Number,
    },
    interest_4: {
        type:Number,
    },
    interest_6: {
        type:Number,
    },
    interest_8: {
        type:Number,
    },
    interest_10: {
        type:Number,
    },
    interest_12: {
        type:Number,
    },
    interest_14: {
        type:Number,
    },
    interest_16: {
        type:Number,
    },
    interest_18: {
        type:Number,
    },
    interest_20: {
        type:Number,
    },
    interest_22: {
        type:Number,
    },
    interest_24: {
        type:Number,
    },
});

var Category = module.exports = mongoose.model('category',categorySchema);
module.exports.get = function (callback,limit) {
    Category.find(callback).limit(limit);
};

