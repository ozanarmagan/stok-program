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
    advance_pay_type:{
        type:String
    },
    card_id:{
        type:String
    },
    card_installment:{
        type:Number,
    },
    product_id:{
        type:String,
    },
    product_amount:{
        type:Number,
    },
    is_sold:{
        type:Boolean,  /* fatura kesilip satıldı mı */ 
        default:false
    }
});

var order = module.exports = mongoose.model('order',orderSchema);
module.exports.get = function (callback,limit) {
    order.find(callback).limit(limit);
};

