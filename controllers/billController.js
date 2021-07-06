var Bill = require("../models/billModel");
var token = require("../utility/token");

exports.index = function (req,res) {
    try
    {
        var Bill = token.verifyToken(req.body.token,'access');
        Bill.get(function (err,bills) {
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
                    data:bills
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
        var bill = token.verifyToken(req.body.token,'access');
        try
        {
            Bill.findById(req.params.Bill_id,function (err,billtoedit) {
                billtoedit.customer_id = req.body.customer_id || billtoedit.customer_id ;
                billtoedit.products = JSON.parse(req.body.products) || billtoedit.products;
                billtoedit.pay_type = req.body.pay_type || billtoedit.pay_type;

                billtoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Bill could not found"});
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
        bill.deleteOne({_id:req.params.bill_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"bill has been deleted"})});
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
        var newbill = new Bill();
        newbill.customer_id = req.body.customer_id;
        newbill.products = JSON.parse(req.body.products);
        newbill.created_date = Date.now();
        newbill.pay_type = req.body.pay_type;

        newbill.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"User created"});
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
            var bill = Bill.findById(req.params.bill_id);
            res.json({status:200,data:bill});
        }
        catch
        {
            res.json({status:400,message:"Bill could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};