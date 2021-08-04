var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    installment:{
        type:Number,
    },
    advance_pay:{
        type:Number,
        default:0
    },
    advance_pay_type:{
        type:String
    },
    customer_id: {
        type:String,
        required:true
    },
    card_id:{
        type:String
    },
    card_installment:{
        type:Number,
    },
    products:[{
        id:String,
        amount:Number
    }],
    is_sold:{
        type:Boolean,  /* fatura kesilip satıldı mı */ 
        default:false
    },
    performer_id:{
        type:String,
        required:true
    }
});

var order = module.exports = mongoose.model('order',orderSchema);
module.exports.get = function (callback,limit) {
    order.find(callback).limit(limit);
};

