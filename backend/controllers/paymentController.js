var Payment = require("../models/paymentModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Payment.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,payments) {
            payments.forEach(element => {
                element.performer = await User.findOne({_id:user.user});
                element.performer.password = null;
            });
            if(err)
            {
                res.json({
                    status:400,
                    message:err
                });
                console.log(err);
            }
            else
                res.json({
                    status:200,
                    data:payments
                });
        });
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};

exports.edit = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        try
        {
            Payment.findById(req.params.payment_id,function (error,paymenttoedit) {
                paymenttoedit.type = req.body.type || paymenttoedit.type ;
                paymenttoedit.amount = req.body.amount || paymenttoedit.amount;
                paymenttoedit.note = req.body.note || paymenttoedit.note;
                paymenttoedit.date = req.body.date || paymenttoedit.date;
                paymenttoedit.pay_type = req.body.pay_type || paymenttoedit.pay_type;
                paymenttoedit.customer_id = req.body.customer_id || paymenttoedit.customer_id;

                paymenttoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Payment could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid Token"});
    }
}


exports.delete = async function(req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        Payment.deleteOne({_id:req.params.payment_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Payment has been deleted"})});
    }
    catch
    {
        res.json({status:400,message:"Invalid Token"});
    }
} 

exports.new = async function (req,res) {
    try 
    {
        var user = token.verifyToken(req.body.token,'access');
        var newpayment = new Payment();
        newpayment.type = req.body.type;
        newpayment.amount = req.body.amount;
        newpayment.note = req.body.note;
        newpayment.date = req.body.date;
        newpayment.pay_type = req.body.pay_type;
        newpayment.customer_id = req.body.customer_id;
        newpayment.performer_id = user.user;

        newpayment.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Payment created"});
        })
    }
    catch(err)
    {
        res.json({status:400,message:"Invalid token"});
    }
};

exports.view = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        try
        {
            var payment = Payment.findById(req.params.payment_id);
            res.json({status:200,data:payment});
        }
        catch
        {
            res.json({status:400,message:"Payment could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};