var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    installment:{
        type:Number,
        required:true
    },
    advance_pay:{
        type:Number,
        default:0
    },
    
});

var order = module.exports = mongoose.model('order',orderSchema);
module.exports.get = function (callback,limit) {
    order.find(callback).limit(limit);
};

