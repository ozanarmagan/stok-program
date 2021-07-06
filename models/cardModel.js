var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    installment: {  /* taksit sayısı */
        type:Number,
        required:true
    },
    interest: {  /* vade farkı */
        type:Number,
        required:true
    },
});

var Card = module.exports = mongoose.model('card',cardSchema);
module.exports.get = function (callback,limit) {
    Card.find(callback).limit(limit);
};
