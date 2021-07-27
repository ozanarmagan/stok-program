var mongoose = require('mongoose');

var stockHistorySchema = mongoose.Schema({
    product_id: {
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    performer_id: {
        type:String,
        required:true
    },
});

var StockHistory = module.exports = mongoose.model('stockHistory',stockHistorySchema);
module.exports.get = function (callback,limit) {
    StockHistory.find(callback).limit(limit);
};

