var Card = require("../models/cardModel");
var token = require("../utility/token");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        Card.find(req.query,function (err,cards) {
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
                    data:cards
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
            Card.findById(req.params.card_id,function (err,cardtoedit) {
                cardtoedit.name = req.body.name || cardtoedit.name ;
                cardtoedit.installment = req.body.installment || cardtoedit.installment;
                cardtoedit.interest = req.body.interest || cardtoedit.interest;

                cardtoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Card could not found"});
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
        Card.deleteOne({_id:req.params.card_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Card has been deleted"})});
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
        var newcard = new Card();
        newcard.name = req.body.name;
        newcard.installment = req.body.installment;
        newcard.interest = req.body.interest;

        newcard.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Card created"});
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
            var card = Card.findById(req.params.card_id);
            res.json({status:200,data:card});
        }
        catch
        {
            res.json({status:400,message:"Card could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};