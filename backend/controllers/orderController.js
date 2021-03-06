var Order = require("../models/orderModel");
var token = require("../utility/token");
var aqp = require('api-query-params');
var User = require("../models/userModel");
var CompanyCustomer = require("../models/companyCustomer")
var Customer = require("../models/customerModel")
var Product = require("../models/productModel");
var Category = require("../models/categoryModel")
exports.index = function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query,{blacklist:['token'],});
        Order.find(filter)
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
                var customer = element.customer_type === 0 ? await Customer.findOne({_id:element.customer_id}).exec() : await CompanyCustomer.findOne({_id:element.customer_id});
                json.customer = customer;
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
            Order.findById(req.params.order_id,function (error,ordertoedit) {

                if(!ordertoedit.is_sold && req.body.is_sold)
                    ordertoedit.sell_date = new Date();


                ordertoedit.installment = req.body.installment || ordertoedit.installment ;
                ordertoedit.advance_pay = req.body.advance_pay || ordertoedit.advance_pay;
                ordertoedit.advance_pay_type = req.body.advance_pay_type || ordertoedit.advance_pay_type;
                ordertoedit.card_id = req.body.card_id || ordertoedit.card_id;
                ordertoedit.card_installment = req.body.card_installment || ordertoedit.card_installment;
                ordertoedit.customer_id = req.body.customer_id || ordertoedit.customer_id;
                ordertoedit.customer_type = req.body.customer_type || ordertoedit.customer_type;
                ordertoedit.products = req.body.products || ordertoedit.products;
                ordertoedit.last_change_date = new Date();
                ordertoedit.products = req.body.products || ordertoedit.products;
                ordertoedit.is_sold = req.body.is_sold || ordertoedit.is_sold;
                

                var total = 0;

                Promise.all(ordertoedit.products.map(async element => {
                    var item = await Product.findOne({_id:element.id}).exec();
                    total += parseInt(item.price_to_sell) * parseInt(element.amount);
                }))
                .then(_ => {
                    ordertoedit.total_amount = total;

                    ordertoedit.save((err) => { if(err) {res.json({status:400,message:err})} res.json({status:200,message:"Order has edited"})});
                })

            })
        }
        catch
        {
            res.json({status:400,message:"Order could not found"});
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
        Order.deleteOne({_id:req.params.order_id},(err) => { if(err) {res.json({status:400,message:err})} res.json({status:200,message:"Order has been deleted"})});
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
        var neworder = new Order();
        neworder.installment = req.body.installment;
        neworder.advance_pay = req.body.advance_pay;
        neworder.advance_pay_type = req.body.advance_pay_type;
        neworder.card_id = req.body.card_id;
        neworder.card_installment = req.body.card_installment;
        neworder.customer_id = req.body.customer_id;
        neworder.customer_type = req.body.customer_type;
        neworder.products = req.body.products;
        neworder.is_sold = req.body.is_sold;
        neworder.created_date = new Date();
        neworder.last_change_date = new Date();
        neworder.performer_id = user.user;


        var total = 0;

        Promise.all(neworder.products.map(async element => {
            var item = await Product.findOne({_id:element.id}).exec();
            total += parseInt(item.price_to_sell) * parseInt(element.amount);
        }))
        .then(_ => {
            neworder.total_amount = total;

            neworder.save((err) => {
                if(err)
                    res.json({status:400,message:err});
                res.json({status:200,message:"Order created"});
            })
        })
    }
    catch(err)
    {
        res.json({status:400,message:err});
    }
};

exports.view = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        try
        {
            Order.findById(req.params.order_id,async function(err,orders) {
                if(err)
                    res.json({status:400,error:err});
                var products_= [];
                var total_price = 0;
                var total_tax = 0;
                Promise.all(orders.products.map(async element => {
                    var item = await Product.findOne({_id:element.id}).exec();
                    var cat = await Category.findOne({_id:item.category_id}).exec();
                    total_price += item.price_to_sell * element.amount;
                    total_tax += (item.price_to_sell - ((item.price_to_sell - (item.price_to_sell / (1 + (cat.tax_rate/100)) * (cat.tax_rate/100))))) * element.amount;
                    products_.push({...item._doc,amount:element.amount,category:cat._doc});
                })).then( _ => {
                    res.json({status:200,data:{...orders._doc,product_details:products_,total_price:total_price,total_tax:total_tax}});
                });

            });
            
        }
        catch(err)
        {
            res.json({status:400,message:err});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
};