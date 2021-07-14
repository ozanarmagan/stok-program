var Order = require("../models/orderModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

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
            orders.forEach(element => {
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
                ordertoedit.products = req.body.products || ordertoedit.products;
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
        neworder.card_id = req.body.card_id;
        neworder.card_installment = req.body.card_installment;
        neworder.products = req.body.products;
        neworder.is_sold = req.body.is_sold;
        neworder.performer_id = user.user;

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