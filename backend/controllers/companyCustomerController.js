var Company = require("../models/companyCustomer");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Company.find(filter)
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
            Company.findById(req.params.company_id,function (error,companytoedit) {
                companytoedit.name = req.body.name || companytoedit.name ;
                companytoedit.owner = req.body.owner || companytoedit.owner;
                companytoedit.address = req.body.address || companytoedit.address;
                companytoedit.phone_gsm = req.body.phone_gsm || companytoedit.phone_gsm;
                companytoedit.phone = req.body.phone || companytoedit.phone;
                companytoedit.fax = req.body.fax || companytoedit.fax;
                companytoedit.tax_no = req.body.tax_no || companytoedit.tax_no;
                companytoedit.tax_place = req.body.tax_place || companytoedit.tax_place;
                companytoedit.total_debt = req.body.total_debt || companytoedit.total_debt;
                companytoedit.total_paid = req.body.total_paid || companytoedit.total_paid;

                companytoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Company could not found"});
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
        Company.deleteOne({_id:req.params.company_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Company has been deleted"})});
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
        var newcompany = new Company();
        newcompany.name = req.body.name;
        newcompany.owner = req.body.owner;
        newcompany.address = req.body.address;
        newcompany.phone_gsm = req.body.phone_gsm;
        newcompany.phone = req.body.phone;
        newcompany.fax = req.body.fax;
        newcompany.tax_no = req.body.tax_no;
        newcompany.tax_place = req.body.tax_place;
        newcompany.total_debt = req.body.total_debt;
        newcompany.total_paid = req.body.total_paid;
        newcompany.performer_id = user.user;

        newcompany.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Company created"});
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
            var company = Company.findById(req.params.company_id);
            res.json({status:200,data:company});
        }
        catch
        {
            res.json({status:400,message:"Company could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};