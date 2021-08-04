var User = require('../models/userModel');
var Product = require('../models/productModel');
var token = require('../utility/token');
var Category = require('../models/categoryModel');
var fs = require('fs');
var aqp = require('api-query-params');
var StockHistory = require('../models/stockHistory');

// Product Controller
exports.index = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Product.find(filter)
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
                json.category = await Category.findOne({_id:element.category_id});
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
    catch(err)
    {
        res.json({status:400,message:err});
        console.log(err);
    }
};



exports.critical = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        Product.find({ $expr: { $gt: [ "$critical_stock" , "$stock" ] } })
        .exec(async function  (err,docs) {
            const objects = [];
            Promise.all(docs.map(async element => {
                var json = element.toObject();
                var performer = await User.findOne({_id:element.performer_id}).exec();
                json.category = await Category.findOne({_id:element.category_id});
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
    catch (err) {
        res.json({status:400,message:err});
    }
}



exports.shortindex = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(async function  (err,docs) {
            var objects = [];
            docs.map(element => objects.push({id:element._id,name:element.name}));
            if(err)
            {
                res.json({status:400,message:err})
                return;
            }
            res.json({status:200,data:objects});
        })
    }
    catch (err) {
        res.json({status:400,message:err});
    }
}


exports.new = async function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
        var new_product = new Product();
        new_product.name = req.body.name;
        new_product.stock = req.body.stock;
        new_product.critical_stock = req.body.critical_stock;
        new_product.barcode = req.body.barcode;
        new_product.price_to_buy = req.body.price_to_buy;
        new_product.price_to_sell = req.body.price_to_sell;
        new_product.profit_rate = parseFloat(req.body.profit_rate);
        new_product.category_id = req.body.category_id;
        new_product.publish = req.body.publish;
        new_product.product_unit = req.body.product_unit;
        new_product.origin = req.body.origin;
        new_product.last_change_date = Date.now();
        new_product.created_date = Date.now();
        new_product.image = req.file ? "http://" + req.header('host') + "/" + req.file.path : null;
        new_product.performer_id = user.user;

        new_product.save((err) => {
            if(err) 
                res.json({status:400,message:err});
            res.json({status:200,message:"Product created"});
        })

    }catch(err) {
        res.json({status:400,message:err});
        console.log(err);
    }
}

exports.edit = async function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access_token');
        try {
            Product.findById(req.params.product_id,function (error,product){

                if(req.body.stock && req.body.stock !== product.stock)
                {
                    var Stock = new StockHistory();
                    Stock.product_id = product._id;
                    Stock.amount = req.body.stock - product.stock;
                    Stock.performer_id = token.verifyToken(req.body.token,'access').user;
                    Stock.save();
                }

                if(req.body.image !== product.image)
                    fs.unlinkSync('./images/' + product.image.substring(product.image.lastIndexOf('/') + 1));

                product.name = req.body.name || product.name;
                product.stock = req.body.stock || product.stock;
                product.critical_stock = req.body.critical_stock || product.critical_stock;
                product.barcode = req.body.barcode || product.barcode;
                product.price_to_buy = req.body.price_to_buy || product.price_to_buy;
                product.price_to_sell = req.body.price_to_sell || product.price_to_sell;
                product.profit_rate = req.body.profit_rate ? parseFloat(req.body.profit_rate) : product.profit_rate;
                product.category_id = req.body.category_id || product.category_id;
                product.publish = req.body.publish || product.publish;
                product.product_unit = req.body.product_unit ||  product.product_unit;
                product.origin = req.body.origin ||  product.origin;
                product.last_change_date = Date.now();
                product.image = req.file ? "http://" + req.header('host') + "/" + req.file.path :  (req.body.image ? req.body.image : null);

                product.save((err)=> { 
                    if(err) {
                        res.json({status:400,message:"An error occured"})}
                    res.json({status:200,message:"Product has edited"})
                    }) ;
            })
        } catch (error) {
            res.json({status:400,message:"Product could not found"});
        }
    } catch (error) {
        res.json({status:400,message:"Invalid Token"});
    }
}

exports.delete = async function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
        Product.findOne({_id:req.params.product_id}).exec((err,doc) => {
            fs.unlinkSync('./images/' + doc.image.substring(doc.image.lastIndexOf('/') + 1));
        });
        Product.deleteOne({_id:req.params.product_id},(err) => { 
            if(err) {
                res.json({status:400,message:"An error occured"})
                }
            res.json({status:200,message:"Product has been deleted"});
            })
    } catch (error) {
        res.json({status:400,message:"Invalid Token"});
    }
}

exports.view = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        try
        {
            Product.findById(req.params.product_id).exec(async function(err,doc) {
                if(err)
                    res.json({status:400,message:err});
                const object = doc.toObject();
                Category.findOne({_id:doc.category_id}).exec(function (err_,cat) {
                    if(err_)
                        res.json({status:400,message:err_})
                    object.category = cat;
                    User.findOne({_id:doc.performer_id}).exec((err__,usr) => {
                        if(err__)
                            res.json({status:400,message:err__})
                        object.performer = usr.name + " " + usr.surname;
                        res.json({status:200,data:object})
                    })

                })
            });
        }
        catch
        {
            res.json({status:400,message:"Product could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};