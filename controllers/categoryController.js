var Category = require("../models/categoryModel");
var token = require("../utility/token");

exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        Category.get(function (err,categorys) {
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
                    data:categorys
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
            Category.findById(req.params.category_id,function (err,categorytoedit) {
                categorytoedit.name = req.body.name || categorytoedit.name ;
                categorytoedit.tax_Rate = req.body.tax_Rate || categorytoedit.tax_Rate;
                categorytoedit.interest_2 = req.body.interest_2 || categorytoedit.interest_2;
                categorytoedit.interest_4 = req.body.interest_4 || categorytoedit.interest_4;
                categorytoedit.interest_6 = req.body.interest_6 || categorytoedit.interest_6;
                categorytoedit.interest_8 = req.body.interest_8 || categorytoedit.interest_8;
                categorytoedit.interest_10 = req.body.interest_10 || categorytoedit.interest_10;
                categorytoedit.interest_12 = req.body.interest_12 || categorytoedit.interest_12;
                categorytoedit.interest_14 = req.body.interest_14 || categorytoedit.interest_14;
                categorytoedit.interest_16 = req.body.interest_16 || categorytoedit.interest_16;
                categorytoedit.interest_18 = req.body.interest_18 || categorytoedit.interest_18;
                categorytoedit.interest_20 = req.body.interest_20 || categorytoedit.interest_20;
                categorytoedit.interest_22 = req.body.interest_22 || categorytoedit.interest_22;
                categorytoedit.interest_24 = req.body.interest_24 || categorytoedit.interest_24;

                categorytoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Category could not found"});
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
        Category.deleteOne({_id:req.params.category_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Category has been deleted"})});
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
        var newcategory = new Category();
        newcategory.name = req.body.name;
        newcategory.tax_Rate = req.body.tax_Rate;
        newcategory.interest_2 = req.body.interest_2;
        newcategory.interest_4 = req.body.interest_4;
        newcategory.interest_6 = req.body.interest_6;
        newcategory.interest_8 = req.body.interest_8;
        newcategory.interest_10 = req.body.interest_10;
        newcategory.interest_12 = req.body.interest_12;
        newcategory.interest_14 = req.body.interest_14;
        newcategory.interest_16 = req.body.interest_16;
        newcategory.interest_18 = req.body.interest_18;
        newcategory.interest_20 = req.body.interest_20;
        newcategory.interest_22 = req.body.interest_22;
        newcategory.interest_24 = req.body.interest_24;


        newcategory.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"Category created"});
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
            var category = Category.findById(req.params.category_id);
            res.json({status:200,data:category});
        }
        catch
        {
            res.json({status:400,message:"Category could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};