var mongoose = require('mongoose');
// Senet
var indentureSchema = mongoose.Schema({
    customer_id:{
        type:String
    },
    count: {
        type:Number
    },
    paid_count:{
        type:Number,
        default:0
    },
    total_amount:{
        type:Number,
    },
    paid_amount:{
        type:Number
    },
    performer_id:{
        type:String,
        required:true
    }
});


var indenture = module.exports = mongoose.model('indenture',indentureSchema);
module.exports.get = function (callback,limit) {
    indenture.find(callback).limit(limit);
};




