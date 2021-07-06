var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    stock: {
        type:Number,
        required:true
    },
    critical_stock: {
        type:Number,
        required:true
    },
    barcode: {
        type:Number,
        required:true
    },
    price_to_sell: {
        type:Number,
        required:true
    },
    price_to_buy:{
        type:Number, 
        required:true
    },
    profit_rate: {
        type:Number,
        required:true
    },
    category_id: {
        type:String
    },
    publish: {
        type:Boolean
    },
    product_unit: {
        type:String
    },
    origin: {
        type:String
    },
    last_change_date: {
        type:Date,
    },
    image: {
        type:Buffer
    }
});

var Product = module.exports = mongoose.model('product',productSchema);
module.exports.get = function (callback,limit) {
    Product.find(callback).limit(limit);
};

