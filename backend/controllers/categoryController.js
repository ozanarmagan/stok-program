var Category = require("../models/categoryModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel")
exports.index = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Category.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(async function  (err,categorys) {
            const categories = [];
            Promise.all(categorys.map(async element => {
                var json = element.toObject();
                var performer = await User.findOne({_id:element.performer_id}).exec();
                json.performer = performer.name + " " + performer.surname;
                categories.push(json);
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
                        data:categories
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
            Category.findById(req.params.category_id,function (err,categorytoedit) {
                categorytoedit.name = req.body.name || categorytoedit.name ;
                categorytoedit.tax_rate = req.body.tax_Rate || categorytoedit.tax_rate;
                categorytoedit.interests = req.body.interests || categorytoedit.interests;

                categorytoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Bill has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"Category could not found"});
        }
    }
    catch(err)
    {
        res.json({status:400,message:err});
    }
}


exports.delete = async function(req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        Category.deleteOne({_id:req.params.category_id}).exec((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"Category has been deleted"})});
    }
    catch(err)
    {
        res.json({status:400,message:err});
    }
} 

exports.new = async function (req,res) {
    try 
    {
        var user = token.verifyToken(req.body.token,'access');
        Category.findOne({name:req.body.name}).exec((err,doc) => {
            if(err)
            {console.log(err)}
            if(doc !== null)
            {
                res.json({status:402,message:"Category exists"});
                return;
            }
            var newcategory = new Category();
            newcategory.name = req.body.name;
            newcategory.tax_rate = req.body.tax_rate;
            newcategory.interests = req.body.interests;
            newcategory.performer_id = user.user;
    
    
            newcategory.save((err) => {
                if(err)
                    res.json({status:400,message:err});
                res.json({status:200,message:"Category created"});
            })
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
            Category.findOne({_id:req.params.category_id}).exec((err,doc) => {
                if(err)
                {
                    res.json({status:400,message:err});
                    return;
                }

                res.json({status:200,data:doc});
            });
        }
        catch(err)
        {
            res.json({status:400,message:err});
        }
    }
    catch(err)
    {
        res.json({status:400,message:err});
    }
};