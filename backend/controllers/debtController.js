var Debt = require("../models/debtModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Debt.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,debts) {
            debts.forEach(async element => {
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
                    data:debts
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
            Debt.findById(req.params.debt_id,function (error,debttoedit) {
                debttoedit.customer_id = req.body.customer_id || debttoedit.customer_id ;
                debttoedit.amount = req.body.amount || debttoedit.amount;
                debttoedit.customer_type = req.body.customer_type || debttoedit.customer_type;
                debttoedit.note = req.body.note || debttoedit.note;
                debttoedit.deadline = req.body.deadline || debttoedit.deadline;
                debttoedit.is_paid = req.body.is_paid || debttoedit.is_paid;

                debttoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Debt could not found"});
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
        Debt.deleteOne({_id:req.params.debt_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Debt has been deleted"})});
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
        var newdebt = new Debt();
        newdebt.customer_id = req.body.customer_id;
        newdebt.amount = req.body.amount;
        newdebt.customer_type = req.body.customer_type;
        newdebt.note = req.body.note;
        newdebt.deadline = req.body.deadline;
        newdebt.performer_id = user.user;
        newdebt.is_paid = req.body.is_paid || false;
        newdebt.created_date = Date.now();


        newdebt.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Debt created"});
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
            var debt = Debt.findById(req.params.debt_id);
            res.json({status:200,data:debt});
        }
        catch
        {
            res.json({status:400,message:"Debt could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};