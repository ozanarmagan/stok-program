var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        uniqiue:true,
        dropDups:true
    },
    installment: {  /* taksit sayısı */
        type:Number,
        required:true
    },
    interest: {  /* vade farkı */
        type:Number,
        required:true
    },
    performer_id:{
        type:String,
        required:true
    }
});

var Card = module.exports = mongoose.model('card',cardSchema);
module.exports.get = function (callback,limit) {
    Card.find(callback).limit(limit);
};
