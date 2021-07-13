var Company = require("../models/companyModel");
var token = require("../utility/token");
var aqp = require('api-query-params');

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Company.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,companys) {
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
                    data:companys
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
                companytoedit.address = req.body.address || companytoedit.address;
                companytoedit.phone = req.body.phone || companytoedit.phone;
                companytoedit.fax = req.body.fax || companytoedit.fax;
                companytoedit.tax_no = req.body.tax_no || companytoedit.tax_no;
                companytoedit.tax_place = req.body.tax_place || companytoedit.tax_place;
                companytoedit.logo = req.body.logo || companytoedit.logo;

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
        newcompany.address = req.body.address;
        newcomapny.phone = req.body.phone;
        newcomapny.fax = req.body.fax;
        newcomapny.tax_no = req.body.tax_no;
        newcomapny.tax_place = req.body.tax_place;
        newcomapny.logo = req.body.logo;

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
        var user = token.verifyToken(req.body.token,'access');
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