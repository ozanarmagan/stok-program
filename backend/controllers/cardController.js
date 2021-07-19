var Card = require("../models/cardModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");
exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Card.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(async function  (err,docs) {
            const objects = [];
            Promise.all(docs.map(async element => {
                var json = element.toObject();
                var performer = await User.findOne({_id:element.performer_id}).exec();
                json.performer = performer.name + " " + performer.surname;
                objects.push(json);
            })).then(res_ => {
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
                        data:objects
                    });
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
        newcard.performer_id = user.user;
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
        var user = token.verifyToken(req.query.token,'access');
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