var Indenture = require("../models/indentureModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Indenture.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,indentures) {
            indentures.forEach(async element => {
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
                    data:indentures
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
            Indenture.findById(req.params.indenture_id,function (error,indenturetoedit) {
                indenturetoedit.customer_id = req.body.customer_id || indenturetoedit.customer_id ;
                indenturetoedit.count = req.body.count || indenturetoedit.count;
                indenturetoedit.paid_count = req.body.paid_count || indenturetoedit.paid_count;
                indenturetoedit.total_amount = req.body.total_amount || indenturetoedit.total_amount;
                indenturetoedit.paid_amount = req.body.paid_amount || indenturetoedit.paid_amount;

                indenturetoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Indenture could not found"});
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
        Indenture.deleteOne({_id:req.params.indenture_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Indenture has been deleted"})});
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
        var newindenture = new Indenture();
        newindenture.customer_id = req.body.customer_id;
        newindenture.count = req.body.count;
        newindenture.paid_count = req.body.paid_count;
        newindenture.total_amount = req.body.total_amount;
        newindenture.paid_amount = req.body.paid_amount;
        newindenture.performer_id = req.body.performer_id;

        newindenture.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Indenture created"});
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
            var indenture = Indenture.findById(req.params.indenture_id);
            res.json({status:200,data:indenture});
        }
        catch
        {
            res.json({status:400,message:"Indenture could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};