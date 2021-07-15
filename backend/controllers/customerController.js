var Customer = require("../models/customerModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Customer.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,customers) {
            customers.forEach(async element => {
                element.performer = await User.findOne({_id:user.user});
                element.performer = element.performer.name + " " + element.performer.surname;
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
                    data:customers
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
            Customer.findById(req.params.customer_id,function (error,customertoedit) {
                customertoedit.name = req.body.name || customertoedit.name ;
                customertoedit.address = req.body.address || customertoedit.address;
                customertoedit.phone = req.body.phone || customertoedit.phone;
                customertoedit.tax_no = req.body.tax_no || customertoedit.tax_no;
                customertoedit.tax_place = req.body.tax_place || customertoedit.tax_place;
                customertoedit.note = req.body.note || customertoedit.note;
                customertoedit.debtlimit = req.body.debtlimit || customertoedit.debtlimit;

                customertoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Customer could not found"});
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
        Customer.deleteOne({_id:req.params.customer_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Customer has been deleted"})});
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
        var newcustomer = new Customer();
        newcustomer.name = req.body.name;
        newcustomer.address = req.body.address;
        newcustomer.phone = req.body.phone;
        newcustomer.tax_no = req.body.tax_no;
        newcustomer.tax_place = req.body.tax_place;
        newcustomer.note = req.body.note;
        newcustomer.debtlimit = req.body.debtlimit;
        newcustomer.performer_id = user.user;

        newcustomer.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Customer created"});
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
        var user = token.verifyToken(req.query.token,'access');
        try
        {
            var customer = Customer.findById(req.params.customer_id);
            res.json({status:200,data:customer});
        }
        catch
        {
            res.json({status:400,message:"Customer could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};