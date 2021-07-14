var User = require('../models/userModel');
var Product = require('../models/productModel');
var token = require('../utility/token');
var pw = require('../utility/password');
var Category = require('../models/categoryModel');
var aqp = require('api-query-params');

// Produc Controller
exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.body.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,products) {
            if(err)
            {
                res.json({
                    status:400,
                    message:err
                });
                console.log(err);
            }
            else{
                const products_ = [];
                products.forEach(async product => {
                    var product_category = Category.findById(product.category_id);
                    var performer = await User.findOne({_id:user.user});
                    element.performer = element.performer.name + " " + element.performer.surname;
                    products_.push({...product,category:product_category,performer:performer});
                });

                res.json({
                    status:200,
                    data:products_
                });}
        });
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};

exports.get = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access_token');

        Product.get((err,product) => {
            if(err){
                res.json({
                    status:400,
                    message:err
                });
                console.log(err);
            }
            else {
                var product_category = Category.findById(product.category_id);
                const product_ = {...product,category:product_category}
                res.json({
                    status:200,
                    data:product_
                })
            }
        })

    } catch (error) {
        res.json({status:400,message:"Invalid token"});
    }
}


exports.new = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access_token');

        var new_product = new Product();
        new_product.name = req.body.name;
        new_product.stock = req.body.stock;
        new_product.critical_stock = req.body.critical_stock;
        new_product.barcode = req.body.barcode;
        new_product.price_to_buy = req.body.price_to_buy;
        new_product.price_to_sell = req.body.price_to_sell;
        new_product.profit_rate = req.body.profit_rate;
        new_product.category_id = req.body.category_id;
        new_product.publish = req.body.publish;
        new_product.product_unit = req.body.product_unit;
        new_product.origin = req.body.origin;
        new_product.last_change_date = Date.now();
        new_product.created_date = Date.now();
        new_product.image = req.body.image;
        new_product.performer_id = user.user;

        new_product.save((err) => {
            if(err) res.json({status:200,message:err});
            res.json({status:200,message:"Product created"});
        })

    }catch(err) {
        res.json({status:400,message:"Invalid token"});
    }
}

exports.edit = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access_token');
        try {

            var changes = {}


            Product.findById(req.body.product_id,function (error,product){
                product.name = req.body.name ;
                product.stock = req.body.stock ;
                product.critical_stock = req.body.critical_stock ;
                product.barcode = req.body.barcode ;
                product.price_to_buy = req.body.price_to_buy ;
                product.price_to_sell = req.body.price_to_sell ;
                product.profit_rate = req.body.profit_rate ;
                product.category_id = req.body.category_id ;
                product.publish = req.body.publish ;
                product.product_unit = req.body.product_unit ;
                product.origin = req.body.origin ;
                product.created_date = product.created_date;
                product.last_change_date = Date.now();
                product.image = req.body.image ;

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
        var user = token.verifyToken(req.body.token,'access');
        try
        {
            var product = Product.findById(req.params.product_id);
            var product_category = Category.findById(product.category_id);
            const product_ = {...product,category:product_category}
            res.json({status:200,data:product_});
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