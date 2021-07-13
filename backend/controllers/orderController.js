var Order = require("../models/orderModel");
var token = require("../utility/token");
var aqp = require('api-query-params');

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Order.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,orders) {
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
                    data:orders
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
            Order.findById(req.params.order_id,function (error,ordertoedit) {
                ordertoedit.installment = req.body.installment || ordertoedit.installment ;
                ordertoedit.advance_pay = req.body.advance_pay || ordertoedit.advance_pay;
                ordertoedit.advance_pay_type = req.body.advance_pay_type || ordertoedit.advance_pay_type;
                ordertoedit.card_id = req.body.card_id || ordertoedit.card_id;
                ordertoedit.card_installment = req.body.card_installment || ordertoedit.card_installment;
                ordertoedit.product_id = req.body.product_id || ordertoedit.product_id;
                ordertoedit.product_amount = req.body.product_amount || ordertoedit.product_amount;
                ordertoedit.is_sold = req.body.is_sold || ordertoedit.is_sold;

                ordertoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Order could not found"});
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
        Order.deleteOne({_id:req.params.order_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Order has been deleted"})});
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
        var neworder = new Order();
        neworder.installment = req.body.installment;
        neworder.advance_pay = req.body.advance_pay;
        neworder.advance_pay_type = req.body.advance_pay_type;
        newcomapny.card_id = req.body.card_id;
        newcomapny.card_installment = req.body.card_installment;
        newcomapny.product_id = req.body.product_id;
        newcomapny.product_amount = req.body.product_amount;
        newcomapny.is_sold = req.body.is_sold;

        neworder.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Order created"});
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
            var order = Order.findById(req.params.order_id);
            res.json({status:200,data:order});
        }
        catch
        {
            res.json({status:400,message:"Order could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};