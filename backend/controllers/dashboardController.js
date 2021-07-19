var Bills = require("../models/billModel");
var Payments = require("../models/paymentModel");
var token = require("../utility/token")
var Debts = require("../models/debtModel");
const aqp = require("api-query-params");


exports.index = async function (req,res) {
    try
    {
        var user = token.verifyToken(req.query.token,'access');
        var count = await Bills.countDocuments({created_date:{$gte:new Date(req.query.since)}}).exec();
        
        var count_paid = await Payments.countDocuments({created_date:{$gte:new Date(req.query.since)}}).exec();
        if(count_paid > 0)
        {
            var total_paid = await Payments.aggregate([
                {$match: {
                    created_date:{$gte:new Date(req.query.since)}
                } },
                {$group: {_id:null,total_paid: {$sum: {$ifNull: ['$amount', 0] } } } }
            ]).exec();
        }
        else
            var total_paid = {total_paid : 0};


        var count_debts = await Debts.countDocuments({created_date:{$gte:new Date(req.query.since)}}).exec();
        if(count_debts > 0)
        {
            var total_debts = Debts.aggregate([
                {$match: {
                    created_date:{$gte:new Date(req.query.since)}
                }},
                {$group: {_id:null,total_debts: {$sum: {$ifNull: ['$amount', 0] } } } }
            ]);
        }
        else
            var total_debts = {total_debts : 0};

        var date = new Date(req.query.since);
        var d2 = new Date(date.getTime());
        var d3 = new Date(date.getTime());
        var data = [];
        var prev_date = new Date(d3.getTime());
        switch(parseInt(req.query.range))
        {
            case 0:
                date.setMonth(date.getMonth() - 1);
                for(var i = 0; i < 30;i++)
                {
                    var e1 = await Payments.countDocuments({created_date:d3}).exec();
                    var e2 = await Debts.countDocuments({created_date:d3}).exec(); 
                    data.push({e1,e2});
                    d3.setDate(d3.getDate() - 1);
                }
                break;
            case 1:
                date.setMonth(date.getMonth() - 3);
                prev_date.setDate(prev_date.getDate - 3);
                for(var i = 0; i < 30;i++)
                {
                    var e1 = await Payments.aggregate([
                        {$match: { created_date: {$gte:prev_date,$lte:d3}}},
                        {$group: { _id:null,value: {$sum: {$ifNull: ['$amount', 0] } }}}
                    ]);
                    var e2 = await Debts.aggregate([
                        {$match: { created_date: {$gte:prev_date,$lte:d3}}},
                        {$group: { _id:null,value: {$sum: {$ifNull: ['$amount', 0] } }}}
                    ]);; 
                    if(e1.length === 0)
                        e1 = 0;
                    else
                        e1 = e1.val;
                    if(e2.length === 0)
                        e2 = 0;
                    else
                        e2 = e2.val;
                    data.push({e1,e2});
                    prev_date.setDate(prev_date.getDate - 3);
                    d3.setDate(d3.getDate() - 3);
                }
                break;
            case 2:
                date.setMonth(date.getMonth() - 6);
                prev_date.setDate(prev_date.getDate - 6);
                for(var i = 0; i < 30;i++)
                {
                    var e1 = await Payments.aggregate([
                        {$match: { created_date: {$gte:prev_date,$lte:d3}}},
                        {$group: { _id:null,value: {$sum: {$ifNull: ['$amount', 0] } }}}
                    ]);
                    var e2 = await Debts.aggregate([
                        {$match: { created_date: {$gte:prev_date,$lte:d3}}},
                        {$group: { _id:null,value: {$sum: {$ifNull: ['$amount', 0] } }}}
                    ]);; 
                    if(e1.length === 0)
                        e1 = 0;
                    else
                        e1 = e1.val;
                    if(e2.length === 0)
                        e2 = 0;
                    else
                        e2 = e2.val;
                    data.push({e1,e2});
                    prev_date.setDate(prev_date.getDate - 6);
                    d3.setDate(d3.getDate() - 6);
                }
                break;
            default:
                break;
        }


        var count_prev = await Bills.countDocuments({created_dat:{$gte:date,$lte:d2}}).exec();
        var count_paid_prev = await Payments.countDocuments({created_date:{$gte:date,$lte:d2}}).exec();
        if(count_paid_prev > 0)
        {
            var total_paid_prev = Payments.aggregate([
                {$match: {
                    created_date:{$gte:date,$lte:d2}
                } },
                {$group: {_id:null,total_paid:{$sum: {$ifNull: ['$amount', 0] } } }
                }
            ]);
        }
        else
            var total_paid_prev = {total_paid : 0};
        var count_debts_prev = await Debts.countDocuments({created_date:{$gte:date,$lte:d2}}).exec();
        if(count_debts_prev > 0)
        {
            var total_debts_prev = Debts.aggregate([
                {$match: {
                    created_date:{$gte:date,$lte:d2}
                } },
                {$group: {_id:null,total_debts: {$sum: {$ifNull: ['$amount', 0] } } }
                }
            ]);
        }
        else
            var total_debts_prev = {total_debts : 0};
        
        var diff_count = (count - count_prev) / count_prev * 100;
        if(count_prev == 0)
        {
            if(count == 0)
                diff_count = 0;
            else if(count > 0)
                diff_count = 100.00;
            else
                diff_count = -100.00;
        }

        var diff_paid = (total_paid.total_paid - total_paid_prev.total_paid) / total_paid_prev.total_paid * 100;
        if(total_paid_prev.total_paid == 0)
        {
            if(total_paid.total_paid == 0)
                diff_paid = 0;
            else if(total_paid.total_paid > 0)
                diff_paid = 100.00;
            else
                diff_paid = -100.00;
        }

        var diff_debts = (total_debts.total_debts - total_debts_prev.total_debts) / total_debts_prev.total_debts * 100;
        if(total_debts_prev.total_debts == 0)
        {
            if(total_debts.total_debts == 0)
                diff_debts = 0;
            else if(total_debts.total_debts > 0)
                diff_debts = 100.00;
            else
                diff_debts = -100.00;
        }


        var diff_net = ((total_paid.total_paid - total_debts.total_debts) - (total_paid_prev.total_paid - total_debts_prev.total_debts)) / (total_paid_prev.total_paid - total_debts_prev.total_debts) * 100;
        if((total_paid_prev.total_paid - total_debts_prev.total_debts) == 0)
        {
            if((total_paid.total_paid - total_debts.total_debts) == 0)
                diff_net = 0;
            else if((total_paid.total_paid - total_debts.total_debts)  > 0)
                diff_net = 100.00;
            else
                diff_net = -100.00;
        }
        var obj = {
            count:count,
            count_prev:count_prev,
            difference_count:diff_count.toFixed(2),
            total_paid:total_paid.total_paid,
            total_paid_prev:total_paid_prev.total_paid,
            difference_paid: diff_paid.toFixed(2),
            total_debts:total_debts.total_debts,
            total_debts_prev:total_debts_prev.total_debts,
            difference_debt:diff_debts.toFixed(2),
            difference_net:diff_net,
            data:data
        }
        res.json(obj)
    }
    catch(err)
    {
        res.json({status:400,message:err});
        console.log(err);
    }


}