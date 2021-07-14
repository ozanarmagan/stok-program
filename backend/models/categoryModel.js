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
    interests:[{
        count:Number,
        amount:Number,
    }],
    performer_id:{
        type:String,
        required:true
    }
});

var Category = module.exports = mongoose.model('category',categorySchema);
module.exports.get = function (callback,limit) {
    Category.find(callback).limit(limit);
};

